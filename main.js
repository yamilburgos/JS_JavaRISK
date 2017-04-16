console.log('main.js is connected');

class Update {  
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

let updateGame = new Update();

function getListening() {
    updateGame.chosenCell.push(this);

    if (updateGame.chosenCell[0].textContent <= 1 || updateGame.chosenCell[0].getAttribute("player") !== updateGame.globalTurn.newPlayer) {
        updateGame.chosenCell = [];
    }

    if (updateGame.chosenCell.length === 1) {
        this.style.border = "5px solid black";
    }

    if (updateGame.chosenCell.length === 2) {
        if (pointsCheck(updateGame.chosenCell[0].getAttribute("position"), updateGame.chosenCell[1].getAttribute("position"))) {
            isMatch(updateGame.chosenCell[0], updateGame.chosenCell[1]);
        }

        updateGame.chosenCell[0].style.border = "";
        updateGame.chosenCell = [];

        if (victoryCheck(updateGame.grid.cellList, updateGame.globalTurn.newPlayer)) {
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
    return distance === 1 || distance === 0;
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


    //    else {
    //        setTimeout(function() {
    //            cardOne.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
    //            cardTwo.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
    //        }, 1000);   
    //    }
}

function attackPointsRoll(mainDices, sideDices) {
    console.log(mainDices);
    console.log(sideDices);

    let mainTotalPoints = rollDices(mainDices);
    let sideTotalPoints = rollDices(sideDices);

    console.log("main: ", mainTotalPoints);
    console.log("side: ", sideTotalPoints);

    return mainTotalPoints > sideTotalPoints;
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
    let winText = updateGame.globalTurn.playText;
    winText.innerHTML = updateGame.globalTurn.newPlayer === "player1" ? " 1 Won!" : " 2 Won!";

    let parent = document.querySelector("body");
    parent.removeChild(document.querySelector("#button"));

    for (let i = 0; i < updateGame.grid.cellList.length; i++) {
        let cell = updateGame.grid.cellList[i];
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