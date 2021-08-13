const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector(".js-gallery")
const lightboxImgRef = document.querySelector(".lightbox__image")
const lightboxRef = document.querySelector(".js-lightbox")

const setGalleryLayout = images => {
  const { preview, original, description } = images
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
}

const setGallery = galleryItems
  .map(setGalleryLayout)
  .join("");
  


galleryRef.insertAdjacentHTML("afterbegin", setGallery);

const handleFullImageOpenClick = (e) => {
  const { target } = e;

  const originalImgSrc = target.dataset.source;
  const imgDesc = target.alt;
  
  e.preventDefault();

  if (target.nodeName !== "IMG") return;

  window.addEventListener('keydown', onEscKeyDown);
  modalToggleClassOnLightbox()
  replaceFullImageSrcValue(originalImgSrc, imgDesc)
  switchesImgWithArrows();
}


const buttonModalClose = document.querySelector("button[data-action=close-lightbox]")
const lightboxOverlayRef = document.querySelector(".lightbox__overlay")


function modalToggleClassOnLightbox() {
  lightboxRef.classList.toggle("is-open");
}

const handleFullImageCloseClick = ({target}) => {

  if (target === buttonModalClose || target === lightboxOverlayRef) {
    modalToggleClassOnLightbox()
    setTimeout(clearImageAttributeValue, 250)
  }
  
}

galleryRef.addEventListener("click", handleFullImageOpenClick)
lightboxRef.addEventListener("click", handleFullImageCloseClick)


function replaceFullImageSrcValue(imgSrc, imgDesc) {
  lightboxImgRef.src = imgSrc;
  lightboxImgRef.alt = imgDesc;  
}

function clearImageAttributeValue() {
  lightboxImgRef.src = "";
}

function handleEscKeyDown({ code }) {
    if (code === 'Escape') {
        modalToggleClassOnLightbox();
        setTimeout(clearImageAttributeValue, 250);

        removeEventListenerOnEscKeyDown();
    }
}



function onEscKeyDown({ code }) {
    if (code === 'Escape') {
        modalToggleClassOnLightbox();
        setTimeout(clearImageAttributeValue, 250);

        removeEventListenerOnEscKeyDown();
    }
}

// function onLeftArrowPress({ code }) {
//     const previousImgRef = galleryRef
//         .querySelector(`[data-source="${lightboxImgRef.src}"]`)
//         .closest('.gallery__item')
//         .previousElementSibling.querySelector('.gallery__image');

//   if (code === 'ArrowLeft' && previousImgRef) {
//       console
//         switchGalleryImg();
//         replaceFullImageSrcValue(previousImgRef.dataset.source, previousImgRef.alt);
//     }
// }

function onEscKeyPress({ code }) {
    if (code === 'Escape') {
        toggleClassOnLightbox();
        setTimeout(clearAttributeValueUrl, 250);

        removeEventListenerOnEscKeyPress();
        removeEventListenersOnArrowsPress();
    }
}

function removeEventListenersOnArrowsPress() {
    window.removeEventListener('keydown', onRightArrowPress);
    window.removeEventListener('keydown', onLeftArrowPress);
}

function onLeftArrowPress({ code }) {
    const previousImgRef = galleryRef
        .querySelector(`[data-source="${lightboxImgRef.src}"]`)
        .closest('.gallery__item')
        .previousElementSibling?.querySelector('.gallery__image');

    if (code === 'ArrowLeft' && previousImgRef) {
        switchGalleryImg();
        replaceFullImageSrcValue(previousImgRef.dataset.source, previousImgRef.alt);
    }
}

function onRightArrowPress({ code }) {
    const nextImgRef = galleryRef
        .querySelector(`[data-source="${lightboxImgRef.src}"]`)
        .closest('.gallery__item')
        .nextElementSibling?.querySelector('.gallery__image');

    if (code === 'ArrowRight' && nextImgRef) {
      switchGalleryImg();
        replaceFullImageSrcValue(nextImgRef.dataset.source, nextImgRef.alt);
    }
}

function switchesImgWithArrows() {
    window.addEventListener('keydown', onLeftArrowPress);
    window.addEventListener('keydown', onRightArrowPress);
}

function onImgLoad() {
    lightboxImgRef.style.cssText =
        'transition: opacity var(--animation-duration) var(--timing-function)';
    lightboxImgRef.classList.replace('hide', 'show');
}

function switchGalleryImg() {
  if (lightboxImgRef.classList.contains('show')) {
    lightboxImgRef.classList.replace('show', 'hide');
  } else {
    lightboxImgRef.classList.add('show');
  }
   lightboxImgRef.addEventListener('load', onImgLoad);
}