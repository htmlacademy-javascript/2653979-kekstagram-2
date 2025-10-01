import { isEscapeKey } from './utils.js';
const fileInput = document.querySelector('.img-upload__input');
const modalForm = document.querySelector('.img-upload__form');
const modalCloseBtn = document.querySelector('.img-upload__cancel');

const hashRegular = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const isCommentFocused = document.activeElement === commentField;
    const isHashtagFocused = document.activeElement === hashtagField;
    if (isCommentFocused || isHashtagFocused) {
      return;
    }
    evt.preventDefault();
    onModalClose();
  }
};

const onFileInputChange = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  modalCloseBtn.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onModalEscKeydown);
  fileInput.removeEventListener('change', onFileInputChange);
};

function onModalClose() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  modalCloseBtn.removeEventListener('click', onModalClose);
  window.removeEventListener('keydown', onModalEscKeydown);
  fileInput.addEventListener('change', onFileInputChange);
}

fileInput.addEventListener('change', onFileInputChange);

const pristine = new Pristine(modalForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

function validateHashContent (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    for (const hashtag of hashtags) {
      if (!hashRegular.test(hashtag)) {
        return false;
      }
    }
  }
  return true;
}

function validateHashAmount (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    if (hashtags.length <= 5) {
      return true;
    }
  }
}

function validateHashRepeat (value) {
  if (value.trim() === '') {
    return true;
  } else {
    const hashtags = value.split(' ');
    const hashtagsLowerCase = hashtags.map((str) => str.toLowerCase());
    for (let i = 0; i < hashtagsLowerCase.length; i++) {
      let j = i + 1;

      for (j; j < hashtagsLowerCase.length; j++) {
        if (hashtagsLowerCase[i].toString() === hashtagsLowerCase[j].toString()) {
          return false;
        }
      }
    }
  }
  return true;
}

pristine.addValidator(
  commentField,
  (value) => value.length <= 140,
  'Комментарий должен быть короче 140 символов'
);
pristine.addValidator(
  hashtagField,
  validateHashContent,
  'Введен неправильный хештег'
);
pristine.addValidator(
  hashtagField,
  validateHashAmount,
  'Введено слишком много хештегов'
);
pristine.addValidator(
  hashtagField,
  validateHashRepeat,
  'Хештеги не должны повторяться'
);

modalForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    modalForm.submit();
  }
});
