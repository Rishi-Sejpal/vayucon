// Image Carousel
let slideIndex = 0;
let slideDuration = 8; //Seconds
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("imageSlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, slideDuration * 1000);
}

document.querySelectorAll(".card").forEach((element) => {11
  element.addEventListener("click", (event) => {
    window.location.href = element.childNodes[5].href;
  });
});
