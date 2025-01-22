// define canvas
const pixelCanvas = document.querySelector("#canvas");

// Generate the canvas

function generateGrid(numberofPixels = 16) {
    for (let i = 0; i <= (numberofPixels - 1); i++) {
        let rowPiece = document.createElement("div");
        let percentOfSegment = (1/numberofPixels * 1)*100;
        rowPiece.setAttribute("style",
            `height: ${percentOfSegment}%`
        );
        rowPiece.classList.add("rowPiece")
        rowPiece.setAttribute("id", `row${i}`)
        pixelCanvas.appendChild(rowPiece);
    };
    
    for (let i = 0; i <= (numberofPixels - 1); i++) {
        let rowHeader = document.querySelector(`#row${i}`);
        let percentOfSegment = (1/numberofPixels * 1)*100;
        for (let i = 0; i <= (numberofPixels - 1); i++) {
            let individualPixels = document.createElement("div");
            individualPixels.classList.add("pixel");
            individualPixels.setAttribute("style",
                `width: ${percentOfSegment}%`
            );
            rowHeader.appendChild(individualPixels);
        }
    } 
};

generateGrid(24);
