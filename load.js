function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

async function loadStaticResource(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    console.log("Loading asset: " + url);
    xhr.overrideMimeType("text/css");
    try {
        xhr.send('');
    } catch (e) {
        alert("Failed to load resource!");
        console.log(e);
        throw error(e);
    }
    while (xhr.readyState != 4) await sleep(10);
    // await sleep(10000);
    return xhr.responseText;
}

async function loadCSSScript(url) {
    await loadStaticResource(url);
    var link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
}

async function loadJSScript(url) {
    await loadStaticResource(url);
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

async function init() {
    var domain = document.domain;

    // 绘制进度条
    document.body.style.backgroundColor = "black";
    var progress = document.getElementById("progress");
    var progress_text = document.getElementById("loading-text-TextView");
    var progress_percent = document.getElementById("loading-percent-TextView");
    progress.style.bottom = window.innerHeight * 0.05 + "px";
    progress = document.getElementById("progress-loaded");
    progress_text.innerHTML = "コンフィグ取得中";

    // 加载配置文件 
    var json = await loadStaticResource("//" + domain + "/config.json");
    document.getElementById("progress-bar").style.display = "block";
    config = JSON.parse(json); 

    // 加载资源目录文件 
    json = await loadStaticResource("//" + domain + "/assets.json");
    var arr = JSON.parse(json); 
    assets_object = arr;

    progress.style.width = "10%";
    progress_percent.innerHTML = "10%";
    await sleep(2000);
    progress_text.innerHTML = "ゲームデータ取得中";
    var sum = arr["assets"].length;
    var loaded = 0;

    // 加载资源文件
    for (var i = 0; i < arr["assets"].length; i++) {
        var name = arr["assets"][i][0].split("/");
        name = name[name.length - 1];
        await sleep(10);
        var url = arr["url"] + arr["assets"][i][1];
        if (arr["assets"][i].length > 2) url = arr["assets"][i][2] + arr["assets"][i][1];
        var ext = name.split(".");
        ext = ext[ext.length - 1];
        if (ext == "css") await loadCSSScript(url);
        else if (ext == "js") await loadJSScript(url);
        else await loadStaticResource(url);
        loaded++;
        progress.style.width = loaded / sum * 80 + 10 + "%";
        progress_percent.innerHTML = Math.round(loaded / sum * 80 + 10) + "%";
    }

    await sleep(2000);
    progress_text.innerHTML = "ロード中";

    await sleep(2000);
    progress_percent.innerHTML = "100%";
    progress.style.width = "100%";

    await sleep(100);
}
