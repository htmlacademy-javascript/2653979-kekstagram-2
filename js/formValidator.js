import { isEscapeKey } from './utils.js';
import { publishPost } from './api.js';
const fileInput = document.querySelector('.img-upload__input');
const modalForm = document.querySelector('.img-upload__form');
const modalCloseBtn = document.querySelector('.img-upload__cancel');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgMiniPreview = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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

  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
    imgMiniPreview.forEach((element) => {
      element.style.backgroundImage = `url("${imgPreview.src}")`;
    });
  }
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
function validateHashContent(value) {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = splitHashtags(value);

  for (const hashtag of hashtags) {
    // Проверяем что хэштег не пустой и соответствует регулярке
    if (!hashtag || !hashRegular.test(hashtag)) {
      return false;
    }
  }
  return true;
}
function splitHashtags(value) {
  return value.trim().split(/\s+/).filter((tag) => tag !== '');
}

function validateHashAmount(value) {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = splitHashtags(value);
  return hashtags.length <= 5;
}

function validateHashRepeat(value) {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = splitHashtags(value);
  const hashtagsLowerCase = hashtags.map((str) => str.toLowerCase());

  // Используем Set для поиска дубликатов
  const uniqueHashtags = new Set();

  for (const hashtag of hashtagsLowerCase) {
    if (uniqueHashtags.has(hashtag)) {
      return false;
    }
    uniqueHashtags.add(hashtag);
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
    pristine.reset();
    publishPost(modalForm);
  }
});

export { onModalClose };
