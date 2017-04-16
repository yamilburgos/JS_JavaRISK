console.log('turn.js is connected');

class Turn {
    passGrid(gridCopy) {
        // Graps a copy of the current turn display. Then set a color.
        this.playText = document.querySelector(".turnIcon");
        this.playText.style.color = "black";

        // Obtains a copy of the game's board and the two main colors.
        this.grid = gridCopy;
        this.mainColor = this.grid.firstColor;
        this.sideColor = this.grid.secondColor;
    }

    changePlayers() {
        // Controls and keeps track of the current player phase.
        this.playerChange = !this.playerChange ? true : false;
        this.newPlayer = !this.playerChange ? "player2" : "player1";

        // Changes the current text and color of the current turn display.
        this.playText.style.color = this.playerChange ? this.mainColor : this.sideColor;
        this.playText.innerHTML = this.playerChange ? " 1's Turn" : " 2's Turn";
    }

    increaseNumbers() {
        // Grabs a copy of all the game's cells from the game board.
        let array = this.grid.cellList;

        for (let i = 0; i < array.length; i++) {
            if (array[i].getAttribute("player") !== this.newPlayer) {
                // Increases all cells the previous player owned by 1 point.
                array[i].textContent = Math.min(6, parseInt(array[i].textContent) + 1);
                // Also clear out any pre-existing border styles.
                array[i].style.border = "";
            }
        }
    }
}