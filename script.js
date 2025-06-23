document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".coffee-slider");
  const cards = Array.from(slider.querySelectorAll(".coffee-combo"));

  function updateCardStyles() {
    const sliderRect = slider.getBoundingClientRect();
    const centerX = sliderRect.left + sliderRect.width / 2;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const offset = Math.abs(centerX - cardCenter);
      const ratio = Math.min(offset / (sliderRect.width / 2), 1);

      const scale = 1 - ratio * 0.13; // 左右變小
      const opacity = 1 - ratio * 0.8; // 左右變淡

      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = `${100 - Math.floor(ratio * 100)}`;
    });
  }

  slider.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateCardStyles);
  });

  window.addEventListener("resize", updateCardStyles);
  updateCardStyles();

  // 拖曳滑動功能
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  slider.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = slider.scrollLeft;
    slider.style.cursor = "grabbing";
  });

  slider.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    slider.scrollLeft = scrollStart - dx;
  });

  slider.addEventListener("pointerup", () => {
    isDragging = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("pointerleave", () => {
    isDragging = false;
    slider.style.cursor = "grab";
  });
});
