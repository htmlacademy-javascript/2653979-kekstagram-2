import {posts} from './create-post.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

posts.forEach((element) => {
  const post = pictureTemplate.cloneNode(true);
  post.querySelector('.picture__img').src = element.url;
  post.querySelector('.picture__img').alt = element.description;
  post.querySelector('.picture__likes').textContent = element.likes;
  post.querySelector('.picture__comments').textContent = element.comments.length;
  pictureListFragment.appendChild(post);
});

pictureList.append(pictureListFragment);
