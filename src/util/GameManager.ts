import Board from "../chess/board";
import Pawn from "../chess/pawn";
import Player from "./Player";

export default class GameManager {
    private playerOne: Player

    private createBoard(){
        new Board(0x769656, 0xEEEED2).draw()
    }

    private createPawn(){
        for (let i = 1; i <= 8; i++) {
            let pawn = new Pawn(i , {x: i, y: 2})
            pawn.draw()
        }
    }

    public buildGame(){
        this.playerOne = new Player()
        this.createBoard()
        this.createPawn()
    }
}