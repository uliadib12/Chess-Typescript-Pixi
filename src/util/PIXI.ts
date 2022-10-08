import * as PIXI from "pixi.js"
export let app = new PIXI.Application({ width: 600, height: 600 })
// Desktop
if(window.innerWidth > window.innerHeight){
    app.view.style.width = window.innerWidth * 1/2.3 + 'px';
    app.view.style.height = window.innerWidth * 1/2.3 + 'px';
}
// Phone
else{
    app.view.style.width = window.innerWidth * 1/1.1+ 'px';
    app.view.style.height = window.innerWidth * 1/1.1 + 'px';
}
export default PIXI