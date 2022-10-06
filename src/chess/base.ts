import { Pos } from "../util/interface"

const TILE_XY_COUNT = 8;

export default abstract class Base {
   abstract id : number
   protected position: Pos
   abstract getMove(): Pos[]
   abstract setPositon(newPositon: Pos): void
   
   protected solveBoundary(position: Pos[]) : Pos[]{
        let result = position.filter((val)=>{
           if((val.x >= 1 && val.x <= TILE_XY_COUNT) && (val.y >= 1 && val.y <= TILE_XY_COUNT)){
             return true
           }
        })

        return result
   } 
}