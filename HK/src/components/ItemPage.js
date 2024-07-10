let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (slides.length === 0 || dots.length === 0) {
    console.error("Slides or dots elements not found.");
    return;
  }

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    if (slides[i]) {
      slides[i].style.display = "none";
    }
  }

  for (i = 0; i < dots.length; i++) {
    if (dots[i]) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }
}

