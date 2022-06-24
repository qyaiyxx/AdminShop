import fastclick from './fastclick.js'

document.documentElement.style.fontSize=
    document.documentElement.clientWidth / 3.75+'px';
window.addEventListener(
    "load",
    function(){
        fastclick.attach(document.body);
    },
    false
)
document.documentElement.addEventListener(
    "touchmove",
    function(e){
        if(e.touches.length>1){
            e.preventDefault()
        }
    },
    false
)