import Pawn from "../chess/Pawn"
import PIXI from "./PIXI"

export default class Player {
   private playerNumber: number
   private color: "white" | "black"
   private countPieces = 0
   private pieces : {pawns: Pawn[]} = {pawns: []}

   constructor(whichPlayer: number){
      this.playerNumber = whichPlayer
      this.color = this.playerNumber == 1 ? "white" : "black"
   }

   public setInteractive(active: boolean){
      this.pieces.pawns.forEach((pawn)=>{
         pawn.sprite.interactive = active
      })
   }

   private createPawn(){
      for (let i = 1; i <= 8; i++) {
         let y = this.playerNumber == 1 ? 2 : 7
         let pawn: Pawn
         if(this.color == "white"){
            pawn = new Pawn(i , {x: i, y}, this.playerNumber, PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png'))
         }
         else{
            pawn = new Pawn(i , {x: i, y}, this.playerNumber, PIXI.Sprite.from('./sprite/b_pawn_png_shadow_128px.png'))
         }
         pawn.draw()
         this.pieces.pawns.push(pawn)
         this.countPieces += 1
      }
  }

   public createPieces(){
      this.createPawn()
   }
}