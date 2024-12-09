// Get all toggle buttons
var toggleButtons = document.getElementsByClassName("toggle-button");
var j;

// Add click event listener to each button
for (j = 0; j < toggleButtons.length; j++) {
  toggleButtons[j].addEventListener("click", function() {
    this.classList.toggle("active");
    var toggleContent = this.nextElementSibling;
    if (toggleContent.style.maxHeight) {
      toggleContent.style.maxHeight = null;
    } else {
      toggleContent.style.maxHeight = toggleContent.scrollHeight + "px";
    } 
  });
}