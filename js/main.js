console.log('main.js is connected');

class Main {  
    constructor() {
        // Create a new instance of the Grid method, an array used
        // for cells getting clicked, and a getStarted method to set
        // up event listeners.
        this.grid = new Grid();       
        this.chosenCell = [];
        this.getStarted();
    }

    getStarted() {
        // Create a new instance of the Turn method, pass a copy of the
        // grid class to turn, and then call the changePlayers methods.
        let localTurn = new Turn();
        localTurn.passGrid(this.grid);
        localTurn.changePlayers();

        // A global copy of the this turn's variable.
        this.globalTurn = localTurn;

        document.querySelector("#button").addEventListener("click", function() {
            // Calls the following functions everytime a button is pressed.
            localTurn.changePlayers();
            localTurn.increaseNumbers();
            clearGrid();
        });

        for (let i = 0; i < this.grid.cellList.length; i++) {
            // Goes through all of the cells and adds a event listener.
            let cell = this.grid.cellList[i];
            cell.addEventListener("click", getListening);
        }
    }

    isMatch(cell1, cell2) {
        if (cell1.getAttribute("player") !== cell2.getAttribute("player")) {
            if (this.attackPointsRoll(parseInt(cell1.textContent), parseInt(cell2.textContent))) {
                // Checks to see if both cells don't belong to the same player.
                // Then check to see the results from the dice rolls.
                
                // If all true, do the following changes to the second cell.
                cell2.textContent = Math.max(1, parseInt(cell1.textContent) - 1);
                cell2.setAttribute("player", `${cell1.getAttribute('player')}`);
                cell2.style.backgroundColor = cell1.style.backgroundColor;
            }

            // Always set 1 for the first cell, regardless of the above.
            cell1.textContent = 1;
        }
    }

    pointsCheck(positionA, positionB) {
        // Pulls the values from the cell's position attribute.
        let aX = positionA[0];
        let aY = positionA[positionA.length - 1];    
        let bX = positionB[0];
        let bY = positionB[positionB.length - 1];

        // The distance formula for these points and then return a boolean.
        let distance = Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
        return distance <= 1;
    }

    attackPointsRoll(mainDices, sideDices) {
        // Calls the rollDices for both players and then display the value.
        let mainTotalPoints = rollDices(mainDices);
        let sideTotalPoints = rollDices(sideDices);
        this.grid.diceOne.textContent = mainTotalPoints;
        this.grid.diceTwo.textContent = sideTotalPoints;

        // Calls stopDices to prevent any animation display issues from rapid
        // clicking from the player. Then call the diceAnimation method.
        stopDices();
        this.diceAnimation(this.grid.diceOne, this.grid.diceTwo);

        // Change what is being compared depending on the current player phase.
        let turnResults = this.globalTurn.newPlayer === "player1" ? mainTotalPoints > sideTotalPoints : mainTotalPoints < sideTotalPoints;
        return turnResults;
    }

    diceAnimation(firstDice, secondDice) {
        // Always remove the styles from both dices before continuing.
        firstDice.style = "none";
        secondDice.style = "none";

        // Then change backgroundColor and font color for both dices.
        firstDice.style.backgroundColor = this.globalTurn.mainColor;
        secondDice.style.backgroundColor = this.globalTurn.sideColor;
        firstDice.style.color = "white";
        secondDice.style.color = "white";

        // Finally use setTimeout to control the animation being displayed.
        this.firstTimer = setTimeout(this.showDices, 100);
        this.secondTimer = setTimeout(this.hideDices, 2200);
    }

    showDices() {
        // Rotates both dices by 720 degrees.
        main.grid.diceOne.style.transform = "rotateZ(720deg)";
        main.grid.diceTwo.style.transform = "rotateZ(720deg)";
    }

    hideDices() {
        // Hides both dices from the browser.
        main.grid.diceOne.style.display = 'none';
        main.grid.diceTwo.style.display = 'none';
    }

    victoryCheck(array, playerCheck) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].getAttribute("player") !== playerCheck) {
                // Checks to see if any cell is still owned by the other player.
                return false;
            }
        }

        return true;
    }

    endGame() { 
        // Grabs a portion of the player icon text to change the display
        // for the winner. Then increase the entire player icon's font size.
        let winText = this.globalTurn.playText;
        winText.innerHTML = this.globalTurn.newPlayer === "player1" ? " 1 Won!" : " 2 Won!";
        let wholeText = document.querySelector("h3");
        wholeText.style.fontSize = "50px";

        for (let i = 0; i < this.grid.cellList.length; i++) {
            // Goes through each cell and remove the event listener.
            let cell = this.grid.cellList[i];
            cell.removeEventListener("click", getListening);
        }

        // Replaces the End Turn Button with the Play Again button.
        let parent = document.querySelector("body");
        parent.removeChild(document.querySelector("#button"));
        
        let newButton = document.createElement("button");
        newButton.innerHTML = "Play Again";
        document.querySelector("body").appendChild(newButton);

        newButton.addEventListener("click", function() {
            // Clicking the new button will refresh the page.
            window.location.reload();
        });
    }
}

// Starts the main Class and provides a reference to its contents.
let main = new Main();

function getListening() {
    // Adds a cell clicked by a Player.
    main.chosenCell.push(this);

    if (main.chosenCell[0].textContent <= 1 || main.chosenCell[0].getAttribute("player") !== main.globalTurn.newPlayer) {
        // If the cell has a value of 1 or if it doesn't belong
        // to the current player,  clear out the array and go
        // back to the beginning.
        main.chosenCell = [];
    }

    if (main.chosenCell.length === 1) {
        // For the first cell in the array, change the border style for now.
        this.style.border = "5px solid black";
    }

    if (main.chosenCell.length === 2) {
        if (main.pointsCheck(main.chosenCell[0].getAttribute("position"), main.chosenCell[1].getAttribute("position"))) {
            // 1) Check to see if 2 cells are held in the cell array.
            // 2) Then use the pointsCheck method to see if both cells are nearby.
            // 3) Finally call the isMatch method for these 2 cells.
            
            main.isMatch(main.chosenCell[0], main.chosenCell[1]);
        }

        // Revert the first cell's board style back to the default.
        // Also clear out the array for the next clicks.
        main.chosenCell[0].style.border = "";
        main.chosenCell = [];

        if (main.victoryCheck(main.grid.cellList, main.globalTurn.newPlayer)) {
            // Calls the victoryCheck method to see if the current player has
            // won from their latest acgtion. If so, call endGame method.
            main.endGame();
        }
    }
}

function stopDices() {
    // Used to clear out both timeouts that were set up in
    // the diceAnimation method. Then set them both to 0.

    if (main.firstTimer) {
        clearTimeout(main.firstTimer);
        main.firstTimer = 0;
    } 

    if (main.secondTimer) {
        clearTimeout(main.secondTimer);
        main.secondTimer = 0;
    }
}

function rollDices(dices) {
    // Have the initial amount set to 0.
    let totalPoints = 0;

    for (let i = 0; i < dices; i++) {
        // Continues adding to the total amount for every
        // dice available when calling this function.
        totalPoints += randomPowerNumber(1,6);
    }

    // Returns the total amount back to the caller.
    return totalPoints;
}

function clearGrid() {
    // Used to clear out any cells selected by the Player.
    main.chosenCell = [];
}

function randomPowerNumber(min, max) {
    // Used to pick a random value between 2 points.
    return Math.floor(Math.random() * max) + min;
}