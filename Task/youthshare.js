const $ = new Env('youthshare');
let md5 = require('md5-node');
let nowTime;
let wxck;
let articles = ["https://focus.youth.cn/article/s?signature=qbBkjWwN2L3nP684eJlbDNsYrGvQUBoGK697gRyAEYpXDmeo0O&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36751315&time=1615514930&app_version=2.0.2&sign=5be11170ee39ab68e2626d1dcd420ae9",
"https://focus.youth.cn/article/s?signature=Mq8BYdozK36wyv5a2GvXLRtExYLWHNQkmYE1nPDWpxVg2LZmRX&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36751304&time=1615514957&app_version=2.0.2&sign=71e5f049caf6f567dbd8707e6e6f4f05",
"https://focus.youth.cn/article/s?signature=6K3Zgj0LVrQbJw94VjNWVxTbvXrWCo29Ao84mxB5qW8oDnvelE&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36749383&time=1615514966&app_version=2.0.2&sign=96ee37fe1969957ce1adfb69b65a3923",
"https://focus.youth.cn/article/s?signature=XOdKbE3Jw6GoWpN4v85WOzIVnR53IMjoOMwa8B9yl0Z2eRAmzr&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36718362&time=1615514980&app_version=2.0.2&sign=a18f5c8f311b3998bd4d1682ec26b4b3",
"https://focus.youth.cn/article/s?signature=LrNmbVzoOlxeyXw4p9o3XpHeGbKEHzpE6zR7M8ZkP3BAW9pJqD&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36752301&time=1615514990&app_version=2.0.2&sign=28054e1d71a81ff2ab11395416f7f671",
"https://focus.youth.cn/article/s?signature=gENjGxJw2L6opAMamB3yE3FR3VenUOY8DO21nX3kY58KdmBzRO&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36749011&time=1615515004&app_version=2.0.2&sign=4c605142ecb710f62b6eb52da2a08b85",
"https://focus.youth.cn/article/s?signature=3YDwkj8dqQbPnoB4jLYjo6FMPk9vU32JL8NalgxXL9AJ2zORKM&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36751865&time=1615515016&app_version=2.0.2&sign=3c3ce89b9253d912e7e5e032b7fd8a26",
"https://focus.youth.cn/article/s?signature=6K3Zgj0LVrQbJw94VjNOLdsbvXrWCo29Az34mxB5qW8oDnvelE&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36751465&time=1615515028&app_version=2.0.2&sign=cf6fefc79647371f2c351c5e82f89516",
"https://focus.youth.cn/article/s?signature=XOdKbE3Jw6GoWpN4v85DL9HVnR53IMjoOgna8B9yl0Z2eRAmzr&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36750488&time=1615515041&app_version=2.0.2&sign=14cd7e3e0054c2757618359116c381df",
"https://focus.youth.cn/article/s?signature=3nLo8BVlwPd52WM792xwjZixYLRWUmr3Yepa9Ee0q6OyNbJvDX&uid=54134778&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36752525&time=1615515062&app_version=2.0.2&sign=1796d9bfd347c24bd237db2442bb0960",
"https://focus.youth.cn/article/s?signature=k5Bv92bmMjwJEOP782Lzw3fY3KlwSzgLXBK1gxne6rYKdpWVoR&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36739758&time=1615515916&app_version=2.0.2&sign=c1fa543bbd1fd3820f19f6a43319c9c9",
"https://focus.youth.cn/article/s?signature=6K3Zgj0LVrQbJw94VjNOV8FbvAgnCo29Ajv4mxB5qW8oDnvelE&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36751315&time=1615515938&app_version=2.0.2&sign=ad39abb4ffb9045df861a9663598da59",
"https://focus.youth.cn/article/s?signature=mq63rgk0doNXbYK7LMRJOPCNGgL6F8ZBdAAaEMLO9lwG2zQJeB&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36751304&time=1615515957&app_version=2.0.2&sign=38a0d481dc749be1ff6ca4b1b564d69c",
"https://focus.youth.cn/article/s?signature=yGdoJZx2eAwpjgl7OLpZNOiZVxdPsgAKnYKa0PMbqvLnr9EKzR&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36749383&time=1615515972&app_version=2.0.2&sign=4dfb295c33e9bff86cb89dd91709aca8",
"https://focus.youth.cn/article/s?signature=8MzJgNdEKAO0xvq7nRrmWDhjkV5MS5Vjyd27ZPYQ3lm9pbD2yn&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36718362&time=1615515986&app_version=2.0.2&sign=854eca082a9fd1bb66202fd9147f52bc",
"https://focus.youth.cn/article/s?signature=DX6wEBvPbxy02WLarv8GGet9y5e3IN0PG3qagRQY9OZjA5eJpl&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36714284&time=1615515998&app_version=2.0.2&sign=e26999b502f52e8a30233e292ea0454c",
"https://focus.youth.cn/article/s?signature=XOdKbE3Jw6GoWpN4v85xrnFVnkMlTMjoOvMa8B9yl0Z2eRAmzr&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36743069&time=1615516023&app_version=2.0.2&sign=85937798257de591a3c9fc91ed289262",
"https://focus.youth.cn/article/s?signature=yjOAEqLWPoZQngMaDj8YQPFeVv2qh0nb93E4K5N3rYk6pmxVGl&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36731281&time=1615516035&app_version=2.0.2&sign=0643fde397391e9ebdecc82e1c2284e2",
"https://focus.youth.cn/article/s?signature=gzRBYKnQDmkx3yL1PxKQXKFmnAybtbM25JA1GV8wZPJorvpjEW&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36747867&time=1615516046&app_version=2.0.2&sign=36d864ce1a333aabbbfb217095e20e59",
"https://focus.youth.cn/article/s?signature=ZRpgeBYKPdGlvj24GoYwr8IzqEKBiq9QBdQ4X96VqmbxkDwr0n&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36751256&time=1615516059&app_version=2.0.2&sign=6ff41d42f034e9c934cb9c41de28f85c",
"https://focus.youth.cn/article/s?signature=2E96MJNGrnvW8pX1dBDdDghqW5EBIeqr36m75okQ0dyYRDBzxL&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36756516&time=1615516073&app_version=2.0.2&sign=2189e9d10a9cbf634626834bf2082099",		
"https://focus.youth.cn/article/s?signature=gENjGxJw2L6opAMamB6bjlTR3OW2cOq3Nlq1nX3kY58KdmBzRO&uid=54139898&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36522677&time=1614756476&app_version=2.0.2&sign=ae226680721d5fd4b7d2bcf416a1faff"]

