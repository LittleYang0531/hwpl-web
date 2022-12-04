async function gameLoading() {
    await sleep(100);
    music_id = MusicParts_map[musicpart_id]["MusicId"];
    song_id = Musics_map[music_id]["SongId"];
    singer_id = Musics_map[music_id]["SingerId"];
    pic_url = transform(config["url"]["MVTitleImage"]);
    await loadStaticResource(pic_url, false);
    logo_url = transform(config["url"]["Logo"]);
    await loadStaticResource(logo_url, false);
    video_url = transform(config["url"]["Video"]);
    await loadStaticResource(video_url, false);
    music_url = transform(config["url"]["Audio"]);
    await loadStaticResource(music_url, false);
}