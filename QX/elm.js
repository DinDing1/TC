/*
QX配置填写
登录elm，打开我的-吃货豆，获取https://nt2.ele.me/c/b?请求中的Cookie
⬇️⬇️⬇️配置如下⬇️⬇️⬇️

[rewrite_local]
# 获取 cookie
https://nt2.ele.me/c/b? url script-request-header https://raw.githubusercontent.com/DinDing1/TC/main/QX/elm.js

[task_local]
0 0 1 1 * https://raw.githubusercontent.com/DinDing1/TC/main/QX/elm.js, tag=饿了么Cookie, img-url=https://raw.githubusercontent.com/DinDing1/TC/main/icon/ele.png, enabled=true

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
        // 保存Cookie到本地
        $.setdata(cookie, 'elmck');
        $notify('Quantumult X', 'elmCK获取成功✅', `${cookie}`);
        $done({});
        return; // 结束脚本，避免重复获取
    }
}

$done({});
