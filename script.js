// define elements
const pixelCanvas = document.querySelector("#canvas"),
dimensionSlider = document.querySelector("#dimensionSlider"),
normalMode = document.querySelector("#normal"),
rainbowMode = document.querySelector("#rainbow"),
trickleMode = document.querySelector("#trickle"),
pen = document.querySelector("#pen"),
eraser = document.querySelector("#eraser"),
colorSelection = document.querySelector("#colorSelection"),
clearCanvas = document.querySelector("#clear");

// define canvas
let canvasDimensions = dimensionSlider.value,
canvasDimensionDisplay = document.querySelector("#canvasDimensionDisplay"),
gridStatus = false;

canvasDimensionDisplay.textContent = `${canvasDimensions} × ${canvasDimensions}`;
console.log(canvasDimensions);

// Math for sizing

function subdivideCanvas(int) {
    return (1/int) * 100;
};

// color init
let colorPalette = [
    "rgb(230,69,110)",
    "rgb(242, 174, 135)",
    "rgb(250,244,152)", 
    "rgb(219, 236, 176)",
    "rgb(195, 230, 195)",
    "rgb(159, 221, 224)",
    "rgb(119,211,255)",
    "rgb(144, 202, 246)",
    "rgb(196,182,227)",
    "rgb(206, 148, 208)",
    "rgb(221, 107, 168)",
    "rgb(59, 18, 102)"
];

// pen init

let penMode = "NORMAL",
penState = "DRAW",
penColor = colorPalette[11],
rainbowIndex = 0;


// Welcome to the button zone, Davis.

function adjustButtonOpacity() {
    normalMode.style.opacity = 0.6;
    rainbowMode.style.opacity = 0.6;
    trickleMode.style.opacity = 0.6;
    pen.style.opacity = 0.6;
    eraser.style.opacity = 0.6;

    switch (penMode) {
        case "NORMAL":
            normalMode.style.opacity = 1.0;
            break;
        case "RAINBOW":
            rainbowMode.style.opacity = 1.0;
            break;
        case "TRICKLE":
            trickleMode.style.opacity = 1.0;
            break;
    }

    switch (penState) {
        case "DRAW":
            pen.style.opacity = 1.0;
            break;
        case "ERASE":
            eraser.style.opacity = 1.0;
            break;
    }
};

pen.addEventListener("click", (e) => {
    penState = "DRAW";
    adjustButtonOpacity();
});
eraser.addEventListener("click", (e) => {
    penState = "ERASE";
    adjustButtonOpacity();
});
normalMode.addEventListener("click", (e) => {
    penMode = "NORMAL";
    adjustButtonOpacity();
});
rainbowMode.addEventListener("click", (e) => {
    penMode = "RAINBOW";
    adjustButtonOpacity();
});


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
    if (penState === "DRAW") {
        if (penMode === "RAINBOW") {
            const rainbowColors = colorPalette.slice(0,-1);
            e.target.style.backgroundColor = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
            }
        else if (penMode === "NORMAL") {
            e.target.style.backgroundColor = penColor;
        }
    } else if (penState === "ERASE") {
        e.target.style.backgroundColor = "white";
    }
}

// Color palette

function generatePalette(numberOfColors = colorPalette.length) {
    for (let i = 0; i < colorPalette.length; i++) {
        let colorSwatch = document.createElement("div");
        colorSwatch.classList.add("colorSwatch");
        colorSwatch.style.backgroundColor = colorPalette[i];
        colorSwatch.addEventListener("click", (e) => {
            penColor = colorPalette[i]
        })
        colorSelection.appendChild(colorSwatch);
    }
}

generateGrid();
generatePalette();
