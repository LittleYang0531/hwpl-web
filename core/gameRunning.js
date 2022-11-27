function gameTitle() {
    let div = document.createElement("div");
    div.classList.add("game");
    div.style.height = Math.min(window.innerHeight, window.innerWidth) + "px";
    div.style.width = Math.max(window.innerHeight, window.innerWidth) + "px";
    div.style.backgroundImage = "url('/assets/bg_ingametitle.png')";
    document.body.appendChild(div);
}