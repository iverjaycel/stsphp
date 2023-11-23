// ----------------------------------------------------------
// input 포커스넘기기 (주민번호,전화번호)
// ----------------------------------------------------------
function next_input(h, nextnum, nextinput) {
    var f = h.form;
    if (h.value.length >= nextnum) {
        f.elements[nextinput].focus();
    }
}


// ----------------------------------------------------------
// 가격 3자리 점찍기
// ----------------------------------------------------------
function money_format(n) {
    var str = (n < 0) ? "-" : "";
    var s = (n < 0) ? -n + "" : n + "";
    var len = s.length;
    for (var i = 0; i < len; i++) {
        str += s.charAt(i);
        var j = len - i;
        if (j > 1 && j % 3 == 1)
            str += ",";
    }
    return str;
}


// ----------------------------------------------------------
// 주문넘기기
// ----------------------------------------------------------
function order_end(form_name) {
    form_name.ps_mode.value = "write";
    form_name.action = "m_userinfo_ok.php";
    form_name.submit();
    return true;
}

function order_back(form_name) {
    form_name.ps_mode.value = "back";
    form_name.action = "m_userinfo.php";
    form_name.submit();
    return true;
}

// ----------------------------------------------------------
// 이메일검증
// ----------------------------------------------------------
function isEmail(s) {
    var str = s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g);
    return str;
}


// ----------------------------------------------------------
// 우편번호
// ----------------------------------------------------------
function openzipcode1() {
    window.open("zipcode/zipcode.php?form=morning&zip1=zip1&zip2=zip2&address=address1", "zipwin", "width=520,height=260,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars,resizable=no");
}

function openzipcode2() {
    window.open("zipcode/zipcode.php?form=morning&zip1=zip3&zip2=zip4&address=address2", "zipwin", "width=520,height=260,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars,resizable=no");
}


