import Board from "../chess/Board";
import { Pos } from "./interface";
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

    public getAllPiecesPosition(): {playerOne: Pos[], playerTwo: Pos[]}{
        let position: {playerOne: Pos[], playerTwo: Pos[]} = {playerOne: [], playerTwo: []}
        const playerOne = this.playerOne
        const playerTwo = this.playerTwo
        const piecesPlayerOne = playerOne.getAllPieces()
        const piecesPlayerTwo = playerTwo.getAllPieces()
  
        piecesPlayerOne.pawns.forEach((pawn)=>{
           position.playerOne.push(pawn.position)
        })
        piecesPlayerOne.rooks.forEach((rook)=>{
           position.playerOne.push(rook.position)
        })
        piecesPlayerOne.knight.forEach((knight)=>{
           position.playerOne.push(knight.position)
        })
        piecesPlayerOne.bishop.forEach((bishop)=>{
           position.playerOne.push(bishop.position)
        })
        piecesPlayerOne.queen.forEach((queen)=>{
           position.playerOne.push(queen.position)
        })
        if(piecesPlayerOne.king != undefined) position.playerOne.push(piecesPlayerOne.king.position)
  
        piecesPlayerTwo.pawns.forEach((pawn)=>{
           position.playerTwo.push(pawn.position)
        })
        piecesPlayerTwo.rooks.forEach((rook)=>{
           position.playerTwo.push(rook.position)
        })
        piecesPlayerTwo.knight.forEach((knight)=>{
           position.playerTwo.push(knight.position)
        })
        piecesPlayerTwo.bishop.forEach((bishop)=>{
           position.playerTwo.push(bishop.position)
        })
        piecesPlayerTwo.queen.forEach((queen)=>{
           position.playerTwo.push(queen.position)
        })
        if(piecesPlayerTwo.king != undefined) position.playerTwo.push(piecesPlayerTwo.king.position)
  
        return position
    }

    private createBoard(){
        new Board(0x769656, 0xEEEED2).draw()
    }

    public buildGame(){
        this.createBoard()
        this.playerOne = new Player(1)
        this.playerOne.createPieces()
        this.playerTwo = new Player(2)
        this.playerTwo.createPieces()
        this.state = "Rest"
        this.playerOne.setInteractive(true)
        this.playerTwo.setInteractive(true)
    }
}