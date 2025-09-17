import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');

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

function renderComments(comments) {
  commentsList.innerHTML = '';

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

function openModal(img, postData) {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = img.src;
  bigPicture.querySelector('.big-picture__img img').alt = img.alt;
  bigPicture.querySelector('.likes-count').textContent = postData.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = postData.comments.length;

  socialCaption.textContent = postData.description;
  renderComments(postData.comments);

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  bigPictureClose.removeEventListener('click', onModalCloseClick);
}

function callDrawBigPicture(post, postData) {
  post.addEventListener('click', (evt) => {
    evt.preventDefault();
    const img = post.querySelector('.picture__img');
    openModal(img, postData);
  });
}

export { callDrawBigPicture };
