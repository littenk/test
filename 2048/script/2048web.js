

//每一个数字对象，可以改为朝代
function obj_nums(num, x, y) {
    this.num = num;
    this.x = x;
    this.y = y;
}

//初始化游戏界面
function ininMap() {
    if (blPortrait) {
        drawBg(h);  //使用屏幕的高度,主要考虑平板
    }
    else {
        drawBg(w);//使用屏幕的宽度
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            x = fgz_p + (j * fgz_w) + (fgz_p * j);
            y = fgz_p + (i * fgz_w) + (fgz_p * i);
            drawbgImg(x, y);
            //arrNums[i * 4 + j] = new obj_nums(2, fgz_p + (j * fgz_w) + (fgz_p * j), fgz_p + (i * fgz_w) + (fgz_p * i));         //一维数组
            arrNums[i * 4 + j] = new obj_nums(2, x, y);

            //console.info(arr[x][y]);
        }
    }
}

function drawBg(wh) {
    var img = new Image();
    img.src = "images/bg.jpg";
    img.onload = function () {
        cxt.drawImage(img, 0, 0, wh, wh);
    }
}
//画出空方格
function drawbgImg(x, y) {
    var img = new Image();
    img.src = "images/bgbg.jpg";
    img.onload = function () {
        cxt.drawImage(img, x, y, fgz_w, fgz_w);
    }
}


//画出二位数组所有的数字
function drawAllImg() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] != null) {
                drawImg(arr[i][j]);
            }
        }
    }
}

//画图，有数字方格
function drawImg(n) {
    var img = new Image();
    if (n.num == null || n.num == "" || n.num == 0) {
        img.src = "images/bgbg.jpg";
        img.onload = function () {
            cxt.drawImage(img, n.x, n.y, fgz_w, fgz_w);
        }
    }
    else {
        img.src = "images/" + n.num + ".jpg";
        img.onload = function () {
            cxt.drawImage(img, n.x, n.y, fgz_w, fgz_w);
        }
    }
}
//创建两个数字方格子数字
function createNum() {
    var n1 = null;
    var n2 = null;
    var nn1 = null;
    var nn2 = null;
    var nn3 = null;
    var nn4 = null;
    do {
        nn1 = Math.round(Math.random() * 3);
        nn2 = Math.round(Math.random() * 3);
        nn3 = Math.round(Math.random() * 3);
        nn4 = Math.round(Math.random() * 3);
        n1 = nn1 * 4 + nn2;
        n2 = nn3 * 4 + nn4;
    } while (n1 == n2);
    arr[nn2][nn1] = arrNums[n1];
    arr[nn4][nn3] = arrNums[n2];
    //这里的坐标出问题了，这有打印出来才知道是否准确
    //console.info(nn2+" "+nn1+" "+ n1);
    //console.info(arr[nn2][nn1]);
    //console.info(nn4 + " " + nn3 + " " + n2);
    //console.info(arr[nn4][nn3]);
    if (arr[nn2][nn1] == null || arr[nn4][nn3] == null) {
        createNum();
    }
}
function creatNextNum() {
    var n1 = null;
    var nn1 = null;
    var nn2 = null;
    do {
        nn1 = Math.round(Math.random() * 3);
        nn2 = Math.round(Math.random() * 3);
        n1 = nn1 * 4 + nn2;
    } while (arr[nn2][nn1] != null);
    var n_x = arrNums[n1].x;
    var n_y = arrNums[n1].y;
    arrNums[n1] = new obj_nums(2, n_x, n_y);
    arr[nn2][nn1] = arrNums[n1];
}




