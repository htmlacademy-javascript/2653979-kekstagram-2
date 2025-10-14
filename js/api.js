import { callDrawBigPicture } from './drawBigPictures.js';
import { onModalClose } from './formValidator.js';
import { isEscapeKey } from './utils.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorFragment = document.createDocumentFragment();

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const uploadBtn = document.querySelector('.img-upload__submit');

function drawMiniPictures(callback = null, filterCallback = null, limit = null) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      let processedPosts = posts;
      if (filterCallback && typeof filterCallback === 'function') {
        processedPosts = filterCallback(posts);
      }

      if (limit && limit > 0) {
        processedPosts = processedPosts.slice(0, limit);
      }

      processedPosts.forEach((postData) => {
        const post = pictureTemplate.cloneNode(true);
        post.querySelector('.picture__img').src = postData.url;
        post.querySelector('.picture__img').alt = postData.description;
        post.querySelector('.picture__likes').textContent = postData.likes;
        post.querySelector('.picture__comments').textContent = postData.comments.length;

        callDrawBigPicture(post, postData);

        pictureListFragment.append(post);
      });

      pictureList.append(pictureListFragment);
    })
    .then(() => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    })
    .catch(() => {
      const errorMassage = errorTemplate.cloneNode(true);
      errorFragment.append(errorMassage);
      document.body.append(errorFragment);
      setTimeout(() => {
        errorMassage.remove();
      }, 5000);
    });
}

function publishPost(form) {
  const formData = new FormData(form);
  uploadBtn.disabled = true;
  fetch(
    'https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(() => {
      const succesMessage = successTemplate.cloneNode(true);
      successFragment.append(succesMessage);
      document.body.append(successFragment);
      function removeSuccessMessage() {
        succesMessage.remove();
        window.removeEventListener('click', outsideClickListener);
        window.removeEventListener('keydown', escapeHandler);
      }
      function outsideClickListener(evt) {
        if (!succesMessage.querySelector('.success__inner').contains(evt.target)) {
          removeSuccessMessage();
        }
      }

      succesMessage.querySelector('.success__button').addEventListener('click', removeSuccessMessage);
      function escapeHandler(evt) {
        if (isEscapeKey(evt)) {
          removeSuccessMessage();
        }
      }
      window.addEventListener('keydown', escapeHandler);
      setTimeout(() => {
        window.addEventListener('click', outsideClickListener);
      }, 0);
    })
    .then(() => {
      onModalClose();
    }).catch(() => {
      const errorMassage = errorTemplate.cloneNode(true);
      errorMassage.querySelector('.error__title').textContent = 'Ошибка загрузки файла';
      errorFragment.append(errorMassage);
      document.body.append(errorFragment);
      const removeTimeoutId = setTimeout(() => {
        errorMassage.remove();
      }, 5000);

      errorMassage.querySelector('.error__button').addEventListener('click', () => {
        clearTimeout(removeTimeoutId);
        errorMassage.remove();
        drawMiniPictures();
      });
    })
    .finally(() => {
      uploadBtn.disabled = false;
    });
}

export { drawMiniPictures };
export { publishPost };
