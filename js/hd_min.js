// ------------------------------------------------------------------
// hd_min
// 수정일 : 2011-07-26
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Global Variables
// ------------------------------------------------------------------
var ie = (window.navigator.appName == "Microsoft Internet Explorer") ? true : false;
var chrome = (window.navigator.userAgent.match(/Chrome/i)) ? true : false;
var opera = (window.navigator.userAgent.match(/Opera/i)) ? true : false;
var firefox = (window.navigator.userAgent.match(/Firefox/i)) ? true : false;
var safari = (window.navigator.userAgent.match(/Safari/i) && !window.navigator.userAgent.match(/Chrome/i)) ? true : false;


// ------------------------------------------------------------------
// FormCheck
// ------------------------------------------------------------------
function FormCheck(frm) {
    if (!frm) return alert("FormCheck Error : parameter is null");
    if (typeof(frm) == "string") {
        var s = document.getElementById(frm);
        if (!s) s = eval("document." + frm);
        if (!s) return alert("FormCheck Error : Invalid Form id or name");
        this.frm = s;
    } else {
        this.frm = frm;
    }
    if (!this.frm.tagName || this.frm.tagName.toLowerCase() != "form")
        return alert("FormCheck Error : Not Form");

    this.check_stop = false;
    // ------------------------------------------
    // get element
    // ------------------------------------------
    this.element = function(name) {
        return this.frm.elements[name];
    }
    // ------------------------------------------
    // get value
    // ------------------------------------------
    this.get = function(name) {
        var el = this.element(name);
        if (el) return el.value;
        else return null;
    }
    // ------------------------------------------
    // set value
    // ------------------------------------------
    this.set = function(name, value) {
        var el = this.element(name);
        if (el) {
            if (!el.tagName) {
                for (var i = 0; i < el.length; i++) {
                    this._set(el[i], value);
                }
            } else this._set(el, value);
        }
    }
    this._set = function(obj, v) {
        var tag = obj.tagName.toLowerCase();
        var type = obj.type;
        if (tag == "select") {
            for (var i = 0; i < obj.options.length; i++) {
                if (obj.options[i].value == v) {
                    obj.selectedIndex = i;
                    break;
                }
            }
        } else if (tag == "input") {
            if (type == "checkbox" || type == "radio") {
                if (obj.value == v) obj.checked = true;
                else obj.checked = false;
            } else obj.value = v;
        } else obj.value = v;
    }
    // ------------------------------------------
    // check value
    // ------------------------------------------
    this.check = function(name, msg) {
        if (this.check_stop) return false;
        if (this.empty(name)) {
            this.check_stop = true;
            if (msg) alert(msg);
            this.focus(name);
            return false;
        }
        return true;
    }

    // ------------------------------------------
    // check equal value
    // ------------------------------------------
    this.checkequal = function(name1, name2, msg) {
        if (this.check_stop) return;
        if (this.get(name1) != this.get(name2)) {
            this.check_stop = true;
            if (msg) alert(msg);
            this.focus(name1);
        }
    }
    // ------------------------------------------
    // empty
    // ------------------------------------------
    this.empty = function(name) {
        var el = this.element(name);
        if (!el) return false;
        var v = el.value;
        if (v) return false;
        if (v === 0) return false;
        return true;
    }
    //  -----------------------------------------
    // focus
    // ------------------------------------------
    this.focus = function(name) {
        var el = this.element(name);
        if (!el) return false;
        try {
            el.focus();
        } catch (e) {}
    }
    // ------------------------------------------
    // submit
    // ------------------------------------------
    this.submit = function() {
        if (this.check_stop) return;
        this.frm.submit();
    }
    // ------------------------------------------
    // reset
    // ------------------------------------------
    this.reset = function() {
        this.frm.reset();
    }
    // ------------------------------------------
    // action
    // ------------------------------------------
    this.action = function(url) {
        this.frm.action = url;
    }
    // ------------------------------------------
    // target
    // ------------------------------------------
    this.target = function(frame) {
        this.frm.target = frame;
    }
    // ------------------------------------------
    // method
    // ------------------------------------------
    this.method = function(type) {
        this.method.type = type;
    }
    // ------------------------------------------
    // serialize (현재필드명중복지원안함)
    // ------------------------------------------
    this.serialize = function(fields, except) {
        if (!except) except = false;
        if (!fields) fields = [];
        if (!is_arr(fields)) return;

        var coll = this.frm.elements;
        var re = "";
        for (var i = 0; i < coll.length; i++) {
            var item = coll.item(i);
            var type = item.getAttribute("type");
            var name = item.getAttribute("name");
            var value = item.value;
            if (type == "checkbox" && !item.checked) continue;
            if (type == "radio" && !item.checked) continue;
            if (except && in_arr(fields, name)) continue;
            if (!except && fields.length && !in_arr(fields, name)) continue;
            if (item.tagName.toLowerCase() == "select") {
                var option = item.options[item.selectedIndex];
                value = option.value;
            }
            if (re) re += "&";
            if (value || value == 0) value = encodeURIComponent(value);
            if (!value) value = "";
            re += name + "=" + value;
        }
        return re;
    }
}
// ------------------------------------------------------------------


