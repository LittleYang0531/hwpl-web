function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

async function loadStaticResource(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.overrideMimeType("text/css");
    try {
        xhr.send('');
    } catch (e) {
        alert("Failed to load resource!");
        console.log(e);
        throw error(e);
    }
    await sleep(50);
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
    var json = await loadStaticResource("//" + domain + "/assets.json");
    console.log(json);
    var arr = JSON.parse(json); 
    document.body.style.backgroundColor = "black";
    var progress = document.getElementById("progress");
    var progress_text = document.getElementById("text");
    progress.style.bottom = window.innerHeight * 0.05 + "px";
    progress = document.getElementById("progress-loaded");
    var sum = arr["js"].length + arr["css"].length + arr["assets"].length;
    var loaded = 0;
    for (i = 0; i < arr["assets"].length; i++) {
        var name = arr["assets"][i].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(50);
        await loadStaticResource(arr["url"] + arr["assets"][i]);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
        document.body.style.height = window.innerHeight + "px";
    }
    for (i = 0; i < arr["css"].length; i++) {
        var name = arr["css"][i].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(50);
        await loadCSSScript(arr["url"] + arr["css"][i]);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
        document.body.style.height = window.innerHeight + "px";
    }
    for (i = 0; i < arr["js"].length; i++) {
        var name = arr["js"][i].split("/");
        progress_text.innerHTML = "Loading " + name[name.length - 1] + "...";
        await sleep(50);
        await loadJSScript(arr["url"] + arr["js"][i]);
        loaded++;
        progress.style.width = loaded / sum * 100 + "%";
        document.body.style.height = window.innerHeight + "px";
    }
    progress_text.innerHTML = "Resource Loaded!";
    await sleep(2000);
}
