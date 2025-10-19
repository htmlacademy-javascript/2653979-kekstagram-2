import { drawMiniPictures } from './api.js';
import { removePictures, getRandomPosts, getDiscussedPosts } from './utils.js';
const UPDATE_TIMER = 500;
let timeoutId = null;

const imgFiltersBlock = document.querySelector('.img-filters');
const filterBtns = document.querySelectorAll('.img-filters__button');

const switchBtns = (activeBtn) => {
  filterBtns.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  activeBtn.classList.add('img-filters__button--active');
};

const applyFilter = (callback) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    removePictures();
    callback();
    timeoutId = null;
  }, UPDATE_TIMER);
};

const setupDefaultFilter = (button) => {
  button.addEventListener('click', () => {
    switchBtns(button);
    applyFilter(() => drawMiniPictures());
  });
};

const setupRandomFilter = (button) => {
  button.addEventListener('click', () => {
    switchBtns(button);
    applyFilter(() => drawMiniPictures(null, getRandomPosts, 10));
  });
};

const setupDiscussedFilter = (button) => {
  button.addEventListener('click', () => {
    switchBtns(button);
    applyFilter(() => drawMiniPictures(null, getDiscussedPosts));
  });
};

const drawNewPictures = () => {
  imgFiltersBlock.classList.remove('img-filters--inactive');

  const defaultFilterBtn = document.querySelector('#filter-default');
  const randomFilterBtn = document.querySelector('#filter-random');
  const discussedFilterBtn = document.querySelector('#filter-discussed');

  setupDefaultFilter(defaultFilterBtn);
  setupRandomFilter(randomFilterBtn);
  setupDiscussedFilter(discussedFilterBtn);
};

drawMiniPictures(drawNewPictures);
