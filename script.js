// Глобальная переменная для хранения текущего проигрываемого видео
let modalPlayer;

// Функция для загрузки превьюшек
function loadThumbnails() {
  document.querySelectorAll('.youtube-video').forEach(videoDiv => {
    const videoId = videoDiv.dataset.id;
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const img = videoDiv.querySelector('img.thumbnail');

    if (img) {
      img.src = thumbnailUrl;
    }
  });
}

// Эта функция вызывается автоматически после загрузки YouTube IFrame API
function onYouTubeIframeAPIReady() {
  setupVideoClickHandlers();
  setupModalCloseHandlers();
}

// Добавляем обработчики клика на все мини-видео
function setupVideoClickHandlers() {
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
}

// Обработчики закрытия модального окна
function setupModalCloseHandlers() {
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('videoModal');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'videoModal') {
        closeModal();
      }
    });
  }
}

// Функция закрытия модального окна и остановки видео
function closeModal() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'none';

  // Останавливаем видео, если оно было создано
  if (modalPlayer && modalPlayer.stopVideo) {
    modalPlayer.stopVideo();
  }

  // Удаляем iframe из DOM
  const container = document.getElementById('modalVideoContainer');
  container.innerHTML = '';

  // Сбрасываем переменную плеера, чтобы можно было открыть новое видео
  modalPlayer = null;
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadThumbnails(); // Подгружаем превью
});