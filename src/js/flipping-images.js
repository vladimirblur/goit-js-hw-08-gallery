export default function switchGalleryImg() {
  if (lightboxImgRef.classList.contains('show')) {
    lightboxImgRef.classList.replace('show', 'hide');
  } else {
    lightboxImgRef.classList.add('show');
  }
   lightboxImgRef.addEventListener('load', onImgLoad);
}

function onImgLoad() {
    lightboxImgRef.style.cssText =
        'transition: opacity var(--animation-duration) var(--timing-function)';
    lightboxImgRef.classList.replace('hide', 'show');
}
