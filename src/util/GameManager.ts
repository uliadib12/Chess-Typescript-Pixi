import Board from "../chess/Board";
import Player from "./Player";

export default class GameManager {
    private static instance: GameManager;
    public state: "Build" | "Rest" | "Select" | "Selected" | "Next Turn" = "Build"
    public playerOne: Player
    public playerTwo: Player

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }
    

    private createBoard(){
        new Board(0x769656, 0xEEEED2).draw()
    }

    public buildGame(){
        this.createBoard()
        this.playerOne = new Player(1)
        this.playerOne.createPieces()
        this.playerOne.setInteractive(true)
        this.playerTwo = new Player(2)
        this.playerTwo.createPieces()
        this.playerTwo.setInteractive(true)
        this.state = "Rest"
    }
}