//操作，上下左右
//往上移动
function moveUp() {
    var isMove = false;
    for (var x = 0; x < 4; x++) {
        var blIsFirst = false;
        for (var y = 1; y < 4; y++) {
            var nmb_y = y;
            while (nmb_y > 0) {
                if (arr[x][nmb_y] != null && arr[x][nmb_y - 1] == null) {
                    var nextNum = (nmb_y - 1) * 4 + x;
                    //console.info((nmb_y * 4 + x) + " " + nextNum);
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[x][nmb_y].num;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[x][nmb_y - 1] = arrNums[nextNum];
                    arr[x][nmb_y] = null;
                    isMove = true;
                }
                if (arr[x][nmb_y] != null && arr[x][nmb_y - 1] != null && (arr[x][nmb_y].num == arr[x][nmb_y - 1].num) && !blIsFirst) {
                    var nextNum = (nmb_y - 1) * 4 + x;
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[x][nmb_y].num * 2;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[x][nmb_y - 1] = arrNums[nextNum];
                    arr[x][nmb_y] = null;
                    blIsFirst = true;
                    isMove = true;
                }
                nmb_y--;
            }
        }
    }
    if (isMove) {
        creatNextNum();
    }
}
//往下移动
function moveDown() {
    var isMove = false;
    for (var x = 0; x < 4; x++) {
        var blIsFirst = false;
        for (var y = 2; y >= 0; y--) {
            var nmb_y = y;
            while (nmb_y < 3) {
                if (arr[x][nmb_y] != null && arr[x][nmb_y + 1] == null) {
                    var nextNum = (nmb_y + 1) * 4 + x;
                    //console.info((nmb_y * 4 + x) + " " + nextNum);
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[x][nmb_y].num;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[x][nmb_y + 1] = arrNums[nextNum];
                    arr[x][nmb_y] = null;
                    isMove = true;
                }
                if (arr[x][nmb_y] != null && arr[x][nmb_y + 1] != null && (arr[x][nmb_y].num == arr[x][nmb_y + 1].num) && !blIsFirst) {
                    var nextNum = (nmb_y + 1) * 4 + x;
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[x][nmb_y].num * 2;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[x][nmb_y + 1] = arrNums[nextNum];
                    arr[x][nmb_y] = null;
                    blIsFirst = true;
                    isMove = true;
                }
                nmb_y++;
            }
        }
    }
    if (isMove) {
        creatNextNum();
    }
}

//往右移动
function moveRight() {
    var isMove = false;
    for (var y = 0; y < 4; y++) {
        var blIsFirst = false;
        for (var x = 2; x >= 0; x--) {
            var nmb_x = x;
            while (nmb_x < 3) {
                if (arr[nmb_x][y] != null && arr[nmb_x + 1][y] == null) {
                    var nextNum = y * 4 + nmb_x + 1;
                    //console.info((nmb_y * 4 + x) + " " + nextNum);
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[nmb_x][y].num;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[nmb_x + 1][y] = arrNums[nextNum];
                    arr[nmb_x][y] = null;
                    isMove = true;
                }
                if (arr[nmb_x][y] != null && arr[nmb_x + 1][y] != null && (arr[nmb_x][y].num == arr[nmb_x + 1][y].num) && !blIsFirst) {
                    var nextNum = y * 4 + nmb_x + 1;
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[nmb_x][y].num * 2;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[nmb_x + 1][y] = arrNums[nextNum];
                    arr[nmb_x][y] = null;
                    blIsFirst = true;
                    isMove = true;
                }
                nmb_x++;
            }
        }
    }
    //创建下一个数字时，先判断是否已经移动了
    if (isMove) {
        creatNextNum();
    }
}

