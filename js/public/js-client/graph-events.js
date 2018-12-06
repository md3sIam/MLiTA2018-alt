let canvas = document.getElementById('canvas');

//TRANSLATION
let isMouseDown = false;
let mouseStartX = undefined;
let mouseStartY = undefined;

let isMouseMoved = false;
let isAbleToPoint = true;
let currentOffsetx = 0;
let currentOffsety = 0;
let moveOffsetx = 0;
let moveOffsety = 0;

let pointFrom = undefined;
let pointTo = undefined;

canvas.addEventListener('mousedown', function(event){
    if (!isMouseDown && isGraphDrawn){
        isMouseDown = true;
        mouseStartX = event.offsetX;
        mouseStartY = event.offsetY;
    }
    console.log(`X: ${mouseStartX}\nY: ${mouseStartY}`);
});

canvas.addEventListener('mouseup', function(event){
    isMouseDown = false;
    if (isMouseMoved){
        isMouseMoved = false;
        currentOffsetx = (currentOffsetx + moveOffsetx);
        currentOffsety = (currentOffsety + moveOffsety);
    }
});

canvas.addEventListener('mousemove', function(event){
    if (isMouseDown && isGraphDrawn){
        isMouseMoved = true;
        isAbleToPoint = false;
        moveOffsetx = 2*(event.offsetX - mouseStartX);
        moveOffsety = 2*(event.offsetY - mouseStartY);
        reDrawGraph(graph,
            (currentOffsetx + moveOffsetx), (currentOffsety + moveOffsety), scale);
    }
});

//SCALING
let scale = 1;
let scaleSpeed = 1.5;
let zoom = document.getElementsByClassName('zoom_button');
for (let i = 0; i < zoom.length; i++){
    zoom[i].addEventListener('click', function(event){
        let inner = zoom[i].innerHTML;
        if (inner === '+') {
            scale *= scaleSpeed;
            currentOffsetx *= scaleSpeed;
            currentOffsety *= scaleSpeed;
        }
        else if (inner === '-') {
            scale /= scaleSpeed;
            currentOffsetx /= scaleSpeed;
            currentOffsety /= scaleSpeed;
        }
        console.log(scale);
        reDrawGraph(graph, currentOffsetx, currentOffsety, scale)
    })
}

canvas.addEventListener('click', function(event){
    if (isGraphDrawn && isAbleToPoint){
        if (pointFrom === undefined){
            pointFrom = {x: event.offsetX, y: canvas.height - event.offsetY};
            console.log(`pointFrom set to ${pointFrom.x}:${pointFrom.y}`);
        }
        else {
            pointTo = {x: event.offsetX, y: canvas.height - event.offsetY};
            console.log(`pointTo set to ${pointTo.x}:${pointTo.y}`);
        }
    }
    isAbleToPoint = true;
});