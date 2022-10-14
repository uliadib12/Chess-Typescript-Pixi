import * as PIXI from "pixi.js"
PIXI.settings.SORTABLE_CHILDREN = true
export let app = new PIXI.Application({ width: 600, height: 600 })
export default PIXI