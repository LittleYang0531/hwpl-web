function show_touch(x, y) {
    if (window.innerWidth < window.innerHeight) return;
    var deg = Math.round(Math.random() * 360);
    var touch = document.createElement("div");
    touch.style.transform = "rotate(" + deg + "deg)";
    touch.style.left = x - 50 + "px"; touch.style.top = y - 50 + "px";
    touch.classList.add("touch-div");
    var div_outer = document.createElement("div");
    div_outer.classList.add("touch"); div_outer.classList.add("touch-outer");
    div_outer.style.backgroundImage = "url('/assets/touch-outer.png')";
    touch.appendChild(div_outer);
    var div_inner = document.createElement("div");
    div_inner.classList.add("touch"); div_inner.classList.add("touch-inner");
    div_inner.style.backgroundImage = "url('/assets/touch-inner.png')";
    touch.appendChild(div_inner);
    document.body.appendChild(touch);
    setTimeout(function(){document.body.removeChild(touch);}, 800);
}

async function touch_init() {
    await sleep(100);
    window.addEventListener("resize", function(){
        document.body.style.height = Math.min(window.innerHeight, window.innerWidth) + "px";
        document.body.style.width = Math.max(window.innerHeight, window.innerWidth) + "px";
    });
    document.body.style.position = "absolute";
    document.body.style.margin = "0px";
    if (isAndroid || isIos) {
        document.body.addEventListener("touchstart", function(event){
            event = event || window.event;
            for (var i = 0; i < event.touches.length; i++) {
                var x = event.touches[i].clientX, y = event.touches[i].clientY;
                show_touch(Math.round(x), Math.round(y));
            }
        }, {once: false});
    } else {
        document.body.addEventListener("mousedown", function(event){
            event = event || window.event;
            var x = event.clientX, y = event.clientY;
            show_touch(x, y);
        }, {once: false});
    }
}

touch_init();