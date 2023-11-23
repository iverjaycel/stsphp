document.write("<div id='back_bg' style='display:none'></div>");

//암전켜기
function back_bg_on(obj) {

    //암전
    var documentwidth = $(document).width();
    var documentheight = $(document).height();
    $("#back_bg").css({
        "position": "absolute",
        "width": documentwidth,
        "height": documentheight,
        "z-index": "1000",
        "left": "0px",
        "top": "0px",
        "background": "#000000"
    }).fadeTo("show", 0.7);
    $("#back_bg").bind("click", function() {
        back_bg_off(obj);
    })

    //내용물
    $("#" + obj).css({
        "position": "absolute",
        "z-index": "1001"
    });
    var objwidth = $("#" + obj).width();
    var objheight = $("#" + obj).height();
    var h = $(window).height() / 2 - objheight / 2;
    var position = $(window).scrollTop();

    $("#" + obj).css({
        "left": (documentwidth / 2) - (objwidth / 2),
        "top": position + h
    });
    $("#" + obj).fadeTo("show", 1);


}
//암전끄기
function back_bg_off(obj) {
    $("#back_bg").css({
        "position": "absolute",
        "width": "100%",
        "height": "100%",
        "z-index": "1000",
        "left": "0px",
        "top": "0px",
        "background": "#000000"
    }).hide();
    $("#" + obj).hide();
}