//往左移动
function moveLeft() {
    var isMove = false;
    for (var y = 0; y < 4; y++) {
        var blIsFirst = false;
        for (var x = 1; x < 4; x++) {
            var nmb_x = x;
            while (nmb_x > 0) {
                if (arr[nmb_x][y] != null && arr[nmb_x - 1][y] == null) {
                    var nextNum = y * 4 + nmb_x - 1;
                    //console.info((nmb_y * 4 + x) + " " + nextNum);
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[nmb_x][y].num;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[nmb_x - 1][y] = arrNums[nextNum];
                    arr[nmb_x][y] = null;
                    isMove = true;
                }
                if (arr[nmb_x][y] != null && arr[nmb_x - 1][y] != null && (arr[nmb_x][y].num == arr[nmb_x - 1][y].num) && !blIsFirst) {
                    var nextNum = y * 4 + nmb_x - 1;
                    var n_x = arrNums[nextNum].x;
                    var n_y = arrNums[nextNum].y;
                    var n_nmb = arr[nmb_x][y].num * 2;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[nmb_x - 1][y] = arrNums[nextNum];
                    arr[nmb_x][y] = null;
                    blIsFirst = true;
                    isMove = true;
                }
                nmb_x--;
            }
        }
    }
    if (isMove) {
        creatNextNum();
    }
}
var isLose = false;
//判断是否已经赢了
function isWin() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] != null && arr[i][j].num >= 2048) {
                alert($("#username").val() + ",你赢了,请刷新页面重新开始！");
                return;
            }

            //if (!isArrHasNull()) {
            //    if (i < 3 && j < 3) {
            //        if (arr[i][j].num != arr[i + 1][j].num && arr[i][j].num != arr[i][j + 1].num) {
            //            //var aaa = 0,bbb=true;
            //            //while (aaa < 3) {
            //            //    if (arr[3][aaa].num == arr[3][aaa + 1].num || arr[aaa][3].num == arr[aaa + 1][3].num) {
            //            //        bbb = false;
            //            //    }
            //            //    aaa++;
            //            //}
            //            //if (bbb) isLose = true;
            //            if (arr[3][0].num != arr[3][1].num && arr[3][1].num != arr[3][2].num && arr[3][2].num != arr[3][3].num && (arr[0][3].num != arr[1][3].num && arr[1][3].num != arr[2][3].num && arr[2][3].num != arr[3][3].num)) {
            //                isLose = true;
            //            }
            //        }
            //    }
            //}
        }
    }
    if (fail()) {
        alert("嘎嘎！！" + $("#username").val() + "，你终于输了！");
    }
}
function fail() {
    if ((arr[0][0].num != arr[0][1].num && arr[0][0].num != arr[1][0].num) &&
        (arr[1][0].num != arr[1][1].num && arr[1][0].num != arr[2][0].num) &&
        (arr[2][0].num != arr[2][1].num && arr[2][0].num != arr[3][0].num) &&
        (arr[3][0].num != arr[3][1].num) &&

        (arr[0][1].num != arr[0][2].num && arr[0][1].num != arr[1][1].num) &&
        (arr[1][1].num != arr[1][2].num && arr[1][1].num != arr[2][1].num) &&
        (arr[2][1].num != arr[2][2].num && arr[2][1].num != arr[3][1].num) &&
        (arr[3][1].num != arr[3][2].num) &&

        (arr[0][2].num != arr[0][3].num && arr[0][2].num != arr[1][2].num) &&
        (arr[1][2].num != arr[1][3].num && arr[1][2].num != arr[2][2].num) &&
        (arr[2][2].num != arr[2][3].num && arr[2][2].num != arr[3][2].num) &&
        (arr[3][2].num != arr[3][3].num) &&

         (arr[0][3].num != arr[1][3].num) &&
         (arr[1][3].num != arr[2][3].num) &&
         (arr[2][3].num != arr[3][3].num)
        ) {
        isLose = true;
    }
    return isLose;
}

function isArrHasNull() {
    var isNull = false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == null)
                isNull = true;
        }
    }
    return isNull;
}

var zd;

function aaaaaa() {
    var vvv = Math.round(Math.random() * 3);
    if (isLose) {
        window.clearInterval(zd);
        window.setTimeout("funLoad()", 3000);
        return;
    }
    if (vvv >= 0 && vvv <= 3) flashMap(vvv);
}

