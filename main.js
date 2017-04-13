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
    let gameBoard = document.querySelector("div");
    gameBoard.setAttribute("class", "gameBoard");
    
    for (let i = 0; i < gridAmount; i++) {
        let cells = document.createElement("span");
        cells.setAttribute("class", "cell");
        gameBoard.appendChild(cells);
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

    pointSetter();
    
    firstColor = pickRandomColor(colorObject);
    secondColor = pickRandomColor(colorObject);

    startGame();
}

 function pointSetter() {
     let cellContainer = document.querySelectorAll(".cell");
     let xValue = 0;
     let yValue = 0;
     
     let querySelect = window.getComputedStyle(document.querySelector(".gameBoard"));
     let xLimit = querySelect.gridTemplateColumns.split(" ").length;
     
     for (let i = 0; i < cellContainer.length; i++) {
        xValue = (xValue++ < xLimit) ? xValue : 1;
        yValue = (xValue === 1) ? yValue + 1 : yValue;
        cellContainer[i].setAttribute("points", [xValue, yValue]);
     }
 }

function startGame() {
    let cellContainer = document.querySelectorAll(".cell");
    
    assignProperties(cellContainer);
    displayPlayerTurn();
    
    for (let i = 0; i < cellContainer.length; i++) {
        cellContainer[i].addEventListener("click", listenToAllClicks);
    }
}

function listenToAllClicks() {
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

function assignProperties(cellContainer) {
    for (let i = 0; i < cellContainer.length; i++) {
        let contents = document.createElement("p");
        contents.innerHTML = randomPowerNumber(1,3);
    
        cellContainer[i].appendChild(contents);
    }
    
    claimRandomTerritory(cellContainer, firstColor);
    claimRandomTerritory(cellContainer, secondColor);
}

function claimRandomTerritory(cellContainer, gridColor) {
    let playerGet = gridAmount / 2;

    while (playerGet > 0) {
        let newValue = randomPowerNumber(0, cellContainer.length);
        
        if (cellContainer[newValue].getAttribute("color") === null) {
            cellContainer[newValue].setAttribute("color", gridColor);
            cellContainer[newValue].firstChild.style.backgroundColor = gridColor;
            playerGet--;
        }
    }
}

function pickRandomColor(thisObject) {
    let entry = Object.keys(thisObject);
    let chosenEntry = entry[randomPowerNumber(0, entry.length)];

    let chosenColor = thisObject[chosenEntry];
    delete thisObject[chosenEntry];

    return chosenColor;
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

createGame();