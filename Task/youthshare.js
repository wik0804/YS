const $ = new Env('youthshare');
let md5 = require('md5-node');
let nowTime;
let wxck;
let articles = ["https://focus.youth.cn/article/s?signature=qbBkjWwN2L3nP684eJO8o6UpDDqvtBxkWpz7gRyAEYpXDmeo0O&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36509118&time=1614521280&app_version=2.0.2&sign=69a568bd6bb18c6569888a536e262bf8",
"https://focus.youth.cn/article/s?signature=6K3Zgj0LVrQbJw94VjgPAOC8oowrToP60ZK4mxB5qW8oDnvelE&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36506995&time=1614521310&app_version=2.0.2&sign=86476ce98673372a4b89423d669a1d35",
"https://focus.youth.cn/article/s?signature=lbgJRpz0We53NxQ4QqgNzwuJAAkycx0ykY54koMEv6nydKPZLD&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36516661&time=1614521320&app_version=2.0.2&sign=57f23c392b6dd7c0bc58fd1cdba1b33b",
"https://focus.youth.cn/article/s?signature=QB5EzPY3exK9wOd7E9gel8CrbbjmIgGowg578oADjvkbgZRGLV&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36514565&time=1614525686&app_version=2.0.2&sign=8328740b950210147dff3cedce3faa5a",
"https://focus.youth.cn/article/s?signature=QB5EzPY3exK9wOd7E9g5MpcrbbjmIgGowgK78oADjvkbgZRGLV&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36514948&time=1614525704&app_version=2.0.2&sign=18acaca3bb5bc2f5a4d1f0721dcb67f7",
"https://focus.youth.cn/article/s?signature=k5Bv92bmMjwJEOP782KkjmuzWWGDhzQKA8k1gxne6rYKdpWVoR&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36480283&time=1614525726&app_version=2.0.2&sign=72c4ddc53e3361e8fd1545cf3b353ffa",
"https://focus.youth.cn/article/s?signature=yGdoJZx2eAwpjgl7OLve9QC9RRQ0FgR0Jk5a0PMbqvLnr9EKzR&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36427991&time=1614525755&app_version=2.0.2&sign=ffe67ef61e122c6bc62263207607208f",
"https://focus.youth.cn/article/s?signature=MGDKgpQNLZkJvEd4q8yjbQu2vvLDuNvJwmy1rny295VAlmPWzY&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36508729&time=1614525769&app_version=2.0.2&sign=5eedb85a6661b5fe17cf1f04d22368f0",
"https://focus.youth.cn/article/s?signature=RpqGjEWYvLyBl2g1lq82oDCXmmk2tvdOEAv4D56Pd3OMonkQx9&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36479601&time=1614526069&app_version=2.0.2&sign=2afc0e129602672a2f502d49815107a3",
"https://focus.youth.cn/article/s?signature=89NvAVZQolPrzM0a3VrwoJsmqq8PCLZXweN7gXDkJEqdw5xObL&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36514755&time=1614526082&app_version=2.0.2&sign=7f99d9dbb05c901d3cdd1e73254149d6",
"https://focus.youth.cn/article/s?signature=RpqGjEWYvLyBl2g1lq8rErIvwmWeIvdOPNn4D56Pd3OMonkQx9&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36509906&time=1614568535&app_version=2.0.2&sign=7a18103a11b29ed130885fa2614dc32f",
"https://focus.youth.cn/article/s?signature=DX6wEBvPbxy02WLarv38qrIRYbqAFNpMBJRagRQY9OZjA5eJpl&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36524876&time=1614568607&app_version=2.0.2&sign=952a511e6969e894524b0c97f27534af",
"https://focus.youth.cn/article/s?signature=8MzJgNdEKAO0xvq7nRQx2Nh0p3qEC50ox987ZPYQ3lm9pbD2yn&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36494256&time=1614568618&app_version=2.0.2&sign=607e54f23c692432877cc44264b422f5",
"https://focus.youth.cn/article/s?signature=mq63rgk0doNXbYK7LMV6YOhz8p92I8znp2oaEMLO9lwG2zQJeB&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36509092&time=1614568629&app_version=2.0.2&sign=97db6827cdc6edef81cc8deb1f0f720c",
"https://focus.youth.cn/article/s?signature=lbgJRpz0We53NxQ4QqgdblhD2AvoTx0yWZ04koMEv6nydKPZLD&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36508750&time=1614568641&app_version=2.0.2&sign=338d508974cc13b5919f4010e98e30ff",
"https://focus.youth.cn/article/s?signature=6K3Zgj0LVrQbJw94VjgeE2UEjoemIoP6erE4mxB5qW8oDnvelE&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36514412&time=1614568657&app_version=2.0.2&sign=b3861a727293a11428942d0347c094fc",
"https://focus.youth.cn/article/s?signature=MGDKgpQNLZkJvEd4q8y0EOiQ3vwPINvJ8Aw1rny295VAlmPWzY&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36499411&time=1614568668&app_version=2.0.2&sign=ef4f4a03287e50075fb8080d730e4e59",
"https://focus.youth.cn/article/s?signature=yloGK5wNVmQq0XWaWwgWzJcy68KmSXnGRJean93eRAO8BMxdvD&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36494570&time=1614568680&app_version=2.0.2&sign=1d53ec396efc1f830ea8612598c726e3",
"https://focus.youth.cn/article/s?signature=VOZvBzYN5rkDxgX7YwgyjpF80Wd3uVdYj9O1L3yAP6WMnmlGK9&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36499301&time=1614568691&app_version=2.0.2&sign=0ebc889932c1964cf4e5a64e64c3ed40",
"https://focus.youth.cn/article/s?signature=Wn8Pym36L9l0Yoz1yVjqlOhRQZrPFYNAmMD4xKXjQqgZBMVdDe&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36497228&time=1614568709&app_version=2.0.2&sign=d3f4e957483048dd42c38272bbc19ad9",
"https://focus.youth.cn/article/s?signature=KAn0BpeXzg3WkQRaAygllLcw2XMOHXlMyJeawr9G5ZDV6ldJ2N&uid=52335096&phone_code=c2dd0b574c73d3f1b4044ed9068e1a1c&scid=36494431&time=1614568720&app_version=2.0.2&sign=9a6fbf7fd0422d79a311af8bd910d0da",		
"https://focus.youth.cn/article/s?signature=j6LwoklONRyQvgd4kxzXo3I2nnloujQK0Gw78M9zV2YP3KBGAe&uid=5142771&phone_code=ca9f93ac64b5608d99222785ea97e2dd&scid=36511886&time=1614521329&app_version=2.0.2&sign=2c2d30618c152dbd0c8d6eb7db58c1c3"]

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