function funLoad() {
    var ww1 = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var hh1 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var canvas_htl = "<canvas id='canvas_htl' width='" + ww1 + "px' height='" + (hh1 - 4) + "px'></vanvas>";
    $("#div_result").html(canvas_htl);
    $("#div_game").css("display", "none");
    $("#div_result").css({ "display": "block", "z-index": 9999 });

    var cxt = document.getElementById('canvas_htl').getContext('2d');
    cxt.clearRect(0, 0, 600, 600);              //清屏，游戏界面
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.strokeStyle = 'green';
    cxt.moveTo(33, 43);
    cxt.quadraticCurveTo(55, 40, 124, 73);
    cxt.moveTo(33, 43);
    cxt.lineTo(68, 140);
    cxt.moveTo(33, 43);
    cxt.quadraticCurveTo(73, 92, 89, 130);
    cxt.quadraticCurveTo(75, 127, 81, 136);
    cxt.lineTo(73, 136);
    cxt.lineTo(74, 139);
    cxt.quadraticCurveTo(36, 164, 24, 213);
    cxt.bezierCurveTo(52, 215, 49, 223, 41, 233);
    cxt.quadraticCurveTo(61, 235, 76, 243);
    cxt.bezierCurveTo(88, 350, 290, 350, 309, 252);
    cxt.quadraticCurveTo(320, 239, 353, 234);
    cxt.bezierCurveTo(338, 223, 354, 215, 371, 214);
    cxt.quadraticCurveTo(360, 169, 325, 144);
    cxt.lineTo(333, 121);
    cxt.quadraticCurveTo(317, 100, 341, 97);
    cxt.lineTo(361, 43);
    cxt.quadraticCurveTo(307, 48, 266, 75);
    cxt.moveTo(361, 43);
    cxt.quadraticCurveTo(332, 72, 304, 133);
    cxt.quadraticCurveTo(318, 127, 313, 134);
    cxt.quadraticCurveTo(323, 132, 318, 140);
    cxt.quadraticCurveTo(324, 136, 325, 144)
    cxt.moveTo(266, 75);
    cxt.quadraticCurveTo(265, 90, 243, 94);
    cxt.lineTo(133, 112);
    cxt.quadraticCurveTo(90, 116, 107, 91);
    cxt.quadraticCurveTo(147, 29, 223, 27);
    cxt.quadraticCurveTo(272, 38, 266, 75);
    cxt.moveTo(107, 91);
    cxt.quadraticCurveTo(111, 110, 144, 100);
    cxt.lineTo(244, 80);
    cxt.quadraticCurveTo(264, 76, 267, 61);
    cxt.moveTo(196, 30);
    cxt.lineTo(176, 51);
    cxt.quadraticCurveTo(224, 43, 240, 66);
    cxt.quadraticCurveTo(252, 55, 264, 53);
    cxt.moveTo(186, 38);
    cxt.lineTo(198, 37);
    cxt.moveTo(176, 43);
    cxt.lineTo(190, 43);
    cxt.moveTo(186, 53);
    cxt.lineTo(194, 45);
    cxt.moveTo(200, 45);
    cxt.lineTo(196, 54);
    cxt.moveTo(210, 47);
    cxt.lineTo(205, 54);
    cxt.moveTo(219, 49);
    cxt.lineTo(213, 54);
    cxt.moveTo(229, 50);
    cxt.lineTo(222, 59);
    cxt.moveTo(237, 52);
    cxt.lineTo(232, 65);
    cxt.moveTo(244, 56);
    cxt.lineTo(250, 66);
    cxt.moveTo(252, 52);
    cxt.lineTo(261, 62);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 10;
    cxt.moveTo(99, 123);
    cxt.lineTo(169, 164);
    cxt.moveTo(220, 172);
    cxt.lineTo(291, 130);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.moveTo(88, 168);
    cxt.lineTo(174, 188);
    cxt.moveTo(212, 180);
    cxt.lineTo(297, 199);
    cxt.moveTo(87, 173);
    cxt.lineTo(126, 286);
    cxt.moveTo(80, 204);
    cxt.lineTo(108, 191);
    cxt.moveTo(91, 220);
    cxt.lineTo(111, 211);
    cxt.moveTo(96, 236);
    cxt.lineTo(114, 226);
    cxt.moveTo(106, 248);
    cxt.lineTo(119, 243);
    cxt.moveTo(106, 267);
    cxt.lineTo(124, 259);
    cxt.moveTo(117, 276);
    cxt.lineTo(126, 272);
    cxt.moveTo(106, 171);
    cxt.bezierCurveTo(109, 200, 142, 204, 159, 185);
    cxt.moveTo(230, 184);
    cxt.bezierCurveTo(233, 210, 267, 218, 284, 197);
    cxt.moveTo(123, 253);
    cxt.quadraticCurveTo(193, 275, 272, 253);
    cxt.bezierCurveTo(260, 300, 120, 290, 123, 253);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.moveTo(125, 260);
    cxt.lineTo(134, 263);
    cxt.lineTo(136, 259);
    cxt.lineTo(139, 265);
    cxt.lineTo(155, 270);
    cxt.moveTo(237, 270);
    cxt.lineTo(252, 266);
    cxt.lineTo(254, 258);
    cxt.lineTo(258, 264);
    cxt.lineTo(268, 261);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.fillStyle = 'green';
    cxt.save();
    cxt.translate(133, 179);
    cxt.rotate(Math.PI * 2 / 20);
    cxt.arc(0, 0, 5, 3, Math.PI * 2, true);
    cxt.fill();
    cxt.restore();
    cxt.beginPath();
    cxt.save();
    cxt.translate(254, 190);
    cxt.rotate(Math.PI * 2 / 20);
    cxt.arc(0, 0, 5, 3, Math.PI * 2, true);
    cxt.fill();
    cxt.restore();
    cxt.beginPath();
    cxt.moveTo(190, 212);
    cxt.bezierCurveTo(150, 214, 150, 246, 190, 246);
    cxt.bezierCurveTo(230, 246, 230, 214, 190, 212);
    cxt.fill();
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.moveTo(162, 224);
    cxt.quadraticCurveTo(171, 212, 180, 224);
    cxt.quadraticCurveTo(171, 234, 162, 224);
    cxt.fill();
    cxt.beginPath();
    cxt.moveTo(119, 306);
    cxt.quadraticCurveTo(132, 334, 205, 363);
    cxt.quadraticCurveTo(256, 334, 264, 310);
    cxt.moveTo(110, 300);
    cxt.quadraticCurveTo(86, 334, 81, 370);
    cxt.quadraticCurveTo(67, 371, 66, 394);
    cxt.bezierCurveTo(60, 418, 71, 427, 76, 421);
    cxt.moveTo(76, 399);
    cxt.bezierCurveTo(70, 419, 85, 434, 89, 421);
    cxt.quadraticCurveTo(79, 414, 85, 399);
    cxt.moveTo(89, 421);
    cxt.bezierCurveTo(98, 430, 102, 430, 99, 400);
    cxt.moveTo(101, 410);
    cxt.quadraticCurveTo(119, 419, 112, 400);
    cxt.bezierCurveTo(105, 388, 114, 378, 101, 371);
    cxt.moveTo(100, 376);
    cxt.quadraticCurveTo(109, 324, 126, 315);
    cxt.moveTo(280, 299);
    cxt.quadraticCurveTo(310, 340, 312, 371);
    cxt.quadraticCurveTo(326, 376, 326, 398);
    cxt.bezierCurveTo(330, 415, 326, 426, 318, 420);
    cxt.moveTo(317, 399);
    cxt.bezierCurveTo(323, 419, 313, 433, 305, 422);
    cxt.moveTo(309, 400);
    cxt.bezierCurveTo(310, 425, 291, 442, 292, 403);
    cxt.moveTo(292, 410);
    cxt.bezierCurveTo(284, 416, 274, 413, 282, 397);
    cxt.quadraticCurveTo(280, 375, 293, 371);
    cxt.moveTo(294, 376);
    cxt.quadraticCurveTo(289, 338, 267, 314);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 3;
    cxt.moveTo(127, 319);
    cxt.bezierCurveTo(90, 470, 310, 460, 262, 317);
    cxt.moveTo(188, 389);
    cxt.lineTo(197, 399);
    cxt.moveTo(190, 402);
    cxt.lineTo(195, 391);
    cxt.stroke();
    cxt.beginPath();
    cxt.save();
    cxt.translate(194, 396);
    cxt.arc(0, 0, 10, 1, Math.PI * 2, false);
    cxt.restore();
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.moveTo(144, 406);
    cxt.lineTo(127, 434);
    cxt.lineTo(136, 449);
    cxt.moveTo(152, 417);
    cxt.lineTo(142, 434);
    cxt.moveTo(139, 431);
    cxt.lineTo(151, 450);
    cxt.bezierCurveTo(110, 441, 90, 464, 105, 476);
    cxt.lineTo(156, 476);
    cxt.bezierCurveTo(175, 473, 170, 459, 151, 450);
    cxt.moveTo(126, 455);
    cxt.quadraticCurveTo(106, 456, 108, 474);
    cxt.moveTo(139, 457);
    cxt.quadraticCurveTo(121, 459, 125, 474);
    cxt.moveTo(244, 416);
    cxt.lineTo(252, 433);
    cxt.moveTo(255, 430);
    cxt.lineTo(245, 450);
    cxt.moveTo(254, 406);
    cxt.lineTo(269, 433);
    cxt.lineTo(261, 448);
    cxt.bezierCurveTo(218, 456, 220, 472, 234, 475);
    cxt.lineTo(289, 475);
    cxt.bezierCurveTo(304, 467, 302, 452, 261, 448);
    cxt.moveTo(255, 457);
    cxt.quadraticCurveTo(275, 461, 268, 474);
    cxt.moveTo(270, 455);
    cxt.quadraticCurveTo(291, 462, 285, 474);
    cxt.moveTo(198, 428);
    cxt.quadraticCurveTo(203, 453, 228, 458);
    cxt.moveTo(236, 453);
    cxt.bezierCurveTo(213, 440, 214, 437, 248, 448);
    cxt.bezierCurveTo(230, 430, 230, 428, 251, 433);
    cxt.moveTo(275, 450);
    cxt.quadraticCurveTo(287, 432, 287, 416);
    cxt.quadraticCurveTo(270, 420, 255, 412);
    cxt.stroke();
}




































