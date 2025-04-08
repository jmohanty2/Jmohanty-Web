window.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('img[alt="Teaser"]');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
  
    // Highlight first image as selected
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('selected');
      mainImage.src = thumbnails[0].src;
      mainImage.alt = thumbnails[0].alt;
    }
  
    // Handle thumbnail click
    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
  
        thumbnails.forEach((img) => img.classList.remove('selected'));
        thumb.classList.add('selected');
      });
    });
  
    // Toggle dark/light mode
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
  
      if (body.classList.contains('dark')) {
        themeToggle.textContent = '☀️ Light Mode';
      } else {
        themeToggle.textContent = '🌙 Dark Mode';
      }
    });
  });
  