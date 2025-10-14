import { isEscapeKey } from './utils.js';
const LOAD_COMMENTS_COUNT = 5;
let currentComments = [];
let shownCommentsCount = 0;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const shownCountElement = commentCount.querySelector('.social__comment-shown-count');
const totalCountElement = commentCount.querySelector('.social__comment-total-count');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onModalCloseClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const onCommentLoaderClick = () => {
  loadMoreComments();
};

function renderCommentsPortion(comments) {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsFragment.append(commentElement);
  });

  commentsList.append(commentsFragment);
}

function loadMoreComments() {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + LOAD_COMMENTS_COUNT);
  renderCommentsPortion(nextComments);

  shownCommentsCount += nextComments.length;
  shownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    commentLoader.classList.add('hidden');
  }
}

function initComments(comments) {
  currentComments = comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';

  totalCountElement.textContent = comments.length;

  if (comments.length > LOAD_COMMENTS_COUNT) {
    commentLoader.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
    commentCount.classList.remove('hidden');
  }

  loadMoreComments();
}

function openModal(img, postData) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = img.src;
  bigPicture.querySelector('.big-picture__img img').alt = img.alt;
  bigPicture.querySelector('.likes-count').textContent = postData.likes;

  socialCaption.textContent = postData.description;

  initComments(postData.comments);

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
  commentLoader.addEventListener('click', onCommentLoaderClick);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
  shownCommentsCount = 0;

  document.removeEventListener('keydown', onModalEscKeydown);
  bigPictureClose.removeEventListener('click', onModalCloseClick);
  commentLoader.removeEventListener('click', onCommentLoaderClick);
}

function callDrawBigPicture(post, postData) {
  post.addEventListener('click', (evt) => {
    evt.preventDefault();
    const img = post.querySelector('.picture__img');
    openModal(img, postData);
  });
}

export { callDrawBigPicture };
