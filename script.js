const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const imgX = document.createElement("img")
imgX.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/Transparent_X.png"
const imgY = document.createElement("img")
imgY.src = "https://img.pngio.com/o-png-89-images-in-collection-page-2-png-o-2000_2000.png"

document.getElementById('but').style.visibility = 'none';

function line(x1, y1, x2, y2) {
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke()
}

function lines() {
    line(150, 0, 150, 450)
    line(300, 0, 300, 450)
    line(0, 150, 450, 150)
    line(0, 300, 450, 300)
}
lines()

function tryagain() {
    let photo = document.getElementsByTagName("img");
    element.parentNode.removeChild(photo);
}

date = {
    x: 0,
    y: 0,
    player: "first",
    xplace: 0,
    yplace: 0,
    count: 0,
    click: 0
}

const toWin = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [4, 5, 6],
    [7, 8, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
];

let history = [
    [],
    [],
]

function drawChecker() {
    var h = history[0].length + history[1].length;
    if (h === 9) document.getElementById("text").innerHTML = "This game is draw";
    document.getElementById('but').style.visibility = 'visible';
}

function draw() {
    if (date.player === "first") {
        context.drawImage(imgX, date.xplace, date.yplace, 130, 130)
    } else {
        context.drawImage(imgY, date.xplace, date.yplace, 130, 130)
    }
}

function changer() {
    if (date.player === "first") {
        date.player = "second"
    } else {
        date.player = "first"
    }
}

function ycoords(numb1, numb2, numb3) {
    if (date.y > 10 && date.y < 160) {
        fin(0, numb1)
    } else if (date.y > 160 && date.y < 310) {
        fin(150, numb2)
    } else if (date.y > 310 && date.y < 460) {
        fin(315, numb3)
    }
}

function add(numb) {
    if (history[0].indexOf(numb) != -1 || history[1].indexOf(numb) != -1) {
        document.getElementById("text").innerHTML = "Try again " + date.player + " player";
        tryagain();
    }
    document.getElementById("text").innerHTML = ""
    if (history[0].indexOf(numb) === -1 && history[1].indexOf(numb) === -1)
        if (date.player === "first") {
            history[0].push(numb);
            drawChecker()
        } else {
            history[1].push(numb);
            drawChecker()
        }
}

function arrComp(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function checker() {
    for (i = 0; i < history.length; i++) {
        for (l = 0; l < toWin.length; l++) {
            var z = arrComp(history[i].sort(), toWin[l])
            if (z) {
                document.getElementById("text").innerHTML = "You win " + date.player + " player, click on start again"
                context. clearRect(0, 0, canvas. width, canvas. height);
                lines();
            }
        }
    }
}

function fin(x, numb) {
    add(numb);
    date.yplace = 5 + x;
    draw();
    checker();
    changer();
}

function showCoords(evt) {
    date.x = evt.clientX;
    date.y = evt.clientY;
    if (date.x > 10 && date.x < 160) {
        date.xplace = 5;
        ycoords(1, 4, 7);
    } else if (date.x > 160 && date.x < 310) {
        date.xplace = 155;
        ycoords(2, 5, 8);
    } else if (date.x > 310 && date.x < 460) {
        date.xplace = 315;
        ycoords(3, 6, 9);
    }
}