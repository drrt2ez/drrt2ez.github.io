// Глобальная переменная для хранения текущего проигрываемого видео
let modalPlayer;

// Эта функция вызывается автоматически после загрузки YouTube IFrame API
function onYouTubeIframeAPIReady() {
  // Добавляем обработчики клика на все мини-видео
  document.querySelectorAll('.youtube-video').forEach(videoDiv => {
    videoDiv.addEventListener('click', () => {
      const videoId = videoDiv.dataset.id;

      // Открываем модальное окно
      document.getElementById('videoModal').style.display = 'flex';

      // Очищаем контейнер от предыдущего видео
      const container = document.getElementById('modalVideoContainer');
      container.innerHTML = '';

      // Создаем новый плеер YouTube
      modalPlayer = new YT.Player(container, {
        height: '337',
        width: '600',
        videoId: videoId,
        playerVars: {
          autoplay: 1,        // Автовоспроизведение
          controls: 1,        // Показывать элементы управления
          modestbranding: 1,  // Минимизация логотипа YouTube
          rel: 0              // Не показывать похожие видео в конце
        }
      });
    });
  });

  // Обработчики закрытия модального окна
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('videoModal').addEventListener('click', (e) => {
    if (e.target.id === 'videoModal') {
      closeModal();
    }
  });
}

// Функция закрытия модального окна и остановки видео
function closeModal() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'none';

  // Останавливаем видео, если оно было создано
  if (modalPlayer && modalPlayer.stopVideo) {
    modalPlayer.stopVideo();
  }

  // Очищаем контейнер с видео
  document.getElementById('modalVideoContainer').innerHTML = '';
}