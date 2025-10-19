import { getRandomArrayElement } from './utils.js';
import { getRandomInteger } from './utils.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Фотография, запечатлевающая мгновение нежности и тепла в отношениях.',
  'Игра света и тени создает загадочную атмосферу, привлекающую взгляд.',
  'Яркие цвета и текстуры создают визуальный взрыв, пробуждающий чувства и эмоции.',
  'Эта композиция напоминает о том, как важно ценить мелочи в жизни.',
  'Симметрия и линии в этой работе создают ощущение гармонии и баланса.',
  'Легкий налет мечтательности, запечатленный в каждой детали этой фотографии.',
  'Чувство свободы и полета, выраженное через абстрактную форму и движение.',
  'Атмосфера спокойствия и умиротворения, приглашающая нас остановиться и насладиться моментом.',
];
const NAMES = [
  'Иван',
  'Данил',
  'Аня',
  'Марк',
  'Мирон',
  'Ева',
  'Григорий',
  'Гоша',
  'Таня',
  'Алена',
  'Никита',
  'Миша',
  'Настя',
  'Мария',
  'Маша',
];

const COUNT_PHOTO = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const createIdGenerator = () => {
  let id = 0;
  return function () {
    id++;
    return id;
  };
};

const createComment = () => ({
  id: crypto.randomUUID(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createObject = (postId) => ({
  id: postId,
  url: `photos/${postId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, () => createComment())
});

const getPhoto = () => {
  const newId = createIdGenerator();
  return Array.from({ length: COUNT_PHOTO }, () => createObject(newId()));
};

const posts = getPhoto();

export { posts };
