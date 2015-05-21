
var img2 = new Image();
var img4 = new Image();
var img8 = new Image();
var img16 = new Image();
var img32 = new Image();
var img64 = new Image();
var img128 = new Image();
var img256 = new Image();
var img512 = new Image();
var img1024 = new Image();
var img2048 = new Image();
var bgbg = new Image();
var bg = new Image();
function getPic() {
    img2.src = "images/2.jpg";
    img4.src = "images/4.jpg";
    img8.src = "images/8.jpg";
    img16.src = "images/16.jpg";
    img32.src = "images/32.jpg";
    img64.src = "images/64.jpg";
    img128.src = "images/128.jpg";
    img256.src = "images/256.jpg";
    img512.src = "images/512.jpg";
    img1024.src = "images/1024.jpg";
    img2048.src = "images/2048.jpg";
    bgbg.src = "images/bgbg.jpg";
    bg.src = "images/bg.jpg";
}

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
            //一维数组
            arrNums[i * 4 + j] = new obj_nums(2, x, y);
        }
    }
}

function drawBg(wh) {
    //var img = new Image();
    //img.src = "images/bg.jpg";
    //img.onload = function () {
    //    cxt.drawImage(img, 0, 0, wh, wh);
    //}
    cxt.drawImage(bg, 0, 0, h, h);
}
//画出空方格
function drawbgImg(x, y) {
    //var img = new Image();
    //img.src = "images/bgbg.jpg";
    //img.onload = function () {
    //    cxt.drawImage(img, x, y, fgz_w, fgz_w);
    //}
    cxt.drawImage(bgbg, x, y, fgz_w, fgz_w);
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
    switch (n.num) {
        case 2:
            cxt.drawImage(img2, n.x, n.y, fgz_w, fgz_w);
            break;
        case 4:
            cxt.drawImage(img4, n.x, n.y, fgz_w, fgz_w);
            break;
        case 8:
            cxt.drawImage(img8, n.x, n.y, fgz_w, fgz_w);
            break;
        case 16:
            cxt.drawImage(img16, n.x, n.y, fgz_w, fgz_w);
            break;
        case 32:
            cxt.drawImage(img32, n.x, n.y, fgz_w, fgz_w);
            break;
        case 64:
            cxt.drawImage(img64, n.x, n.y, fgz_w, fgz_w);
            break;
        case 128:
            cxt.drawImage(img128, n.x, n.y, fgz_w, fgz_w);
            break;
        case 256:
            cxt.drawImage(img256, n.x, n.y, fgz_w, fgz_w);
            break;
        case 512:
            cxt.drawImage(img512, n.x, n.y, fgz_w, fgz_w);
            break;
        case 1024:
            cxt.drawImage(img1024, n.x, n.y, fgz_w, fgz_w);
            break;
        case 2048:
            cxt.drawImage(img2048, n.x, n.y, fgz_w, fgz_w);
            break;
    }
    //var img = new Image();
    //if (n.num == null || n.num == "" || n.num == 0) {
    //    img.src = "images/bgbg.jpg";
    //    img.onload = function () {
    //        cxt.drawImage(img, n.x, n.y, fgz_w, fgz_w);
    //    }
    //}
    //else {
    //    img.src = "images/" + n.num + ".jpg";
    //    img.onload = function () {
    //        cxt.drawImage(img, n.x, n.y, fgz_w, fgz_w);
    //    }
    //}
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
        }
    }
    if (fail()) {
        alert("嘎嘎！！" + "，你终于输了！");
    }
}

function fail() {
    //如果二位数组全部都不为空时，才会判断输赢
    if (isArrHasNull()) return;
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

