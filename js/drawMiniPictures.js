import {posts} from './create-post.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

posts.forEach((element) => {
  console.log('sdfsdf')
  const post = pictureTemplate.cloneNode(true);
  pictureTemplate.querySelector('.picture__img').src = element.url;
  pictureTemplate.querySelector('.picture__img').alt = element.description;
  pictureTemplate.querySelector('.picture__likes').textContent = element.likes;
  pictureTemplate.querySelector('.picture__comments').textContent = element.comments.length;
  pictureListFragment.appendChild(post);
});

pictureList.appendChild(pictureListFragment);
