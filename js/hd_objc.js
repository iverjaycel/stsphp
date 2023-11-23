HD.object({
    autocomplete: {
        create: function() {
            return {
                auto_path: "auto_complete.php",
                layer: null,
                index: null,
                orgword: null,
                rstword: null,
                target: null,
                oldword: null,
                fillword: null,
                boxstyle: "background:",
                itemstyle: "",
                hiltestyle: "background:blue",
                nonestyle: "background:",
                maxnum: 10,
                call_cnt: 0
            }
        },
        init: function(a) {
            D.ready(function() {
                if (!a.id) {
                    return
                }
                this.target = D.byId(a.id);
                if (!this.target) {
                    return
                }
                if (a.boxstyle) {
                    this.boxstyle = a.boxstyle
                }
                if (a.itemstyle) {
                    this.itemstyle = a.itemstyle
                }
                if (a.hiltestyle) {
                    this.hiltestyle = a.hiltestyle
                }
                if (a.nonestyle) {
                    this.nonestyle = a.nonestyle
                }
                if (a.maxnum) {
                    this.maxnum = a.maxnum
                }
                this.layer_init();
                this.moniter()
            }, this)
        },
        layer_init: function() {
            if (this.layer) {
                return
            }
            var b = D.org(this.target);
            var a = D.size(this.target);
            this.layer = D.div(null, {
                w: a.w,
                ps: 2,
                pos: [b.x, b.y + a.h],
                ov: [2, 1],
                op: 0.9,
                z: 6
            });
            this.layer.css(this.boxstyle);
            D.write(this.layer);
            this.layer_off()
        },
        layer_off: function() {
            this.index = -1;
            this.layer.visible(false);
            this.layer.empty()
        },
        layer_on: function() {
            this.index = -1;
            var b = D.org(this.target);
            var a = D.size(this.target);
            this.layer.css({
                pos: [b.x, b.y + a.h],
                z: 6
            });
            this.layer.visible(true);
            this.rstword = this.target.value
        },
        moniter: function() {
            this.target.ev_keydown(function(a) {
                if (a.key == 40) {
                    this.action_downkey()
                } else {
                    if (a.key == 38) {
                        this.action_upkey()
                    } else {
                        if (a.key == 13) {
                            this.action_selkey()
                        } else {
                            if (a.key == 8) {
                                this.action_bskey()
                            } else {
                                if (a.key == 27) {
                                    this.action_esckey()
                                } else {
                                    if (D.ie) {
                                        D.timeout(this.action_etckey, 200, this)
                                    }
                                }
                            }
                        }
                    }
                }
            }, this);
            if (!D.ie) {
                D.timeout(this.action_etckey2, 200, this)
            }
            D.event.add(document, "click", function(a) {
                if (a.obj == this.target) {
                    return this.search()
                } else {
                    if (this.layer.len()) {
                        this.target.value = this.rstword;
                        this.layer_off()
                    }
                }
            }, this);
            D.event.add(window, "resize", function(c) {
                var b = D.org(this.target);
                var a = D.size(this.target);
                this.layer.css({
                    pos: [b.x, b.y + a.h]
                })
            }, this)
        },
        action_downkey: function(c) {
            var a = this.layer.len();
            if (!a) {
                return this.search()
            }
            var b = this.index + 1;
            if (b >= a) {
                this.target.value = this.rstword;
                return this.layer_off()
            } else {
                if (this.index >= 0) {
                    this.layer.vnode(this.index).css(this.nonestyle)
                }
                this.layer.vnode(b).css(this.hiltestyle);
                this.index++;
                this.word_fill()
            }
        },
        action_upkey: function() {
            var a = this.layer.len();
            if (!a) {
                return this.search()
            }
            if (this.index >= 0) {
                this.layer.vnode(this.index).css(this.nonestyle)
            }
            var b = this.index - 1;
            if (b < 0) {
                this.target.value = this.rstword;
                return this.layer_off()
            } else {
                this.layer.vnode(b).css(this.hiltestyle);
                this.index--;
                this.word_fill()
            }
        },
        action_selkey: function() {
            var a = this.target.value;
            if (!a) {
                return
            }
            var b = this.target.form;
            if (!b) {
                return
            }
            b.submit()
        },
        action_bskey: function() {
            D.timeout(this.action_etckey, 50, this)
        },
        action_esckey: function() {},
        action_etckey: function() {
            var a = this.target.value;
            if (a == this.orgword) {
                return
            }
            this.orgword = a;
            if (J.chk.len(a, 2, 1000, true)) {
                this.word_complete(a)
            } else {
                this.layer_off()
            }
        },
        action_etckey2: function() {
            var a = this.target.value;
            D.timeout(this.action_etckey2, 200, this);
            if (a == this.oldword) {
                return
            }
            this.oldword = a;
            if (a == this.orgword) {
                return
            }
            this.orgword = a;
            if (a == this.fillword) {
                return
            }
            this.fillword = null;
            if (J.chk.len(a, 2, 1000, true)) {
                this.word_complete(a)
            } else {
                this.layer_off()
            }
        },
        search: function() {
            var a = this.target.value;
            this.orgword = a;
            if (J.chk.len(a, 2, 1000, true)) {
                this.word_complete(a)
            }
        },
        word_fill: function() {
            var a = this.layer.vnode(this.index).textval();
            this.target.value = a;
            this.fillword = a
        },
        word_complete: function(a) {
            this.layer_off();
            var b = D.ajax(this.auto_path, this.rs_word_complete, this);
            b.add("cmd", "help");
            b.add("word", a);
            b.add("max", this.maxnum);
            b.send()
        },
        rs_word_complete: function(b) {
            this.layer_off();
            if (!b) {
                return
            }
            var c = 0;
            for (var d = b.firstChild; d; d = d.nextSibling) {
                var a = D.xml.ctrl(d);
                if (a.is("s")) {
                    c++;
                    var e = D.div(a.val(), {
                        ws: 1,
                        ov: 2,
                        tov: 1,
                        cs: 1
                    });
                    e.css(this.itemstyle);
                    this.layer.write(e);
                    e.ev_mouseover(function(g, f) {
                        f.css(this.hiltestyle)
                    }, this, e);
                    e.ev_mouseout(function(g, f) {
                        f.css(this.nonestyle)
                    }, this, e);
                    e.ev_mousedown(function(h, g) {
                        this.target.value = g.textval();
                        var f = this.target.form;
                        if (f) {
                            f.submit()
                        }
                    }, this, e)
                } else {
                    if (a.is("d")) {
                        c++;
                        this.layer.writeln(a.val(), {
                            fw: 1
                        })
                    }
                }
            }
            if (c) {
                this.layer_on()
            }
        }
    }
});
HD.calendar = {};
HDESIGNER.apply(HD.calendar);
HD.calendar.extend({
    z: null,
    yinfo: null,
    minfo: null,
    table: null,
    cells: [],
    key: "calendar",
    view: null,
    target: null,
    pattern: "",
    init: function() {
        D.event.add(document, "click", this.hide, this)
    },
    add: function(c, a) {
        var b = c;
        if (J.isobj(b)) {
            D.apply(b)
        } else {
            b = D.byId(c)
        }
        if (!b) {
            return
        }
        b.pattern = a;
        b.ev_click(this.show, this, b)
    },
    show: function(b, a) {
        if (!this.view) {
            this.view = D.div(null, {
                w: 162,
                h: 158,
                b: [1, 1, "gray"],
                p: 3,
                ps: 2,
                z: 10,
                f: 9,
                bk: "white"
            });
            D.write(this.view);
            this.view.ev_click(function(c) {
                c.cancel()
            });
            this.open(b, a)
        } else {
            if (this.view.style.display == "none") {
                this.open(b, a);
                this.view.style.display = "block"
            } else {
                this.view.style.display = "none"
            }
        }
        b.cancel()
    },
    get_state: function() {
        if (!this.view) {
            return false
        }
        if (this.view.style.display == "none") {
            return false
        }
        return true
    },
    set_state: function(a) {
        if (!this.view) {
            return
        }
        if (a) {
            this.view.style.display = ""
        } else {
            this.view.style.display = "none"
        }
    },
    hide: function(b, a) {
        if (this.view) {
            this.view.style.display = "none"
        }
    },
    open: function(d, c) {
        var f = D.org(d.obj);
        var b = D.size(d.obj);
        this.view.css({
            pos: [f.x, f.y + b.h + 2]
        });
        this.target = c;
        var a = this.strtoDate(this.target.pattern);
        this.pattern = a.pat;
        var a = this.strtoDate(this.target.value);
        this.drawinfo();
        this.drawtable();
        if (a.y && a.m && a.d) {
            this.z = J.Date(a.y, a.m, a.d)
        } else {
            this.z = J.Date()
        }
        this.refresh()
    },
    strtoDate: function(e) {
        if (!e) {
            e = ""
        }
        var b = e.match(/[0-9]+/g);
        e = e.replace(/[0-9]+/, "Y");
        e = e.replace(/[0-9]+/, "M");
        e = e.replace(/[0-9]+/, "D");
        if (!e.match(/M/) || !e.match(/D/)) {
            e = e.replace("Y", "YMD")
        }
        if (!b) {
            return {
                y: 0,
                m: 0,
                d: 0,
                pat: "YMD"
            }
        }
        if (b.length == 3) {
            return {
                y: b[0] * 1,
                m: b[1] * 1,
                d: b[2] * 1,
                pat: e
            }
        } else {
            if (b.length == 1) {
                var f = e.sub(0, 4);
                var a = e.sub(4, 6);
                var c = e.sub(6, 8);
                return {
                    y: f * 1,
                    m: a * 1,
                    d: c * 1,
                    pat: e
                }
            } else {
                return {
                    y: 0,
                    m: 0,
                    d: 0,
                    pat: "YMD"
                }
            }
        }
    },
    close: function() {
        var a = this.z.month;
        var c = this.z.day;
        if (a < 10) {
            a = "0" + a
        }
        if (c < 10) {
            c = "0" + c
        }
        var b = this.pattern;
        b = b.replace(/Y/, this.z.year);
        b = b.replace(/M/, a);
        b = b.replace(/D/, c);
        this.target.value = b;
        this.view.showing(false)
    },
    drawinfo: function() {
        this.view.empty();
        var f = D.div(null, {
            w: 160,
            ta: 2,
            f: 9
        });
        this.view.write(f);
        var e = D.span("0000년", {
            c: "green"
        });
        var a = D.span("00월", {
            c: "green",
            m: [5]
        });
        var g = Q.button("◀", {
            b: [0, 0, "transparent"],
            m: [, , 5],
            f: 10,
            fontFamily: "Gulim",
            bk: "transparent"
        });
        var d = Q.button("◁", {
            b: [0, 0, "transparent"],
            m: [, , 5],
            f: 10,
            fontFamily: "Gulim",
            bk: "transparent"
        });
        var c = Q.button("▷", {
            b: [0, 0, "transparent"],
            m: [5],
            f: 10,
            fontFamily: "Gulim",
            bk: "transparent"
        });
        var b = Q.button("▶", {
            b: [0, 0, "transparent"],
            m: [5],
            f: 10,
            fontFamily: "Gulim",
            bk: "transparent"
        });
        f.write(g, d, e, a, c, b);
        this.yinfo = e;
        this.minfo = a;
        d.ev_click(this.go_prev, this);
        c.ev_click(this.go_next, this);
        g.ev_click(this.go_prev_year, this);
        b.ev_click(this.go_next_year, this)
    },
    go_prev: function(a) {
        this.z.movemonth(-1);
        this.refresh()
    },
    go_next: function(a) {
        this.z.movemonth(1);
        this.refresh()
    },
    go_prev_year: function(a) {
        this.z.moveyear(-1);
        this.refresh()
    },
    go_next_year: function(a) {
        this.z.moveyear(1);
        this.refresh()
    },
    drawtable: function() {
        var a = Q.table(7, 0);
        a.set_width(22);
        a.set_grid("lightgrey");
        a.bind(["일", "월", "화", "수", "목", "금", "토"]);
        a.row(0).css({
            ta: 2,
            f: 9,
            bk: "whitesmoke"
        });
        a.cell(0, 0).css({
            c: "red"
        });
        a.cell(0, 6).css({
            c: "dodgerblue"
        });
        a.css({
            borderCollapse: "collapse"
        });
        a.att({
            cp: 0,
            cs: 0
        });
        this.view.write(a);
        this.table = a
    },
    chinfo: function() {
        var a = this.z;
        this.yinfo.textval(a.year + "년");
        this.minfo.textval(a.month + "월")
    },
    refresh: function() {
        this.chinfo();
        this.chtable()
    },
    chtable: function() {
        var r = this.table;
        J.step(r.tbody().len() - 1, function(j) {
            r.row(1).remove()
        });
        var d = J.Date(this.z.year, this.z.month, 1);
        var b = -d.weekday + 1;
        var e = d.endday(d.year, d.month);
        this.cells = [];
        var c = new Date();
        var a = c.getFullYear();
        var k = c.getMonth() + 1;
        var q = c.getDate();
        var n = false;
        if (a == this.z.year && k == this.z.month) {
            n = true
        }
        for (var g = b; g <= e; g += 7) {
            var h = [];
            for (var f = g; f < g + 7; f++) {
                var o = D.div(null, {
                    b: [1, 1, "white"],
                    cs: 1
                });
                var p = D.div(null, {
                    ta: 1
                });
                o.write(p);
                if (f < 1 || f > e) {
                    p.write(" ")
                } else {
                    p.write(f);
                    if ((f - g) % 7 == 6) {
                        p.css({
                            c: "dodgerblue"
                        })
                    }
                    d.calcluna();
                    if (d.isred()) {
                        p.css({
                            c: "red"
                        })
                    }
                    var m = (d.luna.yun) ? "윤" : "";
                    var l = m + d.luna.month + "." + d.luna.day;
                    p.title = "음 " + l;
                    if (f == q && n) {
                        o.css({
                            bc: "magenta"
                        })
                    }
                    this.cells.push(o);
                    o.ev_click(this.select, this, f);
                    d.moveday(1)
                }
                h.push(o)
            }
            this.table.bind(h)
        }
    },
    select: function(b, a) {
        this.z.modify(null, null, a);
        this.close()
    }
});
D.ready(function() {
    HD.calendar.init()
});
HD.colorpicker = {};
HDESIGNER.apply(HD.colorpicker);
HD.colorpicker.extend({
    view: null,
    target: null,
    init: function() {
        D.event.add(document, "click", this.hide, this)
    },
    add: function(b) {
        var a = D.byId(b);
        if (!a) {
            return
        }
        a.ev_click(this.show, this, a)
    },
    show: function(b, a) {
        if (!this.view) {
            this.view = D.div(null, {
                w: 80,
                h: 59,
                b: [1, 1, "gray"],
                p: 2,
                ps: 2,
                z: 10,
                f: 9,
                bk: "white"
            });
            D.write(this.view);
            this.view.ev_click(function(c) {
                c.cancel()
            });
            this.open(b, a)
        } else {
            if (this.view.style.display == "none") {
                this.open(b, a);
                this.view.style.display = "block"
            } else {
                this.view.style.display = "none"
            }
        }
        b.cancel()
    },
    get_state: function() {
        if (!this.view) {
            return false
        }
        if (this.view.style.display == "none") {
            return false
        }
        return true
    },
    set_state: function(a) {
        if (!this.view) {
            return
        }
        if (a) {
            this.view.style.display = ""
        } else {
            this.view.style.display = "none"
        }
    },
    hide: function(b, a) {
        if (this.view) {
            this.view.style.display = "none"
        }
    },
    open: function(c, b) {
        var d = D.org(c.obj);
        var a = D.size(c.obj);
        this.view.css({
            pos: [d.x, d.y + a.h + 2]
        });
        this.target = b;
        this.drawtable()
    },
    close: function(a) {
        try {
            this.target.value = a;
            this.target.style.background = a
        } catch (b) {}
        this.view.showing(false)
    },
    drawtable: function() {
        var g = 2;
        var h = 4;
        var f = Q.table(h, g);
        f.set_width(20);
        f.set_height(20);
        f.set_grid("lightgrey");
        var b = [
            ["#ffebeb", "#fff2c6", "#c9ffa2", "#91ffe4"],
            ["#a8e7ff", "#d8cdff", "#fed4ff", "#e7e7e7"]
        ];
        for (var e = 0; e < g; e++) {
            for (var c = 0; c < h; c++) {
                var a = f.cell(e, c);
                a.css({
                    bk: b[e][c],
                    cs: 1
                });
                a.ev_click(this.select, this, b[e][c])
            }
        }
        this.view.empty();
        var d = D.div("none", {
            h: 15,
            fontSize: "11px",
            b: [1, 1, "gray"],
            m: [, , , 1],
            ta: 2,
            cs: 1
        });
        d.ev_click(this.select, this, "");
        this.view.write(d);
        this.view.write(f)
    },
    select: function(b, a) {
        this.close(a)
    }
});
D.ready(function() {
    HD.colorpicker.init()
});
HD.pack({
    drag: {}
});
HD.drag.extend({
    selected: null,
    handle: null,
    offset: J.Point(0, 0),
    top_z: 999,
    init_on: false,
    init: function() {
        D.ready(function() {
            D.event.add(document, "mouseup", this.dragend, this);
            D.event.add(window, "blur", this.dragend, this);
            this.init_on = true
        }, this)
    },
    add: function(e) {
        var d = D.byId(e);
        if (!d) {
            return
        }
        var b = D.byId(e + "_handle");
        if (!b) {
            return
        }
        var c = J.Point();
        for (var a = b; a && a != d; a = a.offsetParent) {
            c.add(a.offsetLeft, a.offsetTop)
        }
        if (a != d) {
            return
        }
        d.dragoffset = c;
        b.setAttribute("unselectable", "on");
        b.onmousedown = function() {
            return false
        };
        b.ev_mousedown(this.dragstart, this, d, b);
        d.ev_mousemove(this.drag, this)
    },
    dragstart: function(c, b, a) {
        if (!this.init_on) {
            return
        }
        if (c.obj != a) {
            return
        }
        if (this.handle) {
            try {
                this.handle.css({
                    cs: 2
                })
            } catch (c) {}
        }
        a.css({
            cs: 3
        });
        this.selected = b;
        b.css({
            z: this.top_z++
        });
        this.handle = a;
        this.org = D.org(b.offsetParent);
        this.offset = J.Point(c.offx, c.offy)
    },
    dragend: function(a) {
        if (!this.init_on) {
            return
        }
        if (this.handle) {
            try {
                this.handle.css({
                    cs: 2
                })
            } catch (a) {}
        }
        this.selected = null;
        this.handle = null;
        this.offset = J.Point(0, 0)
    },
    drag: function(c) {
        if (!this.init_on) {
            return
        }
        var b = this.selected;
        if (!b) {
            return
        }
        var a = c.x - b.dragoffset.x - this.offset.x - this.org.x;
        var d = c.y - b.dragoffset.y - this.offset.y - this.org.y - 3;
        b.style.left = a + "px";
        b.style.top = d + "px"
    },
    close: function(b) {
        var a = D.byId(b);
        if (!a) {
            return
        }
        if (this.selected && this.selected == a) {
            this.selected = null
        }
        a.showing(false)
    }
});
HD.drag.init();
HD.DropDown = {
    arrow_img1: "▼",
    init: function(a) {
        D.ready(function() {
            this.customize_all(a)
        }, this)
    },
    customize_all: function(a) {
        var c = document.getElementsByTagName("SELECT");
        for (var b = 0; b < c.length; b++) {
            if (c[b].className == a) {
                this.customize(c[b])
            }
        }
    },
    customize: function(b) {
        var k = [];
        for (var c = 0; c < b.options.length; c++) {
            k[c] = b.options[c].innerHTML
        }
        var g = b.parentNode;
        var h = D.span(null, {});
        h.innerHTML = k[b.selectedIndex];
        var j = D.span(null, {
            fl: 1
        });
        j.innerHTML = this.arrow_img1;
        var f = D.div([j, h], {
            w: g.offsetWidth,
            b: [1, 1, "green"],
            ws: 1,
            cs: 1
        });
        f.css(b.style.cssText);
        var e = b.getAttribute("add_style");
        f.css(e);
        f.label = h;
        var d = D.div(null, {
            ps: 2,
            w: g.offsetWidth,
            b: [1, 1, "green"],
            bk: "white",
            vis: 1
        });
        var a = D.div(d, {
            w: g.offsetWidth,
            ps: 1
        });
        d.css(b.style.cssText);
        d.css(e);
        g.appendChild(a);
        g.appendChild(f);
        d.ev_mouseout(this.close_on, this, f, d);
        d.ev_mouseover(this.open_on, this, f, d);
        b.style.display = "none";
        f.ev_click(this.open, this, f, d, b, k)
    },
    open_on: function(c, b, a) {
        if (a.style.display == "none") {
            return
        }
        a.close_on = false
    },
    close_on: function(c, b, a) {
        if (a.style.display == "none") {
            return
        }
        a.close_on = true;
        D.timeout(function() {
            if (a.close_on) {
                return this.close(null, b, a)
            }
        }, 500, this)
    },
    close: function(c, b, a) {
        b.style.visibility = "visible";
        a.style.visibility = "hidden"
    },
    open: function(g, f, c, d, a) {
        c.innerHTML = "";
        this.additem(f, c, d, a, d.selectedIndex, {
            m: [, , , 10],
            c: "black"
        });
        for (var b = 0; b < a.length; b++) {
            if (b == d.selectedIndex) {
                continue
            }
            this.additem(f, c, d, a, b)
        }
        f.style.visibility = "hidden";
        c.style.visibility = "visible";
        c.close_on = false
    },
    additem: function(g, d, f, a, b, c) {
        var e = D.div(null, {
            c: "gray",
            cs: 1
        });
        if (c) {
            e.css(c)
        }
        e.innerHTML = a[b];
        d.appendChild(e);
        e.ev_mouseover(function(i, h) {
            h.style.color = "black"
        }, this, e);
        e.ev_mouseout(function(i, h) {
            h.style.color = "gray"
        }, this, e);
        e.ev_click(function(i, h) {
            this.ch_current(g, d, f, a, b)
        }, this, e)
    },
    ch_current: function(g, d, f, b, c) {
        var e = true;
        if (f.selectedIndex == c) {
            e = false
        }
        f.selectedIndex = c;
        g.label.innerHTML = b[c];
        this.close(null, g, d);
        if (e && f.onchange) {
            if (D.ie) {
                f.fireEvent("onchange")
            } else {
                var a = document.createEvent("HTMLEvents");
                a.initEvent("change", true, true);
                f.dispatchEvent(a)
            }
        }
    }
};
HD.pack({
    flying: {}
});
HD.flying.extend({
    list: [],
    init: function() {
        D.ready(function() {
            D.event.add(window, "scroll", this.scroll, this)
        }, this)
    },
    add: function(a) {
        D.ready(function() {
            var d = D.byId(a.id);
            if (!d) {
                return
            }
            var c = parseInt(d.style.top);
            if (!c) {
                c = 0;
                d.style.top = 0
            }
            var b = (a.space) ? a.space : 0;
            this.list.push({
                obj: d,
                boxtop: D.org(d).y - c,
                top: (c) ? c : 0,
                space: b,
                to: 0
            })
        }, this)
    },
    scroll: function() {
        var c = parseInt(document.documentElement.scrollTop);
        if (!c) {
            c = parseInt(document.body.scrollTop)
        }
        for (var a = 0; a < this.list.length; a++) {
            var b = this.list[a];
            b.to = (c - b.boxtop + b.space > b.top) ? c - b.boxtop + b.space : b.top
        }
        if (!this.lock_anim) {
            this.lock_anim = true;
            D.timeout(this.flying_anim, 10, this)
        }
    },
    flying_anim: function() {
        var b = false;
        for (var a = 0; a < this.list.length; a++) {
            var c = this.list[a];
            var d = parseInt(c.obj.style.top);
            if (c.to == d) {} else {
                var e = Math.ceil(Math.abs(c.to - d) / 20);
                if (c.to < d) {
                    e = -e
                }
                c.obj.style.top = d + e + "px";
                b = true
            }
        }
        if (!b) {
            this.lock_anim = false;
            return
        } else {
            D.timeout(this.flying_anim, 10, this)
        }
    }
});
HD.flying.init();
HD.object({
    multifile: {
        create: function() {
            return {
                upload_path: "hd_upload.php",
                target: null,
                tsize: 0,
                maxsize: 512000,
                maxtsize: 3048576,
                import_value: null,
                export_form: null,
                instant_field: "instant_files",
                remain_field: "remain_files",
                remove_field: "remove_files",
                instant_list: [],
                remain_list: [],
                remove_list: []
            }
        },
        init: function(a) {
            D.ready(function() {
                var d = a.id;
                if (!d) {
                    return
                }
                this.target = d + "_iframe";
                this.view = D.byId(d);
                if (!this.view) {
                    return
                }
                if (a.maxsize) {
                    this.maxsize = a.maxsize
                }
                if (a.maxtsize) {
                    this.maxtsize = a.maxtsize
                }
                if (a.upload_path) {
                    this.upload_path = a.upload_path
                }
                if (a.export_form) {
                    this.export_form = D.byId(a.export_form)
                }
                for (var c = this.view.firstChild; c; c = c.nextSibling) {
                    var b = c.tagName;
                    if (!b) {
                        continue
                    }
                    if (b.toLowerCase() == "textarea") {
                        this.import_value = c.value;
                        break
                    }
                }
                this.draw_base();
                this.import_image();
                this.activate_form();
                this.doc_moniter()
            }, this)
        },
        draw_base: function() {
            this.view.innerHTML = "";
            var d = D.iframe(null, {
                w: 0,
                h: 0
            }, {
                frameborder: 0,
                scrolling: "no"
            }, this.target);
            d.component = this;
            this.view.write(d);
            this.draw_memo_box();
            var c = D.div();
            c.style.cssText = "font-size:9pt;text-align:left;";
            this.view.appendChild(c);
            var b = D.div();
            b.style.cssText = "border:1px solid lightgrey;padding:10px;background:#eeeeee";
            c.appendChild(b);
            var f = this.create_form();
            var a = D.input.file("upfile");
            a.style.cssText = "height:20px;border:1px solid #AFAFAF;font-family:dotum;font-size:11px";
            f.appendChild(a);
            b.appendChild(f);
            this.form.upfile = a;
            var g = D.button();
            g.style.cssText = "border:1px solid lightgrey;background:white;padding:1px;width:70px;margin-left:5px;font-size:11px;font-family:돋움;letter-spacing:-1px;padding-top:3px;padding-bottom:1px;";
            g.innerHTML = '<font color="red">-</font> 선택삭제';
            b.appendChild(g);
            this.form.rm_btn = g;
            var e = D.div();
            e.style.cssText = "clear:both;border:1px solid lightgrey;background:#fcfcfc;height:60px;padding:5px;margin-top:5px;";
            b.appendChild(e);
            this.box = e;
            c.appendChild(this.create_captions())
        },
        draw_memo_box: function() {
            var c = D.div();
            c.style.cssText = "background:lightgrey;border:1px solid gray;width:470px;padding:20px;padding-bottom:15px;display:none;position:absolute;z-index:999;";
            var a = D.textarea();
            a.style.cssText = "width:100%;height:220px;border:1px solid gray";
            var d = D.div();
            d.style.cssText = "text-align:right;margin-top:5px";
            var b = D.button("저장하기");
            b.style.cssText = "background:white;font-size:11px;font-family:dotum;padding:3px";
            d.appendChild(b);
            c.appendChild(a);
            c.appendChild(d);
            this.view.appendChild(c);
            this.memo_box = {
                box: c,
                ta: a,
                btn: b
            }
        },
        create_form: function() {
            var a = D.form();
            a.action = this.upload_path;
            a.method = "post";
            a.target = this.target;
            a.style.cssText = "padding:0px;margin:0px;float:left";
            this.add_fields(a);
            return a
        },
        add_fields: function(f) {
            var e = D.input.hidden("cmd", "test");
            var d = D.input.hidden("tsize", 0);
            var b = D.input.hidden("maxsize", 0);
            var a = D.input.hidden("maxtsize", 0);
            var c = D.input.hidden("list", "");
            var g = D.input.hidden("path", "");
            f.write(e, d, b, a, c, g);
            this.form = {
                frm: f,
                cmd: e,
                tsize: d,
                maxsize: b,
                maxtsize: a,
                list: c,
                path: g
            }
        },
        create_captions: function() {
            var f = D.div();
            f.style.cssText = "padding-top:5px";
            var d = D.span(this.size_str(this.maxsize));
            d.style.color = "dodgerblue";
            d.style.display = "none";
            var g = D.span(this.size_str(this.tsize));
            g.style.color = "dodgerblue";
            var b = D.span(this.size_str(this.maxtsize));
            b.style.color = "dodgerblue";
            var e = D.span("html,php 파일은 첨부할 수 없습니다. (현재 : ");
            var c = D.span(" / 최대 : ");
            var a = D.span(")");
            f.appendChild(e);
            f.appendChild(g);
            f.appendChild(c);
            f.appendChild(b);
            f.appendChild(a);
            f.appendChild(d);
            this.caption = {
                tsize: g,
                maxsize: d,
                maxtsize: b
            };
            return f
        },
        size_str: function(a) {
            if (a >= 1048576) {
                return parseInt(a / 1048576) + "." + parseInt((a % 1048576) * 10 / 1048576) + " MB"
            } else {
                if (a >= 1024) {
                    return parseInt(a / 1024) + "." + parseInt((a % 1024) * 10 / 1024) + " KB"
                } else {
                    return a + " bytes"
                }
            }
        },
        import_image: function() {
            if (!this.import_value) {
                return
            }
            var c = this.import_value.split("†");
            var d = [];
            for (var a = 0; a < c.length; a++) {
                var b = c[a].split("‡");
                if (b.length != 3) {
                    continue
                }
                this.make_item_box({
                    path: b[0],
                    size: b[1] * 1,
                    comment: b[2]
                });
                d.push([b[0], b[1], b[2]])
            }
            this.remain_list = d;
            this.export_remain_list()
        },
        make_item_box: function(d) {
            var c = D.div();
            c.style.cssText = "height:20px;margin:1px;text-align:left";
            c.className = "thum";
            if (d.uid) {
                c.uid = d.uid
            } else {
                c.path = d.path
            }
            c.psize = d.size;
            c.comment = (d.comment) ? d.comment : "";
            this.tsize += d.size * 1;
            this.update_caption();
            this.box.appendChild(c);
            var a = this.create_image(d);
            var b = this.create_image_btn();
            c.appendChild(a);
            c.appendChild(b);
            c.img = a;
            a.onclick = function(h) {
                if (!h) {
                    h = event
                }
                var g = (D.ie) ? h.srcElement : h.target;
                var f = g.parentNode;
                if (f.selected) {
                    f.selected = false;
                    g.style.borderColor = "transparent";
                    g.css({
                        op: 1
                    })
                } else {
                    f.selected = true;
                    g.style.borderColor = "red";
                    g.css({
                        op: 0.5
                    })
                }
            };
            a.onmouseover = function(f) {
                b.style.visibility = "visible"
            };
            c.onmouseout = function(f) {
                b.style.visibility = "hidden"
            };
            c.onmousemove = function(f) {
                b.style.visibility = "visible"
            };
            b.onmouseover = function(f) {
                b.style.visibility = "visible"
            };
            b.onmouseout = function(f) {
                b.style.visibility = "hidden"
            };
            var e = this;
            b.onclick = function(f) {
                if (!f) {
                    f = event
                }
                if (D.ie) {
                    f.cancelBubble = true
                } else {
                    f.stopPropagation()
                }
                e.show_memo_box(f, c)
            }
        },
        show_memo_box: function(d, a) {
            var c = {
                x: 0,
                y: 0
            };
            if (D.ie) {
                c.x = d.clientX + parseInt(document.body.scrollLeft);
                c.y = d.clientY + parseInt(document.body.scrollTop)
            } else {
                c.x = d.pageX;
                c.y = d.pageY
            }
            c.x -= 230;
            c.y -= 360;
            if (c.x < 0) {
                c.x = 0
            }
            if (c.y < 0) {
                c.y = 0
            }
            var b = this.memo_box;
            var f = this;
            this.memo_box.btn.onclick = function(l) {
                var j = b.ta.value;
                var g = /[†‡]/g;
                j = j.replace(g, " ");
                b.box.style.display = "none";
                a.img.title = j;
                a.comment = j;
                if (a.uid) {
                    var k = f.instant_list;
                    for (var h = 0; h < k.length; h++) {
                        if (k[h][0] == a.uid) {
                            k[h][1] = j;
                            break
                        }
                    }
                    f.export_instant_list()
                } else {
                    var k = f.remain_list;
                    for (var h = 0; h < k.length; h++) {
                        if (k[h][0] == a.path) {
                            k[h][2] = j;
                            break
                        }
                    }
                    f.export_remain_list()
                }
            };
            this.memo_box.box.style.left = c.x;
            this.memo_box.box.style.top = c.y;
            this.memo_box.box.style.display = "block";
            this.memo_box.ta.value = a.comment;
            try {
                this.memo_box.ta.focus()
            } catch (d) {}
        },
        create_image: function(c) {
            var b = c.path.split("/");
            if (b.length) {
                b = b[b.length - 1]
            } else {
                b = c.path
            }
            if (c.name) {
                b = c.name
            }
            var a = D.span(b + " (" + this.size_str(c.size) + ")");
            a.style.cssText = "height:20px;border:2px solid transparent;cursor:default";
            a.title = c.comment;
            return a
        },
        create_image_btn: function() {
            var a = D.button("comment");
            a.style.cssText = "border:0px solid gray;width:50px;margin-left:2px;background:black;color:white;height:20px;font-family:dotum;font-size:11px;letter-spacing:-1px;visibility:hidden";
            return a
        },
        activate_form: function() {
            var a = this;
            this.form.upfile.onchange = function(b) {
                a.up_image()
            };
            this.form.rm_btn.onclick = function(b) {
                a.rm_image()
            }
        },
        doc_moniter: function() {
            var a = this.memo_box.box;
            if (D.ie) {
                document.attachEvent("onclick", function(d) {
                    try {
                        var c = d.srcElement;
                        if (c == a) {
                            return
                        }
                        for (var b = 0; b < 2; b++) {
                            c = c.parentNode;
                            if (!c) {
                                break
                            }
                            if (c == a) {
                                return
                            }
                        }
                        a.style.display = "none"
                    } catch (d) {}
                })
            } else {
                document.addEventListener("click", function(d) {
                    try {
                        var c = d.target;
                        if (c == a) {
                            return
                        }
                        for (var b = 0; b < 2; b++) {
                            c = c.parentNode;
                            if (!c) {
                                break
                            }
                            if (c == a) {
                                return
                            }
                        }
                        a.style.display = "none"
                    } catch (d) {}
                }, false)
            }
        },
        update_caption: function() {
            this.caption.tsize.innerHTML = this.size_str(this.tsize)
        },
        up_image: function() {
            this.form.cmd.value = "up2";
            this.form.tsize.value = this.tsize;
            this.form.maxsize.value = this.maxsize;
            this.form.maxtsize.value = this.maxtsize;
            this.form.path.value = this.upload_path;
            if (this.form.upfile.value) {
                this.form.frm.submit()
            }
            this.form.frm.reset()
        },
        execute: function(a) {
            if (!a) {
                return
            }
            if (a.cmd == "add") {
                a.comment = "";
                this.make_item_box(a);
                this.instant_list.push([a.uid, a.comment]);
                this.export_instant_list()
            }
        },
        rm_image: function() {
            var d = 0;
            var c = 0;
            var b = [];
            var h = [];
            var g = [];
            for (var f = this.box.firstChild; f; f = e) {
                var e = f.nextSibling;
                var a = f.tagName;
                if (!a) {
                    continue
                }
                if (a.toLowerCase() != "div") {
                    continue
                }
                if (f.className != "thum") {
                    continue
                }
                if (f.selected) {
                    if (f.uid) {
                        g.push(f.uid)
                    } else {
                        c++;
                        this.remove_list.push(f.path)
                    }
                    this.box.removeChild(f)
                } else {
                    if (f.uid) {
                        b.push([f.uid, f.comment])
                    } else {
                        h.push([f.path, f.psize, f.comment])
                    }
                    d += f.psize * 1
                }
            }
            this.tsize = d;
            this.update_caption();
            if (g.length) {
                this.instant_list = b;
                this.export_instant_list();
                this.form.cmd.value = "rm2";
                this.form.list.value = g.join(",");
                this.form.frm.submit()
            }
            if (c) {
                this.remain_list = h;
                this.export_remain_list();
                this.export_remove_list()
            }
        },
        export_list: function(c, b) {
            var a = this.export_form;
            if (!a) {
                return c
            }
            var d = a.elements[b];
            if (!d) {
                d = D.input.hidden(b);
                a.appendChild(d)
            }
            d.value = c;
            return c
        },
        export_instant_list: function() {
            var a = this.instant_list;
            var c = [];
            for (var b = 0; b < a.length; b++) {
                c.push(a[b].join("‡"))
            }
            c = c.join("†");
            return this.export_list(c, this.instant_field)
        },
        export_remain_list: function() {
            var a = this.remain_list;
            var c = [];
            for (var b = 0; b < a.length; b++) {
                c.push(a[b].join("‡"))
            }
            c = c.join("†");
            return this.export_list(c, this.remain_field)
        },
        export_remove_list: function() {
            var a = this.remove_list.join("†");
            return this.export_list(a, this.remove_field)
        }
    }
});
HD.object({
    multiimage: {
        create: function() {
            return {
                upload_path: "hd_upload.php",
                target: null,
                tsize: 0,
                maxsize: 512000,
                maxtsize: 3048576,
                maxwidth: 0,
                maxheight: 0,
                import_value: null,
                export_form: null,
                instant_field: "instant_files",
                remain_field: "remain_files",
                remove_field: "remove_files",
                instant_list: [],
                remain_list: [],
                remove_list: []
            }
        },
        init: function(a) {
            D.ready(function() {
                var d = a.id;
                if (!d) {
                    return
                }
                this.target = d + "_iframe";
                this.view = D.byId(d);
                if (!this.view) {
                    return
                }
                if (a.maxsize) {
                    this.maxsize = a.maxsize
                }
                if (a.maxtsize) {
                    this.maxtsize = a.maxtsize
                }
                if (a.maxwidth) {
                    this.maxwidth = a.maxwidth
                }
                if (a.maxheight) {
                    this.maxheight = a.maxheight
                }
                if (a.upload_path) {
                    this.upload_path = a.upload_path
                }
                if (a.export_form) {
                    this.export_form = D.byId(a.export_form)
                }
                for (var c = this.view.firstChild; c; c = c.nextSibling) {
                    var b = c.tagName;
                    if (!b) {
                        continue
                    }
                    if (b.toLowerCase() == "textarea") {
                        this.import_value = c.value;
                        break
                    }
                }
                this.draw_base();
                this.import_image();
                this.activate_form();
                this.doc_moniter()
            }, this)
        },
        draw_base: function() {
            this.view.innerHTML = "";
            var d = D.iframe(null, {
                w: 0,
                h: 0
            }, {
                frameborder: 0,
                scrolling: "no"
            }, this.target);
            d.component = this;
            this.view.write(d);
            this.draw_memo_box();
            var c = D.div(null, {
                fs: 9,
                ta: 0
            });
            this.view.write(c);
            var b = D.div(null, {
                b: [1, 1, "lightgrey"],
                p: 10,
                bk: "#eeeeee"
            });
            c.write(b);
            var f = this.create_form();
            var a = D.input.file("upfile");
            a.style.cssText = "height:20px;border:1px solid #AFAFAF;font-family:dotum;font-size:11px";
            f.appendChild(a);
            b.appendChild(f);
            this.form.upfile = a;
            var g = D.button();
            g.style.cssText = "border:1px solid lightgrey;background:white;padding:1px;width:70px;margin-left:5px;font-size:11px;font-family:돋움;letter-spacing:-1px;padding-top:3px;padding-bottom:1px;";
            g.innerHTML = '<font color="red">-</font> 선택삭제';
            b.appendChild(g);
            this.form.rm_btn = g;
            var e = D.div();
            e.style.cssText = "clear:both;border:1px solid lightgrey;background:#fcfcfc;height:60px;padding:5px;margin-top:5px;";
            b.appendChild(e);
            this.box = e;
            c.appendChild(this.create_captions())
        },
        draw_memo_box: function() {
            var c = D.div();
            c.style.cssText = "background:lightgrey;border:1px solid gray;width:470px;padding:20px;padding-bottom:15px;display:none;position:absolute;z-index:999;";
            var a = D.textarea();
            a.style.cssText = "width:100%;height:220px;border:1px solid gray";
            var d = D.div();
            d.style.cssText = "text-align:right;margin-top:5px";
            var b = D.button("저장하기");
            b.style.cssText = "background:white;font-size:11px;font-family:dotum;padding:3px";
            d.appendChild(b);
            c.appendChild(a);
            c.appendChild(d);
            this.view.appendChild(c);
            this.memo_box = {
                box: c,
                ta: a,
                btn: b
            }
        },
        create_form: function() {
            var a = D.form();
            a.action = this.upload_path;
            a.method = "post";
            a.target = this.target;
            a.style.cssText = "padding:0px;margin:0px;float:left";
            this.add_fields(a);
            return a
        },
        add_fields: function(e) {
            var b = D.input.hidden("cmd", "test");
            var h = D.input.hidden("tsize", 0);
            var c = D.input.hidden("maxsize", 0);
            var g = D.input.hidden("maxtsize", 0);
            var a = D.input.hidden("maxwidth", 0);
            var f = D.input.hidden("maxheight", 0);
            var d = D.input.hidden("list", "");
            var i = D.input.hidden("path", "");
            e.write(b, h, c, g, a, f, d, i);
            this.form = {
                frm: e,
                cmd: b,
                tsize: h,
                maxsize: c,
                maxtsize: g,
                maxwidth: a,
                maxheight: f,
                list: d,
                path: i
            }
        },
        create_captions: function() {
            var f = D.div();
            f.style.cssText = "padding-top:5px";
            var d = D.span(this.size_str(this.maxsize));
            d.style.color = "dodgerblue";
            d.style.display = "none";
            var g = D.span(this.size_str(this.tsize));
            g.style.color = "dodgerblue";
            var b = D.span(this.size_str(this.maxtsize));
            b.style.color = "dodgerblue";
            var e = D.span("이미지파일만 첨부가 가능합니다. (현재 : ");
            var c = D.span(" / 최대 : ");
            var a = D.span(")");
            f.appendChild(e);
            f.appendChild(g);
            f.appendChild(c);
            f.appendChild(b);
            f.appendChild(a);
            f.appendChild(d);
            this.caption = {
                tsize: g,
                maxsize: d,
                maxtsize: b
            };
            return f
        },
        size_str: function(a) {
            if (a >= 1048576) {
                return parseInt(a / 1048576) + "." + parseInt((a % 1048576) * 10 / 1048576) + " MB"
            } else {
                if (a >= 1024) {
                    return parseInt(a / 1024) + "." + parseInt((a % 1024) * 10 / 1024) + " KB"
                } else {
                    return a + " bytes"
                }
            }
        },
        import_image: function() {
            if (!this.import_value) {
                return
            }
            var c = this.import_value.split("†");
            var d = [];
            for (var a = 0; a < c.length; a++) {
                var b = c[a].split("‡");
                if (b.length != 3) {
                    continue
                }
                this.make_item_box({
                    path: b[0],
                    size: b[1] * 1,
                    comment: b[2]
                });
                d.push([b[0], b[1], b[2]])
            }
            this.remain_list = d;
            this.export_remain_list()
        },
        make_item_box: function(d) {
            var c = D.div();
            c.style.cssText = "width:50px;height:70px;margin:1px;float:left;text-align:center";
            c.className = "thum";
            if (d.uid) {
                c.uid = d.uid
            } else {
                c.path = d.path
            }
            c.psize = d.size;
            c.comment = (d.comment) ? d.comment : "";
            this.tsize += d.size * 1;
            this.update_caption();
            this.box.appendChild(c);
            var a = this.create_image(d);
            var b = this.create_image_btn();
            c.appendChild(a);
            c.appendChild(b);
            c.img = a;
            a.onclick = function(h) {
                if (!h) {
                    h = event
                }
                var g = (D.ie) ? h.srcElement : h.target;
                var f = g.parentNode;
                if (f.selected) {
                    f.selected = false;
                    g.style.borderColor = "transparent";
                    g.css({
                        op: 1
                    })
                } else {
                    f.selected = true;
                    g.style.borderColor = "red";
                    g.css({
                        op: 0.5
                    })
                }
            };
            a.onmouseover = function(f) {
                b.style.visibility = "visible"
            };
            c.onmouseout = function(f) {
                b.style.visibility = "hidden"
            };
            c.onmousemove = function(f) {
                b.style.visibility = "visible"
            };
            b.onmouseover = function(f) {
                b.style.visibility = "visible"
            };
            b.onmouseout = function(f) {
                b.style.visibility = "hidden"
            };
            var e = this;
            b.onclick = function(f) {
                if (!f) {
                    f = event
                }
                if (D.ie) {
                    f.cancelBubble = true
                } else {
                    f.stopPropagation()
                }
                e.show_memo_box(f, c)
            }
        },
        show_memo_box: function(d, a) {
            var c = {
                x: 0,
                y: 0
            };
            if (D.ie) {
                c.x = d.clientX + parseInt(document.body.scrollLeft);
                c.y = d.clientY + parseInt(document.body.scrollTop)
            } else {
                c.x = d.pageX;
                c.y = d.pageY
            }
            c.x -= 230;
            c.y -= 360;
            if (c.x < 0) {
                c.x = 0
            }
            if (c.y < 0) {
                c.y = 0
            }
            var b = this.memo_box;
            var f = this;
            this.memo_box.btn.onclick = function(l) {
                var j = b.ta.value;
                var g = /[†‡]/g;
                j = j.replace(g, " ");
                b.box.style.display = "none";
                a.img.title = j;
                a.comment = j;
                if (a.uid) {
                    var k = f.instant_list;
                    for (var h = 0; h < k.length; h++) {
                        if (k[h][0] == a.uid) {
                            k[h][1] = j;
                            break
                        }
                    }
                    f.export_instant_list()
                } else {
                    var k = f.remain_list;
                    for (var h = 0; h < k.length; h++) {
                        if (k[h][0] == a.path) {
                            k[h][2] = j;
                            break
                        }
                    }
                    f.export_remain_list()
                }
            };
            this.memo_box.box.style.left = c.x;
            this.memo_box.box.style.top = c.y;
            this.memo_box.box.style.display = "block";
            this.memo_box.ta.value = a.comment;
            try {
                this.memo_box.ta.focus()
            } catch (d) {}
        },
        create_image: function(b) {
            var a = D.img(b.path, {
                w: 50,
                h: 50,
                b: [2, 1, "transparent"]
            });
            a.title = b.comment;
            return a
        },
        create_image_btn: function() {
            var a = D.button("comment");
            a.style.cssText = "border:0px solid gray;width:50px;margin-left:2px;background:black;color:white;height:20px;font-family:dotum;font-size:11px;letter-spacing:-1px;visibility:hidden";
            return a
        },
        activate_form: function() {
            var a = this;
            this.form.upfile.onchange = function(b) {
                a.up_image()
            };
            this.form.rm_btn.onclick = function(b) {
                a.rm_image()
            }
        },
        doc_moniter: function() {
            var a = this.memo_box.box;
            if (D.ie) {
                document.attachEvent("onclick", function(d) {
                    try {
                        var c = d.srcElement;
                        if (c == a) {
                            return
                        }
                        for (var b = 0; b < 2; b++) {
                            c = c.parentNode;
                            if (!c) {
                                break
                            }
                            if (c == a) {
                                return
                            }
                        }
                        a.style.display = "none"
                    } catch (d) {}
                })
            } else {
                document.addEventListener("click", function(d) {
                    try {
                        var c = d.target;
                        if (c == a) {
                            return
                        }
                        for (var b = 0; b < 2; b++) {
                            c = c.parentNode;
                            if (!c) {
                                break
                            }
                            if (c == a) {
                                return
                            }
                        }
                        a.style.display = "none"
                    } catch (d) {}
                }, false)
            }
        },
        update_caption: function() {
            this.caption.tsize.innerHTML = this.size_str(this.tsize)
        },
        up_image: function() {
            this.form.cmd.value = "up";
            this.form.tsize.value = this.tsize;
            this.form.maxsize.value = this.maxsize;
            this.form.maxtsize.value = this.maxtsize;
            this.form.maxwidth.value = this.maxwidth;
            this.form.maxheight.value = this.maxheight;
            this.form.path.value = this.path;
            if (this.form.upfile.value) {
                this.form.frm.submit()
            }
            this.form.frm.reset()
        },
        execute: function(a) {
            if (!a) {
                return
            }
            if (a.cmd == "add") {
                a.comment = "";
                this.make_item_box(a);
                this.instant_list.push([a.uid, a.comment]);
                this.export_instant_list()
            }
        },
        rm_image: function() {
            var d = 0;
            var c = 0;
            var b = [];
            var h = [];
            var g = [];
            for (var f = this.box.firstChild; f; f = e) {
                var e = f.nextSibling;
                var a = f.tagName;
                if (!a) {
                    continue
                }
                if (a.toLowerCase() != "div") {
                    continue
                }
                if (f.className != "thum") {
                    continue
                }
                if (f.selected) {
                    if (f.uid) {
                        g.push(f.uid)
                    } else {
                        c++;
                        this.remove_list.push(f.path)
                    }
                    this.box.removeChild(f)
                } else {
                    if (f.uid) {
                        b.push([f.uid, f.comment])
                    } else {
                        h.push([f.path, f.psize, f.comment])
                    }
                    d += f.psize * 1
                }
            }
            this.tsize = d;
            this.update_caption();
            if (g.length) {
                this.instant_list = b;
                this.export_instant_list();
                this.form.cmd.value = "rm";
                this.form.list.value = g.join(",");
                this.form.frm.submit()
            }
            if (c) {
                this.remain_list = h;
                this.export_remain_list();
                this.export_remove_list()
            }
        },
        export_list: function(c, b) {
            var a = this.export_form;
            if (!a) {
                return c
            }
            var d = a.elements[b];
            if (!d) {
                d = D.input.hidden(b);
                a.appendChild(d)
            }
            d.value = c;
            return c
        },
        export_instant_list: function() {
            var a = this.instant_list;
            var c = [];
            for (var b = 0; b < a.length; b++) {
                c.push(a[b].join("‡"))
            }
            c = c.join("†");
            return this.export_list(c, this.instant_field)
        },
        export_remain_list: function() {
            var a = this.remain_list;
            var c = [];
            for (var b = 0; b < a.length; b++) {
                c.push(a[b].join("‡"))
            }
            c = c.join("†");
            return this.export_list(c, this.remain_field)
        },
        export_remove_list: function() {
            var a = this.remove_list.join("†");
            return this.export_list(a, this.remove_field)
        }
    }
});
HD.pack({
    remaintime: {}
});
HD.remaintime.extend({
    time: {
        server: 0,
        client: 0,
        diff: 0,
        old: 0,
        now: 0,
        modify: 0
    },
    list: [],
    init: function(a) {
        D.ready(function() {
            this.time.server = a;
            this.time.client = this.now();
            this.time.diff = this.time.server - this.time.client;
            this.time.old = this.time.client;
            this.show()
        }, this)
    },
    now: function() {
        return parseInt((new Date()).getTime() / 1000)
    },
    add: function(c, b, a) {
        if (!c || !b) {
            return
        }
        D.ready(function() {
            var d = D.byId(c + "_d2");
            var e = D.byId(c + "_d1");
            var h = D.byId(c + "_h2");
            var j = D.byId(c + "_h1");
            var m = D.byId(c + "_m2");
            var n = D.byId(c + "_m1");
            var k = D.byId(c + "_s2");
            var l = D.byId(c + "_s1");
            if (!d || !e || !h || !j || !m || !n || !k || !l) {
                return
            }
            var g = null;
            if (J.isarr(a)) {
                g = [];
                for (var f = 0; f < 11; f++) {
                    var o = a[f];
                    if (!o) {
                        o = a[0]
                    }
                    g.push(D.img(o))
                }
            }
            this.list.push({
                d2: d,
                d1: e,
                h2: h,
                h1: j,
                m2: m,
                m1: n,
                s2: k,
                s1: l,
                end: b,
                img: g
            })
        }, this)
    },
    show: function() {
        this.time.now = this.now();
        var g = this.time.now - this.time.old - 1;
        if (g < -1 || g > 1) {
            this.time.modify += g
        }
        this.time.old = this.time.now;
        var a = 0;
        for (var c = 0; c < this.list.length; c++) {
            var j = this.list[c];
            var l = j.end - this.time.now - this.time.diff + this.time.modify;
            if (l < 0) {
                l = 0
            }
            if (l) {
                a++
            }
            var k = l % 60;
            l = parseInt(l / 60);
            var b = l % 60;
            l = parseInt(l / 60);
            var e = l % 24;
            var f = parseInt(l / 24);
            if (f == 0 && e == 0 && b == 0 && f == 0) {
                this.show_digit(j, j.s1, "-");
                this.show_digit(j, j.s2, "-")
            } else {
                this.show_digit(j, j.s1, k % 10);
                this.show_digit(j, j.s2, parseInt(k / 10))
            }
            if (f == 0 && e == 0 && b == 0) {
                this.show_digit(j, j.m1, "-");
                this.show_digit(j, j.m2, "-")
            } else {
                this.show_digit(j, j.m1, b % 10);
                this.show_digit(j, j.m2, parseInt(b / 10))
            }
            if (f == 0 && e == 0) {
                this.show_digit(j, j.h1, "-");
                this.show_digit(j, j.h2, "-")
            } else {
                this.show_digit(j, j.h1, e % 10);
                this.show_digit(j, j.h2, parseInt(e / 10))
            }
            if (f == 0) {
                this.show_digit(j, j.d1, "-");
                this.show_digit(j, j.d2, "-")
            } else {
                this.show_digit(j, j.d1, f % 10);
                this.show_digit(j, j.d2, parseInt(f / 10) % 10)
            }
        }
        if (a) {
            D.timeout(this.show, 1000, this)
        }
    },
    show_digit: function(b, c, a) {
        if (!b.img) {
            c.textval(a)
        } else {
            if (a == "-") {
                a = 10
            }
            c.empty();
            c.append(b.img[a].cloneNode())
        }
    }
});
HD.object({
    rolling: {
        dir: ["left", "right", "up", "down"],
        create: function() {
            return {
                id: null,
                list: [],
                action: "push",
                flow: "repeat",
                display: "in",
                direction: 0,
                speed: 1,
                delay: 10,
                waiting: 1000,
                slide_bk: "white",
                pause: false,
                lock: false,
                play_cnt: 0
            }
        },
        init: function(a) {
            D.ready(function() {
                this.id = a.id;
                this.view = D.byId(this.id);
                if (!this.view) {
                    return alert("롤링개체를 찾을 수 없습니다")
                }
                if (a.action) {
                    this.action = a.action
                }
                if (a.speed) {
                    this.speed = a.speed
                }
                if (a.delay) {
                    this.delay = a.delay
                }
                if (a.slide_bk) {
                    this.slide_bk = a.slide_bk
                }
                if (a.waiting || a.waiting === 0) {
                    this.waiting = a.waiting
                }
                this.set_direction(a.direction);
                for (var b = this.view.firstChild; b; b = b.nextSibling) {
                    if (b.nodeType == 1) {
                        this.list.push(b.cloneNode(true))
                    }
                }
                this.draw_base();
                if (this.display == "out") {
                    this.play()
                } else {
                    if (this.display == "in") {
                        window.setTimeout(J.func(function() {
                            this.play()
                        }, this), this.waiting)
                    }
                }
            }, this);
            return this
        },
        set_direction: function(a) {
            if (!a) {
                return
            }
            a = a.toLowerCase();
            for (var b = 0; b < this.dir.length; b++) {
                if (a == this.dir[b]) {
                    this.direction = b;
                    break
                }
            }
        },
        draw_base: function() {
            this.view.css({
                dis: 0,
                p: [0, 0, 0, 0]
            });
            var d = parseInt(this.view.style.height);
            if (!d) {
                d = this.view.offsetHeight - 4
            }
            if (d < 0) {
                d = 0
            }
            this.view.innerHTML = "";
            var e = D.table(D.tbody(D.tr()), {
                ps: 2,
                pos: [0, 0],
                z: 2,
                ov: 2,
                op: 1,
                h: d
            }, {
                cs: 0,
                cp: 0
            });
            e.op = 1;
            e.pos = 0;
            e.pos_end = 0;
            e.pos_start = 0;
            var b = D.table(D.tbody(D.tr()), {
                ps: 2,
                pos: [0, 0],
                z: 1,
                ov: 2,
                op: 0,
                h: d
            }, {
                cs: 0,
                cp: 0
            });
            var a = D.div([e, b], {
                ws: 1,
                ov: 2,
                z: 5,
                h: d,
                ps: 1,
                pos: [0, 0],
                m: [0, 0, 1, 0]
            });
            if (this.direction > 1) {
                e.vnode(0).empty();
                b.vnode(0).empty()
            }
            this.box = e;
            this.box2 = b;
            this.container = a;
            this.view.appendChild(a);
            for (var c = 0; c < this.list.length; c++) {
                this.push_item(c)
            }
            if (this.display == "out") {
                if (this.direction == 0) {
                    this.box.style.left = this.container.offsetWidth + "px"
                } else {
                    if (this.direction == 1) {
                        this.box.style.left = -this.box.offsetWidth + "px"
                    }
                }
            }
            this.container.ev_mouseover(function(f) {
                this.pause = true;
                this.stop()
            }, this);
            this.container.ev_mouseout(function(f) {
                this.pause = false;
                this.play()
            }, this)
        },
        push_item: function(a) {
            if (this.direction < 2) {
                this.box.vnode(0, 0).appendChild(D.td(this.list[a].cloneNode(true)))
            } else {
                this.box.vnode(0).appendChild(D.tr(D.td(this.list[a].cloneNode(true))))
            }
        },
        turn_left: function() {
            if (this.direction < 2) {
                this.move_play(0, true)
            } else {
                this.move_play(2, true)
            }
        },
        turn_right: function() {
            if (this.direction < 2) {
                this.move_play(1, true)
            } else {
                this.move_play(3, true)
            }
        },
        turn_up: function() {
            this.turn_left()
        },
        turn_down: function() {
            this.turn_right()
        },
        play: function(a) {
            if (a) {
                this.pause = false;
                this.move_play(this.direction)
            } else {
                this.pause = false;
                this._play()
            }
        },
        _play: function() {
            if (!this.pause) {
                if (this.play_cnt) {
                    return
                }
                this.play_cnt++;
                if (this.waiting) {
                    window.setTimeout(J.func(function() {
                        this._start()
                    }, this), this.waiting)
                } else {
                    this._start()
                }
            }
        },
        _start: function() {
            if (this.play_cnt > 0) {
                this.play_cnt--
            }
            if (this.pause) {
                return
            }
            this.move_play(this.direction)
        },
        _stop: function() {
            this.pause = true;
            this.move_stop()
        },
        stop: function() {
            this.pause = true;
            this.move_stop(true)
        },
        move_play: function(b, a) {
            if (this.action == "push") {
                window.clearInterval(this.tid);
                a = (a && this.direction == b);
                this.direction = b;
                if (b == 0) {
                    this.push_left(a)
                } else {
                    if (b == 1) {
                        this.push_right(a)
                    } else {
                        if (b == 2) {
                            this.push_up(a)
                        } else {
                            if (b == 3) {
                                this.push_down(a)
                            }
                        }
                    }
                }
            } else {
                if (this.action == "fade") {
                    if (a) {
                        return this.instant(b)
                    }
                    if (this.lock) {
                        return
                    }
                    this.lock = true;
                    this.direction = b;
                    if (b == 0) {
                        this.fade_left()
                    } else {
                        if (b == 1) {
                            this.fade_right()
                        } else {
                            if (b == 2) {
                                this.fade_up()
                            } else {
                                if (b == 3) {
                                    this.fade_down()
                                }
                            }
                        }
                    }
                } else {
                    if (this.action == "slide") {
                        if (this.lock && !a) {
                            return
                        }
                        this.lock = true;
                        this.direction = b;
                        if (b == 0) {
                            this.slide_left(a)
                        } else {
                            if (b == 1) {
                                this.slide_right(a)
                            } else {
                                if (b == 2) {
                                    this.slide_up(a)
                                } else {
                                    if (b == 3) {
                                        this.slide_down(a)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        move_stop: function(a) {
            if (this.action == "push") {
                window.clearInterval(this.tid);
                if (a) {
                    return
                }
                this._play()
            } else {
                if (this.action == "fade") {
                    if (!this.lock) {
                        return
                    }
                    window.clearInterval(this.tid);
                    if (this.box.op > 0.2) {
                        this.box2.empty();
                        this.box2.css({
                            op: 0,
                            z: 1
                        });
                        this.box.css({
                            op: 1
                        });
                        this.box.op = 1
                    } else {
                        this.box.empty();
                        this.box.appendChild(this.box2.vnode(0).cloneNode(true));
                        this.box.op = 1;
                        this.box2.empty();
                        this.box2.css({
                            op: 0,
                            z: 1
                        });
                        this.box.css({
                            op: 1
                        })
                    }
                    this.lock = false;
                    if (a) {
                        return
                    }
                    this._play()
                } else {
                    if (this.action == "slide") {
                        if (!this.lock) {
                            return
                        }
                        window.clearInterval(this.tid);
                        this.lock = false;
                        if (a) {
                            return
                        }
                        this._play()
                    }
                }
            }
        },
        push_begin: function(j) {
            if (!this.display == "in" || !this.flow == "repeat") {
                return
            }
            var b = -this.box.offsetLeft;
            var k = b + this.container.offsetWidth;
            var g = -this.box.offsetTop;
            var m = g + this.container.offsetHeight;
            if (j == 0) {
                var h = this.box.vnode(0, 0);
                var d = h.firstChild;
                var c = d.offsetLeft;
                var e = d.offsetWidth;
                var l = c + e;
                if (l <= b) {
                    h.removeChild(d);
                    h.appendChild(d);
                    this.box.style.left = parseInt(this.box.style.left) + e + "px"
                }
            } else {
                if (j == 1) {
                    var h = this.box.vnode(0, 0);
                    var d = h.lastChild;
                    var c = d.offsetLeft;
                    var e = d.offsetWidth;
                    if (k <= c) {
                        h.removeChild(d);
                        h.insertat(0, d);
                        this.box.style.left = parseInt(this.box.style.left) - e + "px"
                    }
                } else {
                    if (j == 2) {
                        var f = this.box.vnode(0);
                        var h = f.firstChild;
                        var d = h.firstChild;
                        var i = d.offsetTop;
                        var e = d.offsetHeight;
                        var a = i + e;
                        if (a <= g) {
                            f.removeChild(h);
                            f.appendChild(h);
                            this.box.style.top = parseInt(this.box.style.top) + e + "px"
                        }
                    } else {
                        if (j == 3) {
                            var f = this.box.vnode(0);
                            var h = f.lastChild;
                            var d = h.firstChild;
                            var i = d.offsetTop;
                            var e = d.offsetHeight;
                            if (m <= i) {
                                f.removeChild(h);
                                f.insertat(0, h);
                                this.box.style.top = parseInt(this.box.style.top) - e + "px"
                            }
                        }
                    }
                }
            }
        },
        push_left: function(b) {
            this.push_begin(0);
            var a = -this.box.offsetLeft;
            var h = a + this.container.offsetWidth;
            var g = null;
            for (var d = this.box.vnode(0, 0).firstChild; d; d = d.nextSibling) {
                var c = d.offsetLeft;
                var i = c + d.offsetWidth;
                if (c <= a && a < i) {
                    g = -i;
                    break
                }
            }
            if (g === null) {
                var f = 0;
                var e = this.box.offsetWidth;
                if (e <= a) {
                    if (this.flow == "repeat") {
                        this.box.style.left = this.container.offsetWidth + "px";
                        return this.move_left(on)
                    } else {
                        if (this.flow == "reverse") {
                            this.direction = 1;
                            return this.move_right(on)
                        } else {
                            return
                        }
                    }
                }
                if (f > a) {
                    g = f
                }
            }
            window.clearInterval(this.tid);
            if (b) {
                this.box.style.left = g + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var j = parseInt(this.box.style.left) - this.speed;
                if (j <= g) {
                    this.box.style.left = g + "px";
                    return this.move_stop()
                }
                this.box.style.left = j + "px"
            }, this), this.delay)
        },
        push_right: function(b) {
            this.push_begin(1);
            var a = -this.box.offsetLeft;
            var h = -this.box.offsetLeft + this.container.offsetWidth;
            var g = null;
            for (var d = this.box.vnode(0, 0).firstChild; d; d = d.nextSibling) {
                var c = d.offsetLeft;
                var i = c + d.offsetWidth;
                if (c < h && h <= i) {
                    g = this.container.offsetWidth - c;
                    break
                }
            }
            if (g === null) {
                var f = 0;
                var e = this.box.offsetWidth;
                if (f >= h) {
                    if (this.flow == "repeat") {
                        this.box.style.left = -e + "px";
                        this.move_right(on);
                        return
                    } else {
                        if (this.flow == "reverse") {
                            this.direction = 0;
                            this.move_left(on);
                            return
                        } else {
                            window.status = "no flow";
                            return
                        }
                    }
                }
                if (e < h) {
                    var d = this.box.vnode(0, 0).lastChild;
                    var c = d.offsetLeft;
                    var i = c + d.offsetWidth;
                    g = this.container.offsetWidth - i
                }
            }
            window.clearInterval(this.tid);
            if (b) {
                this.box.style.left = (g + 1) + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var j = parseInt(this.box.style.left) + this.speed;
                if (j >= g) {
                    this.box.style.left = (g + 1) + "px";
                    return this.move_stop()
                }
                this.box.style.left = j + "px"
            }, this), this.delay)
        },
        push_up: function(b) {
            this.push_begin(2);
            var e = -this.box.offsetTop;
            var j = e + this.container.offsetHeight;
            var h = null;
            for (var f = this.box.vnode(0).firstChild; f; f = f.nextSibling) {
                var d = f.firstChild;
                var g = d.offsetTop;
                var a = g + d.offsetHeight;
                if (g <= e && e < a) {
                    h = -a;
                    break
                }
            }
            if (h === null) {
                var i = 0;
                var c = this.box.offsetHeight;
                if (c <= e) {
                    if (this.flow == "repeat") {
                        this.box.style.top = this.container.offsetHeight + "px";
                        return this.move_up(on)
                    } else {
                        if (this.flow == "reverse") {
                            this.direction = 3;
                            return this.move_down(on)
                        } else {
                            return
                        }
                    }
                }
                if (i > e) {
                    h = i
                }
            }
            window.clearInterval(this.tid);
            if (b) {
                this.box.style.top = h + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var k = parseInt(this.box.style.top) - this.speed;
                if (k < h) {
                    this.box.style.top = h + "px";
                    return this.move_stop()
                }
                this.box.style.top = k + "px"
            }, this), this.delay)
        },
        push_down: function(b) {
            this.push_begin(3);
            var e = -this.box.offsetTop;
            var i = -this.box.offsetTop + this.container.offsetHeight;
            var g = null;
            for (var d = this.box.vnode(0).firstChild; d; d = d.nextSibling) {
                var f = d.offsetTop;
                var a = f + d.offsetHeight;
                if (f < i && i <= a) {
                    g = this.container.offsetHeight - f;
                    break
                }
            }
            if (g === null) {
                var h = 0;
                var c = this.box.offsetHeight;
                if (h >= i) {
                    if (this.flow == "repeat") {
                        this.box.style.top = -c + "px";
                        this.move_down(on);
                        return
                    } else {
                        if (this.flow == "reverse") {
                            this.direction = 0;
                            this.move_up(on);
                            return
                        } else {
                            window.status = "no flow";
                            return
                        }
                    }
                }
                if (c < i) {
                    var d = this.box.vnode(0, 0).lastChild;
                    var f = d.offsetTop;
                    var a = f + d.offsetHeight;
                    g = this.container.offsetHeight - a
                }
            }
            window.clearInterval(this.tid);
            if (b) {
                this.box.style.top = (g + 1) + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var j = parseInt(this.box.style.top) + this.speed;
                if (j >= g) {
                    this.box.style.top = (g + 1) + "px";
                    return this.move_stop()
                }
                this.box.style.top = j + "px"
            }, this), this.delay)
        },
        fade_begin: function(d) {
            this.box2.empty();
            this.box2.appendChild(this.box.vnode(0).cloneNode(true));
            var c = this.box.vnode(0, 0);
            var a = this.box.vnode(0);
            if (d == 0) {
                var b = c.firstChild;
                c.removeChild(b);
                c.appendChild(b)
            } else {
                if (d == 1) {
                    var b = c.lastChild;
                    c.removeChild(b);
                    c.insertat(0, b)
                } else {
                    if (d == 2) {
                        var b = a.firstChild;
                        a.removeChild(b);
                        a.appendChild(b)
                    } else {
                        if (d == 3) {
                            var b = a.lastChild;
                            a.removeChild(b);
                            a.insertat(0, b)
                        }
                    }
                }
            }
            this.box.css({
                op: 0
            });
            this.box.op = 0;
            this.box2.css({
                op: 1,
                z: 3
            })
        },
        fade: function() {
            var a = 0;
            window.clearInterval(this.tid);
            this.tid = window.setInterval(J.func(function() {
                a += 0.01;
                var b = 1 - a;
                if (b < 0) {
                    b = 0
                }
                var c = -0.5 + a;
                if (c < 0) {
                    c = 0
                }
                this.box2.css({
                    op: b
                });
                this.box.css({
                    op: c
                });
                this.box.op = c;
                if (a >= 1.5) {
                    this.move_stop()
                }
            }, this), this.delay)
        },
        fade_left: function() {
            this.fade_begin(0);
            this.fade()
        },
        fade_right: function() {
            this.fade_begin(1);
            this.fade()
        },
        fade_up: function() {
            this.fade_begin(2);
            this.fade()
        },
        fade_down: function() {
            this.fade_begin(3);
            this.fade()
        },
        instant: function(a) {
            if (this.action == "fade") {
                this._stop();
                this.direction = a;
                if (a == 0) {
                    this.instant_left()
                } else {
                    if (a == 1) {
                        this.instant_right()
                    } else {
                        if (a == 2) {
                            this.instant_up()
                        } else {
                            if (a == 3) {
                                this.instant_down()
                            }
                        }
                    }
                }
                this.pause = true
            }
        },
        instant_left: function() {
            var b = this.box.vnode(0, 0);
            var a = b.firstChild;
            b.removeChild(a);
            b.appendChild(a)
        },
        instant_right: function() {
            var b = this.box.vnode(0, 0);
            var a = b.lastChild;
            b.removeChild(a);
            b.insertat(0, a)
        },
        instant_up: function() {
            var a = this.box.vnode(0);
            var b = a.firstChild;
            a.removeChild(b);
            a.appendChild(b)
        },
        instant_down: function() {
            var a = this.box.vnode(0);
            var b = a.lastChild;
            a.removeChild(b);
            a.insertat(0, b)
        },
        slide_begin: function(l) {
            if (this.box.pos != this.box.pos_end) {
                return
            }
            this.box2.empty();
            this.box2.appendChild(this.box.vnode(0).cloneNode(true));
            this.box2.style.left = this.box.style.left;
            this.box2.style.top = this.box.style.top;
            var j = this.box.vnode(0, 0);
            var g = this.box.vnode(0);
            if (l == 0) {
                for (var f = 0; f < 100; f++) {
                    var b = -this.box.offsetLeft;
                    var m = b + this.container.offsetWidth;
                    var d = j.firstChild;
                    var c = d.offsetLeft;
                    var e = d.offsetWidth;
                    var n = c + e;
                    if (b >= c) {
                        j.removeChild(d);
                        j.appendChild(d);
                        this.box.style.left = parseInt(this.box.style.left) + e + "px"
                    } else {
                        this.box.pos = parseInt(this.box.style.left);
                        this.box.pos_start = this.box.pos;
                        this.box.pos_end = this.box.pos + b - c;
                        break
                    }
                }
            } else {
                if (l == 1) {
                    for (var f = 0; f < 100; f++) {
                        var b = -this.box.offsetLeft;
                        var m = b + this.container.offsetWidth;
                        var d = j.lastChild;
                        var c = d.offsetLeft;
                        var e = d.offsetWidth;
                        var n = c + e;
                        if (m <= n) {
                            j.removeChild(d);
                            j.insertat(0, d);
                            this.box.style.left = parseInt(this.box.style.left) - e + "px"
                        } else {
                            this.box.pos = parseInt(this.box.style.left);
                            this.box.pos_start = this.box.pos;
                            this.box.pos_end = this.box.pos + m - n;
                            break
                        }
                    }
                } else {
                    if (l == 2) {
                        for (var f = 0; f < 100; f++) {
                            var h = -this.box.offsetTop;
                            var o = h + this.container.offsetHeight;
                            var d = g.firstChild;
                            var k = d.offsetTop;
                            var e = d.offsetHeight;
                            var a = k + e;
                            if (h >= k) {
                                g.removeChild(d);
                                g.appendChild(d);
                                this.box.style.top = parseInt(this.box.style.top) + e + "px"
                            } else {
                                this.box.pos = parseInt(this.box.style.top);
                                this.box.pos_start = this.box.pos;
                                this.box.pos_end = this.box.pos + h - k;
                                break
                            }
                        }
                    } else {
                        if (l == 3) {
                            for (var f = 0; f < 100; f++) {
                                var h = -this.box.offsetTop;
                                var o = h + this.container.offsetHeight;
                                var d = g.lastChild;
                                var k = d.offsetTop;
                                var e = d.offsetHeight;
                                var a = k + e;
                                if (o <= a) {
                                    g.removeChild(d);
                                    g.insertat(0, d);
                                    this.box.style.top = parseInt(this.box.style.top) - e + "px"
                                } else {
                                    this.box.pos = parseInt(this.box.style.top);
                                    this.box.pos_start = this.box.pos;
                                    this.box.pos_end = this.box.pos + o - a;
                                    break
                                }
                            }
                        }
                    }
                }
            }
            this.box2.css({
                op: 1
            });
            this.box.css({
                bk: this.slide_bk
            })
        },
        slide_left: function(a) {
            this.slide_begin(0);
            window.clearInterval(this.tid);
            if (a) {
                this.box.pos = this.box.pos_end;
                this.box.style.left = this.box.pos + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var b = this.box.pos;
                b -= this.speed;
                this.box.pos = b;
                this.box.style.left = b + "px";
                if (b <= this.box.pos_end) {
                    this.box.pos = this.box.pos_end;
                    this.move_stop()
                }
            }, this), this.delay)
        },
        slide_right: function(a) {
            this.slide_begin(1);
            window.clearInterval(this.tid);
            if (a) {
                this.box.pos = this.box.pos_end;
                this.box.style.left = (this.box.pos + 1) + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var b = this.box.pos;
                b += this.speed;
                this.box.pos = b;
                this.box.style.left = b + "px";
                if (b > this.box.pos_end) {
                    this.box.pos = this.box.pos_end;
                    this.move_stop()
                }
            }, this), this.delay)
        },
        slide_up: function(a) {
            this.slide_begin(2);
            window.clearInterval(this.tid);
            if (a) {
                this.box.pos = this.box.pos_end;
                this.box.style.top = this.box.pos + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var b = this.box.pos;
                b -= this.speed;
                this.box.pos = b;
                this.box.style.top = b + "px";
                if (b <= this.box.pos_end) {
                    this.box.pos = this.box.pos_end;
                    this.move_stop()
                }
            }, this), this.delay)
        },
        slide_down: function(a) {
            this.slide_begin(3);
            window.clearInterval(this.tid);
            if (a) {
                this.box.pos = this.box.pos_end;
                this.box.style.top = this.box.pos + "px";
                this.pause = true;
                return this.move_stop()
            }
            this.tid = window.setInterval(J.func(function() {
                var b = this.box.pos;
                b += this.speed;
                this.box.pos = b;
                this.box.style.top = b + "px";
                if (b > this.box.pos_end) {
                    this.box.pos = this.box.pos_end;
                    this.move_stop()
                }
            }, this), this.delay)
        },
        easing: function(a) {
            return (-Math.cos(a * Math.PI) / 2) + 0.5
        }
    }
});