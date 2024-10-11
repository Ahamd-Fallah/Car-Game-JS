const shape = $(document).find('#car');
let x = 700;
let y = 310;
let rotation = 0;
const speed = 10;
let currentSpeed = speed;
let reveres = false;
let score = 0;

document.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'ArrowUp':
            if(!reveres){
                y -= currentSpeed;
                rotation = 90;
            } else {
                y += currentSpeed;
                rotation = -90;
            }
            break;
        case 'ArrowDown':
            if(!reveres){
                y += currentSpeed;
                rotation = -90;
            } else {
                y -= currentSpeed;
                rotation = 90;
            }
            break;
        case 'ArrowLeft':
            if(!reveres){
                x -= currentSpeed;
                rotation = 360;
            } else {
                x += currentSpeed;
                rotation = -360;
            }
            break;
        case 'ArrowRight':
            if(!reveres){
                x += currentSpeed;
                rotation = -180;
            } else {
                x -= currentSpeed;
                rotation = 180;
            }
            break;
        case 'W':
        case 'w':
            if(currentSpeed === speed){
                currentSpeed = 30;
            } else {
                resetSpeed();
            }
            break;    
        case 'R':
        case 'r':
            reveres = !reveres;
            break;
        case 'H':
        case 'h':
            playHorn();
            break;
    }
    $(shape).css('top', y);
    $(shape).css('left', x);
    $(shape).css('transform', `rotate(${rotation}deg)`);

    checkCoinCollision();
});

document.getElementById('finish-btn').addEventListener('click', () => {
    EndAudio();
    document.getElementById('final-score').textContent = `Your score is: ${score}`;
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    resetGame();
});

function checkCoinCollision() {
    const carRect = shape[0].getBoundingClientRect();
    const coinRect = $('#coin')[0].getBoundingClientRect();
    
    if (carRect.left < coinRect.right && 
        carRect.right > coinRect.left && 
        carRect.top < coinRect.bottom && 
        carRect.bottom > coinRect.top) {
            CollectCoin();
        score++;
        $('#score').text(`Score: ${score}`);
        moveCoin();
    }
}

function moveCoin() {
    let newX, newY;
    const margin = 50;
    const carWidth = $('#car').width();
    const carHeight = $('#car').height();
    const table = $('#tbl')[0].getBoundingClientRect();

    do {
        newX = Math.floor(Math.random() * (window.innerWidth - 20));
        newY = Math.floor(Math.random() * (window.innerHeight - 20));
    } while ((newX < margin && newY < margin + carHeight) || 
            (newX < table.right && newY < table.bottom) ||
            (newY > window.innerHeight - margin)); 

    $('#coin').css('left', newX);
    $('#coin').css('top', newY);
}

function resetGame() {
    x = 700;
    y = 310;
    score = 0;
    $('#score').text(`Score: ${score}`);
    $(shape).css('top', y);
    $(shape).css('left', x);
    $(shape).css('transform', `rotate(${rotation}deg)`);
    moveCoin();
}
$(document).on("keypress" ,  function(event) {
    let keypressed = event.key;
    if(keypressed === "l" || keypressed === "L"){
        const light = $(document).find('#light');
        const light2 = $(document).find('#light2');
        if($(light).css('background-color') === "rgb(0, 0, 0)" &&  $(light2).css('background-color') === "rgb(0, 0, 0)"){
            $(light).css('background-color' , 'yellow');
            $(light2).css('background-color' , 'yellow');
        }else{
            light.css('background-color' , 'black');
            light2.css('background-color' , 'black');
        }
    }
});

function resetSpeed() {
    currentSpeed = speed;
}

function playHorn(){
    let audio = new Audio("audio/car-horn.WAV");
    audio.play();
}
function CollectCoin(){
    let audio = new Audio("audio/CoinSound.WAV");
    audio.play();
}
function EndAudio(){
    let audio = new Audio("audio/Ending.WAV");
    audio.play();
}
