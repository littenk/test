window.alert = alert = function (text) {
    loadMack({ off: 'on', Limg: 0, text: text, set: 200000 });
}


function loadMack(obj) {
    if (obj.off == "off") {
        $(".loadMack,.loadCon").fadeOut("1000", function () {
            $(this).remove();
        });
        return;
    }
    var wbod = document.documentElement.clientWidth || document.body.clientWidth;
    var hwid = document.documentElement.clientHeight || document.body.clientHeight;
    var hbod = $("body").height();
    if (obj.set == undefined) {
        obj.set = 0;
    }
    if (obj.Mack == undefined) {
        obj.Mack = '<div class="loadMack" style="width:' + wbod + 'px;height:' + hwid + 'px;"></div>';
    }
    else {
        obj.Mack = '';
    }
    $("body").append('' + obj.Mack + '<div style="left:0px;top:0px;" class="loadCon"><p style="text-align:center;font-size:14px;">' + obj.text + '</p></div>');
    if (obj.set !== 0) {
        setTimeout(function () {
            $(".loadMack,.loadCon").fadeOut("1000", function () {
                $(this).remove();
                return;
            });
        }, obj.set);
    }
    loadwidth = $('.loadCon').width();
    $('.loadCon').css({ left: ($(document).width() - loadwidth) / 2 - 20, top: 150 });
}
