document.addEventListener('DOMContentLoaded', () => {
    const animatedImage = document.getElementById('animatedImage');
  
    animatedImage.addEventListener('click', () => {
      animatedImage.style.animationPlayState = animatedImage.style.animationPlayState === 'paused' ? 'running' : 'paused';
    });
  });