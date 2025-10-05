function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function removePictures() {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => {
    element.remove();
  });
}

function getRandomPosts(posts) {
  return posts.sort(() => Math.random() - 0.5);
}

// Функция для получения случайных постов
function getRandomPostsFilter(posts) {
  const shuffled = [...posts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Функция для сортировки по убыванию количества комментариев
function getDiscussedPosts(posts) {
  return [...posts].sort((a, b) => b.comments.length - a.comments.length);
}

export { removePictures };
export { getRandomPosts };
export { getRandomPostsFilter };
export { getDiscussedPosts };
export { getRandomArrayElement };
export { getRandomInteger };
export { isEscapeKey };
