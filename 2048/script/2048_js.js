//每一个数字对象，可以改为朝代
function obj_nums(num, x, y) {
    this.num = num;
    this.x = x;
    this.y = y;
}
//document.write("<br/>");
//初始化游戏界面
function ininN() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            x = 15 + (j * 100) + (15 * j);
            y = 15 + (i * 100) + (15 * i);
            //document.write((i * 4 + j) + " "+x+" "+y+"<br/>");
            drawbgImg(x, y);
            arrNums[i * 4 + j] = new obj_nums(2, 15 + (j * 100) + (15 * j), 15 + (i * 100) + (15 * i));         //一维数组
            //document.write(arrNums[i * 4 + j].num + " " + arrNums[i * 4 + j].x + " " + arrNums[i * 4 + j].y+" ");
        }
        //document.write("<br/>");
    }
}
//画出空方格
function drawbgImg(x, y) {
    var img = new Image();
    img.src = "images/bgbg.jpg";
    img.onload = function () {
        cxt.drawImage(img, x, y, 100, 100);
    }
}

//画出二位数组所有的数字
function drawAllImg() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] != null) {
                drawImg(arr[i][j]);
                //console.info(arr[i][j]);
                //console.info(arr[i][j].num + " " + arr[i][j].x + " " + arr[i][j].y + " ");
            }
        }
        //console.info("<br/>");
    }
}

//画图，有数字方格
function drawImg(n) {
    var img = new Image();
    if (n.num == null || n.num == "" || n.num == 0) {
        img.src = "images/bgbg.jpg";
        img.onload = function () {
            cxt.drawImage(img, n.x, n.y, 100, 100);
        }
    }
    else {
        img.src = "images/" + n.num + ".jpg";
        img.onload = function () {
            cxt.drawImage(img, n.x, n.y, 100, 100);
        }
    }
}
//创建下一个数字
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


function moveUp() {
    //alert("向下");
    for (var x = 0; x < 4; x++) {
        var blIsFirst = false;
        for (var n = 0; n < 4; n++) {
            var nmb_y = 0;
            while (nmb_y < 4) {
                if (arr[x][nmb_y] != null) {
                    if (arr[x][nmb_y + 1] != null) {
                        if (arr[x][nmb_y + 1].num == arr[x][nmb_y].num) {
                            if (!blIsFirst) {
                                var nextNum = nmb_y * 4 + x;
                                var n_nmb = arr[x][nmb_y].num * 2;
                                var n_x = arr[x][nmb_y].x;
                                var n_y = arr[x][nmb_y].y;
                                arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                                //console.info(n_nmb + " " + n_x + " " + n_y);

                                arr[x][nmb_y] = arrNums[nextNum];
                                //console.info(arr[x][nmb_y]);

                                arr[x][nmb_y + 1] = null;
                                blIsFirst = true;
                            }
                        }
                    }
                }
                else {
                    if (arr[x][nmb_y + 1] != null) {
                        var nextNum = nmb_y * 4 + x;
                        arr[x][nmb_y] = arrNums[nextNum];
                        arr[x][nmb_y + 1] = null;
                    }
                }
                nmb_y++;
            };
        }
    }

}

function moveDown() {
    //alert("向下");
    for (var x = 0; x < 4; x++) {
        var blIsFirst = false;
        for (var n = 0; n < 4; n++) {
            var nmb_y =3;
            while (nmb_y > 0) {
                if (arr[x][nmb_y] != null) {
                    if (arr[x][nmb_y + 1] != null) {
                        if (arr[x][nmb_y].num == arr[x][nmb_y + 1].num) {
                            if (!blIsFirst) {
                                var nextNum = (nmb_y + 1) * 4 + x;
                                var n_nmb = arr[x][nmb_y + 1].num * 2;
                                var n_x = arr[x][nmb_y + 1].x;
                                var n_y = arr[x][nmb_y + 1].y;
                                arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                                //console.info(n_nmb + " " + n_x + " " + n_y);

                                arr[x][nmb_y + 1] = arrNums[nextNum];
                                //console.info(arr[x][nmb_y]);

                                arr[x][nmb_y] = null;
                                blIsFirst = true;

                                //var nextNum = nmb_y * 4 + x;
                                //arr[x][nmb_y] = arrNums[nextNum];
                                //arr[x][nmb_y].num += arr[x][nmb_y].num;
                                //arr[x][nmb_y - 1] = null;
                                //blIsFirst = true;
                            }
                        }
                    }
                    else {
                        var nextNum = (nmb_y + 1) * 4 + x;
                        var n_nmb = arr[x][nmb_y].num;
                        var n_x = arrNums[nextNum].x;
                        var n_y = arrNums[nextNum].y;

                        arrNums[nextNum] = new obj_nums(n_nmb, n_x, n_y);
                        arr[x][nmb_y+1] = arrNums[nextNum];
                        arr[x][nmb_y] = null;
                    }
                }

                nmb_y--;
            };
        }
    }

    //for (var x = 0; x < 4; x++) {
    //    var blIsFirst = false;
    //    for (var y = 3; y >= 1; y--) {
    //        var nmb_y = 0;
    //        while (nmb_y <= 3) {
    //            if (arr[x][nmb_y] != null) {
    //                if (arr[x][nmb_y - 1] != null) {
    //                    if (arr[x][nmb_y - 1].num == arr[x][nmb_y].num) {
    //                        if (!blIsFirst) {
    //                            arr[x][nmb_y].num += arr[x][nmb_y].num;
    //                            blIsFirst = true;
    //                        }
    //                    }
    //                }
    //            }
    //            else {
    //                if (arr[x][nmb_y - 1] != null) {
    //                    var nextNum = y * 4 + x;
    //                    arr[x][nmb_y] = arrNums[nextNum];
    //                    arr[x][nmb_y - 1] = null;
    //                }
    //            }
    //            nmb_y++;
    //        };
    //    }
    //}



}