let encodearticles;


let headers = {
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "*/*",
    "Connection": "keep-alive",
    "Referer": "https://focus.youth.cn/",
    "Host": "script.baertt.com",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.2(0x18000231) NetType/WIFI Language/zh_CN",
    "Accept-Language": "zh-cn"
};

!(async() => {
    for (let i = 0; i < articles.length; i++) {
		encodearticles = encodeURIComponent(encodeURIComponent(articles[i]));
        nowTime = new Date().getTime();
        wxck = md5(nowTime);
        $.log(wxck);
		
        await storage();
        await $.wait(3000);

        await visit();
        await $.wait(3000);

        await openpage();
        await $.wait(3000);

        await callback();
        await $.wait(3000);

    }
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

function storage() {

    return new Promise((resolve, reject) => {
        nowTime = new Date().getTime();
        const url = `https://script.baertt.com/count2/storage?t=${wxck}&referer=${encodearticles}&_=${nowTime}&jsonpcallback=jsonp2`;
        const request = {
            url: url,
            headers: headers,
        };

        $.get(request, function (error, response, data) {
            try {
                $.log(data);
            } catch (e) {
                $.log(e)
            }
            resolve();
        })
    })
}

function visit() {

    return new Promise((resolve, reject) => {
        nowTime = new Date().getTime();
        const url = `https://script.baertt.com/count2/visit?type=1&si=${wxck}&referer=${encodearticles}&_=${nowTime}&jsonpcallback=jsonp3`;

        const request = {
            url: url,
            headers: headers,
        };

        $.get(request, function (error, response, data) {
            try {
                $.log(data);
            } catch (e) {
                $.log(e)
            }
            resolve();
        })
    })
}

function openpage() {
    return new Promise((resolve, reject) => {
        nowTime = new Date().getTime();
        const url = `https://script.baertt.com/count2/openpage?referer=${encodearticles}&_=${nowTime}&jsonpcallback=jsonp5`;
        const request = {
            url: url,
            headers: headers,

        };

        $.get(request, function (error, response, data) {
            try {
                $.log(data);
            } catch (e) {
                $.log(e)
            }
            resolve();
        })
    })
}

function callback() {
    return new Promise((resolve, reject) => {
        nowTime = new Date().getTime();
        const url = `https://script.baertt.com/count2/callback?si=${wxck}&referer=${encodearticles}&_=${nowTime}&jsonpcallback=jsonp6`;
        const request = {
            url: url,
            headers: headers,
        };

        $.get(request, function (error, response, data) {
            try {
                $.log(data);
            } catch (e) {
                $.log(e)
            }
            resolve();
        })
    })
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            }
             : t;
            let s = this.get;
            return "POST" === e && (s = this.post),
            new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t,
            this.http = new s(this),
            this.data = null,
            this.dataFile = "box.dat",
            this.logs = [],
            this.isMute = !1,
            this.isNeedRewrite = !1,
            this.logSeparator = "\n",
            this.startTime = (new Date).getTime(),
            Object.assign(this, e),
            this.log(`\n${this.name}\u811a\u672c,\u5f00\u59cb\u6267\u884c:`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20,
                r = e && e.timeout ? e.timeout : r;
                const[o, h] = i.split("@"),
                a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode())
                return {}; {
                this.fs = this.fs ? this.fs : require("fs"),
                this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                e = this.path.resolve(process.cwd(), this.dataFile),
                s = this.fs.existsSync(t),
                i = !s && this.fs.existsSync(e);
                if (!s && !i)
                    return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"),
                this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                e = this.path.resolve(process.cwd(), this.dataFile),
                s = this.fs.existsSync(t),
                i = !s && this.fs.existsSync(e),
                r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r)
                    return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                o = this.getval(i),
                h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                    s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                    s = this.setval(JSON.stringify(o), i)
                }
            } else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"),
            this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
            t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
            this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                        "X-Surge-Skip-Scripting": !1
                    })), $httpClient.get(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                    e(t, s, i)
                })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                        hints: !1
                    })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            this.ckjar.setCookieSync(s, null),
                            e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                        "X-Surge-Skip-Scripting": !1
                    })), $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status),
                    e(t, s, i)
                });
            else if (this.isQuanX())
                t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                        hints: !1
                    })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                 : this.isSurge() ? {
                    url: t
                }
                 : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                        s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                        s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e),
            s && h.push(s),
            i && h.push(i),
            console.log(h.join("\n")),
            this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
            console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
            s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}\u811a\u672c, \u6267\u884c\u7ed3\u675f! \u7528\u65f6${s}\u79d2`),
            this.log(),
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }
    (t, e)
}
