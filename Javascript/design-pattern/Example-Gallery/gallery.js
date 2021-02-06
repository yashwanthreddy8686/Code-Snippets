function Gallery(gallery) {
  if (!gallery) {
    throw new Error('no gallery found');
  }
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function showModal() {
    console.log('showing gallery 1');
    if (modal.matches('.open')) {
      console.info('modal already opened');
    }
    modal.classList.add('open');
    modal.addEventListener('click', handleClickOutside);
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function showImage(el) {
    if (!el) {
      console.info('no image found');
    }
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    console.log('showing image of gallery 1');
    showModal();
  }

  images.forEach((image) =>
    image.addEventListener('click', (e) => showImage(e.currentTarget))
  );
  images.forEach((image) =>
    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    })
  );
  console.log('completed');
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
