console.log('grid.js is connected');

class Grid {
    constructor() {
        this.cellContainer = [];
        this.gridAmount = 40;

        this.setupBoard();
        this.setupCells();
        this.setupValues();
        this.setupPositions();
        this.setupColors();
    }

    setupBoard() {
        this.gameBoard = document.querySelector("div");
        this.gameBoard.setAttribute("class", "gameBoard");
    }

    setupCells() {
        for (let i = 0; i < this.gridAmount; i++) {
            this.cells = document.createElement("span");
            this.cells.setAttribute("class", "cell");

            this.cellContainer.push(this.cells);
            this.gameBoard.appendChild(this.cells);
        }
    }

    setupValues() {
        for (let i = 0; i < this.cellContainer.length; i++) {
            this.cellContainer[i].textContent = randomNumber(1,3);
        }
    }

    setupPositions() {  
        let xValue, yValue = 0;
        let querySelect = window.getComputedStyle(this.gameBoard);
        let xLimit = querySelect.gridTemplateColumns.split(" ").length;

        for (let i = 0; i < this.cellContainer.length; i++) {
            xValue = (xValue++ < xLimit) ? xValue : 1;
            yValue = (xValue === 1) ? yValue + 1 : yValue;
            this.cellContainer[i].setAttribute("points", [xValue, yValue]);
        }
    }

    setupColors() {
        let colorObject = {
            color1:"rgb(32, 131, 125)",
            color2:"rgb(218, 55, 129)",
            color3:"rgb(201, 52, 87)",
            color4:"rgb(34, 140, 255)",
            color5:"rgb(223, 100, 26)",
            color6:"rgb(237, 187, 8)",
            color7:"rgb(64, 157, 59)",
            color8:"rgb(221, 160, 221)"
        };

        let chosenColor = colorPicker(colorObject);
        this.firstColor = chosenColor;
        this.setupTerritory(this.firstColor);

        chosenColor = colorPicker(colorObject);
        this.secondColor = chosenColor;
        this.setupTerritory(this.secondColor);
    }

    setupTerritory(gridColor) {
        let playerGet = this.gridAmount / 2;

        while (playerGet > 0) {
            let newValue = randomNumber(0, this.cellContainer.length);

            if (this.cellContainer[newValue].getAttribute("color") === null) {
                this.cellContainer[newValue].setAttribute("color", gridColor);
                this.cellContainer[newValue].style.backgroundColor = gridColor;
                playerGet--;
            }
        }
    }
}

function colorPicker(thisObject) {
    let entry = Object.keys(thisObject);
    let chosenEntry = entry[randomNumber(0, entry.length)];

    let chosenColor = thisObject[chosenEntry];
    delete thisObject[chosenEntry];

    return chosenColor;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

new Grid();