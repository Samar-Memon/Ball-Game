let ball = document.getElementById('ball');
let ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue('bottom'));
let ballRight = parseInt(window.getComputedStyle(ball).getPropertyValue('right'));
let ballWidth = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));

let land = document.getElementById('land');
let landBottom = parseInt(window.getComputedStyle(land).getPropertyValue('bottom'));
let landHeight = parseInt(window.getComputedStyle(land).getPropertyValue('height'));

let jumping = false;

let up;
let down;
let scoreEle = document.getElementById('score');
let score = 0;

function scoreCount() {
    score++;
    scoreEle.innerText = score;
};

setInterval(scoreCount, 250)

let randomTime = Math.floor(Math.random() * 1000) + 1000;

function jump() {
    if(!jumping){
        up = setInterval(() => {
            if(ballBottom >= landHeight + 300){
                clearInterval(up);
                down = setInterval(() => {
                    if(ballBottom <= landHeight + 10){
                        clearInterval(down);
                        jumping = false;
                    }
                ballBottom -= 10;    
                ball.style.bottom = ballBottom + 'px';
                }, 20)
            }
            ballBottom += 10;    
            ball.style.bottom = ballBottom + 'px';
            jumping = true;
        }, 14);
    };
};


function generateWall() {
    let walls = document.querySelector('.walls');
    let wall = document.createElement('div');
    wall.classList.add('wall');
    walls.appendChild(wall);

    let wallRight = -30;
    let wallBottom = 100;
    let wallWidth = 40;
    let wallHeight = Math.floor(Math.random() * 50) + 50;
    wall.style.background = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`

    function moveWall(){
        wallRight += 5;
        wall.style.right = wallRight + 'px'
        wall.style.bottom = wallBottom + 'px'
        wall.style.width = wallWidth + 'px'
        wall.style.height = wallHeight + 'px'

        if(ballRight >= wallRight - ballWidth && ballRight <= wallRight + wallWidth && ballBottom <= wallBottom + wallHeight){
            alert('Game Over!')
            clearInterval(wallInterval);
            clearTimeout(wallTimeOut);
            location.reload();
        }
    }

    let wallInterval = setInterval(moveWall, 20)
    let wallTimeOut = setTimeout(generateWall, randomTime)
}

generateWall()
function btnControls(e) {
    if(e.key === 'ArrowUp' || e.key === ' '){
        jump();
    };
};

function clickJump() {
    jump();
};

document.addEventListener('keydown', btnControls)
document.addEventListener('click', clickJump)
document.addEventListener('keydown', scoreCount)