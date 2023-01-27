// import NewsApiServer from './js/news_service';
import { UnspleshAPI } from './js/UnspleshAPI';
const unsplash = new UnspleshAPI();

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadMore: document.querySelector('[data-action="load-more"]'),
//   btnPrimary: document.querySelector('btn-primary'),
//   reciveMsg: document.createElement('p'),
// };

// const newsApiServer = new NewsApiServer();
// const galleryLigthbox = new SimpleLightbox('.gallery a');
// let pages;

// refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMore.addEventListener('click', onLoadMoreImg);
// refs.loadMore.classList.add('is-hidden');

// function onSearch(e) {
//   e.preventDefault();
//   searchNextElm();
//   refs.loadMore.classList.add('is-hidden');
//   newsApiServer.query = e.currentTarget.elements.searchQuery.value;

//   if (newsApiServer.query.trim() === '') {
//     return Notify.info('Please, enter search text!');
//   }

//   newsApiServer.resetCurrentPage();
//   deleteMsg();
//   newsApiServer
//     .fetchImages()
//     .then(({ totalHits, hits }) => {
//       pages = Math.ceil(totalHits / hits.length);
//       if (hits.length === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again'
//         );
//         return;
//       }
//       Notiflix.Notify.info(`Hooray! We found ${totalHits} totalHits images.`);
//       rendeElemToHTML(hits);
//       refs.loadMore.classList.remove('is-hidden');
//       if (pages === 1) {
//         refs.loadMore.classList.add('is-hidden');

//         refs.reciveMsg.textContent =
//           "We're sorry, but you've reached the end of search results.";
//         refs.reciveMsg.classList.add('reciveMsg');
//         refs.gallery.after(refs.reciveMsg);
//       }
//     })
//     .catch(error => console.log(error));
// }

// function searchNextElm() {
//   refs.gallery.innerHTML = '';
// }

// function deleteMsg() {
//   if (refs.reciveMsg) {
//     refs.reciveMsg.remove();
//   }
// }

// function onLoadMoreImg() {
//   newsApiServer.fetchImages().then(({ hits }) => {
//     if (pages === newsApiServer.uppdatePage()) {
//       refs.loadMore.classList.add('is-hidden');
//       refs.reciveMsg.textContent =
//         "We're sorry, but you've reached the end of search results.";
//       refs.reciveMsg.classList.add('reciveMsg');
//       refs.gallery.after(refs.reciveMsg);
//     }
//     rendeElemToHTML(hits);
//   });
// }

// function rendeElemToHTML(hits) {
//   const gallery = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<li class="photo-card">
//                     <div class="card-item">
//                             <a href="${largeImageURL}" class="gallery__image">
//                                 <img src="${webformatURL}" alt="${tags}" loading="lazy" width="190">
//                             </a>
//                             <ul class="info">
//                                 <li class="info-item">
//                                     <b>Likes</b><br>${likes}
//                                 </li>
//                                 <li class="info-item">
//                                     <b>Views</b><br>${views}
//                                 </li>
//                                 <li class="info-item">
//                                     <b>Comments</b><br>${comments}
//                                 </li>
//                                 <li class="info-item">
//                                     <b>Downloads</b><br>${downloads}
//                                 </li>
//                             </ul>
//                     </div>
//                 </li>`;
//       }
//     )
//     .join('');
//   refs.gallery.insertAdjacentHTML('beforeend', gallery);
//   galleryLigthbox.refresh();
// }
const refs = {
  form: document.querySelector('.search-form'),
  list: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('btn-primary'),
  spinner: document.querySelector('.js-spinner'),
};

import { Spinner } from 'spin.js';

const opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#3d314a', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinner = new Spinner(opts).spin(refs.spinner);

const handleSubmit = event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  const inputValue = searchQuery.value.trim();
  if (!inputValue) {
    Notiflix.Notify.failure('введіть данні');
    return;
  }
  unsplash.query = inputValue;
  unsplash.getPhotos().then(({ results }) => {
    const markup = createMarkup(results);
    console.log(markup);
    refs.list.insertAdjacentHTML('beforeend', markup);
  });
};
// HslRljVAXx39xscZAgKySpNimL5ReEsXBSo8WuJOyvk
refs.form.addEventListener('submit', handleSubmit);

function createMarkup(photos) {
  return photos
    .map(({ urls, alt_description }) => {
      return `<li class="gallery__item">
  <img src="${urls.small}" alt="${alt_description}" class="gallery__img">
  </li>`;
    })
    .join('');
}
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const onLoadMore = () => {
  unsplash.incrementPage();
  unsplash.getPhotos(inputValue).then(({ results }) => {
    const markup = createMarkup(results);
    console.log(markup);
    refs.list.insertAdjacentHTML('beforeend', markup);
  });
};
