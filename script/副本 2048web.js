

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
            while (nmb_y < 4) {
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
                nmb_y++;
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
            while (nmb_x >= 0) {
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
                if (arr[nmb_x][y] != null && arr[nmb_x][y + 1] != null && (arr[nmb_x][y].num == arr[nmb_x + 1][y].num) && !blIsFirst) {
                    var nextNum = y * 4 + nmb_x + 1;
                    var n_x = arrNums[nextNum + 1].x;
                    var n_y = arrNums[nextNum + 1].y;
                    var n_nmb = arr[nmb_x][y].num * 2;

                    arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                    arr[nmb_x + 1][y] = arrNums[nextNum];
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

//判断是否已经赢了
function isWin() {
    for (var i = 0; i < 4; i++) {
        for (var j= 0; j < 4; j++) {
            if (arr[i][j]!=null &&arr[i][j].num >= 2048) {
                alert("你赢了,请刷新页面重新开始！");
                return;
            }
            
        }
    }
}








































