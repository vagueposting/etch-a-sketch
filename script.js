// define canvas
const pixelCanvas = document.querySelector("#canvas"),
dimensionSlider = document.querySelector("#dimensionSlider"),
rainbowMode = document.querySelector("#rainbow"),
trickleMode = document.querySelector("#trickle");
let canvasDimensions = dimensionSlider.value,
canvasDimensionDisplay = document.querySelector("#canvasDimensionDisplay"),
gridStatus = false;
canvasDimensionDisplay.textContent = `${canvasDimensions} × ${canvasDimensions}`;
console.log(canvasDimensions);

function subdivideCanvas(int) {
    return (1/int) * 100;
};

// Welcome to the button zone, Davis.

dimensionSlider.addEventListener("input", (event) => {
    canvasDimensions = event.target.value;
    canvasDimensionDisplay.textContent = `${canvasDimensions} × ${canvasDimensions}`; 
    generateGrid()
})

// Generate the canvas

function generateGrid(numberOfPixels = canvasDimensions) {
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
            rowHeader.appendChild(individualPixels);
        }
    } 
};

generateGrid();
