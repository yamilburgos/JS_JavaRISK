console.log('main.js is connected');

class Main {  
    constructor() {
        this.grid = new Grid();       
        this.chosenCell = [];

        this.getStarted();
    }

    getStarted() {
        let localTurn = new Turn();
        localTurn.passGrid(this.grid);
        localTurn.changePlayers();

        this.globalTurn = localTurn;

        document.querySelector("#button").addEventListener("click", function() {
            localTurn.changePlayers();
            localTurn.increaseNumbers();
            clearGrid();
        });

        for (let i = 0; i < this.grid.cellList.length; i++) {
            let cell = this.grid.cellList[i];
            cell.addEventListener("click", getListening);
        }
    }

    isMatch(cell1, cell2) {
        if (cell1.getAttribute("player") !== cell2.getAttribute("player")) {
            if (this.attackPointsRoll(parseInt(cell1.textContent), parseInt(cell2.textContent))) {
                cell2.textContent = Math.max(1, parseInt(cell1.textContent) - 1);
                cell2.setAttribute("player", `${cell1.getAttribute('player')}`);
                cell2.style.backgroundColor = cell1.style.backgroundColor;
            }

            cell1.textContent = 1;
        }
    }

    pointsCheck(positionA, positionB) {
        let aX = positionA[0];
        let aY = positionA[positionA.length - 1];    
        let bX = positionB[0];
        let bY = positionB[positionB.length - 1];

        let distance = Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
        return distance <= 1;
    }

    attackPointsRoll(mainDices, sideDices) {
        let mainTotalPoints = rollDices(mainDices);
        let sideTotalPoints = rollDices(sideDices);

        this.grid.diceOne.textContent = mainTotalPoints;
        this.grid.diceTwo.textContent = sideTotalPoints;

        stopDices();
        this.diceAnimation(this.grid.diceOne, this.grid.diceTwo);

        let turnResults = this.globalTurn.newPlayer === "player1" ? mainTotalPoints > sideTotalPoints : mainTotalPoints < sideTotalPoints;

        return turnResults;
    }

    diceAnimation(firstDice, secondDice) {
        firstDice.style = "none";
        secondDice.style = "none";

        firstDice.style.backgroundColor = this.globalTurn.mainColor;
        secondDice.style.backgroundColor = this.globalTurn.sideColor;

        firstDice.style.color = "white";
        secondDice.style.color = "white";

        this.firstTimer = setTimeout(this.showDices, 100);
        this.secondTimer = setTimeout(this.hideDices, 2200);
    }

    showDices() {
        main.grid.diceOne.style.transform = "rotateZ(720deg)";
        main.grid.diceTwo.style.transform = "rotateZ(720deg)";
    }

    hideDices() {
        main.grid.diceOne.style.display = 'none';
        main.grid.diceTwo.style.display = 'none';
    }

    victoryCheck(array, playerCheck) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].getAttribute("player") !== playerCheck) {
                return false;
            }
        }

        return true;
    }

    endGame() { 
        let winText = this.globalTurn.playText;
        winText.innerHTML = this.globalTurn.newPlayer === "player1" ? " 1 Won!" : " 2 Won!";

        let wholeText = document.querySelector("h3");
        wholeText.style.fontSize = "50px";

        let parent = document.querySelector("body");
        parent.removeChild(document.querySelector("#button"));

        for (let i = 0; i < this.grid.cellList.length; i++) {
            let cell = this.grid.cellList[i];
            cell.removeEventListener("click", getListening);
        }

        let newButton = document.createElement("button");
        newButton.innerHTML = "Play Again";
        document.querySelector("body").appendChild(newButton);
        
        newButton.addEventListener("click", function() {
            window.location.reload();
        });
    }
}

let main = new Main();

function getListening() {
    main.endGame();
    main.chosenCell.push(this);

    if (main.chosenCell[0].textContent <= 1 || main.chosenCell[0].getAttribute("player") !== main.globalTurn.newPlayer) {
        main.chosenCell = [];
    }

    if (main.chosenCell.length === 1) {
        this.style.border = "5px solid black";
    }

    if (main.chosenCell.length === 2) {
        if (main.pointsCheck(main.chosenCell[0].getAttribute("position"), main.chosenCell[1].getAttribute("position"))) {
            main.isMatch(main.chosenCell[0], main.chosenCell[1]);
        }

        main.chosenCell[0].style.border = "";
        main.chosenCell = [];

        if (main.victoryCheck(main.grid.cellList, main.globalTurn.newPlayer)) {
            main.endGame();
        }
    }
}

function stopDices() {
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
    let totalPoints = 0;

    for (let i = 0; i < dices; i++) {
        totalPoints += randomPowerNumber(1,6);
    }

    return totalPoints;
}

function clearGrid() {
    main.chosenCell = [];
}

function randomPowerNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}