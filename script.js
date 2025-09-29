// Получаем элементы
const videos = document.querySelectorAll('.mini-video');
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

// При клике на видео — открываем модальное окно и воспроизводим его
videos.forEach(video => {
  video.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalVideo.src = video.src;
    modalVideo.muted = false;
    modalVideo.play();
  });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = '';
});

// Закрытие по клику вне окна
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = '';
  }
});