import { Drawble } from "../util/interface"
import PIXI from "../util/PIXI"
import { app } from "../util/PIXI"

const TILE_XY_COUNT = 8;
export const SIZE_TILE : number = app.view.width * 1/8

export default class Board implements Drawble{
    private colorOdd: number
    private colorEven: number

    constructor(colorOdd: number = 0x0, colorEven: number = 0xffffff) {
        this.colorOdd = colorOdd
        this.colorEven = colorEven
    }

    public draw(){
        const container = new PIXI.Container();
        
        for (let y = 0; y < TILE_XY_COUNT; y++) {
            for (let x = 0; x < TILE_XY_COUNT; x++) {
                
                const tileCount = y * TILE_XY_COUNT + x

                let tile = new PIXI.Graphics()
                // tile.lineStyle(2, 0x808080, 1)
                tile.beginFill( (((tileCount + y) % 2) != 0) ? this.colorOdd : this.colorEven)
                tile.drawRect(0, 0, SIZE_TILE, SIZE_TILE)
                tile.endFill()

                tile.x = x * SIZE_TILE
                tile.y = y * SIZE_TILE

                container.addChild(tile)
            }
        }

        app.stage.addChild(container);
    }
}
