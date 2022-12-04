function transform(input) {
    input = input.replace(/\{musicpart_id\}/g, musicpart_id);
    input = input.replace(/\{music_id\}/g, music_id);
    input = input.replace(/\{song_id\}/g, song_id);
    input = input.replace(/\{singer_id\}/g, singer_id);
    return input;
}