import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from "photoswipe";

let lightbox: PhotoSwipeLightbox | null = null;

function initPhotoSwipe() {
  const links = document.querySelectorAll<HTMLAnchorElement>('a.pswp-link');
  
  links.forEach((link) => {
    const img = link.querySelector('img');
    if (img) {
      const applyDimensions = () => {
        link.dataset.pswpWidth = (img.naturalWidth || 1920).toString();
        link.dataset.pswpHeight = (img.naturalHeight || 1080).toString();
      };
      if (img.complete) {
        applyDimensions();
      } else {
        img.addEventListener('load', applyDimensions);
      }
    }
  });

  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new PhotoSwipeLightbox({
    gallery: '.prose',
    children: 'a.pswp-link',
    pswpModule: PhotoSwipe,
    allowPanToNext: true,
  });
  
  lightbox.init();
}

export { initPhotoSwipe };
