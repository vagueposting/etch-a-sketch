// define canvas
const pixelCanvas = document.querySelector("#canvas"),
dimensionSlider = document.querySelector("#dimensionSlider"),
rainbowMode = document.querySelector("#rainbow"),
trickleMode = document.querySelector("#trickle"),
clearCanvas = document.querySelector("#clear");
let canvasDimensions = dimensionSlider.value,
canvasDimensionDisplay = document.querySelector("#canvasDimensionDisplay"),
gridStatus = false;
canvasDimensionDisplay.textContent = `${canvasDimensions} × ${canvasDimensions}`;
console.log(canvasDimensions);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Math for sizing

function subdivideCanvas(int) {
    return (1/int) * 100;
};

// Welcome to the button zone, Davis.

dimensionSlider.addEventListener("input", (e) => {
    canvasDimensions = e.target.value;
    canvasDimensionDisplay.textContent = `${canvasDimensions} × ${canvasDimensions}`; 
    generateGrid()
})

clearCanvas.addEventListener("click", (e) => {
    generateGrid();
})

// Generate the canvas

function generateGrid(numberOfPixels = canvasDimensions) {
    console.log("test");
    pixelCanvas.innerHTML = null;
    for (let i = 0; i <= (numberOfPixels - 1); i++) {
        let rowPiece = document.createElement("div");
        let percentOfCanvas = subdivideCanvas(numberOfPixels);
        rowPiece.setAttribute("style",
            `height: ${percentOfCanvas}%`
        );
        rowPiece.classList.add("rowPiece")
        rowPiece.setAttribute("id", `row${i}`)
        pixelCanvas.appendChild(rowPiece);
    };
    
    for (let i = 0; i <= (numberOfPixels - 1); i++) {
        let rowHeader = document.querySelector(`#row${i}`);
        let percentOfRow = subdivideCanvas(numberOfPixels);
        for (let i = 0; i <= (numberOfPixels - 1); i++) {
            let individualPixels = document.createElement("div");
            individualPixels.classList.add("pixel");
            individualPixels.setAttribute("style",
                `width: ${percentOfRow}%`
            );
            individualPixels.addEventListener("mouseover", draw);
            rowHeader.appendChild(individualPixels);
        }
    } 
};

// Draw function

function draw(e) {
    e.target.style.backgroundColor = "#3b1266";
}

generateGrid();
