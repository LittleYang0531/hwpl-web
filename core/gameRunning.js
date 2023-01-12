async function gameTitle() {
    await gameLoading();

    // 新建 game 元素
    let div = document.createElement("div");
    div.classList.add("game");
    div.style.height = Math.min(window.innerHeight, window.innerWidth) + "px";
    window.addEventListener("resize", function(){
        div.style.height = Math.min(window.innerHeight, window.innerWidth) + "px";
        div.style.width = Math.max(window.innerHeight, window.innerWidth) + "px";
    });
    div.style.backgroundImage = "url('" + assets_map["/assets/bg_ingametitle.png"] + "')";
    document.body.appendChild(div);

    // 显示 MVImageTitle
    let pic = document.createElement("div");
    pic.classList.add("gameTitle-image");
    pic.style.backgroundImage = "url(\"" + pic_url + "\")";
    div.appendChild(pic);
    await sleep(2400);

    // 打印歌曲基础信息
    console.log("logo url: ", logo_url);
    console.log("difficulty: ", difficult);
    console.log("Song: ", Songs_map[song_id]["Name"]);
    console.log("PartType: ", MusicParts_map[musicpart_id]["Name"]);
    console.log("Singer: ", Singers_map[singer_id]["Name"]);
    console.log("SongWriter: ", Songs_map[song_id]["Songwriter"]);
    console.log("Composer: ", Songs_map[song_id]["Composer"]);

    // 显示歌曲基础信息
    basic = document.createElement("div");
    basic.classList.add("gameTitle-info");
    // -> 歌曲logo
    logo = document.createElement("img");
    logo.classList.add("gameTitle-logo");
    logo.src = logo_url;
    basic.appendChild(logo);
    // -> 信息div
    flex = document.createElement("div");
    flex.classList.add("gameTitle-flex");
    // -> 片段类型
    var partdiv = document.createElement("div");
    partdiv.classList.add("musicpart");
    var parttext = document.createElement("TextView");
    parttext.innerHTML = MusicParts_map[musicpart_id]["Name"];
    partdiv.appendChild(parttext);
    flex.appendChild(partdiv);
    // -> 具体信息
    info = document.createElement("div");
    textview = document.createElement("TextView");
    textview.innerHTML = "歌: " + Singers_map[singer_id]["Name"];
    container = document.createElement("p");
    container.appendChild(textview);
    info.appendChild(container);
    textview = document.createElement("TextView");
    textview.innerHTML = "作詞: " + Songs_map[song_id]["Songwriter"] + " 作曲: " + Songs_map[song_id]["Composer"];
    container = document.createElement("p");
    container.appendChild(textview);
    info.appendChild(container);
    flex.appendChild(info);
    basic.appendChild(flex);
    div.appendChild(basic);
}