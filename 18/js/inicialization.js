import { drawMiniPictures } from './api.js';
import { removePictures, getRandomPosts, getDiscussedPosts } from './utils.js';

const imgFiltersBlock = document.querySelector('.img-filters');
const filterBtns = document.querySelectorAll('.img-filters__button');
const UPDATE_TIMER = 500;

let timeoutId = null;

drawMiniPictures(drawNewPictures);

function drawNewPictures() {
  imgFiltersBlock.classList.remove('img-filters--inactive');

  const defaultFilterBtn = document.querySelector('#filter-default');
  const randomFilterBtn = document.querySelector('#filter-random');
  const discussedFilterBtn = document.querySelector('#filter-discussed');

  defaultFilterBtn.addEventListener('click', () => {
    switchBtns(defaultFilterBtn);
    applyFilter(() => drawMiniPictures());
  });

  randomFilterBtn.addEventListener('click', () => {
    switchBtns(randomFilterBtn);
    applyFilter(() => drawMiniPictures(null, getRandomPosts, 10));
  });

  discussedFilterBtn.addEventListener('click', () => {
    switchBtns(discussedFilterBtn);
    applyFilter(() => drawMiniPictures(null, getDiscussedPosts));
  });
}

function applyFilter(callback) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    removePictures();
    callback();
    timeoutId = null;
  }, UPDATE_TIMER);
}

function switchBtns(activeBtn) {
  filterBtns.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  activeBtn.classList.add('img-filters__button--active');
}
