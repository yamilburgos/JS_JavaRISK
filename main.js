let playerChange = 0;
let gridAmount = 40;

//let combo = {
//    array1:[0,1,2],
//    array2:[3,4,5],
//    array3:[6,7,8],
//    array4:[0,3,6],
//    array5:[1,4,7],
//    array6:[2,5,8],
//    array7:[0,4,8],
//    array8:[2,4,6]
//};

let firstColor, secondColor = "";
let gridInPlay = [];

function createGame() {
    for (let i = 0; i < gridAmount; i++) {
        let cells = document.createElement("span");
        cells.setAttribute("class", "cell");
        document.querySelector(".gameBoard").appendChild(cells);
    }

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

    firstColor = pickRandomColor(colorObject);
    secondColor = pickRandomColor(colorObject);

    startGame();
}

function startGame() {
    let cellContainer = document.querySelectorAll(".cell");

    for (let i = 0; i < cellContainer.length; i++) {
        assignPowerNumber(cellContainer[i]);

        cellContainer[i].addEventListener("click", listenToClick);
    }

    claimRandomTerritory(cellContainer, firstColor);
    claimRandomTerritory(cellContainer, secondColor);

    displayPlayerTurn();


}

function assignPowerNumber(cells) {
    let contents = document.createElement("p");

    contents.innerHTML = randomPowerNumber(1,3);
    // contents.style.backgroundColor = claimRandomTerritory(contents);

    cells.appendChild(contents);
}

function randomPowerNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function claimRandomTerritory(cellContainer, gridColor) {
    let playerGet = gridAmount / 2;

    while (playerGet > 0) {
        let newValue = randomPowerNumber(0, cellContainer.length);

        if (cellContainer[newValue].firstChild.style.backgroundColor === "") {
            cellContainer[newValue].firstChild.style.backgroundColor = gridColor;
            playerGet--;
        }
    }
}


function displayPlayerTurn() {
    let turnDisplay = document.querySelector("a");

    if (turnDisplay.style.color === "") {
        turnDisplay.style.color = firstColor;
        turnDisplay.innerHTML = "1's Turn";
    }

    else {        
        turnDisplay.style.color = turnDisplay.style.color === firstColor ? secondColor : firstColor;
        turnDisplay.innerHTML = turnDisplay.innerHTML === "1's Turn" ? "2's Turn" : "1's Turn";
    }
}




function listenToClick() {
    displayPlayerTurn();

    if (gridInPlay.length === 2) {
      //  isMatch(gridInPlay[0], gridInPlay[1]);
        gridInPlay = [];
    }
}
    //  this.removeEventListener("click", listenToClick);
    //  checkThisClick();
//}


//function isMatch(cardOne, cardTwo) {    
//    if(cardOne.innerHTML === cardTwo.innerHTML && cardOne.id != cardTwo.id) {
//        console.log("Matched!");
//        cardOne.removeEventListener("click", isTwoCards);
//        cardTwo.removeEventListener("click", isTwoCards);
//    }
//    else {
//        console.log("No match");
//        setTimeout(function() {
//            cardOne.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
//            cardTwo.innerHTML = '<img src="joker.png" alt="Joker Deck"/>';    
//        }, 1000);   
//    }
//}

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
    let theColor = boolean ? "blue" : "red";

    for (let i = 0; i < colorResults.length; i++) {
        //  colorResults[i].firstChild.style.color = theColor;
    }

    let cellContainer = document.querySelectorAll(".cell");

    for (let i = 0; i < cellContainer.length; i++) {
        cellContainer[i].removeEventListener("click", listenToClick);
    }
}

function pickRandomColor(thisObject) {
    let entry = Object.keys(thisObject);
    let chosenEntry = entry[randomPowerNumber(0, entry.length)];

    let chosenColor = thisObject[chosenEntry];
    delete thisObject[chosenEntry];

    return chosenColor;
}

createGame();