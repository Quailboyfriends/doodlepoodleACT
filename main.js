// referencias

const imagenDeReferencia = document.getElementById("referencia");

document.getElementById("botonGatos").addEventListener("click", () => {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then((respuesta) => respuesta.json())
        .then((respuestaParseada) => {
            imagenDeReferencia.src = respuestaParseada[0].url;
        });
});

document.getElementById("botonPerros").addEventListener("click", () => {
    fetch("https://shibe.online/api/shibes?count=1&urls=true")
        .then((respuesta) => respuesta.json())
        .then((respuestaParseada) => {
            imagenDeReferencia.src = respuestaParseada[0];
        });
        
});




// cronometro

window.onload = function () {
    var seconds = 0;
    var tens = 0;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var buttonStart = document.getElementById("button-start");
    var buttonStop = document.getElementById("button-stop");
    var buttonReset = document.getElementById("button-reset");
    var Interval;

    buttonStart.onclick = function () {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    };

    buttonStop.onclick = function () {
        clearInterval(Interval);
    };

    buttonReset.onclick = function () {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    };

    function startTimer() {
        tens++;

        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
    }
};

// canva porfavor funciona

// intente agregar una función para ir para atras pero funcionó, así que me quede solo con la de borrar todo el canvas

const paintCanvas = document.getElementById("drawing-board");
const context = paintCanvas.getContext("2d");
context.lineCap = "round";

const colorPicker = document.getElementById("stroke");

colorPicker.addEventListener("change", (event) => {
    context.strokeStyle = event.target.value;
});

const lineWidthRange = document.getElementById("lineWidth");

lineWidthRange.addEventListener("input", (event) => {
    const width = event.target.value;
    context.lineWidth = width;
});

let x = 0;
let y = 0;
let isMouseDown = false;
let undoStack = [];

const stopDrawing = () => {
    isMouseDown = false;
    
    undoStack = [];
};

const startDrawing = (event) => {
    isMouseDown = true;
    x = event.offsetX;
    y = event.offsetY;
};

const drawLine = (event) => {
    if (isMouseDown) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        x = newX;
        y = newY;
        undoStack.push(context.getImageData(0, 0, paintCanvas.width, paintCanvas.height));
    }
};

const undo = () => {
    if (undoStack.length > 1) {
        undoStack.pop(); 
        context.putImageData(undoStack[undoStack.length - 1], 0, 0);
    } else {
        
        context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    }
};

const clearCanvas = () => {
    context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    undoStack = []; 
};

paintCanvas.addEventListener("mousedown", startDrawing);
paintCanvas.addEventListener("mousemove", drawLine);
paintCanvas.addEventListener("mouseup", stopDrawing);
paintCanvas.addEventListener("mouseout", stopDrawing);

// Add event listeners for undo and clear buttons
const undoButton = document.getElementById("undo");
undoButton.addEventListener("click", undo);

const clearCanvasButton = document.getElementById("clearCanvas");
clearCanvasButton.addEventListener("click", clearCanvas);
