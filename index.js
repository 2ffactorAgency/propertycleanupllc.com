function playVideo(videoId) {
    var video = document.getElementById(videoId);
    video.style.display = 'block'; // Muestra el video
    video.play(); // Comienza a reproducir el video
}

function pauseVideo(videoId) {
    var video = document.getElementById(videoId);
    video.pause(); // Pausa el video
    video.currentTime = 0; // Reinicia el video
    video.style.display = 'none'; // Oculta el video
}