const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = "white";
ctx.lineWidth = 2.5;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if(filling === false){
        painting = true;
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //fillmode일때 멈추기
        //if(filling === true){
            ctx.lineTo(x, y); //마우스를 움직이는 내내 발생한다.
            ctx.stroke();
        //}
        
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    //마우스를 클릭하고있는 중, 뗄 때
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeBtnClick(){
    if(filling === true){
        filling = false;
        modeBtn.innerText = "Fill"
    } else {
        filling = true;
        modeBtn.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
    console.log(link);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors));
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeBtnClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}