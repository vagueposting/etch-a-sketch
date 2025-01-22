// define canvas
const pixelCanvas = document.querySelector("#canvas");

function subdivideCanvas(int) {
    return (1/int) * 100;
};

// Generate the canvas

function generateGrid(numberofPixels = 16) {
    for (let i = 0; i <= (numberofPixels - 1); i++) {
        let rowPiece = document.createElement("div");
        let percentOfCanvas = subdivideCanvas(numberofPixels);
        rowPiece.setAttribute("style",
            `height: ${percentOfCanvas}%`
        );
        rowPiece.classList.add("rowPiece")
        rowPiece.setAttribute("id", `row${i}`)
        pixelCanvas.appendChild(rowPiece);
    };
    
    for (let i = 0; i <= (numberofPixels - 1); i++) {
        let rowHeader = document.querySelector(`#row${i}`);
        let percentOfRow = subdivideCanvas(numberofPixels);
        for (let i = 0; i <= (numberofPixels - 1); i++) {
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
