
const COUNT_PHOTO = 25;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION = [
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

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createIdGenerator () {
  let id = 0;

  return function () {
    id ++;
    return id;
  };
}

function createComment(){
  return {
    id: crypto.randomUUID(),
    avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
    message: Array.from({length: getRandomInteger(1, 2)}, ()=> COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]).join(' '),
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
}

function createObject(postId){
  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, ()=> createComment())
  };
}

function getPhoto(){
  const newId = createIdGenerator();
  return Array.from({ length: COUNT_PHOTO }, () => createObject(newId()));
}

getPhoto();
