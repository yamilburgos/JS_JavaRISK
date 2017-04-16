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
        });

        for (let i = 0; i < this.grid.cellList.length; i++) {
            let cell = this.grid.cellList[i];
            cell.addEventListener("click", getListening);
        }
    }
    
    
}

let main = new Main();

function getListening() {
    main.chosenCell.push(this);

    if (main.chosenCell[0].textContent <= 1 || main.chosenCell[0].getAttribute("player") !== main.globalTurn.newPlayer) {
        main.chosenCell = [];
    }

    if (main.chosenCell.length === 1) {
        this.style.border = "5px solid black";
    }

    if (main.chosenCell.length === 2) {
        if (pointsCheck(main.chosenCell[0].getAttribute("position"), main.chosenCell[1].getAttribute("position"))) {
            isMatch(main.chosenCell[0], main.chosenCell[1]);
        }

        main.chosenCell[0].style.border = "";
        main.chosenCell = [];

        if (victoryCheck(main.grid.cellList, main.globalTurn.newPlayer)) {
            endGame();
        }
    }
}

function pointsCheck(positionA, positionB) {
    let aX = positionA[0];
    let aY = positionA[positionA.length - 1];    
    let bX = positionB[0];
    let bY = positionB[positionB.length - 1];

    let distance = Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
    return distance <= 1;
}


function isMatch(cell1, cell2) {
    if (cell1.getAttribute("player") !== cell2.getAttribute("player")) {
        if (attackPointsRoll(parseInt(cell1.textContent), parseInt(cell2.textContent))) {
            cell2.textContent = Math.max(1, parseInt(cell1.textContent) - 1);
            cell2.setAttribute("player", `${cell1.getAttribute('player')}`);
            cell2.style.backgroundColor = cell1.style.backgroundColor;
        }

        cell1.textContent = 1;
    }
}

function attackPointsRoll(mainDices, sideDices) {
    let mainTotalPoints = rollDices(mainDices);
    let sideTotalPoints = rollDices(sideDices);

    main.grid.diceOne.textContent = mainTotalPoints;
    main.grid.diceTwo.textContent = sideTotalPoints;

    diceAnimation();

    let turnResults = main.globalTurn.newPlayer === "player1" ? mainTotalPoints > sideTotalPoints : mainTotalPoints < sideTotalPoints;

    return turnResults;
}

function diceAnimation() {
    main.grid.diceOne.style = "none";
    main.grid.diceTwo.style = "none";

    main.grid.diceOne.style.backgroundColor = main.globalTurn.mainColor;
    main.grid.diceTwo.style.backgroundColor = main.globalTurn.sideColor;

    main.grid.diceOne.style.color = "white";
    main.grid.diceTwo.style.color = "white";

    setTimeout(showDices, 100);
    setTimeout(hideDices, 2200);
}

function showDices() {
    main.grid.diceOne.style.transform = "rotateZ(720deg)";
    main.grid.diceTwo.style.transform = "rotateZ(720deg)";
}

function hideDices() {
    main.grid.diceOne.style.display = 'none';
    main.grid.diceTwo.style.display = 'none';
}

function victoryCheck(array, playerCheck) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].getAttribute("player") !== playerCheck) {
            return false;
        }
    }

    return true;
}

function endGame() { 
    let winText = main.globalTurn.playText;
    winText.innerHTML = main.globalTurn.newPlayer === "player1" ? " 1 Won!" : " 2 Won!";

    let parent = document.querySelector("body");
    parent.removeChild(document.querySelector("#button"));

    for (let i = 0; i < main.grid.cellList.length; i++) {
        let cell = main.grid.cellList[i];
        cell.removeEventListener("click", getListening);
    }
}

function rollDices(dices) {
    let totalPoints = 0;

    for (let i = 0; i < dices; i++) {
        totalPoints += randomPowerNumber(1,6);
    }

    return totalPoints;
}

function randomPowerNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}