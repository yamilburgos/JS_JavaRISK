console.log('grid.js is connected');

class Grid {    
    constructor() {
        // Contains the game board's cells with the following amount.
        this.cellList = [];
        this.gridAmount = 40;

        // Call the following methods to set up the game board.
        this.setupBoard();
        this.setupCells();
        this.setupValues();
        this.setupPositions();
        this.setupColors();
    }

    setupBoard() {
        // Grabs a reference from the gameboard and set the class.
        this.gameBoard = document.querySelector("div");
        this.gameBoard.setAttribute("class", "gameBoard");

        // Grabs the two dices from html and hide them for now.
        this.diceOne = document.querySelector("#firstDice");
        this.diceTwo = document.querySelector("#secondDice");
        this.diceOne.style.display = "none";
        this.diceTwo.style.display = "none";
    }

    setupCells() {
        // Loops through with the provided grid amount, set the
        // class, push it to the cellList and append it to the
        // game board.
        
        for (let i = 0; i < this.gridAmount; i++) {
            this.cells = document.createElement("span");
            this.cells.setAttribute("class", "cell");

            this.cellList.push(this.cells);
            this.gameBoard.appendChild(this.cells);
        }
    }

    setupValues() {
        for (let i = 0; i < this.cellList.length; i++) {
            // Provides a random value, 1 to 3, to a cell. 
            this.cellList[i].textContent = randomNumber(1,3);
        }
    }

    setupPositions() {
        // Sets up initial positions and grabs the max column amount.
        let xValue, yValue = 0;
        let querySelect = window.getComputedStyle(this.gameBoard);
        let xLimit = querySelect.gridTemplateColumns.split(" ").length;

        for (let i = 0; i < this.cellList.length; i++) {
            // Sets up a position value with the following operations.
            xValue = (xValue++ < xLimit) ? xValue : 1;
            yValue = (xValue === 1) ? yValue + 1 : yValue;
            this.cellList[i].setAttribute("position", [xValue, yValue]);
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

        // Calls the colorPicker method to select a color at random.
        // Then assign the chosen color. Lastly call setupTerritory.
        
        let chosenColor = colorPicker(colorObject);
        this.firstColor = chosenColor;
        this.setupTerritory(this.firstColor, "player1");

        chosenColor = colorPicker(colorObject);
        this.secondColor = chosenColor;
        this.setupTerritory(this.secondColor, "player2");
    }

    setupTerritory(gridColor, thisPlayer) {
        // Used to divide the gridAmount by 2 for both players.
        let playerGet = this.gridAmount / 2;

        while (playerGet > 0) {
            // Takes a random cell, see if it has been taken, and
            // then assign a attribute and background color.
            let newValue = randomNumber(0, this.cellList.length);

            if (this.cellList[newValue].getAttribute("player") === null) {
                this.cellList[newValue].setAttribute("player", thisPlayer);
                this.cellList[newValue].style.backgroundColor = gridColor;
                playerGet--;
            }
        }
    }
}

function colorPicker(thisObject) {
    // Grabs a list of colors from the object, then pick 1 randomly.
    let entry = Object.keys(thisObject);
    let chosenEntry = entry[randomNumber(0, entry.length)];
    // Then create a copy of the picked color from the array.
    let chosenColor = thisObject[chosenEntry];

    // Delete the chosen color from the array. Then return it.
    delete thisObject[chosenEntry];
    return chosenColor;
}

function randomNumber(min, max) {
    // Used to pick a random value between 2 points.
    return Math.floor(Math.random() * max) + min;
}