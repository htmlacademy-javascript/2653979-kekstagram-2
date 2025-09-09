import {getRandomArrayElement, getRandomInteger} from './utils.js';
import {COMMENTS, DESCRIPTION, NAMES, COUNT_PHOTO, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS} from './constants.js';

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
    message: Array.from({length: getRandomInteger(1, 2)}, ()=> getRandomArrayElement(COMMENTS)).join(' '),
    name: getRandomArrayElement(NAMES),
  };
}

function createObject(postId){
  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, ()=> createComment())
  };
}

function getPhoto(){
  const newId = createIdGenerator();
  return Array.from({ length: COUNT_PHOTO }, () => createObject(newId()));
}

getPhoto();
