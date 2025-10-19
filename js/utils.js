const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

const getRandomPosts = (posts) => posts.sort(() => Math.random() - 0.5);

const getDiscussedPosts = (posts) => [...posts].sort((a, b) => b.comments.length - a.comments.length);

export { removePictures };
export { getRandomPosts };
export { getDiscussedPosts };
export { getRandomArrayElement };
export { getRandomInteger };
export { isEscapeKey };
