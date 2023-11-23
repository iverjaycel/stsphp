var HDESIGNER = {
    object: function(a) {
        return function() {
            var b = function(c) {
                var d = this.create.apply(this, c);
                delete this.create;
                return HDESIGNER.extend.call(d, this)
            };
            b.prototype = a;
            return new b(arguments)
        }
    },
    extend: function(b) {
        for (var a in b) {
            this[a] = b[a]
        }
        return this
    },
    pack: function(b) {
        for (var a in b) {
            this[a] = HDESIGNER.apply({
                $: this
            })
        }
    },
    apply: function(a) {
        a.pack = HDESIGNER.pack;
        a.extend = HDESIGNER.extend;
        a.object = function(c) {
            for (var b in c) {
                break
            }
            this[b] = HDESIGNER.object(c[b])
        };
        return a
    }
};
HDESIGNER.pack({
    J: null,
    D: null,
    Q: null
});
HDESIGNER.J.pack({
    chk: null,
    debug: null
});
HDESIGNER.J.extend({
    _number: "number",
    _string: "string",
    _object: "object",
    _function: "function",
    _break: "break"
});
HDESIGNER.J.extend({
    isnull: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (d) {
                return false
            }
            if (d === 0) {
                return false
            }
            if (d === false) {
                return false
            }
            if (d === "") {
                return false
            }
        }
        return true
    },
    notnull: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (this.isnull(d)) {
                return false
            }
        }
        return true
    },
    isnum: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (typeof(d) != this._number) {
                return false
            }
        }
        return true
    },
    isstr: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (typeof(d) != this._string) {
                return false
            }
        }
        return true
    },
    isobj: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (!d) {
                return false
            }
            if (typeof(d) != this._object) {
                return false
            }
        }
        return true
    },
    isarr: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (!d) {
                return false
            }
            if (!this.isobj(d)) {
                return false
            }
            if ((d instanceof Array) || (d.concat && d.reverse && d.unshift)) {} else {
                return false
            }
        }
        return true
    },
    isfunc: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (!d) {
                return false
            }
            if (typeof(d) != this._function) {
                return false
            }
        }
        return true
    },
    isnode: function() {
        var c = arguments;
        var b = c.length;
        if (!b) {
            return false
        }
        for (var e = 0; e < b; e++) {
            var d = c[e];
            if (!d) {
                return false
            }
            if (typeof(d) != this._object) {
                return false
            }
            if (!d.nodeName || !d.nodeType) {
                return false
            }
        }
        return true
    }
});
HDESIGNER.J.extend({
    fn: function() {
        var b = arguments.callee.caller;
        var a = /^function\s+([a-zA-Z0-9_]+)\s*\(/i;
        a.exec(b);
        return RegExp.$1
    },
    args: function(c) {
        if (!c) {
            c = 0
        }
        var b = arguments.callee.caller.arguments;
        var d = [];
        for (; c < b.length; c++) {
            d.push(b[c])
        }
        return d
    },
    func: function(a, b) {
        if (!b) {
            b = null
        }
        return this._func(a, b, this.args(2))
    },
    _func: function(b, c, a) {
        return function() {
            if (!c) {
                c = this
            }
            return b.apply(c, HDESIGNER.J.args().concat(a))
        }
    },
    call: function(a, b) {
        return this._call(a, b, this.args(2))
    },
    _call: function(b, c, a) {
        if (!b) {
            return
        }
        if (!c) {
            c = null
        }
        return b.apply(c, a)
    },
    step: function(b, h) {
        var k = this.args(2);
        var g = k.length ? k.shift() : null;
        var c = 0;
        if (this.isnum(b)) {
            for (; c < b; c++) {
                try {
                    this._call(h, g, [c].concat(k))
                } catch (j) {
                    if (j == this._break) {
                        break
                    } else {
                        throw j
                    }
                }
            }
        } else {
            if (this.isarr(b)) {
                for (; c < b.length; c++) {
                    try {
                        this._call(h, g, [c, b[c]].concat(k))
                    } catch (j) {
                        if (j == this._break) {
                            break
                        } else {
                            throw j
                        }
                    }
                }
            } else {
                if (this.isnode(b)) {
                    var d = null;
                    for (var l = b.firstChild; l; l = d) {
                        d = l.nextSibling;
                        try {
                            this._call(h, g, [l].concat(k))
                        } catch (j) {
                            if (j == this._break) {
                                break
                            } else {
                                throw j
                            }
                        }
                    }
                } else {
                    if (this.isobj(b)) {
                        for (var a in b) {
                            try {
                                this._call(h, g, [a, b[a]].concat(k))
                            } catch (j) {
                                if (j == this._break) {
                                    break
                                } else {
                                    throw j
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    halt: function() {
        throw this._break
    }
});
HDESIGNER.extend.call(Array.prototype, {
    find: function(b, a) {
        if (!a) {
            a = 0
        }
        for (; a < this.length; a++) {
            if (this[a] == b) {
                return a
            }
        }
        return -1
    },
    at: function(a) {
        if (a < 0) {
            a += this.length
        }
        if (a < 0 || a >= this.length) {
            return null
        } else {
            return this[a]
        }
    }
});
HDESIGNER.extend.call(String.prototype, {
    trim: function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    },
    at: function(a) {
        if (a < 0) {
            a += this.length
        }
        if (a < 0 || a >= this.length) {
            return ""
        } else {
            return this.charAt(a)
        }
    },
    cat: function(a) {
        if (a < 0) {
            a += this.length
        }
        return this.charCodeAt(a)
    },
    sub: function(b, a) {
        if (!a) {
            a = this.length
        }
        if (a < 0) {
            a = this.length + a
        }
        return this.substring(b, a)
    },
    caps: function() {
        return this.toUpperCase()
    },
    uncaps: function() {
        return this.toLowerCase()
    },
    cap: function() {
        return this.at(0).caps() + this.sub(1)
    },
    prop: function() {
        var b = "";
        for (var a = 0; a < this.length; a++) {
            b += (this.at(a) == "-") ? this.at(++a).caps() : this.at(a).uncaps()
        }
        return b
    }
});
String.chr = function(a) {
    return String.fromCharCode(a)
};
HDESIGNER.J.object({
    Point: {
        create: function(a, b) {
            return {
                x: a ? parseInt(a) : 0,
                y: b ? parseInt(b) : 0,
                toString: function() {
                    return this.x + "," + this.y
                }
            }
        },
        add: function(a, b) {
            if (a) {
                this.x += parseInt(a)
            }
            if (b) {
                this.y += parseInt(b)
            }
        }
    }
});
HDESIGNER.J.object({
    Size: {
        create: function(a, b) {
            return {
                w: a ? parseInt(a) : 0,
                h: b ? parseInt(b) : 0,
                toString: function() {
                    return this.w + "," + this.h
                }
            }
        },
        add: function(a, b) {
            if (a) {
                this.w += parseInt(a)
            }
            if (b) {
                this.h += parseInt(b)
            }
        }
    }
});
HDESIGNER.J.object({
    Rect: {
        create: function(a, d, b, c) {
            return {
                x: a ? parseInt(a) : 0,
                y: d ? parseInt(d) : 0,
                w: b ? parseInt(b) : 0,
                h: c ? parseInt(c) : 0,
                toString: function() {
                    return this.x + "," + this.y + "," + this.w + "," + this.h
                }
            }
        }
    }
});
HDESIGNER.J.extend({
    utf: function(c, a) {
        if (!a) {
            return encodeURIComponent(c)
        } else {
            try {
                return decodeURIComponent(c)
            } catch (b) {
                return null
            }
        }
    },
    rnd: function(a, b) {
        if (!a) {
            a = 100
        }
        if (!b) {
            b = 0
        }
        var c = parseInt(Math.random() * 1000000000);
        return c % (a - b + 1) + b
    }
});
HDESIGNER.J.chk.extend({
    len: function(f, d, a, b) {
        if (!a) {
            a = d
        }
        if (!f) {
            f = ""
        }
        var e = f.length;
        if (b) {
            for (var c = 0; c < f.length; c++) {
                if (f.cat(c) > 255) {
                    e++
                }
            }
        }
        if (e >= d && e <= a) {
            return true
        } else {
            return false
        }
    }
});
HDESIGNER.J.object({
    Date: {
        create: function(i, a, h, b, e, f, g) {
            if (!b) {
                b = 0
            }
            if (!e) {
                e = 0
            }
            if (!f) {
                f = 0
            }
            if (!g) {
                g = 0
            }
            var c = null;
            if (!i) {
                c = new Date()
            } else {
                if (!a) {
                    if (HDESIGNER.J.isnum(i)) {
                        c = new Date(i)
                    } else {
                        c = i
                    }
                } else {
                    if (!h) {
                        return null
                    } else {
                        c = new Date(i, a - 1, h, b, e, f, g)
                    }
                }
            }
            this.calc(c);
            return c
        },
        calc: function(a) {
            if (!a) {
                a = this
            }
            a.year = a.getFullYear();
            a.month = a.getMonth() + 1;
            a.day = a.getDate();
            a.weekday = a.getDay();
            a.hour = a.getHours();
            a.minute = a.getMinutes();
            a.second = a.getSeconds();
            a.msecond = a.getMilliseconds()
        },
        modify: function(y, m, d, hour, min, sec, msec) {
            with(HDESIGNER.J) {
                if (isnum(y)) {
                    this.setFullYear(y)
                }
                if (isnum(m)) {
                    this.setMonth(m - 1)
                }
                if (isnum(d)) {
                    this.setDate(d)
                }
                if (isnum(hour)) {
                    this.setHours(hour)
                }
                if (isnum(min)) {
                    this.setMinutes(min)
                }
                if (isnum(sec)) {
                    this.setSeconds(sec)
                }
                if (isnum(msec)) {
                    this.setMilliseconds(msec)
                }
            }
            this.calc()
        },
        isleapyear: function(a) {
            if (!a) {
                a = this.year
            }
            if (a % 400 == 0) {
                return true
            } else {
                if (a % 100 == 0) {
                    return false
                } else {
                    if (a % 4 == 0) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        endday: function(b, a) {
            if (!a) {
                a = this.month
            }
            if (a == 2) {
                return (this.isleapyear(b)) ? 29 : 28
            } else {
                if (a == 4 || a == 6 || a == 9 || a == 11) {
                    return 30
                } else {
                    return 31
                }
            }
        },
        allday: function(a) {
            return (this.isleapyear(a)) ? 366 : 365
        },
        timestamp: function() {
            return this.getTime()
        },
        seqday: function() {
            var a = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            var b = (this.month > 2 && this.isleapyear()) ? 1 : 0;
            return a[this.month] + this.day + b
        },
        seqhour: function() {
            return (this.seqday() - 1) * 24 + this.hour
        },
        seqminute: function(b) {
            var a = this.hour * 60 + this.minute;
            if (b) {
                return a
            } else {
                (this.seqday() - 1) * 1440 + a
            }
        },
        seqsecond: function(b) {
            var a = this.hour * 3600 + this.minute * 60 + this.second;
            if (b) {
                return a
            } else {
                (this.seqday() - 1) * 86400 + a
            }
        },
        seqmsecond: function(b) {
            var a = this.hour * 3600000 + this.minute * 60000 + this.second * 1000 + this.msecond;
            if (b) {
                return a
            } else {
                (this.seqday() - 1) * 86400000 + a
            }
        },
        moveyear: function(a) {
            if (!a) {
                return
            }
            this.year += a;
            if (this.month == 2 && this.day == 29) {
                this.day = this.endday(this.year, this.month)
            }
            this.modify(this.year, this.month, this.day)
        },
        movemonth: function(a, c) {
            this.moveyear(c);
            if (!a) {
                return
            }
            this.month += a;
            for (; this.month < 1; this.month += 12) {
                this.year--
            }
            for (; this.month > 12; this.month -= 12) {
                this.year++
            }
            var b = this.endday(this.year, this.month);
            if (this.day > b) {
                this.day = b
            }
            this.modify(this.year, this.month, this.day)
        },
        moveday: function(b, a, c) {
            this.movemonth(a, c);
            if (!b) {
                return
            }
            this.day += b;
            while (this.day < 1) {
                this.month--;
                if (this.month < 1) {
                    this.year--;
                    this.month = 12
                }
                this.day += this.endday(this.year, this.month)
            }
            while (this.day > this.endday(this.year, this.month)) {
                this.day -= this.endday(this.year, this.month);
                this.month++;
                if (this.month > 12) {
                    this.year++;
                    this.month = 1
                }
            }
            this.modify(this.year, this.month, this.day)
        },
        movehour: function(a) {
            if (!a) {
                return
            }
            var b = this.getTime() + a * 3600000;
            this.setTime(b);
            this.calc()
        },
        moveminute: function(a, b) {
            this.movehour(b);
            if (!a) {
                return
            }
            var c = this.getTime() + a * 60000;
            this.setTime(c);
            this.calc()
        },
        movesecond: function(c, a, b) {
            this.moveminute(a, b);
            if (!c) {
                return
            }
            var d = this.getTime() + c * 1000;
            this.setTime(d);
            this.calc()
        },
        movemsecond: function(b, d, a, c) {
            this.movesecond(d, a, c);
            if (!b) {
                return
            }
            var e = this.getTime() + b;
            this.setTime(e);
            this.calc()
        },
        diffday: function(a) {
            var c = 0;
            for (var b = this.year; b < a.year; b++) {
                c += this.allday(b)
            }
            for (b = a.year; b < this.year; b++) {
                c -= this.allday(b)
            }
            return a.seqday() - this.seqday() + c
        },
        difftime: function(a) {
            return this.diffday(a) * 86400000 + a.seqmsecond(true) - this.seqmsecond(true)
        },
        dyear: function(a) {},
        dmonth: function(b, a) {},
        dday: function(e, a, c) {
            var b = HDESIGNER.J.Date(e, a, c);
            return this.dayspace(b)
        },
        dhour: function(b, a) {},
        dminute: function(b, a) {},
        dsecond: function(b, a) {},
        dmsecond: function(b, a) {},
        calcluna: function() {
            var n = HDESIGNER.LunaTable;
            var l = HDESIGNER.J.Date(1899, 2, 9);
            var a = -this.diffday(l);
            for (var f = 0; f < n.length; f++) {
                var g = n[f];
                while (a > 390) {
                    var b = 0;
                    for (var d = 0; d < g.length; d++) {
                        b += 30 - (g[d] % 2)
                    }
                    a -= b;
                    g = n[++f]
                }
                var c = 0;
                for (var e = 0; e < g.length; e++) {
                    if (g[e] < 2) {
                        c++
                    }
                    var h = 30 - (g[e] % 2);
                    a -= h;
                    if (a <= 0) {
                        this.luna = {
                            year: f + 1899,
                            month: c,
                            day: a + h,
                            yun: (g[e] < 2) ? false : true,
                            toString: function() {
                                return this.year + "," + this.month + "," + this.day
                            }
                        };
                        return this.luna
                    }
                }
            }
        },
        isred: function() {
            var c = this.weekday;
            var b = this.month;
            var i = this.day;
            if (c == 0) {
                return true
            } else {
                if (b == 1 && i == 1) {
                    return true
                } else {
                    if (b == 3 && i == 1) {
                        return true
                    } else {
                        if (b == 5 && i == 5) {
                            return true
                        } else {
                            if (b == 6 && i == 6) {
                                return true
                            } else {
                                if (b == 8 && i == 15) {
                                    return true
                                } else {
                                    if (b == 10 && i == 3) {
                                        return true
                                    } else {
                                        if (b == 12 && i == 25) {
                                            return true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (!this.luna) {
                return false
            }
            var h = this.luna.month;
            var e = this.luna.day;
            var g = this.luna.yun;
            if (h == 1 && e == 1 && !g) {
                return true
            } else {
                if (h == 1 && e == 2 && !g) {
                    return true
                } else {
                    if (h == 4 && e == 8 && !g) {
                        return true
                    } else {
                        if (h == 8 && e == 14 && !g) {
                            return true
                        } else {
                            if (h == 8 && e == 15 && !g) {
                                return true
                            } else {
                                if (h == 8 && e == 16 && !g) {
                                    return true
                                } else {
                                    if (h == 12 && e > 28) {
                                        var a = HDESIGNER.LunaTable[this.luna.year - 1899];
                                        var f = a.at(-1);
                                        f = 30 - (f % 2);
                                        if (f == e) {
                                            return true
                                        } else {
                                            return false
                                        }
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
HDESIGNER.extend({
    LunaTable: [
        [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 3, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [1, 0, 3, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 3, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 3, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 3, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 3, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 3, 0, 1, 1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 0, 3, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 3, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 3, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 2, 1, 0, 1, 0, 1, 1, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 2, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 1, 0, 1, 1, 2, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0, 1, 2, 1, 1, 0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 1, 0, 1, 2, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 3, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 3, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 2, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 3, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 3, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 3, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0],
        [1, 0, 0, 3, 0, 1, 1, 0, 1, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 3, 1, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 2, 1, 0, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 3, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 3, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 3, 1, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 0, 0, 3, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 3, 0, 1, 1, 0],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 3, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 3, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 3, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 3, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 3, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 3, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 3, 0, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 3, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 3, 1, 0, 1, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 3, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 3, 0],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 2, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 3, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 3, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0]
    ]
});
HDESIGNER.D.extend({
    ie: (window.navigator.appName == "Microsoft Internet Explorer"),
    chrome: (window.navigator.userAgent.match(/Chrome/i)),
    opera: (window.navigator.userAgent.match(/Opera/i)),
    firefox: (window.navigator.userAgent.match(/Firefox/i)),
    safari: (window.navigator.userAgent.match(/Safari/i) && !window.navigator.userAgent.match(/Chrome/i)),
    unknown: !(window.navigator.userAgent.match(/(MSIE|Chrome|Opera|Firefox|Safari)/i)),
    mobile: (window.navigator.userAgent.match(/Mobile/i)),
    dtd: (document.doctype) ? 1 : null,
    ver: (function() {
        var c = window.navigator.userAgent;
        var b = (window.navigator.appName == "Microsoft Internet Explorer");
        if (b) {
            var a = /msie ([0-9]+)/i;
            a.exec(c);
            return RegExp.$1
        } else {
            if (c.match(/Chrome/i)) {
                var a = /chrome\/([0-9]+)/i;
                a.exec(c);
                return RegExp.$1
            } else {
                if (c.match(/opera/i)) {
                    var a = /opera\/([0-9]+)/i;
                    a.exec(c);
                    return RegExp.$1
                } else {
                    if (c.match(/firefox/i)) {
                        var a = /firefox\/([0-9]+)/i;
                        a.exec(c);
                        return RegExp.$1
                    } else {
                        if (c.match(/safari/i)) {
                            var a = /version\/([0-9]+)/i;
                            a.exec(c);
                            return RegExp.$1
                        }
                    }
                }
            }
        }
        return -1
    })()
});
HDESIGNER.D.pack({
    vset: null,
    event: null,
    cookie: null,
    xml: null
});
HDESIGNER.D.vset.extend({
    z: {
        dir: ["Left", "Top", "Right", "Bottom", ""],
        font: ["sans-serif,Gulim", "Tahoma", "Verdana", "Impact", "Comic Sans MS", "Times New Roman", "Courier New", "Mv Boli", "Georgia"],
        weight: ["normal", "bold", "bolder"],
        ta: ["left", "right", "center", "justify"],
        va: ["top", "bottom", "middle"],
        ws: ["normal", "nowrap", "pre"],
        ov: ["auto", "visible", "hidden", "scroll"],
        tov: ["clip", "ellipsis"],
        cl: ["left", "right", "both", "none"],
        dis: ["", "none"],
        vis: ["visible", "hidden"],
        line: ["none", "solid", "dashed", "dotted", "groove", "ridge", "inset", "outset"],
        ps: ["static", "relative", "absolute"],
        pos: ["left", "top", "right", "bottom"],
        cs: ["auto", "pointer", "default", "move", "help", "wait", "text"],
        ime: ["auto", "active", "inactive", "disabled"],
        layout: ["auto", "fixed"],
        filter_shadow: "progid:DXImageTransform.Microsoft.shadow(direction=135,color=#000000,strength=2)"
    },
    set_att: function(a) {
        var c = {};
        var e = this.z;
        for (var d in a) {
            var b = a[d];
            var f = HDESIGNER.J.isnum(b);
            if (d == "w") {
                c.width = f ? b + "px" : ""
            } else {
                if (d == "h") {
                    c.height = f ? b + "px" : ""
                } else {
                    if (d == "wp") {
                        c.width = b + "%"
                    } else {
                        if (d == "hp") {
                            c.height = b + "%"
                        } else {
                            if (d == "ta") {
                                c.align = f ? e.ta[b] : b
                            } else {
                                if (d == "va") {
                                    c.vAlign = f ? e.va[b] : b
                                } else {
                                    if (d == "cls") {
                                        c.className = b
                                    } else {
                                        if (d == "grid") {
                                            c.rules = "all";
                                            c.frame = "border";
                                            c.borderColor = b
                                        } else {
                                            if (d == "bk") {
                                                c.bgColor = f ? e.color[b] : b
                                            } else {
                                                if (d == "cs") {
                                                    c.cellSpacing = b + "px"
                                                } else {
                                                    if (d == "cp") {
                                                        c.cellPadding = b + "px"
                                                    } else {
                                                        if (d == "max") {
                                                            c.maxLength = b
                                                        } else {
                                                            c[d] = b
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return c
    },
    _propertize: function(c) {
        var a = c.split(";");
        var e = {};
        for (var b = 0; b < a.length; b++) {
            var d = a[b].split(":");
            if (d.length == 2) {
                e[d[0].trim().prop()] = d[1]
            }
        }
        return e
    },
    set_css: function(b) {
        var g = {};
        var h = this.z;
        for (var c in b) {
            var k = b[c];
            var d = HDESIGNER.J.isnum(k);
            var j = HDESIGNER.J.isarr(k);
            var e = [null, null, null, null];
            if (j) {
                for (var f = 0; f < k.length; f++) {
                    e[f] = HDESIGNER.J.isnum(k[f])
                }
            }
            if (c == "w") {
                g.width = d ? k + "px" : ""
            } else {
                if (c == "h") {
                    g.height = d ? k + "px" : ""
                } else {
                    if (c == "wp") {
                        g.width = k + "%"
                    } else {
                        if (c == "hp") {
                            g.height = k + "%"
                        } else {
                            if (c == "f") {
                                if (j) {
                                    g.fontSize = e[0] ? k[0] + "pt" : null;
                                    g.fontFamily = e[1] ? h.font[k[1]] : null;
                                    g.fontWeight = e[2] ? h.weight[k[2]] : null
                                } else {
                                    if (k) {
                                        g.fontSize = k + "pt";
                                        g.fontFamily = h.font[0]
                                    } else {
                                        g.font = "normal normal normal 0px/1px sans-serif,Gulim"
                                    }
                                }
                            } else {
                                if (c == "fs") {
                                    g.fontSize = d ? k + "pt" : ""
                                } else {
                                    if (c == "ff") {
                                        g.fontFamily = d ? h.font[k] : k
                                    } else {
                                        if (c == "fw") {
                                            g.fontWeight = d ? h.weight[k] : k
                                        } else {
                                            if (c == "lh") {
                                                g.lineHeight = k + "%"
                                            } else {
                                                if (c == "c") {
                                                    g.color = k
                                                } else {
                                                    if (c == "bk") {
                                                        g.backgroundColor = k
                                                    } else {
                                                        if (c == "bki") {
                                                            g.backgroundImage = "url(" + k + ")"
                                                        } else {
                                                            if (c == "ta") {
                                                                g.textAlign = d ? h.ta[k] : k
                                                            } else {
                                                                if (c == "va") {
                                                                    g.verticalAlign = d ? h.va[k] : k
                                                                } else {
                                                                    if (c == "ws") {
                                                                        g.whiteSpace = d ? h.ws[k] : k
                                                                    } else {
                                                                        if (c == "ov") {
                                                                            if (j) {
                                                                                g.overflowX = e[0] ? h.ov[k[0]] : null;
                                                                                g.overflowY = e[1] ? h.ov[k[1]] : null
                                                                            } else {
                                                                                g.overflow = h.ov[k]
                                                                            }
                                                                        } else {
                                                                            if (c == "tov") {
                                                                                g.textOverflow = h.tov[k]
                                                                            } else {
                                                                                if (c == "fl") {
                                                                                    g.styleFloat = h.ta[k];
                                                                                    g.cssFloat = h.ta[k]
                                                                                } else {
                                                                                    if (c == "cl") {
                                                                                        g.clear = h.cl[k]
                                                                                    } else {
                                                                                        if (c == "dis") {
                                                                                            g.display = h.dis[k]
                                                                                        } else {
                                                                                            if (c == "vis") {
                                                                                                g.visibility = h.vis[k]
                                                                                            } else {
                                                                                                if (c == "p") {
                                                                                                    this._setpx(g, "padding", "", k)
                                                                                                } else {
                                                                                                    if (c == "m") {
                                                                                                        this._setpx(g, "margin", "", k)
                                                                                                    } else {
                                                                                                        if (c == "b") {
                                                                                                            this._setborder(g, "border", k)
                                                                                                        } else {
                                                                                                            if (c == "bL") {
                                                                                                                this._setborder(g, "borderLeft", k)
                                                                                                            } else {
                                                                                                                if (c == "bT") {
                                                                                                                    this._setborder(g, "borderTop", k)
                                                                                                                } else {
                                                                                                                    if (c == "bR") {
                                                                                                                        this._setborder(g, "borderRight", k)
                                                                                                                    } else {
                                                                                                                        if (c == "bB") {
                                                                                                                            this._setborder(g, "borderBottom", k)
                                                                                                                        } else {
                                                                                                                            if (c == "bw") {
                                                                                                                                this._setpx(g, "border", "Width", k)
                                                                                                                            } else {
                                                                                                                                if (c == "bs") {
                                                                                                                                    this._setline(g, "border", "Style", k)
                                                                                                                                } else {
                                                                                                                                    if (c == "bc") {
                                                                                                                                        this._setcolor(g, "border", "Color", k)
                                                                                                                                    } else {
                                                                                                                                        if (c == "ps") {
                                                                                                                                            g.position = h.ps[k]
                                                                                                                                        } else {
                                                                                                                                            if (c == "pos") {
                                                                                                                                                g.left = e[0] ? k[0] + "px" : null;
                                                                                                                                                g.top = e[1] ? k[1] + "px" : null
                                                                                                                                            } else {
                                                                                                                                                if (c == "z") {
                                                                                                                                                    g.zIndex = k
                                                                                                                                                } else {
                                                                                                                                                    if (c == "cs") {
                                                                                                                                                        g.cursor = h.cs[k]
                                                                                                                                                    } else {
                                                                                                                                                        if (c == "ime") {
                                                                                                                                                            g.imeMode = h.ime[k]
                                                                                                                                                        } else {
                                                                                                                                                            if (c == "op") {
                                                                                                                                                                g.filter = "alpha(opacity=" + (k * 100) + ")";
                                                                                                                                                                g.opacity = k;
                                                                                                                                                                g.mozOpacity = k
                                                                                                                                                            } else {
                                                                                                                                                                if (c == "ww") {
                                                                                                                                                                    g.wordWrap = (k) ? "break-word" : "normal"
                                                                                                                                                                } else {
                                                                                                                                                                    if (c == "grid") {
                                                                                                                                                                        g.borderCollapse = "collapse"
                                                                                                                                                                    } else {
                                                                                                                                                                        if (c == "out") {
                                                                                                                                                                            this._setborder(g, "outline", k)
                                                                                                                                                                        } else {
                                                                                                                                                                            if (c == "sep") {
                                                                                                                                                                                g.borderCollapse = "separate"
                                                                                                                                                                            } else {
                                                                                                                                                                                if (c == "layout") {
                                                                                                                                                                                    g.tableLayout = h.layout[k]
                                                                                                                                                                                } else {
                                                                                                                                                                                    g[c] = k
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return g
    },
    _setpx: function(d, e, c, a) {
        var f = this.z;
        if (HDESIGNER.J.isarr(a)) {
            for (var b = 0; b < 4; b++) {
                d[e + f.dir[b] + c] = HDESIGNER.J.isnum(a[b]) ? a[b] + "px" : null
            }
        } else {
            d[e + c] = a + "px"
        }
    },
    _setline: function(d, e, c, a) {
        var f = this.z;
        if (HDESIGNER.J.isarr(a)) {
            for (var b = 0; b < 4; b++) {
                d[e + f.dir[b] + c] = HDESIGNER.J.isnum(a[b]) ? f.line[a[b]] : null
            }
        } else {
            d[e + c] = f.line[a]
        }
    },
    _setcolor: function(d, e, c, a) {
        var f = this.z;
        if (HDESIGNER.J.isarr(a)) {
            for (var b = 0; b < 4; b++) {
                d[e + f.dir[b] + c] = a[b]
            }
        } else {
            d[e + c] = a
        }
    },
    _setborder: function(b, c, a) {
        var d = this.z;
        if (HDESIGNER.J.isarr(a)) {
            b[c + "Width"] = HDESIGNER.J.isnum(a[0]) ? a[0] + "px" : null;
            b[c + "Style"] = HDESIGNER.J.isnum(a[1]) ? d.line[a[1]] : null;
            b[c + "Color"] = a[2]
        } else {
            b[c] = a
        }
    }
});
HDESIGNER.D.object({
    factory: {
        create: function(a) {
            if (HDESIGNER.J.isstr(a)) {
                return document.createElement(a)
            } else {
                return a
            }
        },
        att: function(c) {
            var a = HDESIGNER.D.vset.set_att(c);
            for (var d in a) {
                var b = a[d];
                if (!HDESIGNER.J.notnull(b)) {
                    continue
                }
                if (d == "className") {
                    this.className = b
                } else {
                    this.setAttribute(d, b)
                }
            }
            return this
        },
        css: function(c) {
            if (!c) {
                return
            }
            if (HDESIGNER.J.isstr(c)) {
                c = HDESIGNER.D.vset._propertize(c)
            }
            var b = HDESIGNER.D.vset.set_css(c);
            for (var d in b) {
                var a = b[d];
                if (!HDESIGNER.J.notnull(a)) {
                    continue
                }
                this.style[d] = a
            }
            return this
        },
        append: function(a) {
            if (!HDESIGNER.J.isarr(a)) {
                a = [a]
            }
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (HDESIGNER.J.isnull(c)) {
                    continue
                }
                if (HDESIGNER.J.isobj(c) && c.nodeType) {
                    this.appendChild(c)
                } else {
                    if (HDESIGNER.J.isstr(c)) {
                        this.appendChild(HDESIGNER.D.text(c))
                    } else {
                        if (HDESIGNER.J.isnum(c)) {
                            this.appendChild(HDESIGNER.D.text("" + c))
                        }
                    }
                }
            }
            return this
        },
        remove: function() {
            this.empty();
            this.parentNode.removeChild(this)
        },
        empty: function() {
            HDESIGNER.J.step(this, function(a) {
                try {
                    if (a.empty) {
                        a.empty()
                    } else {
                        if (a.innerHTML) {
                            a.innerHTML = ""
                        }
                    }
                } catch (b) {}
                this.removeChild(a)
            }, this)
        },
        pnode: function(c) {
            if (!c || c < 1) {
                c = 1
            }
            var b = this;
            for (var a = 0; a < c; a++) {
                b = b.parentNode
            }
            return b
        },
        vnode: function() {
            var d = this;
            var b = HDESIGNER.J.args();
            for (var c = 0; c < b.length; c++) {
                var a = b[c];
                if (a < 0) {
                    d = d.lastChild
                } else {
                    d = d.childNodes[a]
                }
            }
            return d
        },
        vatt: function(a) {
            HDESIGNER.J.step(this, function(b) {
                if (b.nodeType == 1) {
                    b.att(a)
                }
            })
        },
        vcss: function(a) {
            HDESIGNER.J.step(this, function(b) {
                if (b.nodeType == 1) {
                    b.css(a)
                }
            })
        },
        len: function() {
            return this.childNodes.length
        },
        spec: function() {
            var a = this.cloneNode(false);
            return HDESIGNER.D.span(a).innerHTML.trim()
        },
        strip: function() {
            var c = HDESIGNER.D;
            if (c.ie || c.opera) {
                this.removeNode()
            } else {
                if (c.chrome || c.safari || c.firefox) {
                    var d = this.cloneNode(true);
                    var b = this.parentNode;
                    for (var a = 0; a < d.childNodes.length; a++) {
                        b.insertBefore(d.childNodes[a], this)
                    }
                    b.removeChild(this)
                }
            }
        },
        textval: function(b) {
            if (this.childNodes.length > 1) {
                return ""
            }
            if (this.childNodes.length == 0) {
                this.append("")
            }
            if (this.firstChild.nodeType != 3) {
                return ""
            }
            if (HDESIGNER.J.notnull(b)) {
                this.firstChild.nodeValue = b
            } else {
                var a = this.firstChild.nodeValue;
                return a ? a : ""
            }
        },
        htmlval: function(a) {
            if (HDESIGNER.J.notnull(a)) {
                this.innerHTML = a
            } else {
                return this.innerHTML
            }
        },
        write: function() {
            var a = HDESIGNER.J.args();
            for (var b = 0; b < a.length; b++) {
                this.append(a[b])
            }
        },
        writeln: function(c, b, a) {
            this.append(HDESIGNER.D.div(c, b, a))
        },
        insertprev: function(a) {
            if (!HDESIGNER.J.isnode(a)) {
                a = HDESIGNER.D.text(a)
            }
            this.parentNode.insertBefore(a, this)
        },
        insertnext: function(b) {
            if (!HDESIGNER.J.isnode(b)) {
                b = HDESIGNER.D.text(b)
            }
            var a = this.nextSibling;
            if (a) {
                this.parentNode.insertBefore(b, a)
            } else {
                this.parentNode.appendChild(b)
            }
        },
        insertat: function(b, c) {
            if (!HDESIGNER.J.isnode(c)) {
                c = HDESIGNER.D.text(c)
            }
            var a = this.childNodes.length;
            if (b < 0) {
                b += a
            }
            if (b < 0 || b >= a || a == 0) {
                this.appendChild(c)
            } else {
                this.insertBefore(c, this.childNodes[b])
            }
        },
        seq: function() {
            var b = this.parentNode.firstChild;
            for (var a = 0; b; a++) {
                if (b == this) {
                    return a
                }
            }
            return -1
        },
        visible: function(a) {
            var c = a ? 0 : 1;
            this.css({
                vis: c
            })
        },
        showing: function(a) {
            var c = a ? 0 : 1;
            this.css({
                dis: c
            })
        },
        add_event: function(d, c, a) {
            var b = HDESIGNER.D.event;
            if (!a.length) {
                return b.add(this, c, d)
            } else {
                var e = a.shift();
                return b.add(this, c, HDESIGNER.J._func(d, e, a))
            }
        },
        ev_blur: function(a) {
            this.add_event(a, "blur", HDESIGNER.J.args(1))
        },
        ev_change: function(a) {
            this.add_event(a, "change", HDESIGNER.J.args(1))
        },
        ev_click: function(a) {
            this.add_event(a, "click", HDESIGNER.J.args(1))
        },
        ev_rclick: function(a) {
            this.add_event(a, "contextmenu", HDESIGNER.J.args(1))
        },
        ev_dblclick: function(a) {
            this.add_event(a, "dblclick", HDESIGNER.J.args(1))
        },
        ev_drag: function(a) {
            this.add_event(a, "drag", HDESIGNER.J.args(1))
        },
        ev_dragstart: function(a) {
            this.add_event(a, "dragstart", HDESIGNER.J.args(1))
        },
        ev_focus: function(a) {
            this.add_event(a, "focus", HDESIGNER.J.args(1))
        },
        ev_keydown: function(a) {
            this.add_event(a, "keydown", HDESIGNER.J.args(1))
        },
        ev_keypress: function(a) {
            this.add_event(a, "keypress", HDESIGNER.J.args(1))
        },
        ev_keyup: function(a) {
            this.add_event(a, "keyup", HDESIGNER.J.args(1))
        },
        ev_load: function(a) {
            this.add_event(a, "load", HDESIGNER.J.args(1))
        },
        ev_mousedown: function(a) {
            this.add_event(a, "mousedown", HDESIGNER.J.args(1))
        },
        ev_mousemove: function(a) {
            this.add_event(a, "mousemove", HDESIGNER.J.args(1))
        },
        ev_mouseout: function(a) {
            this.add_event(a, "mouseout", HDESIGNER.J.args(1))
        },
        ev_mouseover: function(a) {
            this.add_event(a, "mouseover", HDESIGNER.J.args(1))
        },
        ev_mouseup: function(a) {
            this.add_event(a, "mouseup", HDESIGNER.J.args(1))
        },
        ev_paste: function(a) {
            this.add_event(a, "paste", HDESIGNER.J.args(1))
        },
        ev_ready: function(a) {
            this.add_event(a, "readystatechange", HDESIGNER.J.args(1))
        },
        ev_resize: function(a) {
            this.add_event(a, "resize", HDESIGNER.J.args(1))
        },
        ev_select: function(a) {
            this.add_event(a, "select", HDESIGNER.J.args(1))
        },
        ev_selectstart: function(a) {
            this.add_event(a, "selectstart", HDESIGNER.J.args(1))
        },
        ev_exit: function(a) {
            this.add_event(a, "unload", HDESIGNER.J.args(1))
        }
    }
});
HDESIGNER.D.extend({
    text: function(a) {
        return document.createTextNode(a)
    },
    tag: function(b, c, a) {
        var d = this.factory(b);
        d.css(c);
        d.att(a);
        return d
    },
    apply: function(a) {
        this.factory(a)
    },
    a: function(a, d, c) {
        var b = this.tag("a");
        b.href = a;
        b.target = (c) ? c : "_blank";
        return b.append((d) ? d : a)
    },
    br: function() {
        return this.tag("br")
    },
    hr: function() {
        return this.tag("hr")
    },
    button: function(d, b, a) {
        var c = this.tag("button", b, a);
        return c.append(d)
    },
    div: function(c, b, a) {
        var d = this.tag("div", b, a);
        return d.append(c)
    },
    iframe: function(e, c, a, b) {
        if (!b) {
            b = "_ifr"
        }
        var d = null;
        if (HDESIGNER.D.ie) {
            d = this.tag('<iframe name="' + b + '">', c, a)
        } else {
            d = this.tag("iframe", c, a);
            d.name = b
        }
        if (e) {
            d.src = e
        }
        d.frameBorder = 0;
        return d
    },
    img: function(d, b, a) {
        var c = this.tag("img", b, a);
        if (d) {
            c.src = d
        }
        return c
    },
    p: function(c, b, a) {
        var d = this.tag("p", b, a);
        return d.append(c)
    },
    span: function(c, b, a) {
        var d = this.tag("span", b, a);
        return d.append(c)
    },
    pre: function(c, b, a) {
        var d = this.tag("pre", b, a);
        return d.append(c)
    },
    xmp: function(c, b, a) {
        var d = this.tag("xmp", b, a);
        return d.append(c)
    },
    table: function(c, b, a) {
        var d = this.tag("table", b, a);
        return d.append(c)
    },
    colgroup: function(a) {
        var b = this.tag("colgroup");
        return b.append(a)
    },
    col: function(b, a) {
        var c = this.tag("col");
        if (b) {
            c.width = b + "px"
        }
        if (a) {
            c.bgColor = a
        }
        return c
    },
    thead: function(c, b, a) {
        var d = this.tag("thead", b, a);
        return d.append(c)
    },
    tbody: function(c, b, a) {
        var d = this.tag("tbody", b, a);
        return d.append(c)
    },
    tfoot: function(c, b, a) {
        var d = this.tag("tfoot", b, a);
        return d.append(c)
    },
    tr: function(c, b, a) {
        var d = this.tag("tr", b, a);
        return d.append(c)
    },
    th: function(c, b, a) {
        var d = this.tag("th", b, a);
        return d.append(c)
    },
    td: function(c, b, a) {
        var d = this.tag("td", b, a);
        return d.append(c)
    },
    fieldset: function(c, b, a) {
        var d = this.tag("fieldset", b, a);
        return d.append(c)
    },
    legend: function(d, b, a) {
        var c = this.tag("legend", b, a);
        return c.append(d)
    },
    li: function(c, b, a) {
        var d = this.tag("li", b, a);
        return d.append(c)
    },
    ul: function(c, b, a) {
        var d = this.tag("ul", b, a);
        return d.append(c)
    },
    form: function(b, a) {
        var c = null;
        if (HDESIGNER.D.ie) {
            c = this.tag('<form enctype="multipart/form-data">', a)
        } else {
            c = this.tag("form", a);
            c.setAttribute("enctype", "multipart/form-data")
        }
        if (b) {
            c.action = b
        }
        c.method = "post";
        return c
    },
    select: function(c, b, a) {
        var d = this.tag("select", b, a);
        return d.append(c)
    },
    optgroup: function(b, a) {
        var c = this.tag("optgroup");
        c.label = a;
        return c.append(b)
    },
    option: function(c, a) {
        var b = this.tag("option");
        b.value = (a) ? a : c;
        return b.append(c)
    },
    textarea: function(d, b, a) {
        var c = this.tag("textarea", b, a);
        if (d) {
            c.value = d
        }
        return c
    },
    embed: function(d, b, a) {
        var c = this.tag("embed", b, a);
        c.src = d;
        return c
    },
    music: function(b) {
        var a = this.tag("object");
        a.classid = "CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6";
        a.style.display = "none";
        a.settings.autoStart = false;
        a.settings.volume = 50;
        a.URL = b
    },
    canvas: function(b, a) {
        return this.tag("canvas", b, a)
    },
    script: function() {
        var b = this.tag("script");
        b.type = "text/javascript";
        var a = document.documentElement.firstChild;
        if (!a || a.tagName.uncaps() != "head") {
            return null
        }
        a.appendChild(b);
        return b
    },
    style: function() {
        var b = document.createElement("style");
        b.type = "text/css";
        var a = document.documentElement.firstChild;
        if (!a || a.tagName.uncaps() != "head") {
            return null
        }
        a.appendChild(b);
        if (!HDESIGNER.D.ie) {
            b.styleSheet = document.styleSheets[document.styleSheets.length - 1]
        }
        b.add = function(c, e) {
            var d = b.styleSheet;
            if (HDESIGNER.D.ie) {
                d.addRule(c, e)
            } else {
                d.insertRule(c + " {" + e + "}", d.cssRules.length)
            }
        };
        return b
    },
    input: {
        tag: function(f, c, a, b, d) {
            var e = null;
            if ((b || d) && HDESIGNER.D.ie) {
                var g = (d) ? "checked" : "";
                e = HDESIGNER.D.tag("<input name=" + b + " " + g + ">")
            } else {
                e = HDESIGNER.D.tag("input");
                if (b) {
                    e.name = b
                }
                if (d) {
                    e.checked = true
                }
            }
            e.type = f;
            e.css(c);
            e.att(a);
            return e
        },
        text: function(b, a, c) {
            var d = this.tag("text", b, a);
            if (c) {
                d.value = c
            }
            return d
        },
        password: function(b, a) {
            return this.tag("password", b, a)
        },
        button: function(c, b, a) {
            var d = this.tag("button", b, a);
            if (c) {
                d.value = c
            }
            return d
        },
        hidden: function(a, b) {
            var c = this.tag("hidden", null, null, a);
            if (b) {
                c.value = b
            }
            return c
        },
        submit: function(b, a) {
            return this.tag("submit", b, a)
        },
        reset: function(b, a) {
            return this.tag("reset", b, a)
        },
        file: function(a) {
            return this.tag("file", null, null, a)
        },
        radio: function(c, a) {
            var b = this.tag("radio", null, null, c, a);
            b.name = c;
            if (a) {
                b.checked = true
            }
            return b
        },
        checkbox: function(a) {
            var b = this.tag("checkbox", null, null, null, a);
            if (a) {
                b.checked = true
            }
            return b
        }
    }
});
HDESIGNER.D.extend({
    appName: window.navigator.appName,
    appVersion: window.navigator.appVersion,
    appCodeName: window.navigator.appCodeName,
    userAgent: window.navigator.userAgent,
    protocol: window.location.protocol,
    host: window.location.host,
    port: window.location.port,
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    search: window.location.search,
    href: window.location.href,
    path: window.location.protocol + "//" + window.location.host + window.location.pathname,
    hash: function() {
        var b = window.location.hash;
        if (b) {
            b = b.sub(1)
        }
        if (!b) {
            return ""
        }
        try {
            b = HDESIGNER.J.utf(b, true)
        } catch (a) {}
        return b
    },
    screen: {
        height: null,
        width: null,
        availHeight: null,
        availWidth: null
    },
    check_top: function() {
        if (window.top == window) {
            return
        }
        window.location.href = "about:blank";
        window.top.location.href = "about:blank";
        throw null
    },
    check_frame: function(a) {
        if (window.top == window) {
            window.location.href = "about:blank";
            throw null
        }
        if (a && (window.top.location.href != a)) {
            window.location.href = "about:blank";
            window.top.location.href = "about:blank";
            throw null
        }
    },
    go: function(a) {
        window.location.href = a
    },
    reload: function() {
        window.location.reload()
    },
    byId: function(b) {
        var a = document.getElementById(b);
        if (a) {
            HDESIGNER.D.apply(a)
        }
        return a
    },
    write: function() {
        for (var a = 0; a < arguments.length; a++) {
            var b = arguments[a];
            if (HDESIGNER.J.isnode(b)) {
                document.body.appendChild(b)
            } else {
                document.body.appendChild(HDESIGNER.D.text(b))
            }
        }
    },
    writeln: function(c, b, a) {
        document.body.appendChild(HDESIGNER.D.div(c, b, a))
    },
    ready: function(e) {
        if (!e) {
            return null
        }
        var h = e;
        var f = HDESIGNER.J.args(1);
        if (f.length) {
            var g = f.shift();
            h = HDESIGNER.J._func(e, g, f)
        }
        if (document.readyState == "complete") {
            h()
        } else {
            D.event.add(window, "load", function(a) {
                h()
            })
        }
    },
    timeout: function(c, b) {
        if (!c) {
            return null
        }
        var d = c;
        var a = HDESIGNER.J.args(2);
        if (a.length) {
            var e = a.shift();
            d = HDESIGNER.J._func(c, e, a)
        }
        if (HDESIGNER.D.firefox) {
            return window.setTimeout(function() {
                d()
            }, b)
        } else {
            return window.setTimeout(d, b)
        }
    },
    timeoff: function(b) {
        try {
            window.clearTimeout(b)
        } catch (a) {}
    },
    view: {
        client: null,
        size: function() {
            var a = HDESIGNER.D;
            if (!this.client) {
                this.client = a.div(null, {
                    wp: 100,
                    hp: 100,
                    z: -999,
                    ps: 2,
                    pos: [0, 0]
                });
                a.write(this.client)
            }
            return a.size(this.client)
        },
        ext: function() {
            var b = HDESIGNER.J;
            var a = document.body;
            var d = b.Size(a.scrollWidth, a.scrollHeight);
            var c = this.size();
            return b.Size(Math.max(d.w, c.w), Math.max(d.h, c.h))
        },
        org: function() {
            var a = document.body;
            if (HDESIGNER.D.chrome || HDESIGNER.D.safari) {
                a = document.body
            }
            return HDESIGNER.J.Point(a.scrollLeft, a.scrollTop)
        }
    },
    size: function(a) {
        return HDESIGNER.J.Size(a.offsetWidth, a.offsetHeight)
    },
    ext: function(a) {
        return HDESIGNER.J.Size(a.scrollWidth, a.scrollHeight)
    },
    org: function(e) {
        var d = J.Point();
        var a = document.body;
        var b = document.documentElement;
        for (var c = e; c; c = c.offsetParent) {
            d.add(c.offsetLeft, c.offsetTop);
            if (c == e) {} else {
                if (c == a || c == b) {} else {
                    d.add(-c.scrollLeft, -c.scrollTop)
                }
            }
        }
        return d
    }
});
HDESIGNER.D.event.extend({
    count: 0,
    pool: {},
    add: function(e, b, c) {
        var d = c;
        var a = HDESIGNER.J.args(3);
        if (a.length) {
            var h = a.shift();
            d = HDESIGNER.J._func(c, h, a)
        }
        var g = function(i) {
            var f = HDESIGNER.D.event.ctrl(i);
            HDESIGNER.J.call(d, null, f)
        };
        if (HDESIGNER.D.ie) {
            e.attachEvent("on" + b, g)
        } else {
            e.addEventListener(b, g, false)
        }
        this.pool[++this.count] = {
            obj: e,
            event: b,
            func: g
        };
        return this.count
    },
    free: function(f) {
        if (!f) {
            return
        }
        if (!HDESIGNER.J.isarr(f)) {
            f = [f]
        }
        for (var b = 0; b < f.length; b++) {
            var a = f[b];
            var c = this.pool[a];
            if (!c) {
                continue
            }
            try {
                if (HDESIGNER.D.ie) {
                    c.obj.detachEvent("on" + d.event, d.func)
                } else {
                    c.obj.removeEventListener(d.event, d.func, false)
                }
            } catch (d) {}
            delete this.pool[a]
        }
    },
    prevent: function(d, b) {
        if (!b) {
            return
        }
        if (!HDESIGNER.J.isarr(b)) {
            b = [b]
        }
        var c = function(f) {
            f = HDESIGNER.D.event.ctrl(f);
            f.prevent()
        };
        for (var a = 0; a < b.length; a++) {
            this.add(d, b[a], c)
        }
    },
    ctrl: HDESIGNER.object({
        create: function(d) {
            var c = HDESIGNER.D;
            var f = c.ie;
            var a = c.firefox;
            if (f) {
                d = window.event
            }
            var g = c.view.org();
            var b = (f) ? d.srcElement : d.target;
            return {
                e: d,
                obj: b,
                x: (f) ? d.clientX + g.x : d.pageX,
                y: (f) ? d.clientY + g.y : d.pageY,
                offx: (a) ? d.layerX - b.offsetLeft : d.offsetX,
                offy: (a) ? d.layerY - b.offsetTop : d.offsetY,
                viewx: (f) ? d.clientX : d.pageX - g.x,
                viewy: (f) ? d.clientY : d.pageY - g.y,
                button: (f && d.button == 1) ? 0 : d.button,
                key: (f) ? d.keyCode : d.which,
                alt: d.altKey,
                ctrl: d.ctrlKey,
                shift: d.shiftKey
            }
        },
        prevent: function() {
            if (HDESIGNER.D.ie) {
                this.e.returnValue = false
            } else {
                this.e.preventDefault()
            }
        },
        cancel: function() {
            if (HDESIGNER.D.ie) {
                this.e.cancelBubble = true
            } else {
                this.e.stopPropagation()
            }
        }
    })
});
HDESIGNER.D.cookie.extend({
    write: function(c, e, h, g, d, f) {
        var b = new Date();
        var a = new Date(b.getTime() + 3600000 * h);
        a = (a) ? "; expires=" + a.toGMTString() : "";
        g = (g) ? "; path=" + g : "";
        d = (d) ? "; domain=" + d : "";
        f = (f) ? "; secure" : "";
        document.cookie = c + "=" + escape(e) + a + g + d + f
    },
    read: function(b) {
        var d = document.cookie.split("; ");
        for (var c = 0; c < d.length; c++) {
            var a = d[c].split("=");
            if (b == a[0]) {
                return unescape(a[1])
            }
        }
        return ""
    },
    del: function(c) {
        var b = new Date();
        var a = new Date(b.getTime() - 3600000);
        if (this.read(c)) {
            this.write(c, "", a)
        }
    },
    lastmodified: function() {
        var a = new Date(document.lastModified);
        if (a == this.read("lastmodified")) {
            return "This page has NOT changed since your last visit."
        } else {
            this.write("lastmodified", a, 120);
            return "This page has changed since your last visit."
        }
    }
});
HDESIGNER.D.object({
    ajax: {
        create: function(b, d) {
            var a = HDESIGNER.J.args(2);
            var c = a.length ? a.shift() : null;
            return {
                query: [],
                timeout: 10000,
                count: 1,
                cancel: false,
                complete: false,
                tid: null,
                url: b ? b : HDESIGNER.D.path,
                callback: d,
                _this: c,
                args: a,
                returnType: true
            }
        },
        add: function(a, b) {
            if (!a) {
                return false
            }
            b = HDESIGNER.J.utf(b);
            this.query.push(a + "=" + b)
        },
        send: function(a) {
            if (a) {
                this.count = 3
            }
            this.count--;
            this.ajax = HDESIGNER.D.xml.ajax();
            this.ajax.open("POST", this.url, true);
            this.ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.ajax.onreadystatechange = HDESIGNER.J.func(this._response, this);
            this.tid = HDESIGNER.D.timeout(this._abort, this.timeout, this);
            this.ajax.send(this.query.join("&"))
        },
        _abort: function() {
            if (this.count) {
                return this._retry()
            }
            this.cancel = true;
            if (this.complete) {
                return false
            }
            this.ajax.abort();
            HDESIGNER.J._call(this.callback, this._this, [null].concat(this.args))
        },
        _retry: function() {
            HDESIGNER.D.timeoff(this.tid);
            this.send()
        },
        _response: function() {
            if (this.ajax.readyState != 4 || this.ajax.status != 200) {
                return false
            }
            HDESIGNER.D.timeoff(this.tid);
            this.complete = true;
            if (this.cancel) {
                return false
            }
            if (!this.returnType) {
                HDESIGNER.J._call(this.callback, this._this, [this.ajax.responseText].concat(this.args))
            } else {
                var b = this.ajax.responseXML;
                var a = b ? b.documentElement : null;
                HDESIGNER.D.xml.clean(a);
                HDESIGNER.J._call(this.callback, this._this, [a].concat(this.args))
            }
        }
    }
});
HDESIGNER.D.xml.extend({
    ajax: function() {
        if (HDESIGNER.D.ie) {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } else {
            return new XMLHttpRequest()
        }
    },
    load: function(b) {
        if (!b) {
            return null
        }
        var a = null;
        if (HDESIGNER.D.chrome || HDESIGNER.D.safari) {
            var d = this.ajax();
            d.open("GET", b, false);
            d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            d.send(null);
            a = this.parser(d.responseText);
            if (a) {
                a = a.documentElement;
                this.clean(a);
                return a
            } else {
                return null
            }
        } else {
            var c = this.createDocument();
            c.async = false;
            c.load(b);
            a = c.documentElement;
            this.clean(a);
            return a
        }
    },
    createDocument: function() {
        if (HDESIGNER.D.ie) {
            return new ActiveXObject("Msxml2.DOMDocument.3.0")
        } else {
            return self.document.implementation.createDocument("", "", null)
        }
    },
    parser: function(a) {
        if (HDESIGNER.D.ie) {
            var c = new ActiveXObject("Msxml2.DOMDocument.3.0");
            c.validateOnParse = false;
            c.loadXML(a);
            return c
        } else {
            var b = new DOMParser();
            return b.parseFromString(a, "text/xml")
        }
    },
    clean: function(a) {
        if (a == null) {
            return null
        }
        HDESIGNER.J.step(a, function(b, c) {
            if (b.nodeType == 3 && !/\S/.test(b.nodeValue)) {
                c.removeChild(b)
            } else {
                if (b.nodeType == 1) {
                    this.clean(b)
                }
            }
        }, this, a);
        return a
    },
    ctrl: HDESIGNER.object({
        create: function(a) {
            return {
                node: a
            }
        },
        is: function(a) {
            if (!a) {
                return this.node.nodeName
            }
            if (this.node.nodeName == a) {
                return true
            } else {
                return false
            }
        },
        root: function() {
            return this.node.documentElement
        },
        owner: function() {
            return this.node.ownerDocument
        },
        nn: function(c) {
            var b = this.node.childNodes;
            var a = b.length;
            for (var d = 0; d < a; d++) {
                if (b[d].nodeName == c) {
                    return b[d]
                }
            }
            return null
        },
        nt: function(a) {
            var b = this.nn(a);
            if (b) {
                if (b.nodeValue) {
                    return b.nodeValue
                } else {
                    if (b.firstChild) {
                        return b.firstChild.nodeValue
                    }
                }
            }
            return ""
        },
        att: function(a) {
            return this.node.getAttribute(a)
        },
        val: function() {
            if (this.node.nodeValue) {
                return this.node.nodeValue
            } else {
                if (this.node.firstChild) {
                    return this.node.firstChild.nodeValue
                } else {
                    return ""
                }
            }
        },
        xpath: function(b) {
            if (HDESIGNER.D.ie) {
                return this.node.selectSingleNode(b)
            } else {
                var a = this.owner().evaluate(b, this.node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                if (a) {
                    return a.singleNodeValue
                } else {
                    return null
                }
            }
        },
        next: function() {
            var a = this.node.nextSibling;
            if (a) {
                this.node = a;
                return true
            }
            return false
        },
        prev: function() {
            var a = this.node.previousSibling;
            if (a) {
                this.node = a;
                return true
            }
            return false
        },
        pnode: function() {
            var a = this.node.parentNode;
            if (a) {
                this.node = a;
                return true
            }
            return false
        },
        vnode: function(c) {
            var b = this.node.childNodes;
            var a = b.length;
            if (c < 0) {
                c += a
            }
            if (c < 0 || c >= a) {
                return false
            }
            this.node = b[c];
            return true
        }
    })
});
HDESIGNER.Q.pack({
    cloud: null,
    winctrl: null,
    picker: null,
    ui: null
});
HDESIGNER.Q.extend({
    focus: function(b, a) {
        HDESIGNER.D.timeout(function() {
            try {
                b.focus();
                if (a && b.value) {
                    b.select();
                    if (D.ie) {
                        var d = b.createTextRange();
                        d.collapse(false);
                        d.select()
                    } else {
                        var c = b.value.length;
                        b.setSelectionRange(c, c)
                    }
                }
            } catch (f) {}
        }, 50)
    },
    text: function(b) {
        if (!b) {
            b = ""
        }
        var a = b.split("\n");
        var e = [];
        for (var c = 0; c < a.length; c++) {
            if (c > 0) {
                e.push(HDESIGNER.D.br())
            }
            var f = a[c];
            if (f) {
                f = f.replace(/^ /g, "&nbsp;");
                f = f.replace(/\t/g, "&nbsp; &nbsp; ");
                f = f.replace(/  /g, " &nbsp;");
                var d = HDESIGNER.D.span("");
                d.innerHTML = f;
                e.push(d)
            }
        }
        return e
    },
    button: function(c, a) {
        var b = HDESIGNER.D.input.button(c);
        b.css({
            f: [9, 1, 0],
            p: [1, 0, 1, 0]
        });
        b.css(a);
        return b
    }
});
HDESIGNER.Q.object({
    table: {
        create: function(b, g, e, a) {
            var c = HDESIGNER.D.colgroup();
            var d = HDESIGNER.D.tbody();
            var f = HDESIGNER.D.table([c, d], e, a);
            HDESIGNER.J.step(b, function(h) {
                c.append(HDESIGNER.D.col())
            });
            HDESIGNER.J.step(g, function(h) {
                var j = HDESIGNER.D.tr();
                HDESIGNER.J.step(b, function() {
                    j.append(HDESIGNER.D.td())
                });
                d.append(j)
            });
            f.cols = b;
            return f
        },
        fillblank: function() {
            HDESIGNER.J.step(this.tbody(), function(a) {
                HDESIGNER.J.step(a, function(b) {
                    b.append("　")
                })
            })
        },
        set_width: function(d) {
            var a = HDESIGNER.J.isarr(d);
            var c = 0;
            HDESIGNER.J.step(this.colgroup(), function(e) {
                var b = a ? d[c++] : d;
                e.width = b
            })
        },
        set_height: function(c) {
            var a = HDESIGNER.J.isarr(c);
            var d = 0;
            HDESIGNER.J.step(this.tbody(), function(e) {
                var b = a ? c[d++] : c;
                e.att({
                    h: b
                })
            })
        },
        set_bk: function(c) {
            var a = HDESIGNER.J.isarr(c);
            var d = 0;
            HDESIGNER.J.step(this.colgroup(), function(b) {
                var e = a ? c[d++] : c;
                b.css({
                    bk: e
                })
            })
        },
        set_grid: function(a) {
            this.att({
                grid: a
            });
            this.css({
                grid: true
            })
        },
        colgroup: function() {
            return this.vnode(0)
        },
        tbody: function() {
            return this.vnode(1)
        },
        row: function(a) {
            return this.vnode(1, a)
        },
        cell: function(b, a) {
            return this.vnode(1, b, a)
        },
        add_row: function(c) {
            if (!c) {
                c = 1
            }
            var b = this.cols;
            var a = this.tbody();
            HDESIGNER.J.step(c, function() {
                var d = HDESIGNER.D.tr();
                HDESIGNER.J.step(b, function() {
                    d.append(HDESIGNER.D.td())
                });
                a.append(d)
            })
        },
        rem_row: function(a) {
            this.tbody().vnode(a).remove()
        },
        swap_row: function(b, a) {
            var d = this.tbody().vnode(b).cloneNode();
            var c = this.tbody().vnode(a).cloneNode();
            this.tbody().replaceChild(this.tbody().vnode(a), d);
            this.tbody().replaceChild(this.tbody().vnode(b), c)
        },
        rem_all_row: function() {
            this.tbody().empty()
        },
        bind: function(a, d) {
            if (!HDESIGNER.J.isnum(d)) {
                d = -1
            }
            var b = this.tbody();
            if (d < 0) {
                this.add_row(1)
            } else {
                var c = d - b.len();
                if (c > 0) {
                    this.add_row(c)
                }
            }
            HDESIGNER.J.step(a.length, function(e) {
                b.vnode(d, e).empty();
                b.vnode(d, e).append(a[e])
            })
        }
    }
});
window.J = HDESIGNER.J;
window.D = HDESIGNER.D;
window.Q = HDESIGNER.Q;
var HD = {};
HDESIGNER.apply(HD);