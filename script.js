const photos = document.querySelectorAll(".wedding-photo");

function showImageFallback(photo) {
  const frame = photo.closest(".photo-frame");
  if (!frame || frame.querySelector(".image-fallback")) return;

  const fallback = document.createElement("div");
  const title = document.createElement("strong");
  const message = document.createElement("span");
  fallback.className = "image-fallback";
  fallback.setAttribute("role", "status");
  title.textContent = "Ảnh cưới sẽ được cập nhật";
  message.textContent = photo.dataset.fallback;
  fallback.append(title, message);
  frame.append(fallback);
}

photos.forEach((photo) => {
  photo.addEventListener("error", () => showImageFallback(photo), { once: true });
  if (photo.complete && photo.naturalWidth === 0) showImageFallback(photo);
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((photo) => {
  photo.addEventListener("click", () => {
    if (!photo.complete || photo.naturalWidth === 0) return;
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightbox.showModal();
  });
});

closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
});
