var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); // Отвечает за вид игрі, get.Context получает значение что это 2D игра

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBtm = new Image(); // Расписываем объекты, которые у нас будут находится в игре

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBtm.src = "img/pipeBtm.png";

// Звук

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

//При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp); // Функция отслеживает, нажималась ли кнопка, если нажимается то вызывает функцию в moveUp

function moveUp() {
    yPos -= 35; // Данная функция поднимает вверх на 20 едениц
    fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}



var  score = 0; // Количество очков

// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBtm, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //Отслеживание соприкосновений птицы с блоком
        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap || yPos + bird.height >= cvs.height - fg.height) )
                {
                   location.reload(); // Перезагрузка страницы
                }
                if(pipe[i].x == 5){
                    score++;  // Подсчет очков при прохождении блоков
                    
                    score_audio.play();
                }
    }   
        
       
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos); // Рисует картинки в нашем canvas`e

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет:" + score, 15, cvs.height - 8) // Наш счетчик, задаем стиль и шрифт.
    
    requestAnimationFrame(draw);
}

pipeBtm.onload = draw;  // Прогружаясь картинка, запускает функцию draw

yPos += grav;