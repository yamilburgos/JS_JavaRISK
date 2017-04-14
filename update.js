console.log('update.js is connected');

class Update {
    constructor() {
        
    }    
}

let gridInPlay = [];

function startGame() {
    let cellContainer = document.querySelectorAll(".cell");

    displayPlayerTurn();

    for (let i = 0; i < cellContainer.length; i++) {
        cellContainer[i].addEventListener("click", listenToAllClicks);
    }
}

function listenToAllClicks() {
    console.log("Hellp");
    gridInPlay.push(this);

    if (gridInPlay[0].firstChild.innerHTML <= 1) { 
        gridInPlay = [];
    }
    // displayPlayerTurn();

    if (gridInPlay.length === 1) {
        this.style.border = "5px solid black";
    }

    if (gridInPlay.length === 2) {
        if (gridInPlay[0].firstChild.innerHTML > gridInPlay[1].firstChild.innerHTML) {
            /// TEMP! Will be expanded on!
            // console.log("Single", gridInPlay[0].firstChild.innerHTML > gridInPlay[1].firstChild.innerHTML);

            //  console.log("Double", gridInPlay[0],gridInPlay[1]);

            isMatch(gridInPlay);
        }

        gridInPlay[0].style.border = "5px dotted lightblue";
        gridInPlay = [];
    }
}
//  this.removeEventListener("click", listenToClick);
//  checkThisClick();
//}


function isMatch(gridInPlay) {
    if (gridInPlay[0].getAttribute("color") !== gridInPlay[1].getAttribute("color")) {
        gridInPlay[1].setAttribute('color', `${gridInPlay[0].getAttribute('color')}`);
        gridInPlay[1].firstChild.style.backgroundColor = `${gridInPlay[0].getAttribute('color')}`;

        let number1 = parseInt(gridInPlay[0].firstChild.style.textContent);
        console.log(number1);
        gridInPlay[0].firstChild.style.innerHTML - 1;
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

function checkThisClick() {
    //    let collect = document.querySelectorAll(".cell");
    //    let theseBoxes = [];
    //    let results = [];
    //
    //    for (let array in combo) {
    //        for (let i = 0; i < combo[array].length; i++) {
    //            if (collect[combo[array][i]].textContent !== "") {
    //                results.push(collect[combo[array][i]].textContent === "X"
    //                             ? true : false);
    //
    //                theseBoxes.push(collect[combo[array][i]]);  
    //            }
    //        }
    //
    //        if (results.length === 3) {
    //            let trueOrFalse = playerChange % 2 == 0 ? false : true;
    //
    //            if (victoryCheck(results, trueOrFalse)) {
    //                endGame(theseBoxes, trueOrFalse);
    //            }
    //        }
    //
    //        results = [];
    //        theseBoxes = [];
    //    }
}

function victoryCheck(arrayResults, boolean) {    
    for (let i = 0; i < arrayResults.length; i++) {
        if (arrayResults[i] !== boolean) {
            return false;
        }
    }

    return true;
}

function endGame(colorResults, boolean) {
    let theColor = boolean ? firstColor : secondColor;

    for (let i = 0; i < colorResults.length; i++) {
        //  colorResults[i].firstChild.style.color = theColor;
    }

    let cellContainer = document.querySelectorAll(".cell");

    for (let i = 0; i < cellContainer.length; i++) {
        cellContainer[i].removeEventListener("click", listenToClick);
    }
}

function randomPowerNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function displayPlayerTurn() {
    let turnDisplay = document.querySelector("a");

    if (turnDisplay.style.color === "") {
      //  turnDisplay.style.color = firstColor;
        turnDisplay.innerHTML = "1's Turn";
    }

    else {        
      //  turnDisplay.style.color = turnDisplay.style.color === firstColor ? secondColor : firstColor;
        turnDisplay.innerHTML = turnDisplay.innerHTML === "1's Turn" ? "2's Turn" : "1's Turn";
    }
}

startGame();