// ----------------------------------------------
// is_arr (배열인지 아닌지)
// ----------------------------------------------
function is_arr(v) {
    if (!v) return false;
    if (typeof(v) != "object") return false;
    if ((v instanceof Array) || (v.concat && v.reverse && v.unshift)) return true;
    else return false;
}

// ----------------------------------------------
// in_arr (v가 arr에 속해있는지)
// ----------------------------------------------
function in_arr(arr, v) {
    if (!arr) return false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == v) return true;
    }
    return false;
}


// ----------------------------------------------
// set event
// ----------------------------------------------
function set_event(obj, eventType, f) {
    if (ie) obj.attachEvent("on" + eventType, f);
    else obj.addEventListener(eventType, f, false);
}

// ----------------------------------------------
// set ready
// ----------------------------------------------
function set_ready(f) {
    if (document.readyState == "complete") return f();
    set_event(window, "load", function(e) {
        f();
    });
}

// ----------------------------------------------
// set focus
// ----------------------------------------------
function set_focus(obj_id) {
    set_ready(function() {
        window.setTimeout(function() {
            try {
                var obj = document.getElementById(obj_id);
                obj.focus();
                if (obj.value && (obj.type == "text" || obj.tagName == "textarea")) {
                    obj.select();
                    if (ie) {
                        var rng = obj.createTextRange();
                        rng.collapse(false);
                        rng.select();
                    } else {
                        var len = obj.value.length;
                        obj.setSelectionRange(len, len);
                    }
                }
            } catch (e) {}
        }, 50);
    });
}

// ----------------------------------------------
// display toggle
// ----------------------------------------------
function toggle(obj_id) {
    var obj = null;
    if (typeof(obj_id) == "string") obj = document.getElementById(obj_id);
    else obj = obj_id;
    if (!obj) return;
    try {
        var v = (obj.style.display == "none") ? "" : "none";
        obj.style.display = v;
    } catch (e) {}
}

// ----------------------------------------------
// get scrollHeight
// ----------------------------------------------
function get_scrollHeight(win) {
    if (!win) win = window;
    var quirks = (win.document.compatMode == "CSS1Compat") ? false : true;
    var body = win.document.body;
    var root = win.document.documentElement;
    if (ie) {
        if (quirks) return Math.max(body.scrollHeight, root.scrollHeight);
        else return root.scrollHeight;
    } else return body.scrollHeight;
}

// ----------------------------------------------
// get height
// ----------------------------------------------
function get_documentHeight(win) {
    if (!win) win = window;
    var quirks = (win.document.compatMode == "CSS1Compat") ? false : true;
    var body = win.document.body;
    var root = win.document.documentElement;
    if (ie) return body.scrollHeight;
    else if (firefox) return body.offsetHeight;
    else if (opera) return root.scrollHeight;
    else return body.offsetHeight;
}

// ----------------------------------------------
// get scrollTop
// ----------------------------------------------
function get_scrollTop(win) {
    if (!win) win = window;
    var quirks = (win.document.compatMode == "CSS1Compat") ? false : true;
    var body = win.document.body;
    var root = win.document.documentElement;
    if (ie && !quirks) return root.scrollTop;
    else return body.scrollTop;
}

// ----------------------------------------------
// set scrollTop
// ----------------------------------------------
function set_scrollTop(pos, win) {
    if (!win) win = window;
    var quirks = (win.document.compatMode == "CSS1Compat") ? false : true;
    var body = win.document.body;
    var root = win.document.documentElement;
    if (ie && !quirks) root.scrollTop = pos;
    else body.scrollTop = pos;
}

// ----------------------------------------------
// auto_fit_iframe
// ----------------------------------------------
function auto_fit_iframe(minHeight, addHeight) {
    set_ready(function() {
        window.setTimeout(function() {
            fit_iframe(minHeight, addHeight);
        }, 100);
    });
}


