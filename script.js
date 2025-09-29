// Глобальная переменная для хранения текущего проигрываемого видео
let modalPlayer;

// Динамически подставляем превью при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.youtube-video').forEach(videoDiv => {
    const videoId = videoDiv.dataset.id;
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Подставляем превью как background
    const img = new Image();
    img.src = thumbnailUrl;
    img.onload = () => {
      videoDiv.style.backgroundImage = url('${thumbnailUrl}');
      videoDiv.style.backgroundSize = 'cover';
      videoDiv.style.backgroundPosition = 'center';
    };

    // Обработчик клика — открывает модальное окно
    videoDiv.addEventListener('click', () => {
      openModal(videoId);
    });
  });

  // Обработчики закрытия модального окна
  document.getElementById('closeModal')?.addEventListener('click', closeModal);
  document.getElementById('videoModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'videoModal') {
      closeModal();
    }
  });
});

// Функция открытия модального окна и инициализации плеера
function openModal(videoId) {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('modalVideoContainer');

  modal.style.display = 'flex';

  // Очищаем предыдущее видео
  container.innerHTML = '';

  // Создаем новый плеер YouTube
  modalPlayer = new YT.Player(container, {
    height: '337',
    width: '600',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0
    }
  });
}

// Функция закрытия модального окна и остановки видео
function closeModal() {
  const modal = document.getElementById('videoModal');
  modal.style.display = 'none';

  // Останавливаем видео
  if (modalPlayer && modalPlayer.stopVideo) {
    modalPlayer.stopVideo();
  }

  // Очищаем контейнер с видео
  document.getElementById('modalVideoContainer').innerHTML = '';
}