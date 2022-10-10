import PIXI, { app } from "./util/PIXI"
import GameManager from "./util/GameManager"

// Desktop
if(window.innerWidth > window.innerHeight){
    app.view.style.width = window.innerWidth * 1/2.3 + 'px';
    app.view.style.height = window.innerWidth * 1/2.3 + 'px';
}
// Phone
else{
    app.view.style.width = window.innerWidth * 1/1.1+ 'px';
    app.view.style.height = window.innerWidth * 1/1.1 + 'px';
}

let gameManager = GameManager.Instance
gameManager.buildGame()

document.body.appendChild(app.view)