// ----------------------------------------------
// fit iframe
// ----------------------------------------------
function fit_iframe(minHeight, addHeight) {
    if (!minHeight) minHeight = 10;
    if (!addHeight) addHeight = 20;
    if (!window.frameElement) return;

    // -- save parent info -- //
    var psh = get_scrollHeight(window.parent);
    var pst = get_scrollTop(window.parent);

    // -- chrome & safari (shrink) -- //
    if (chrome || safari)
        window.frameElement.style.height = minHeight + "px";

    // -- fit iframe -- //
    var h = get_documentHeight(window) + addHeight;
    if (h < minHeight) h = minHeight;
    window.frameElement.style.height = h + "px";

    // -- scroll re-position -- //
    var nsh = get_scrollHeight(window.parent);

    if (psh <= nsh) {
        set_scrollTop(pst, window.parent);
    } else {
        var free = psh - pst;
        var dim = psh - nsh;
        if (free >= dim) {
            set_scrollTop(pst, window.parent);
        } else {
            var np = pst + dim;
            if (np < 0) np = 0;
            set_scrollTop(np, window.parent);
        }
    }
}

// ----------------------------------------------
// enter_submit (onkeypress)
// ----------------------------------------------
function enter_submit(e) {
    var key = null;
    var obj = null;
    if (ie) {
        key = window.event.keyCode;
        obj = window.event.srcElement;
    } else {
        key = e.which;
        obj = e.target;
    }
    if (key == 13) {
        try {
            obj.form.submit();
        } catch (e) {}
    }
}

// ------------------------------------------------------------------
// copy_n_paste
// ------------------------------------------------------------------
function copy_n_paste(copy_id, paste_id) {
    var src = document.getElementById(copy_id);
    var dst = document.getElementById(paste_id);
    if (!src || !dst) return;
    for (var node = src.firstChild; node; node = node.nextSibling)
        dst.appendChild(node.cloneNode(true));
}

// ------------------------------------------------------------------
// find_upto_remove
// ------------------------------------------------------------------
function find_upto_rem(obj, tag_name, cls_name) {
    for (var node = obj.parentNode; node; node = node.parentNode) {
        var tagname = (node.tagName) ? node.tagName.toLowerCase() : "";
        if (tagname == tag_name && node.className == cls_name) {
            node.parentNode.removeChild(node);
            break;
        }
    }
}

// ----------------------------------------------
// cmd open scroll window
// ----------------------------------------------
function open_swindow(path, win_name, width, height, center) {
    if (!width) width = 600;
    if (!height) height = 600;
    var win = "win_" + win_name;
    if (window[win]) {
        try {
            window[win].close();
        } catch (e) {}
    }

    var pos = "";
    if (center) {
        var mw = window.screen.availWidth;
        var mh = window.screen.availHeight;
        var left = parseInt((mw - width) / 2);
        var top = parseInt((mh - height) / 2) - 20;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        pos = ",left=" + left + ",top=" + top;
    }
    window[win] = window.open(path, win_name, "width=" + width + ",height=" + height + ",resizable=yes,scrollbars=yes" + pos);
}

// ----------------------------------------------
// 전체 체크
// ----------------------------------------------
function check_all(obj, field) {
    var arr = document.getElementsByName(field);
    if (!arr) return;
    for (var i = 0; i < arr.length; i++) {
        arr[i].checked = obj.checked;
    }
}

// ----------------------------------------------
// 텍스트영역 날짜 입력 처리
// ----------------------------------------------
function ta_add_date(obj_id, msg, name) {
    if (!name) name = "---------";
    else name = "[" + name + "] ";

    var obj = document.getElementById(obj_id);
    if (!obj) return;

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var weeks = ["일", "월", "화", "수", "목", "금", "토"];
    var weekday = weeks[d.getDay()];
    var hour = d.getHours();
    var minute = d.getMinutes();
    var str = "//----- " + year + "년 " + month + "월 " + day + "일 (" + hour + "시 " + minute + "분) " + weekday + "요일 " + name + "------------------------------------------------\r\n";
    if (msg == 1) str += "처리완료\r\n";
    obj.focus();
    if (obj.value) str = "\r\n\r\n" + str;
    obj.value += str;
    set_focus(obj_id);
}

// ----------------------------------------------
// 텍스트 영역 사이즈 조정
// ----------------------------------------------
function ta_add_size(obj_id) {
    var obj = document.getElementById(obj_id);
    if (!obj) return;

    var h = parseInt(obj.style.height);
    if (h <= 200)
        obj.style.height = 500 + "px";
    else if (h <= 500)
        obj.style.height = 1000 + "px";
    else
        obj.style.height = 200 + "px";
    fit_iframe(1);
}