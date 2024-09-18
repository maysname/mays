const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 定义图像数组和描述:*/

const images = [`https://picsum.photos/id/237/200/300`, 
    `https://picsum.photos/seed/picsum/200/300`,
     `https://picsum.photos/200/300?grayscale`,
      `https://picsum.photos/200/300/?blur`,
       `https://picsum.photos/id/870/200/300?grayscale&blur=2`];

const imageBaseUrl = {
    'https://picsum.photos/id/237/200/300' : 'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/seed/picsum/200/300' : 'https://picsum.photos/seed/picsum/200/300',
    'https://picsum.photos/200/300?grayscale' : 'https://picsum.photos/200/300?grayscale',
    'https://picsum.photos/200/300/?blur' : 'https://picsum.photos/200/300/?blur',
    'https://picsum.photos/id/870/200/300?grayscale&blur=2' : 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
};

const alts = {
  'https://picsum.photos/id/237/200/300' : '本图片来自网站https://picsum.photos/',
  'https://picsum.photos/seed/picsum/200/300' : '本图片来自网站https://picsum.photos/',
  'https://picsum.photos/200/300?grayscale' : '本图片来自网站https://picsum.photos/',
  'https://picsum.photos/200/300/?blur' : '本图片来自网站https://picsum.photos/',
  'https://picsum.photos/id/870/200/300?grayscale&blur=2' : '本图片来自网站https://picsum.photos/',
  
}

/* 循环创建并添加缩略图 */

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageBaseUrl[image]);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    });
  }

/* 按钮事件处理:*/

btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
