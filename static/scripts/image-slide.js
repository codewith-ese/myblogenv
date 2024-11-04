let currentSlideIndex = 1;
let slideInterval;

showSlides(currentSlideIndex);
startSlideShow();

function changeSlide(n) {
  clearInterval(slideInterval); // Stop auto-slide when user interacts
  showSlides(currentSlideIndex += n);
  startSlideShow(); // Restart auto-slide
}

function setCurrentSlide(n) {
  clearInterval(slideInterval); // Stop auto-slide when user interacts
  showSlides(currentSlideIndex = n);
  startSlideShow(); // Restart auto-slide
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let thumbnails = document.getElementsByClassName("thumbnail");
  let captionText = document.getElementById("caption");
  
  if (n > slides.length) { currentSlideIndex = 1; }
  if (n < 1) { currentSlideIndex = slides.length; }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  for (i = 0; i < thumbnails.length; i++) {
    thumbnails[i].className = thumbnails[i].className.replace(" active", "");
  }
  
  slides[currentSlideIndex - 1].style.display = "block";  
  thumbnails[currentSlideIndex - 1].className += " active";
  captionText.innerHTML = thumbnails[currentSlideIndex - 1].alt;
}

function startSlideShow() {
  slideInterval = setInterval(function() {
    changeSlide(1);
  }, 3000); // Change slide every 3 seconds
}