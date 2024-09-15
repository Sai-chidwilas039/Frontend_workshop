let canvas = document.getElementById("my_canvas");
let canvas1 = document.getElementById("my_canvas1");
let context = canvas.getContext("2d");
let context1 = canvas1.getContext("2d");

const speed = 10;
let position = 800;
let moveSpeed = speed;
let radius = 40;

function moveBall() {
    if(position+radius >500){
        moveSpeed = -speed;
    }else if(position + radius <100){
        moveSpeed = speed;
    }
    position += moveSpeed;
}

function drawBall(){
    context.clearRect(0,0,640,480);

    context.fillStyle = "#FF0000";
    context.beginPath();
    context.arc(50,position,radius, 0, 2*Math.PI);
    context.fill();
}

function animate(){
    moveBall();
    drawBall();
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);