// ----------------------------------------------------------
// 아이디 중복 검사
// ----------------------------------------------------------
function openoverlap() {
    var m = document.morning;

    if (m.id.value == "") {
        alert("ID는 필수 사항 입니다. 입력해 주세요.");
        m.id.focus();
        return false;
    }

    if ((m.id.value.length < 6) || (m.id.value.length > 16)) {
        alert("ID는 6글자 이상, 16글자 이하이여야 합니다.");
        m.id.focus();
        return false;
    }
    window.open("m_overlap.php?form=morning&focus=id&muid=" + m.id.value, "overlap", "width=420,height=250,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}


// ----------------------------------------------------------
// 입력창 늘리기
// ----------------------------------------------------------
function zoomform(zooms) {
    if (navigator.appName == 'Netscape') {
        alert("[입력창 늘리기]는\n\n익스플러4.0 이상의 브라우저를 사용해야\n\n사용 가능한 기능버튼입니다.\n\n네스케이프에서는 이용할 수 없습니다.");
        return;
    }

    zooms.rows = zooms.rows + 5;

    //if(zooms.rows == 3){zooms.rows =  10;}
    //else if(zooms.rows == 10){zooms.rows =  20;}
    //else if(zooms.rows == 15){zooms.rows =  20;}
    //else if(zooms.rows == 20){zooms.rows =  30;}
    //else if(zooms.rows == 30){zooms.rows =  40;}
    //else {zooms.rows =  3;}
}

function zoomform2(n) {
    if ($("#" + n).css("height") == "488px") {
        $("#" + n).css("height", "100");
    } else {
        $("#" + n).css("height", "500");
    }
}

// ----------------------------------------------------------
// 이미지 팝업창
// ----------------------------------------------------------
function show_image(uid, img, width, height) {
    newWin = window.open("m_show_image.php?image=" + img + "&uid=" + uid, "show", "width=" + width + ",height=" + height + ",top=50,left=130,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

function show_mall_image(uid, img, width, height) {
    newWin = window.open("m_show_image.php?image=" + img + "&uid=" + uid, "show", "width=" + width + ",height=" + height + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

function show_board_image(img, width, height) {
    newWin = window.open("m_show_board_image.php?image=" + img, "show", "width=" + width + ",height=" + height + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no");
}

var p_sel_num = 0;

function select_radio(num) {
    p_sel_num = num;
}


// ----------------------------------------------------------
// 투표
// ----------------------------------------------------------
function submit_vote() {
    if (p_sel_num == 0) {
        alert('설문 예제중에서 1개를 선택하신후 [투표] 버튼을 눌러주세요.');
        return;
    }
    winopen("m_poll_vote.php?num=" + p_sel_num, "설문조사", 500, 500);
}

function view_vote() {
    winopen("m_poll_view.php?", "설문조사", 500, 500);
}


// ----------------------------------------------------------
// 새창약식띄우기
// ----------------------------------------------------------
function winopen(url, title, w, h) {
    newwin = window.open(url, title, "toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=1,width=" + w + ",height=" + h + ",alwaysRadised=0");
    newwin.focus();
}


// ----------------------------------------------------------
// 메인 로그인 부분
// ----------------------------------------------------------
function check_main_login() {
    var m = document.morning_main_login;

    //alert(m.ps_murl.value);
    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }

    if (m.login_id.value.length == "") {
        alert("Only for Admin : Please input ID/Password");
        m.login_id.focus();
        return false;
    }

    if (m.login_pass.value.length == "") {
        alert("패스워드를 입력하여 주세요");
        m.login_pass.focus();
        return false;
    }

}


// ----------------------------------------------------------
// 좌측 로그인 부분
// ----------------------------------------------------------
function check_left_login() {
    var m = document.morning_left_login;

    //alert(m.ps_murl.value);
    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }

    if (m.login_id.value.length == "") {
        alert("아이디를 입력하여 주세요");
        m.login_id.focus();
        return false;
    }

    if (m.login_pass.value.length == "") {
        alert("패스워드를 입력하여 주세요");
        m.login_pass.focus();
        return false;
    }
}


// ----------------------------------------------------------
// 회원 아이디나 찾기 패스워드 찾기
// ----------------------------------------------------------
function check_member_loss() {
    var m = document.morning_loss;

    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }

    if ("undefined" != typeof m.loss_id) {
        if (m.loss_id.value.length == "") {
            alert(" 아이디를 입력하여 주십시오. ");
            m.loss_id.focus();
            return false;
        }
    }

    if (m.loss_name.value.length == "") {
        alert(" 이름을 입력하여 주십시오. ");
        m.loss_name.focus();
        return false;
    }

    if (m.loss_email.value.length == "") {
        alert(" 이메일주소를 입력하여 주십시오. ");
        m.loss_email.focus();
        return false;
    }

}


// ----------------------------------------------------------
// 회원 탈퇴
// ----------------------------------------------------------
function check_member_delete() {
    var m = document.morning_delete;

    if (m.del_id.value.length == "") {
        alert(" 아이디를 입력하여 주십시오. ");
        m.del_id.focus();
        return false;
    }

    if (m.del_pass.value.length == "") {
        alert(" 패스워드를 입력하여 주십시오. ");
        m.del_pass.focus();
        return false;
    }

    if (m.del_name.value.length == "") {
        alert(" 이름을 입력하여 주십시오. ");
        m.del_name.focus();
        return false;
    }

    if (m.del_email.value.length == "") {
        alert(" 이메일을 입력하여 주십시오. ");
        m.del_email.focus();
        return false;
    }

}


// ----------------------------------------------------------
// 간단한 서치
// ----------------------------------------------------------
function check_top_search() {
    var m = document.morning_top_search;

    if (m.ps_search.value.length == "") {
        alert("Please input the keyword you wish to search");
        m.ps_search.focus();
        return false;
    }
}


// ----------------------------------------------------------
// 새창 열기 기본 스크립트
// ----------------------------------------------------------
function open_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable) {
    toolbar_str = toolbar ? 'yes' : 'no';
    menubar_str = menubar ? 'yes' : 'no';
    statusbar_str = statusbar ? 'yes' : 'no';
    scrollbar_str = scrollbar ? 'yes' : 'no';
    resizable_str = resizable ? 'yes' : 'no';

    newWin = window.open(url, name, 'left=' + left + ',top=' + top + ',width=' + width + ',height=' + height + ',toolbar=' + toolbar_str + ',menubar=' + menubar_str + ',status=' + statusbar_str + ',scrollbars=' + scrollbar_str + ',resizable=' + resizable_str);
}


// ----------------------------------------------------------
// 회원 약관 확인 폼
// ----------------------------------------------------------
function check_license_submit() {
    if (!document.license.accept.checked) {
        alert("[회원 약관 및 개인정보 보호정책] 을\n\n읽으시고 동의하시는 분만 회원 가입을 하실수 있습니다..\n\n모두 읽으신후 동의하시면 체크를 하신후 회원 가입하여 주세요");
        return false;
    }
    return true;
}


// ----------------------------------------------------------
// 아이디 중복 검사 ( 회원 )
// ----------------------------------------------------------
function open_member_overlap() {
    var m = document.morning;

    if (m.m_id.value == "") {
        alert("ID는 필수 사항 입니다. 입력해 주세요.");
        m.m_id.focus();
        return false;
    }

    if ((m.m_id.value.length < 6) || (m.m_id.value.length > 16)) {
        alert("ID는 6글자 이상, 16글자 이하이여야 합니다.");
        m.m_id.focus();
        return false;
    }

    window.open("m_overlap.php?form=morning&focus=m_id&muid=" + m.m_id.value, "overlap", "width=420,height=250,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}


// ----------------------------------------------------------
// 회원 가입 체크폼
// ----------------------------------------------------------
function check_member_form() {
    var m = document.morning;

    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }

    if ("undefined" != typeof m.mobile_confirm_number) {
        if (m.mobile_confirm.value.length < 1) {
            alert("휴대폰인증하기 버튼을 클릭하신 후 휴대폰 인증번호를 정확히 입력해주세요.");
            m.mobile_confirm.focus();
            return false;
        }

        if (m.mobile_confirm.value != m.mobile_confirm_number.value) {
            alert("휴대폰 인증번호가 틀립니다. 다시 인증해주세요.");
            m.mobile_confirm.focus();
            return false;
        }
    }

    if ("undefined" != typeof m.m_id) {
        if (!m.m_id.value) {
            alert("아이디를 입력해주세요..");
            m.m_id.focus();
            return false;
        }

        if (!m.id_check.value) {
            alert("중복되지 않은 아이디를 정확하게 입력해주세요.");
            m.m_id.focus();
            return false;
        }
    }

    if ("undefined" != typeof m.old_pass) {
        if (m.old_pass.value.length < 4) {
            alert("[기존비밀번호]를 입력하셔야 회원정보를 수정하실 수 있습니다.");
            m.old_pass.focus();
            return false;
        }
    }

    if ("undefined" == typeof m.old_pass) {
        if (m.pass1.value.length < 10 || (m.pass1.value.length > 16)) {
            alert("[비밀번호]는 10글자 이상, 16글자 이하의 영문,숫자 혼합으로 이용하셔야 합니다.");
            m.pass1.focus();
            return false;
        }
        if (!/[a-z]/i.test(m.pass1.value) || !/[0-9]/.test(m.pass1.value)) {
            alert("[비밀번호]는 10글자 이상, 16글자 이하의 영문,숫자 혼합으로 이용하셔야 합니다.");
            m.pass1.focus();
            return false;
        }
    } else {
        if (m.pass1.value.length > 0) {
            if (m.pass1.value.length < 10 || (m.pass1.value.length > 16)) {
                alert("[비밀번호]는 10글자 이상, 16글자 이하의 영문,숫자 혼합으로 이용하셔야 합니다.");
                m.pass1.focus();
                return false;
            }
            if (!/[a-z]/i.test(m.pass1.value) || !/[0-9]/.test(m.pass1.value)) {
                alert("[비밀번호]는 10글자 이상, 16글자 이하의 영문,숫자 혼합으로 이용하셔야 합니다.");
                m.pass1.focus();
                return false;
            }
        }
    }

    if ((m.pass1.value) != (m.pass2.value)) {
        alert("비밀번호 같지 않습니다 정확히 입력해 주세요. ");
        m.pass1.focus();
        return false;
    }

    if (m.name.value.length == "") {
        alert("[이름]는 필수 항목입니다. 입력 하여 주세요.");
        m.name.focus();
        return false;
    }

    if ("undefined" == typeof m.old_pass) {
        if (m.sex[0].checked != true && m.sex[1].checked != true) {
            alert("[성별]을 선택해주세요.");
            m.sex[0].focus();
            return false;
        }
    }

    if (m.tel1_01.value.length == "" || m.tel1_02.value.length == "" || m.tel1_03.value.length == "") {
        alert("전화를 정확히 입력하여 주세요");
        m.tel1_01.focus();
        return false;
    }

    if (m.tel2_01.value.length == "" || m.tel2_02.value.length == "" || m.tel2_03.value.length == "") {
        alert("휴대폰번호를 정확히 입력하여 주세요");
        m.tel2_01.focus();
        return false;
    }

    if ((m.zip1.value.length == "") || (m.zip2.value.length == "")) {
        alert("우편번호를 입력하여 주세요");
        m.zip1.focus();
        return false;
    }

    if (m.address1.value.length == "") {
        alert("주소를 입력하여 주세요");
        m.address1.focus();
        return false;
    }

    if (m.email1.value.length < 2) {
        alert("[E-mail] 주소를 정확하게 입력하여 주세요.");
        m.email1.focus();
        return false;
    }

    if (m.email2.value.length < 5) {
        alert("[E-mail] 주소를 정확하게 입력하여 주세요.");
        return false;
    }

    m.target = "target_frame1";
    m.submit();

}


// ----------------------------------------------------------
// 휴대폰인증
// ----------------------------------------------------------
//휴대폰인증
function mobile_confirm_ok() {
    var m = document.morning;

    if (m.mobile_confirm.value.length > 4) {
        if (m.mobile_confirm.value == m.mobile_confirm_number.value) {
            $("#mobile_confirm").fadeOut(500);
        }
    }
}

function mobile_confirm_reset() {
    var m = document.morning;

    m.mobile_confirm.value = "";
    if ("undefined" != typeof m.mobile_confirm_number) {
        m.mobile_confirm_number.value = "";
    }
    $("#mobile_confirm").fadeOut(300);
    $("#bt_mobile_confirm").show();
}

function send_confirm_sms(num) {
    var m = document.morning;

    if (m.tel2_01.value.length < 3 || m.tel2_02.value.length < 3 || m.tel2_03.value.length < 4) {
        alert("휴대폰 번호를 정확히 입력해주세요.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "./m_member_ok.php",
        data: "ps_mode=mobile_confirm&mobile_number=" + num,

        success: function(req) {
            if ("undefined" != typeof m.mobile_confirm_number) {
                m.mobile_confirm_number.value = req;
            }
            $("#mobile_confirm").fadeIn(500);
            $("#bt_mobile_confirm").hide();
        }
    });
}


// ----------------------------------------------------------
// 주문서 입력폼 체크
// ----------------------------------------------------------
function check_userinfo() {

    var m = document.morning;

    //alert(m.ps_murl.value);
    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }

    if ("undefined" != typeof m.accept1) {
        if (m.accept1.checked == false) {
            alert("개인정보보호정책 동의버튼을 클릭해주세요.");
            m.accept1.focus();
            return false;
        }
    }

    if (m.buyer_name1.value.length == "") {
        alert("[구매자 성함]는 필수 항목 입니다. 입력해 주십시오.");
        m.buyer_name1.focus();
        return false;
    }


    if (!m["buyer_tel1[0]"].value || !m["buyer_tel1[1]"].value || !m["buyer_tel1[2]"].value) {
        alert("[전화번호]는 필수 항목 입니다. 입력해 주십시오.");
        m["buyer_tel1[0]"].focus();
        return false;
    }

    if (!m["buyer_tel2[0]"].value || !m["buyer_tel2[1]"].value || !m["buyer_tel2[2]"].value) {
        alert("[휴대폰번호]는 필수 항목 입니다. 입력해 주십시오.");
        m["buyer_tel2[0]"].focus();
        return false;
    }

    if ("undefined" != typeof m.zip1) {
        if (m.zip1.value.length == "" || m.zip2.value.length == "") {
            alert("[우편번호]는 필수 항목 입니다. 입력해 주십시오.");
            m.zip1.focus();
            return false;
        }
    }

    if (m.address1.value.length == "") {
        alert("[구매자 주소]는 필수 항목 입니다. 입력해 주십시오.");
        m.address1.focus();
        return false;
    }

    if (m.buyer_email.value.length == "") {
        alert("[구매자 메일]는 필수 항목 입니다. 입력해 주십시오.");
        m.buyer_email.focus();
        return false;
    }

    if (m.buyer_name3.value.length == "") {
        alert("배송 받는분의 이름을 입력해 주세요.");
        m.buyer_name3.focus();
        return false;
    }

    if (!m["buyer_tel3[0]"].value || !m["buyer_tel3[1]"].value || !m["buyer_tel3[2]"].value) {
        alert("배송 받는분의 연락처를 남겨주세요.");
        m["buyer_tel3[0]"].focus();
        return false;
    }

    if (!m["buyer_tel4[0]"].value || !m["buyer_tel4[1]"].value || !m["buyer_tel4[2]"].value) {
        alert("배송 받는분의 휴대폰을 남겨주세요.");
        m["buyer_tel4[0]"].focus();
        return false;
    }

    if ("undefined" != typeof m.zip3) {
        if (m.zip3.value.length == "" || m.zip4.value.length == "") {
            alert("[우편번호]는 필수 항목 입니다. 입력해 주십시오.");
            m.zip3.focus();
            return false;
        }
    }

    if (m.address2.value.length == "") {
        alert("[배송지 주소]는 필수 항목 입니다. 입력해 주십시오.");
        m.address2.focus();
        return false;
    }


    if ("undefined" != typeof m.buyer_payment) {

        if (!$("input:radio[name='buyer_payment']:checked").val()) {
            alert("결제방법을 선택해 주세요.");
            return false;
        }

        if ($("input:radio[name='buyer_payment']:checked").val() == "2" && $("input:text[name='buyer_name2']").val() == "") {
            alert("입금자의 성함을 입력하세요.");
            return false;
        }
    }

    m.submit();
}

// ----------------------------------------------------------
// 주문서 입력폼 체크
// invaderx
// ----------------------------------------------------------
function check_userinfo_estimate() {

    var m = document.morning;

    //alert(m.ps_murl.value);
    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }



    if (m.buyer_name1.value.length == "") {
        alert("Please input your name");
        m.buyer_name1.focus();
        return false;
    }


    if (!m["buyer_tel1[0]"].value || !m["buyer_tel1[1]"].value || !m["buyer_tel1[2]"].value) {
        alert("Please input your phone number");
        m["buyer_tel1[0]"].focus();
        return false;
    }

    if (!m["buyer_tel2[0]"].value || !m["buyer_tel2[1]"].value || !m["buyer_tel2[2]"].value) {
        alert("Please input your mobile ");
        m["buyer_tel2[0]"].focus();
        return false;
    }


    m.submit();
}


// ----------------------------------------------------------
// 주문서확인폼 체크
// ----------------------------------------------------------
function check_userinfo_confirm() {
    var m = document.morning;

    //alert(m.ps_murl.value);
    if (m.ps_ssl.value == 1 && m.ps_murl.value) {
        m.action = m.ps_murl.value;
    }
}

// ----------------------------------------------------------
// 같은 내용 카피
// ----------------------------------------------------------
function accept_check() {
    var m = document.morning;
    m.buyer_name3.value = m.buyer_name1.value;
    m["buyer_tel3[0]"].value = m["buyer_tel1[0]"].value;
    m["buyer_tel3[1]"].value = m["buyer_tel1[1]"].value;
    m["buyer_tel3[2]"].value = m["buyer_tel1[2]"].value;
    m["buyer_tel4[0]"].value = m["buyer_tel2[0]"].value;
    m["buyer_tel4[1]"].value = m["buyer_tel2[1]"].value;
    m["buyer_tel4[2]"].value = m["buyer_tel2[2]"].value;

    if ("undefined" != typeof m.zip3) {
        m.zip3.value = m.zip1.value;
        m.zip4.value = m.zip2.value;
    }

    m.address2.value = m.address1.value;

    get_dosun();
}

// ----------------------------------------------------------
// 에러시 체크
// ----------------------------------------------------------
function error(elem, text) {
    window.alert(text);
    elem.select();
    elem.focus();
}


// ----------------------------------------------------------
// 주민번호 체크
// ----------------------------------------------------------
function jumincheck(jumin1, jumin2) {

    var str_jumin1 = jumin1.value;
    var jumin1_err = jumin1;
    var str_jumin2 = jumin2.value;
    var jumin2_err = jumin2;
    var checkImg = '';


    var i3 = 0
    for (var i = 0; i < str_jumin1.length; i++) {
        var ch1 = str_jumin1.substring(i, i + 1);
        if (ch1 < '0' || ch1 > '9') {
            i3 = i3 + 1
        }
    }
    if ((str_jumin1 == '') || (i3 != 0)) {
        error(jumin1_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }


    var i4 = 0
    for (var i = 0; i < str_jumin2.length; i++) {
        var ch1 = str_jumin2.substring(i, i + 1);
        if (ch1 < '0' || ch1 > '9') {
            i4 = i4 + 1
        }
    }
    if ((str_jumin2 == '') || (i4 != 0)) {
        error(jumin2_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    //		if(str_jumin1.substring(0,1) < 4)
    //		{
    //   	  error(jumin2_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
    //   	  return false;
    //		}

    if (str_jumin2.substring(0, 1) > 2) {
        error(jumin2_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    if ((str_jumin1.length > 7) || (str_jumin2.length > 8)) {
        error(jumin2_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    if ((str_jumin1 == '72') || (str_jumin2 == '18')) {
        error(jumin1_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    var f1 = str_jumin1.substring(0, 1)
    var f2 = str_jumin1.substring(1, 2)
    var f3 = str_jumin1.substring(2, 3)
    var f4 = str_jumin1.substring(3, 4)
    var f5 = str_jumin1.substring(4, 5)
    var f6 = str_jumin1.substring(5, 6)
    var hap = f1 * 2 + f2 * 3 + f3 * 4 + f4 * 5 + f5 * 6 + f6 * 7
    var l1 = str_jumin2.substring(0, 1)
    var l2 = str_jumin2.substring(1, 2)
    var l3 = str_jumin2.substring(2, 3)
    var l4 = str_jumin2.substring(3, 4)
    var l5 = str_jumin2.substring(4, 5)
    var l6 = str_jumin2.substring(5, 6)
    var l7 = str_jumin2.substring(6, 7)
    hap = hap + l1 * 8 + l2 * 9 + l3 * 2 + l4 * 3 + l5 * 4 + l6 * 5
    hap = hap % 11
    hap = 11 - hap
    hap = hap % 10
    if (hap != l7) {
        error(jumin1_err, '주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    var i9 = 0

    return true;

}


// ----------------------------------------------------------
// 삭제시 물어보는 스크립트
// ----------------------------------------------------------
function del_really() {
    if (confirm('\n삭제는 복구가 불가능합니다.\n삭제시 데이터는 완전 삭제됩니다.\n\n(정말로 삭제하시겠습니까?)\n')) return true;
    return false;
}


// ----------------------------------------------------------
// 폼 메일러
// ----------------------------------------------------------
function morning_mailer_check() {
    var m = document.morning_mailer;

    if (m.mailer_receive_email.value.length == "") {
        alert("받는분 이메일은 필수 입니다.");
        m.mailer_receive_email.focus();
        return false;
    }

    if (m.mailer_subject.value.length == "") {
        alert("메일 제목은 필수 입니다.");
        m.mailer_subject.focus();
        return false;
    }

    if (m.mailer_body.value.length == "") {
        alert("메일 내용은 필수 입니다.");
        m.mailer_body.focus();
        return false;
    }

}


// ----------------------------------------------------------
// 콜센터 메일러
// ----------------------------------------------------------
function morning_callmailer_check() {
    var m = document.morning_mailer;

    if ("undefined" != typeof m.accept2) {
        if (m.accept2.checked != true) {
            alert("개인정보취급방침에 동의해주세요.");
            m.accept2.focus();
            return false;
        }
    }

    if (m.mailer_send_name.value == "") {
        alert("성함을 입력하세요");
        m.mailer_send_name.focus();
        return false;
    }

    if (m.q_mode.value == "") {
        alert("상담종목을 선택하세요");
        m.q_mode.focus();
        return false;
    }

    if (m.mailer_send_email.value == "") {
        alert("답변을 받을 메일주소를 입력하세요.");
        m.mailer_send_email.focus();
        return false;
    }

    if (m.mailer_subject.value == "") {
        alert("제목을 입력하세요.");
        m.mailer_subject.focus();
        return false;
    }

    if (m.mailer_body.value == "") {
        alert("내용을 입력하세요.");
        m.mailer_body.focus();
        return false;
    }
}


// ----------------------------------------------------------
// 폼 메일러
// ----------------------------------------------------------
function morning_recommend_check() {
    var m = document.morning_mailer;

    if (m.mailer_receive_email.value.length == "") {
        alert("받는분 이메일은 필수 입니다.");
        m.mailer_receive_email.focus();
        return false;
    }
}

function really_all() {
    if (confirm('\n삭제는 복구가 불가능합니다.\n삭제시 데이터는 완전 삭제됩니다.\n\n(정말로 삭제 하시겠습니까?)\n')) {
        document.uid_check_form.submit();
    }
    return false;
}


// ----------------------------------------------------------
// PHPSCHOOL 로야님의 소스 
// ----------------------------------------------------------
function setEmbed() {
    var obj = new String;
    var parameter = new String;
    var embed = new String;
    var html = new String;
    var allParameter = new String;
    var clsid = new String;
    var codebase = new String;
    var pluginspace = new String;
    var embedType = new String;
    var src = new String;
    var width = new String;
    var height = new String;


    this.init = function(getType, s, w, h) {

        if (getType == "flash") {

            clsid = "D27CDB6E-AE6D-11cf-96B8-444553540000";
            codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0";
            pluginspage = "http://www.macromedia.com/go/getflashplayer";
            embedType = "application/x-shockwave-flash";
        }
        /* type 추가 
        else if ( ) 
        { 
        } 
        */

        parameter += "<param name='movie' value='" + s + "'>\n";
        parameter += "<param name='quality' value='high'>\n";

        src = s;
        width = w;
        height = h;
    }

    this.parameter = function(parm, value) {
        parameter += "<param name='" + parm + "' value='" + value + "'>\n";
        allParameter += " " + parm + "='" + value + "'";
    }

    this.show = function() {
        if (clsid) {
            obj = "<object classid=\"clsid:" + clsid + "\" codebase=\"" + codebase + "\" width='" + width + "' height='" + height + "'>\n";
        }

        embed = "<embed src='" + src + "' pluginspage='" + pluginspage + "' type='" + embedType + "' width='" + width + "' height='" + height + "'" + allParameter + " ></embed>\n";

        if (obj) {
            embed += "</object>\n";
        }

        html = obj + parameter + embed;

        document.write(html);
    }

}


// ----------------------------------------------------------
// 쿠폰관련
// ----------------------------------------------------------
// 쿠폰받기창 띄우기 
function coupon_view(cuid) {
    open_window('coupon', 'm_coupon_view.php?ps_cuid=' + cuid, 40, 40, 780, 450, 0, 0, 0, 1, 1);
}

// 쿠폰 카테고리 확인창
function coupon_muse(cuid) {
    open_window('coupon', 'm_coupon_use.php?ps_mode=category&ps_cuid=' + cuid, 40, 40, 430, 300, 0, 0, 0, 1, 1);
}

function coupon_suse(cuid) {
    open_window('coupon', 'm_coupon_use.php?ps_mode=goods&ps_cuid=' + cuid, 40, 40, 430, 300, 0, 0, 0, 1, 1);
}


// ----------------------------------------------------------
//maxlength 만큼 옮기면 다음으로 이동하기.... onkeyup="nextFocus('form1','jumin1','jumin2')"
// ----------------------------------------------------------
function nextFocus(sFormName, sNow, sNext) {
    var sForm = 'document.' + sFormName + '.'
    var oNow = eval(sForm + sNow);

    if (typeof oNow == 'object') {
        if (oNow.value.length == oNow.maxLength) {
            var oNext = eval(sForm + sNext);

            if ((typeof oNext) == 'object')
                oNext.focus();
        }
    }
}


// ----------------------------------------------------------
// 주민번호체크
// ----------------------------------------------------------
function jumin_chk(numbers) {

    fmt = /^\d{6}[1234]\d{6}$/;
    if (!fmt.test(numbers)) {
        alert('잘못된 주민등록번호입니다.');
        return false;
    }

    birthYear = (numbers.charAt(6) <= '2') ? '19' : '20';
    birthYear += numbers.substr(0, 2);
    birthMonth = numbers.substr(2, 2) - 1;
    birthDate = numbers.substr(4, 2);
    birth = new Date(birthYear, birthMonth, birthDate);

    if (birth.getYear() % 100 != numbers.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) {
        alert('잘못된 주민등록번호입니다.');
        return false;
    }

    buf = new Array(13);
    for (i = 0; i < 13; i++) buf[i] = parseInt(numbers.charAt(i));

    multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

    if ((11 - (sum % 11)) % 10 != buf[12]) {
        alert('잘못된 주민등록번호입니다.');
        return false;
    }
    return true;

}


// ----------------------------------------------------------
// 찜바구니에서 장바구니담기
// ----------------------------------------------------------
function zzcart(form_name) {
    var m = form_name;

    if ("undefined" != typeof m.goods_option1) {
        if (m.goods_option1.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option2) {
        if (m.goods_option2.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option3) {
        if (m.goods_option3.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option4) {
        if (m.goods_option4.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option5) {
        if (m.goods_option5.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option6) {
        if (m.goods_option6.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option8) {
        if (m.goods_option8.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    m.action = "m_cart.php";
    m.submit();
    return;
}


// ----------------------------------------------------------
// onoff 레이어
// ----------------------------------------------------------
function _IDLY(obj) {
    return document.getElementById(obj)
}

function onofflayer(obj, mode) {
    obj = _IDLY(obj);
    if (mode) obj.style.display = mode;
    else obj.style.display = (obj.style.display != "none") ? "none" : "block";
}


// ----------------------------------------------------------
// 게시물 전체선택
// ----------------------------------------------------------
function check_it() {
    var from = document.uid_check_form;
    var uid_check = document.getElementsByName("uid_check[]");

    if (from.but.checked == true) {
        for (i = 0; i < uid_check.length; i++) {
            uid_check[i].checked = true;
        }
    } else {
        for (i = 0; i < uid_check.length; i++) {
            uid_check[i].checked = false;
        }
    }
}


// ----------------------------------------------------------
// 공유하기에 사용하는 링크
// ----------------------------------------------------------
function goTwitter(msg, url) {
    var href = "http://twitter.com/home?status=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
    var twitter = window.open(href, 'twitter', '');
    twitter.focus();
}

function goFaceBook(msg, url) {
    var href = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent(msg);
    var facebook = window.open(href, 'facebook', '');
    facebook.focus();
}

function goMe2Day(msg, url, tag) {
    var href = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(msg) + " " + encodeURIComponent(url) + "&new_post[tags]=" + encodeURIComponent(tag);
    var me2Day = window.open(href, 'me2Day', '');
    me2Day.focus();
}


// ----------------------------------------------------------
// 찜
// ----------------------------------------------------------
function Zzim(uid, mode) {
    //dynamic.src = "m_mylist_write.php?goods_num="+uid+"&mymode="+mode;
    target_frame1.location.href = "m_mylist_write.php?goods_num=" + uid + "&mymode=" + mode;
}


// ----------------------------------------------------------
// 쇼하이드
// ----------------------------------------------------------
function show(p) {
    document.getElementById(p).style.display = 'block';
}

function hide(p) {
    document.getElementById(p).style.display = 'none';
}


// ----------------------------------------------------------
// 장바구니담기
// ----------------------------------------------------------
function sendcart(form_name, c_flag, url) {

    var m = form_name;

    if ("undefined" != typeof m.goods_option1) {
        if (m.goods_option1.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option2) {
        if (m.goods_option2.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option3) {
        if (m.goods_option3.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option4) {
        if (m.goods_option4.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option5) {
        if (m.goods_option5.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option6) {
        if (m.goods_option6.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option8) {
        if (m.goods_option8.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    form_name.ps_select.value = c_flag;
    if (c_flag == "C") {
        form_name.target = "target_frame1";
    } else {
        form_name.target = "";
    }

    if (!url) {
        form_name.action = "m_cart.php";
    } else {
        form_name.charset = 'utf-8';
        form_name.action = url;
    }

    form_name.submit();
    return;
}


// ----------------------------------------------------------
// 장바구니담기
// ----------------------------------------------------------
function sendcartestimate(form_name, c_flag, url, estimate_popup) {

    var m = form_name;

    if ("undefined" != typeof m.goods_option1) {
        if (m.goods_option1.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option2) {
        if (m.goods_option2.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option3) {
        if (m.goods_option3.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option4) {
        if (m.goods_option4.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option5) {
        if (m.goods_option5.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option6) {
        if (m.goods_option6.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    if ("undefined" != typeof m.goods_option8) {
        if (m.goods_option8.value == ",,,0") {
            alert("옵션을 선택하세요.");
            return;
        }
    }

    form_name.ps_select.value = c_flag;
    if (c_flag == "C") {
        form_name.target = "target_frame1";
    } else {
        form_name.target = "";
    }

    if (!url) {
        form_name.action = "m_cart_estimate.php";
    } else {
        form_name.charset = 'utf-8';
        form_name.action = url;
    }

    if (estimate_popup) {
        window.open("about:blank", "estimate", "width=800, height=700,scrollbars=1");
        form_name.target = "estimate";
    }

    form_name.action = "m_cart_estimate.php";
    form_name.estimate_popup.value = estimate_popup;
    form_name.estimate.value = '1';

    form_name.submit();
    return;
}

// ----------------------------------------------------------
// 장바구니 수량수정
// ----------------------------------------------------------
function cart_change(form_name, c_flag) {

    form_name.ps_caid.value = c_flag;

    form_name.action = "m_cart.php";
    form_name.submit();

    return;
}


// ----------------------------------------------------------
// 3자리마다 점찍기
// ----------------------------------------------------------
function addCommas(strValue) {
    var objRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');

    while (objRegExp.test(strValue)) {
        strValue = strValue.replace(objRegExp, '$1,$2');
    }
    return strValue;
}


// ----------------------------------------------------------
// 상품 상세보기 수량올리기버튼
// ----------------------------------------------------------
function good_cal(val) {
    if (val > 0) {
        goods.ps_num.value = (goods.ps_num.value * 1) + 1;
    } else {
        if (goods.ps_num.value > 1) {
            goods.ps_num.value = goods.ps_num.value - 1;
        }
    }

    var m = document.goods;
    var dft = ",,,0";

    if ("undefined" != typeof m.goods_option1) {
        var option1_row = m.goods_option1.value.split(",");
    } else {
        var option1_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option2) {
        var option2_row = m.goods_option2.value.split(",");
    } else {
        var option2_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option3) {
        var option3_row = m.goods_option3.value.split(",");
    } else {
        var option3_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option8) {
        var option8_row = m.goods_option8.value.split(",");
    } else {
        var option8_row = dft.split(",");
    }

    if (option8_row[3] > 0) {
        m.option_money.value = (parseInt(option1_row[3]) + parseInt(option2_row[3]) + parseInt(option3_row[3]) + parseInt(option8_row[3])) * m.ps_num.value;
    } else {
        m.option_money.value = (parseInt(option1_row[3]) + parseInt(option2_row[3]) + parseInt(option3_row[3]) + parseInt(m.money_ea.value)) * m.ps_num.value;
    }

    m.option_money.value = addCommas(m.option_money.value) + "원";

    return;
}


// ----------------------------------------------------------
// 도선료
// ----------------------------------------------------------
function get_dosun() {
    $("input:text[name='use_buyer_point']").val($("input:text[name='use_buyer_point']").val() * 1);
    var delivery_dosun = $("input:hidden[name='delivery_dosun']").val();
    var delivery_dosun_price = $("input:hidden[name='delivery_dosun_price']").val();
    var delivery_method = $("input:radio[name='delivery_method']:checked").val();

    var delivery_dosun_arr = delivery_dosun.split("/");

    var address2 = $("input:text[name='address2']").val();
    $("input:hidden[name='ps_delivery_dosun']").val(0);

    for (i = 0; i < delivery_dosun_arr.length; i++) {
        if (address2.indexOf(delivery_dosun_arr[i]) > -1) {
            $("input:hidden[name='ps_delivery_dosun']").val(delivery_dosun_price);
        }
    }

    //착불인지..
    if ("undefined" != typeof delivery_method) {
        if (delivery_method.indexOf("착불") > -1) {
            $("input:hidden[name='ps_delivery_dosun']").val("0");
        }
    }

    point_check();
}

// ----------------------------------------------------------
// 주문서작성 mall_userinfo.html
// ----------------------------------------------------------
function point_check() {
    var m = document.morning;
    var account_price = 0;
    var total_price = m.ps_total_price.value; //순수상품금액
    var total_delivery = m.basic_delivery_price1.value; //무개별포함 총 배송비
    var total_pay = (total_price * 1) + (total_delivery * 1); //배송비포함 총 결제액
    var total_delivery_add = m.ps_total_delivery_add.value;
    var delivery_price = 0;
    var delivery_max_price = 0;
    var wrapping_price = 0;
    var delivery_data = "";
    var wrapping_data = "";
    var temparray1 = new Array();
    var temparray2 = new Array();
    var coupon_use = 0;
    var coupon_price = 0;
    var cf_besong_type = m.cf_besong_type.value;
    var user_point = m.ps_user_point.value;
    var use_giftcard = 0;
    var use_max_point = m.use_max_point.value;
    var ps_delivery_dosun = m.ps_delivery_dosun.value;

    if ("undefined" != typeof m.giftcard_price) {
        var giftcard_price = m.giftcard_price.value; //기프트카드 사용액

        if (giftcard_price < 0) {
            m.giftcard_price.value = "0";
            m.giftcard_use.value = "";
        }
    } else {
        var giftcard_price = 0;
    }

    if ("undefined" != typeof m.use_buyer_point) {
        var use_point = m.use_buyer_point.value;
    } else {
        var use_point = 0;
    }

    if ("undefined" != typeof m.coupon_use) {
        coupon_use = m.coupon_use.value;
        coupon_price = m.coupon_price.value;
    }

    if (coupon_price == "") {
        coupon_price = 0;
    }
    if (use_point == "") {
        use_point = 0;
    }

    //거래업체별 배송료사용
    if (cf_besong_type == "1") {
        delivery_price = m.basic_delivery_price1.value;

    } else {
        //거래업체별 배송료사용이 아닐때

        if ("undefined" != typeof m.delivery_method) {
            for (i = 0; i < m.delivery_method.length; i++) {
                if (m.delivery_method[i].checked) {
                    delivery_data = m.delivery_method[i].value;
                }
            }
            if (!delivery_data) {
                delivery_data = m.delivery_method.value;
            }

            temparray1 = delivery_data.split(",");
            delivery_price = temparray1[1];
            delivery_max_price = temparray1[2];
        }

        if ("undefined" != typeof m.wrapping_method) {
            for (i = 0; i < m.wrapping_method.length; i++) {
                if (m.wrapping_method[i].checked) {
                    wrapping_data = m.wrapping_method[i].value;
                }
            }
            if (!wrapping_data) {
                wrapping_data = m.wrapping_method.value;
            }


            temparray2 = wrapping_data.split(",");
            wrapping_price = temparray2[1];
        }


        if (eval(total_price) >= eval(delivery_max_price)) {
            delivery_price = "0";
        }
        if (m.basic_delivery_price2.value == "1") {
            delivery_price = "0";
        }

    }

    //도선료추가
    delivery_price = eval(delivery_price) + eval(ps_delivery_dosun * 1);



    //기프트카드 사용액계산
    if (giftcard_price > 0) {
        var remain_price = eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) - eval(use_point) - eval(giftcard_price);

        if (remain_price > 0) {
            use_giftcard = giftcard_price;
        } else {
            use_giftcard = eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) - eval(use_point);
        }
        document.getElementById('giftcard_mss').childNodes[0].nodeValue = "기프트카드 사용후 남은 차액은 적립금으로 전환됩니다.";

        m.giftcard_price.value = use_giftcard;
    }

    //사용포인트 숫자체크
    if ("undefined" != typeof m.use_buyer_point) {
        if (isNaN(use_point)) {
            alert("사용 포인트는 숫자만 입력하여 주십시오.");
            m.use_buyer_point.value = 0;
            m.total_account_price.value = eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price);
            m.remain_buyer_point.value = addCommas(user_point + "") + "점";
            return;
        }
    }

    //보유한 포인트보다 많이 사용할경우..
    if ("undefined" != typeof m.use_buyer_point) {
        if (eval(user_point) < eval(use_point)) {
            alert("사용 가능한 포인트(" + user_point + ")보다 많은 포인트를 사용 하실수 없습니다.");
            m.use_buyer_point.value = 0;
            m.total_account_price.value = addCommas(eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) + "") + "원";
            m.remain_buyer_point.value = addCommas(user_point + "") + "점";
            return;
        }
    }

    if (eval(use_max_point) > 0 && eval(use_max_point) < eval(use_point)) {
        alert("적립금은 최대 " + use_max_point + "점 까지 사용하실 수 있습니다.");
        m.use_buyer_point.value = 0;
        m.total_account_price.value = addCommas(eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) + "") + "원";
        m.remain_buyer_point.value = eval(user_point);
        return;
    }

    if ("undefined" != typeof m.coupon_use) {
        if (eval(total_price) < eval(coupon_price)) {
            alert("물품 구입액수 보다 쿠폰할인액수가 더 많습니다. 확인 하여 주십시오.");
            m.use_buyer_point.value = 0;
            m.total_account_price.value = addCommas(eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) + "") + "원";
            m.remain_buyer_point.value = addCommas(user_point + "") + "점";
            m.coupon_use.value = 0;
            m.coupon_price.value = 0;
            return;
        }
    }

    if ("undefined" != typeof m.use_buyer_point) {
        if (eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) < eval(use_point)) {
            alert("결제 금액 보다 많은 포인트를 입력 하셨습니다.");
            m.use_buyer_point.value = 0;
            m.total_account_price.value = addCommas(eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(coupon_price) + "") + "원";
            m.remain_buyer_point.value = addCommas(user_point + "") + "점";
            m.giftcard_price.value = 0;
            m.giftcard_use.value = "";
            return;
        }
    }
    var account_price = eval(total_price) + eval(delivery_price) + eval(wrapping_price) + eval(total_delivery_add) - eval(use_point) - eval(coupon_price) - eval(use_giftcard); //총결제금액
    var remain_point = eval(user_point) - eval(use_point); //사용한후 보유포인트

    m.total_account_price.value = addCommas(account_price * 1 + "") + "원";

    if ("undefined" != typeof m.remain_buyer_point) {
        m.remain_buyer_point.value = addCommas(remain_point + "") + "점";
    }

}


function coupon_select() {
    var m = document.morning;
    // 카테고리 또는 상품 입력 
    open_window('goods', 'm_coupon_select.php', 140, 140, 620, 600, 0, 0, 0, 1, 0);
}

// 과거배송지조회
function open_besong() {
    window.open("m_besong_search.php", "supply", "width=630,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no");
}


//입금은행
function show_bank(str) {

    //무통장선택
    if (str == "mu") {
        $("#show_bank").show();
        $("#show_tax").show();
    }

    //신용카드선택
    if (str == "sinyong") {
        $("#show_bank").hide();
        $("#show_tax").hide();
    }

    //다른결제(입금통장입력만 없애기)
    if (str == "nobank") {
        $("#show_bank").hide();
        $("#show_tax").show();
    }
}


function show_bank_m(str) {
    if (str == "on") {
        $(".show_mu").show();
    } else {
        $(".show_mu").hide();
    }
}


//세금계산서,영수증
function tax_display(str) {
    document.getElementById('tax_1').style.display = 'none';
    document.getElementById('tax_2').style.display = 'none';
    document.getElementById('tax_3').style.display = 'none';

    if (str) {
        document.getElementById(str).style.display = 'block';
    }
}


// ----------------------------------------------------------
// 사은품선택 mall_userinfo_confirm.html
// ----------------------------------------------------------
function chkNumeric(objText) {
    var chrTmp;
    var strTmp = objText.value;
    var chkAlpha = false;
    var resString = '0';

    for (var i = 0; i <= strTmp.length; i++) {
        chrTmp = strTmp.charCodeAt(i);
        if ((chrTmp <= 47 && chrTmp > 31) || chrTmp >= 58) {
            chkAlpha = true;
        } else {
            resString = resString + String.fromCharCode(chrTmp);
        }
    }

    if (chkAlpha == true) {
        alert("숫자만을 입력하세요");
        objText.value = resString;
        objText.focus();
        return false;
    }
    return true;
}

function set_goods_cnt(type, inum) {
    var m = document.morning;
    var cnt = "";
    var cnt_text;
    var cnt_num = 0;

    for (i = 0; i < m.elements.length; i++) {
        var t = morning.elements[i];
        if ((t.name == "gift_num[]") && (t.type == "text") && (cnt_num == inum)) {
            cnt = t.value;
            cnt_text = t;
        }

        if ((t.name == "gift_num[]") && (t.type == "text")) {
            cnt_num++;
        }
    }

    if (!cnt_text) alert("선택된 사은품을 선택할수가 없습니다. 직접 손으로 변경 바랍니다.");
    chkNumeric(cnt_text);

    if (type == 'up') {
        if (cnt >= 0 && cnt <= 999) {
            cnt_text.value = eval(eval(cnt) + 1);
        } else {
            cnt_text.cnt.value = 1;
        }
    } else {
        if (cnt > 0) {
            cnt_text.value = eval(eval(cnt) - 1);
        } else {
            cnt_text.value = 0;
        }
    }
    gift_check(inum);
    return;
}

function gift_check(inum) {
    var m = document.morning;
    var total_price = m.gift_all_price.value;
    var temparray2 = new Array();
    var gift_price = 0;

    var one_check = 0;
    var tc = 0;
    var wc = 0;
    var gift_check = new Array();
    var gift_num = new Array();
    var i;
    var cnt_num = 0;
    var stock_check = 0;

    for (i = 0; i < m.elements.length; i++) {
        var t = morning.elements[i];

        if ((t.name == "gift_method[]") && ((t.type == "select-one") || (t.type == "hidden"))) {
            one_check = 1;
            gift_check[tc] = t.value;
        }

        if ((t.name == "gift_num[]") && (t.type == "text")) {
            chkNumeric(t);
            gift_num[tc] = t.value;
            tc++;
        }
    }

    for (i = 0; i < gift_check.length; i++) {
        temparray2 = gift_check[i].split(",");
        if (gift_num[i]) {
            if (eval(temparray2[4]) < gift_num[i]) {
                for (j = 0; j < m.elements.length; j++) {
                    var t = morning.elements[j];

                    if ((t.name == "gift_num[]") && (t.type == "text") && (cnt_num == inum)) {
                        t.value = 0;
                        temparray2[6] = 0;
                        gift_num[i] = 0;
                    }

                    if ((t.name == "gift_num[]") && (t.type == "text")) {
                        cnt_num++;
                    }
                }
                stock_check = 1;
            }
            gift_price = gift_price + (eval(temparray2[6]) * eval(gift_num[i]));
        }
        cnt_num = 0;
    }

    if (!gift_price) {
        gift_price = 0;
    }

    if (eval(total_price) < eval(gift_price)) {
        alert("사용 가능한 사은품액수(" + total_price + ")보다 많은 사은품을 선택하실수 없습니다.");
        m.total_gift_price.value = total_price;

        for (i = 0; i < m.elements.length; i++) {
            var t = morning.elements[i];
            if ((t.name == "gift_num[]") && (t.type == "text")) {
                t.value = 0;
            }
        }
        return;
    }

    m.total_gift_price.value = eval(total_price) - eval(gift_price);

    if (stock_check == 1) {
        alert("재고 보다 많은 사은품 갯수를 선택하셨습니다.");
        return;
    }
}

function check_userinfo_confirm() {
    var m = document.morning;
    if (typeof(m.total_gift_price) != "undefined") {
        var limit_gift_price = eval(m.limit_gift_price.value);
        var total_gift_price = eval(m.total_gift_price.value);
        if (limit_gift_price <= total_gift_price) {
            if (confirm('\n사은품을 선택하실수 있는 금액이 남아 있습니다.\n\n계속 진행하시겠습니까? (확인을 눌러주세요)\n\n추가 선택하시겠습니까? (취소를 눌러주세요)')) {
                return true;
            }
            return false;
        }
    }
    return;
}


// ----------------------------------------------------------
// 상품상세 옵션계산관련 mall_goods_skin1.html
// ----------------------------------------------------------
function option_view() {
    var m = document.goods;
    var dft = ",,,0";

    if ("undefined" != typeof m.goods_option1) {
        var option1_row = m.goods_option1.value.split(",");
    } else {
        var option1_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option2) {
        var option2_row = m.goods_option2.value.split(",");
    } else {
        var option2_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option3) {
        var option3_row = m.goods_option3.value.split(",");
    } else {
        var option3_row = dft.split(",");
    }

    if ("undefined" != typeof m.goods_option8) {
        var option8_row = m.goods_option8.value.split(",");
    } else {
        var option8_row = dft.split(",");
    }

    if (option8_row[3] > 0) {
        m.option_money.value = (parseInt(option1_row[3]) + parseInt(option2_row[3]) + parseInt(option3_row[3]) + parseInt(option8_row[3])) * m.ps_num.value;
    } else {
        m.option_money.value = (parseInt(option1_row[3]) + parseInt(option2_row[3]) + parseInt(option3_row[3]) + parseInt(m.money_ea.value)) * m.ps_num.value;
    }

    m.option_money.value = addCommas(m.option_money.value) + "원";
}

//이미지 교체
function imageView(strImage) {
    this.document.images['mainImage'].src = strImage;
}

//프레임타겟
document.write("<div style='position:absolute;z-index:-9999;left:-1000px'><iframe name='target_frame1'src='' width=0 height=0></iframe></div>");
document.write("<script id='dynamic'></script>");


// 롤오버
function MM_preloadImages() { //v3.0
    var d = document;
    if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length,
            a = MM_preloadImages.arguments;
        for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) {
                d.MM_p[j] = new Image;
                d.MM_p[j++].src = a[i];
            }
    }
}

function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr;
    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_findObj(n, d) { //v4.01
    var p, i, x;
    if (!d) d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n);
    return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0,
        x, a = MM_swapImage.arguments;
    document.MM_sr = new Array;
    for (i = 0; i < (a.length - 2); i += 3)
        if ((x = MM_findObj(a[i])) != null) {
            document.MM_sr[j++] = x;
            if (!x.oSrc) x.oSrc = x.src;
            x.src = a[i + 2];
        }
}

function MM_reloadPage(init) { //reloads the window if Nav4 resized
    if (init == true) with(navigator) {
        if ((appName == "Netscape") && (parseInt(appVersion) == 4)) {
            document.MM_pgW = innerWidth;
            document.MM_pgH = innerHeight;
            onresize = MM_reloadPage;
        }
    }
    else if (innerWidth != document.MM_pgW || innerHeight != document.MM_pgH) location.reload();
}
MM_reloadPage(true);


function MM_findObj(n, d) { //v4.0
    var p, i, x;
    if (!d) d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && document.getElementById) x = document.getElementById(n);
    return x;
}

function MM_showHideLayers() { //v3.0
    var i, p, v, obj, args = MM_showHideLayers.arguments;
    for (i = 0; i < (args.length - 2); i += 3)
        if ((obj = MM_findObj(args[i])) != null) {
            v = args[i + 2];
            if (obj.style) {
                obj = obj.style;
                v = (v == 'show') ? 'visible' : (v = 'hide') ? 'hidden' : v;
            }
            obj.visibility = v;
        }
}

// 팝업

function MM_openBrWindow(theURL, winName, features) { //v2.0
    window.open(theURL, winName, features);
}

// 모든 링크와 img 태그에 onfocus=blur() 처리
function bluring() {
    if (event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG") document.body.focus();
}
document.onfocusin = bluring;

// 필터 적용 함수
function trans(id, after) {
    eval(id + '.filters.blendTrans.stop();');
    eval(id + '.filters.blendTrans.Apply();');
    eval(id + '.src="' + after + '";');
    eval(id + '.filters.blendTrans.Play();');
}

function Find_Obj(n, d) {
    var p, i, x;
    if (!d) d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = Find_Obj(n, d.layers[i].document);
    if (!x && document.getElementById) x = document.getElementById(n);
    return x;
}
// 부메뉴 레이어 숨김/보이기 함수
function Show_Hide() {
    var i, p, v, obj, args = Show_Hide.arguments;
    for (i = 0; i < (args.length - 2); i += 3)
        if ((obj = Find_Obj(args[i])) != null) {
            v = args[i + 2];
            if (obj.style) {
                obj = obj.style;
                v = (v == 'show') ? 'visible' : (v = 'hide') ? 'hidden' : v;
            }
            obj.visibility = v;
        }
}

/* flashWrite(파일경로, 가로, 세로[, 변수][,배경색][,윈도우모드]) */
/* 호출예 : <script>flashWrite('./swf/main_mv.swf?','463','183')</script> */
function swf(url, w, h, vars, bg, win) {
    var id = url.split("/")[url.split("/").length - 1].split(".")[0]; //id는 파일명으로 설정
    if (vars == null) vars = '';
    if (bg == null) bg = '#FFFFFF';
    if (win == null) win = 'transparent';


    // 플래시 코드 정의
    var flashStr = "	<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
    flashStr += "			codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'";
    flashStr += "			width='" + w + "'";
    flashStr += "			height='" + h + "'";
    flashStr += "			id='" + id + "'";
    flashStr += "			align='middle'>";

    flashStr += "		<param name='allowScriptAccess' value='always' />";
    flashStr += "		<param name='movie' value='" + url + "' />";
    flashStr += "		<param name='FlashVars' value='" + vars + "' />";
    flashStr += "		<param name='wmode' value='" + win + "' />";
    flashStr += "		<param name='menu' value='false' />";
    flashStr += "		<param name='quality' value='high' />";
    flashStr += "		<param name='bgcolor' value='" + bg + "' />";

    flashStr += "		<embed src='" + url + "'";
    flashStr += "		       flashVars='" + vars + "'";
    flashStr += "		       wmode='" + win + "'";
    flashStr += "		       menu='false'";
    flashStr += "		       quality='high'";
    flashStr += "		       bgcolor='" + bg + "'";
    flashStr += "		       width='" + w + "'";
    flashStr += "		       height='" + h + "'";
    flashStr += "		       name='" + id + "'";
    flashStr += "		       align='middle'";
    flashStr += "		       allowScriptAccess='always'";
    flashStr += "		       type='application/x-shockwave-flash'";
    flashStr += "		       pluginspage='http://www.macromedia.com/go/getflashplayer' />";
    flashStr += " </object>";

    // 플래시 코드 출력
    document.write(flashStr);
}

// 모든 링크와 img 태그에 onfocus=blur() 처리
function bluring() {
    if (event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG") document.body.focus();
}
document.onfocusin = bluring;

function call_img(image, i) {
    eval("img" + i + ".filters[0].Apply()");
    eval("img" + i + ".src=image");
    eval("img" + i + ".filters[0].Play()");
}

function bookmark() {
    window.external.AddFavorite('http://tao2korea.com', '타오투코리아')
}
//스크립트 끝-->