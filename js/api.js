import { callDrawBigPicture } from './drawBigPictures.js';
import { onModalClose } from './formValidator.js';
import { onModalEscKeydown } from './formValidator.js';
import { isEscapeKey } from './utils.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorFragment = document.createDocumentFragment();
const errorPostTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPostFragment = document.createDocumentFragment();
const uploadForm = document.querySelector('.img-upload__form');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const uploadBtn = document.querySelector('.img-upload__submit');

const drawMiniPictures = (callback = null, filterCallback = null, limit = null) => {
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
};

const onOutsideElementClick = (evt, succesMessage) => {
  if (!succesMessage.querySelector('.success__inner').contains(evt.target)) {
    onSuccessMessageRemove(succesMessage);
  }
};

const onEscKeydown = (evt, succesMessage) => {
  if (isEscapeKey(evt)) {
    onSuccessMessageRemove(succesMessage);
  }
};

function onSuccessMessageRemove(succesMessage) {
  succesMessage.remove();
  window.removeEventListener('click', (evt) => onOutsideElementClick(evt, succesMessage));
  window.removeEventListener('keydown', (evt) => onEscKeydown(evt, succesMessage));
}

const onErrorEscKeydown = (evt, errorMassage) => {
  if (isEscapeKey(evt)) {
    onErrorMessageRemove(errorMassage);
    window.addEventListener('keydown', onModalEscKeydown);
  }
};

const onOutsideErrorClick = (evt, errorMassage) => {
  if (!errorMassage.querySelector('.error__inner').contains(evt.target)) {
    onErrorMessageRemove(errorMassage);
    window.addEventListener('keydown', onModalEscKeydown);
  }
};

function onErrorMessageRemove(errorMassage) {
  errorMassage.remove();
  window.removeEventListener('click', (evt) => onOutsideErrorClick(evt, errorMassage));
  window.removeEventListener('keydown', (evt) => onErrorEscKeydown(evt, errorMassage));
}

const publishPost = (form) => {
  const formData = new FormData(form);
  uploadBtn.disabled = true;

  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      const succesMessage = successTemplate.cloneNode(true);
      successFragment.append(succesMessage);
      document.body.append(successFragment);

      succesMessage.querySelector('.success__button').addEventListener('click', () => onSuccessMessageRemove(succesMessage));

      window.addEventListener('keydown', (evt) => onEscKeydown(evt, succesMessage));
      window.addEventListener('click', (evt) => onOutsideElementClick(evt, succesMessage));
    })
    .then(() => {
      uploadForm.reset();
      onModalClose();
    })
    .catch(() => {
      const errorMassage = errorPostTemplate.cloneNode(true);
      errorPostFragment.append(errorMassage);
      document.body.append(errorPostFragment);
      window.removeEventListener('keydown', onModalEscKeydown);

      window.addEventListener('keydown', (evt) => onErrorEscKeydown(evt, errorMassage));
      window.addEventListener('click', (evt) => onOutsideErrorClick(evt, errorMassage));

      errorMassage.querySelector('.error__button').addEventListener('click', () => {
        window.addEventListener('keydown', onModalEscKeydown);
        errorMassage.remove();
      });
    })
    .finally(() => {
      uploadBtn.disabled = false;
    });
};
export { drawMiniPictures };
export { publishPost };
