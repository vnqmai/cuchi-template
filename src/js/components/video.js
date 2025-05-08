document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.video-container');

  containers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.btn-play');

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.classList.add('hide'); // hide if you only want it hidden on play
      } else {
        video.pause();
        playBtn.classList.remove('hide'); // show again on pause
      }
    });

    video.addEventListener('pause', () => {
      playBtn.classList.remove('hide');
    });

    video.addEventListener('ended', () => {
      playBtn.classList.remove('hide');
    });
  });
});
