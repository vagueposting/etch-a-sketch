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
    "230, 69, 110",
    "242, 174, 135",
    "250, 244, 152", 
    "219, 236, 176",
    "195, 230, 195",
    "159, 221, 224",
    "119, 211, 255",
    "144, 202, 246",
    "196, 182, 227",
    "206, 148, 208",
    "221, 107, 168",
    "59, 18, 102"
];

// pen init

let penMode = "NORMAL",
penState = "DRAW",
penColor = colorPalette[11],
rainbowIndex = 0;

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
            console.log(rainbowColors)
            e.target.style.backgroundColor = `rgb(${rainbowColors[rainbowIndex]})`;
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
            }
        else if (penMode === "NORMAL") {
            e.target.style.backgroundColor = `rgb(${penColor})`;
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
        colorSwatch.setAttribute("id", `color${i}`)
        colorSwatch.style.backgroundColor = `rgb(${colorPalette[i]})`;
        colorSwatch.addEventListener("click", (e) => {
            penColor = colorPalette[i];
            adjustButtonOpacity();
        })
        colorSelection.appendChild(colorSwatch);
    }
}

generateGrid();
generatePalette();

// Welcome to the button zone, Davis.

    // Lists all interactable buttons

let toolButtons = [normalMode, rainbowMode, 
    trickleMode, pen, eraser],
    colorSwatches = Array.from(
        colorSelection.querySelectorAll(".colorSwatch"));
/* colorSwatches.forEach((color) =>
    toolButtons.push(color)
); console.log(toolButtons); */

function adjustButtonOpacity() {
    toolButtons.forEach(button => {
        button.style.opacity = 0.6;
    }
    )

    colorSwatches.forEach(swatch => {
        const swatchColor = swatch.style.backgroundColor;
        if (swatchColor === `rgb(${penColor})`) {
            swatch.style.opacity = 1.0;
        } else {
            swatch.style.opacity = 0.6;
        }
    });


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

adjustButtonOpacity()