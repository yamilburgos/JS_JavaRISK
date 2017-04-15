console.log('update.js is connected');

let chosenCell = [];

class Update {  
    constructor() {
        this.grid = new Grid();

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

    switchPlayers() {
        this.globalTurn.changePlayers();
        this.globalTurn.increaseNumbers();
    }
}

let updateGame = new Update();

function getListening() {
    chosenCell.push(this);

  //  updateGame.switchPlayers();


    //   if(cell.getAttribute("player") === turn.newPlayer) {

    if (chosenCell[0].textContent <= 1 || chosenCell[0].getAttribute("player") !== updateGame.globalTurn.newPlayer) {
        chosenCell = [];
    }

    //  example.getTurnDisplay();

    if (chosenCell.length === 1) {
        this.style.border = "5px solid black";
    }

    if (chosenCell.length === 2) {
        isMatch(chosenCell[0], chosenCell[1]);

        chosenCell[0].style.border = "";
        chosenCell = [];

        //  if(victoryCheck(example.grid.cellList, turn.mainColor)) {
        //       endGame();
        //  }
    }

    if (zeroMovesLeft()) {
        console.log("Time to switch Players");
    }

    //  this.removeEventListener("click", listenToClick);
    //  checkThisClick();
}


function isMatch(cell1, cell2) {
    if (cell1.getAttribute("player") !== cell2.getAttribute("player")) {
        cell2.textContent = Math.max(1, parseInt(cell1.textContent - 1));
        cell1.textContent = 1;
        cell2.setAttribute("player", `${cell1.getAttribute('player')}`);
        cell2.style.backgroundColor = cell1.style.backgroundColor;
    }


    //    if(cardOne.innerHTML === cardTwo.innerHTML && cardOne.id != cardTwo.id) {
    //        cardOne.removeEventListener("click", isTwoCards);
    //        cardTwo.removeEventListener("click", isTwoCards);
    //    }
    //    else {
    //        setTimeout(function() {
    //            cardOne.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
    //            cardTwo.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
    //        }, 1000);   
    //    }
}

//function victoryCheck(arrayResults, boolean) {
function victoryCheck(arrayResults, color) {
    // console.log(arrayResults);

    for (let i = 0; i < arrayResults.length; i++) {
        if (arrayResults[i].style.backgroundColor !== color) {
            //  console.log(arrayResults[i]);
            return false;
        }
    }

    return true;
}

function zeroMovesLeft() {
    let temp = document.querySelectorAll("span");

    for (let i = 0; i < temp.length; i++) {
        let numCheck = parseInt(temp[i].textContent);

        if (numCheck > 1) {
            return false;
        }
    }

    return true;
}

//function endGame(colorResults, boolean) {
function endGame() {
    console.log("YOU WON!");

    let header = document.querySelector("h3");    
    header.innerHTML = "!!YOU WON!!";
    // header.style.color = turn.mainColor;
    //    let theColor = boolean ? firstColor : secondColor;
    //
    //    for (let i = 0; i < colorResults.length; i++) {
    //        //  colorResults[i].firstChild.style.color = theColor;
    //    }
    //
    //    let cellContainer = document.querySelectorAll(".cell");
    //
    //    for (let i = 0; i < cellContainer.length; i++) {
    //       // cellContainer[i].removeEventListener("click", listenToClick);
    //    }
}

function randomPowerNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}