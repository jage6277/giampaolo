const galleryButtons = Array.from(document.querySelectorAll(".gallery-image-button"));
const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let activeIndex = 0;
let lastFocusedElement = null;

function showImage(index) {
  activeIndex = (index + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[activeIndex];
  const previewImage = button.querySelector("img");

  lightboxImage.src = button.dataset.lightboxSrc;
  lightboxImage.alt = previewImage?.alt || "";
  lightboxCaption.textContent = button.dataset.lightboxCaption || "";
}

function openLightbox(index) {
  lastFocusedElement = document.activeElement;
  showImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showImage(activeIndex - 1));
nextButton.addEventListener("click", () => showImage(activeIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showImage(activeIndex - 1);
  } else if (event.key === "ArrowRight") {
    showImage(activeIndex + 1);
  }
});
