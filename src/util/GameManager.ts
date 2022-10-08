import Board from "../chess/board";
import Pawn from "../chess/pawn";
import Player from "./Player";

export default class GameManager {
    private static instance: GameManager;
    private playerOne: Player

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }
    

    private createBoard(){
        new Board(0x769656, 0xEEEED2).draw()
    }

    private createPawn(){
        for (let i = 1; i <= 8; i++) {
            let pawn = new Pawn(i , {x: i, y: 1})
            pawn.draw()
        }
    }

    public buildGame(){
        this.playerOne = new Player()
        this.createBoard()
        this.createPawn()
    }
}