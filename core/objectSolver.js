async function musicObjectSolver() {
    // 处理音乐片段映射表
    for (var i = 0; i < Music_object["MusicParts"].length; i++) {
        var object = Music_object["MusicParts"][i];
        MusicParts_map[object["Id"]] = object;
    }
    
    // 处理音乐简略信息映射表
    for (var i = 0; i < Music_object["Musics"].length; i++) {
        var object = Music_object["Musics"][i];
        Musics_map[object["Id"]] = object;
    }
    
    // 处理歌手信息映射表
    for (var i = 0; i < Music_object["Singers"].length; i++) {
        var object = Music_object["Singers"][i];
        Singers_map[object["Id"]] = object;
    }
    
    // 处理歌曲详细信息映射表
    for (var i = 0; i < Music_object["Songs"].length; i++) {
        var object = Music_object["Songs"][i];
        Songs_map[object["Id"]] = object;
    }
}

async function objectSolver() {
    // 处理资源配置映射表
    for (var i = 0; i < assets_object["assets"].length; i++) {
        var object = assets_object["assets"][i];
        if (assets_map[object[0]] != undefined && assets_map[object[0]] != null) {
            alert("エラー", "アセットIDが重複している\nアセット設定ファイルをご確認ください", "リトライ");
            throw new Error("アセットIDが重複している: " + object[0]);
        }
        assets_map[object[0]] = assets_object["url"] + object[1];
    }

    var json = await loadStaticResource(assets_map["Music.json"]);
    Music_object = JSON.parse(json);
    await musicObjectSolver();
}