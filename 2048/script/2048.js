//定义每一个数字的颜色
var colors = new Array("#CCC0B3", "#EEE4DA", "#EDE0C8", "#F2B179", "#F59563", "#F67C5F", "#F65E3B", "#EDCF72", "#EDCC61", "#EDC850", "#EDC53F", "#EEC22E", "#776E65");
//每一个数字对象，可以改为朝代
function obj_nums(num, x, y, color) {
    this.num = num;
    this.x = x;
    this.y = y;
    this.color = color;
}
//var obj_num1 = new obj_nums(2, 15, 15, colors);
//var obj_num2 = new obj_nums(2, 130, 15, colors);
//var obj_num3 = new obj_nums(2, 245, 15, colors);
//var obj_num4 = new obj_nums(2, 360, 15, colors);
//var obj_num5 = new obj_nums(2, 15, 130, colors);
//var obj_num6 = new obj_nums(2, 130, 130, colors);
//var obj_num7 = new obj_nums(2, 245, 130, colors);
//var obj_num8 = new obj_nums(2, 360, 130, colors);
//var obj_num9 = new obj_nums(2, 15, 245, colors);
//var obj_num10 = new obj_nums(2, 130, 245, colors);
//var obj_num11 = new obj_nums(2, 245, 245, colors);
//var obj_num12 = new obj_nums(2, 360, 245, colors);
//var obj_num13 = new obj_nums(2, 15, 360, colors);
//var obj_num14 = new obj_nums(2, 130, 360, colors);
//var obj_num15 = new obj_nums(2, 245, 360, colors);
//var obj_num16 = new obj_nums(2, 360, 360, colors);
//一维数组,把十六个方格数字为“2”的放进数组
function initarrNums() {
    var number1 = 15;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            arrNums[i * 4 + j] = new obj_nums(2, number1 + (j * 100) + (number1 * j), number1 + (i * 100) + (number1 * i), colors);
        }
    }
}


//var n1 = new obj_nums(2, 130, 15, colors);
//画游戏界面模型
function drawAllN() {
    var number1 = 15;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var obj_num = new obj_nums(0, number1 + (j * 100) + (number1 * j), number1 + (i * 100) + (number1 * i), colors);
            //document.write((number1 + (j * 100) + (number1 * j)) + " " + (number1 + (i * 100) + (number1 * i)));
            //document.write("<br/>");
            var img = new Image();
            img.src = "images/bgbg.jpg";
            img.onload = function () {
                cxt.drawImage(img, obj_num.x, obj_num.y, 100, 100);
            }
        }
    }
}

//画出一个方格子
function drawNums(n) {
    //alert(n.num+" "+n.x+" "+n.y);
    //cxt.beginPath();
    //cxt.lineWidth = 2;
    //cxt.moveTo(n.x, n.y);
    //cxt.lineTo(n.x, n.y + 100);
    //cxt.lineTo(n.x + 100, n.y + 100);
    //cxt.lineTo(n.x + 100, n.y);
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


    cxt.closePath();
    //cxt.strokeStyle = "white";
    //cxt.stroke();
    //cxt.fillStyle = n.color[1];      //填充的颜色，#FF0000 红，#00FF00 绿，#0000FF 蓝
    //cxt.fill();

    //cxt.font = "50pt Calibri";
    //cxt.fillStyle = "#776E65";
    //cxt.fillText(n.num, n.x + 35, n.y + 65);
}

//画出arr二维数组中的方格
function drawArr() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] != null) {
                drawNums(arr[i][j]);
            }
        }
    }
}

//上下，左右
function change(direct) {
    switch (direct) {
        case 0:

            break;
        case 1:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    if (arr[i][j].num == arr[i + 1][j].num) {

                    }
                }
            }
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
}



function createNext() {
    var nextx = Math.round(Math.random() * 4);
    var nexty = Math.round(Math.random() * 4);
    var next = nextx * 4 + nexty;
    if (arr[nextx][nexty] == null) {
        arr[nextx][nexty] = arrNums[next];
        drawNums(arr[nextx][nexty]);
    }
    else {
        createNext();
    }
}
















