const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

// スワイプ対応
let startX = 0;
let moveX = 0;
let isSwiping = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  moveX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  if (!isSwiping) return;
  const diffX = moveX - startX;
  if (Math.abs(diffX) > 50) {
    if (diffX < 0) {
      currentIndex = (currentIndex + 1) % items.length;
    } else {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    }
    updateCarousel();
  }
  isSwiping = false;
  startX = 0;
  moveX = 0;
});

// 初期表示
updateCarousel();
