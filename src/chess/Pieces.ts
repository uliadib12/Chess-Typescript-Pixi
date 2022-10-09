import GameManager from "../util/GameManager";
import { Drawble, Pos } from "../util/interface"
import PIXI, { app } from "../util/PIXI";
import Player from "../util/Player";

const TILE_XY_COUNT = 8

export default abstract class Pieces implements Drawble {
   public id : number
   public playerNumber: 1 | 2
   public position: Pos
   public sprite : PIXI.Sprite
   protected readonly spriteScale = 0.55

   constructor(id: number, positon: Pos, playerNumber: 1 | 2 , textureSprite: PIXI.Sprite = PIXI.Sprite.from('./sprite/w_pawn_png_shadow_128px.png')){
      this.position = positon
      this.id = id
      this.playerNumber = playerNumber
      this.sprite = textureSprite
      this.eventInteraction()
  }

   setPositon(newPositon: Pos): void {
      this.position = newPositon
      this.moveSprite(newPositon)
  }
  
  abstract getMove(): Pos[]

  protected solveBoundary(position: Pos[]) : Pos[]{
   let result = position.filter((val)=>{
      if((val.x >= 1 && val.x <= TILE_XY_COUNT) && (val.y >= 1 && val.y <= TILE_XY_COUNT)){
        return true
      }
   })

   return result
} 

  eventInteraction(){
      this.sprite.buttonMode = true

      let player: Player
      if(this.playerNumber == 1){
          player = GameManager.Instance.playerOne
      }
      else if(this.playerNumber == 2){
          player = GameManager.Instance.playerTwo
      }

      this.sprite.on('pointerdown', (event) => {
          player.selectPieces(this)
       })
  }
  
  moveSprite(pos: Pos){
      this.sprite.x = (pos.x - 1) * this.spriteScale * 136 + 6
      this.sprite.y = app.view.height - (pos.y - 1) * this.spriteScale * 135.5 - 72
  }

  draw(): void {
      this.sprite.scale = new PIXI.Point(this.spriteScale, this.spriteScale)
      this.moveSprite(this.position)
      app.stage.addChild(this.sprite)
  }
}