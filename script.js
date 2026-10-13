const photos = document.querySelectorAll(".wedding-photo");

photos.forEach((photo) => {
  photo.addEventListener("error", () => {
    const frame = photo.closest(".photo-frame");
    if (!frame || frame.querySelector(".image-fallback")) return;

    const fallback = document.createElement("div");
    fallback.className = "image-fallback";
    fallback.setAttribute("role", "status");
    fallback.innerHTML = `<strong>Ảnh cưới sẽ được cập nhật</strong><span>${photo.dataset.fallback}</span>`;
    frame.append(fallback);
  }, { once: true });
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
