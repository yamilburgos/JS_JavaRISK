console.log('turn.js is connected');

class Turn {
    passGrid(gridCopy) {
        this.playText = document.querySelector(".turnIcon");
        this.playText.style.color = "black";

        this.grid = gridCopy;
        this.mainColor = this.grid.firstColor;
        this.sideColor = this.grid.secondColor;
    }

    changePlayers() {
        this.playerChange = !this.playerChange ? true : false;
        this.newPlayer = !this.playerChange ? "player2" : "player1";

        this.playText.style.color = this.playerChange ? this.mainColor : this.sideColor;
        this.playText.innerHTML = this.playerChange ? " 1's Turn" : " 2's Turn";
    }

    increaseNumbers() {
        let array = this.grid.cellList;

        for (let i = 0; i < array.length; i++) {
            if (array[i].getAttribute("player") !== this.newPlayer) {
                array[i].textContent = Math.min(6, parseInt(array[i].textContent) + 1);
            }
        }
    }
}

//
//function maxNumberLimit(content) {
//    return Math.min(6, parseInt(content));
//}