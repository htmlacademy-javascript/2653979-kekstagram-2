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

export {getRandomArrayElement};
export {getRandomInteger};
export {isEscapeKey};
