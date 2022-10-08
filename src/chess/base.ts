import { Drawble, Pos } from "../util/interface"
import PIXI from "../util/PIXI";

const TILE_XY_COUNT = 8;

export default abstract class Base implements Drawble {
   public id : number
   public playerNumber: number
   public position: Pos
   public sprite : PIXI.Sprite
   protected readonly spriteScale = 0.55
   public abstract getMove(): Pos[]
   public abstract setPositon(newPositon: Pos): void
   public abstract draw(): void
   protected abstract eventInteraction(): void
   protected abstract moveSprite(pos: Pos) : void
   
   protected solveBoundary(position: Pos[]) : Pos[]{
        let result = position.filter((val)=>{
           if((val.x >= 1 && val.x <= TILE_XY_COUNT) && (val.y >= 1 && val.y <= TILE_XY_COUNT)){
             return true
           }
        })

        return result
   } 
}