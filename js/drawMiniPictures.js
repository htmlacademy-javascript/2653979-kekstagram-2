import { posts } from './create-post.js';
import { callDrawBigPicture } from './drawBigPictures.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

posts.forEach((postData) => {
  const post = pictureTemplate.cloneNode(true);
  post.querySelector('.picture__img').src = postData.url;
  post.querySelector('.picture__img').alt = postData.description;
  post.querySelector('.picture__likes').textContent = postData.likes;
  post.querySelector('.picture__comments').textContent = postData.comments.length;

  callDrawBigPicture(post, postData);

  pictureListFragment.append(post);
});

pictureList.append(pictureListFragment);
