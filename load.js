function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

async function loadStaticResource(url, onprogress = false) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if (onprogress) document.getElementById("loading-text").innerHTML = "";
    xhr.onprogress = function(event){
        event = event || window.event;
        var loaded = event.loaded;
        var total = event.total;
        if (onprogress) document.getElementById("loading-text").innerHTML = "(" + loaded + "/" + total + ")";
    };
    xhr.overrideMimeType("text/css");
    try {
        xhr.send('');
    } catch (e) {
        alert("Failed to load resource!");
        console.log(e);
        throw error(e);
    }
    while (xhr.readyState != 4) await sleep(10);
    if (onprogress) document.getElementById("loading-text").innerHTML = "";
    await sleep(10);
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

    // 加载配置文件 
    var json = await loadStaticResource("//" + domain + "/config.json");
    config = JSON.parse(json); 

    // 加载资源目录文件 
    json = await loadStaticResource("//" + domain + "/assets.json");
    var arr = JSON.parse(json); 
    assets_object = arr;

    // 绘制进度条
    document.body.style.backgroundColor = "black";
    var progress = document.getElementById("progress");
    var progress_text = document.getElementById("text");
    progress.style.bottom = window.innerHeight * 0.05 + "px";
    progress = document.getElementById("progress-loaded");
    var sum = arr["js"].length + arr["css"].length + arr["assets"].length;
    var loaded = 0;

    // 加载资源文件
    for (i = 0; i < arr["assets"].length; i++) {
        var name = arr["assets"][i][0].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(10);
        var url = arr["url"] + arr["assets"][i][1];
        if (arr["assets"][i].length > 2) url = arr["assets"][i][2] + arr["assets"][i][1];
        await loadStaticResource(url, true);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
    }

    // 加载样式表文件
    for (i = 0; i < arr["css"].length; i++) {
        var name = arr["css"][i][0].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(10);
        var url = arr["url"] + arr["css"][i][1];
        if (arr["css"][i].length > 2) url = arr["css"][i][2] + arr["css"][i][1];
        await loadCSSScript(url, true);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
    }

    // 加载js脚本
    for (i = 0; i < arr["js"].length; i++) {
        var name = arr["js"][i][0].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(10);
        var url = arr["url"] + arr["js"][i][1];
        if (arr["js"][i].length > 2) url = arr["js"][i][2] + arr["js"][i][1];
        await loadJSScript(url, true);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
    }

    progress_text.innerHTML = "Resource Loaded!";
    await sleep(2000);
}
