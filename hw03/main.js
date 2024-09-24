// 设置画布

const canvas = document.querySelector('canvas');
 //这行代码的作用是获取页面中第一个<canvas>元素，并将其存储在名为canvas的常量中，以便后续的代码可以对该元素进行绘制或操作。
const ctx = canvas.getContext('2d');//调用canvas的getContext()函数获取一个画画的环境

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
//生成一个 min 至 max 之间的随机整数
function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

//生成随机颜色的函数
//此函数用于生成随机的RGB颜色字符串
function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

//建立小球模型
function Ball(x, y, velX, velY, color, size) {
  //小球最开始的（x,y）坐标，范围是0到浏览器视口的长和宽
  this.x = x;
  this.y = y;
  //小球的水平速度和垂直速度（有计时器，每帧小球x,y值均加，这是匀速的）
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//将小球画上画布的函数
//在Ball上加一个draw方法，格式如下
Ball.prototype.draw = function(){
  //均为Html5 Canvas
  //声明在画布上画出圆形
  ctx.beginPath();
  //定义小球颜色
  ctx.fillStyle = this.color;
  //定义小球圆弧参数
  //最后两个参数是夹角，也就是360度
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  //结束绘画，颜色填充
  ctx.fill();
};


//建立小球数据更新函数
Ball.prototype.update = function(){
 //碰到边缘给一个反方向的速度
 if(this.x+this.size>=width){this.velX = -this.velX}
 if(this.x - this.size <= 0) {this.velX = -this.velX;}
 if(this.y + this.size >= height) {this.velY = -this.velY;}
 if(this.y - this.size <= 0) {this.velY = -this.velY;}

 this.x += this.velX;
 this.y += this.velY;
};

//建立一个小球实例组
let balls = [];

//创建25个小球实例
while(balls.length<25){
  let size = random(10,20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
  );

  //将创建的ball实例添加到balls数组里
  balls.push(ball);
}

//画布的绘制，将小球画上画布
function loop(){
  //将画布设计成黑色
  ctx.fillStyle = 'rgba(0,0,0,0,25)';
  //清空画布
  ctx.fillRect(0, 0, width, height);

  //将小球实例绘制上画布,调用更新函数
  for(let i = 0;i<balls.length;i++){
    balls[i].draw();
    balls[i].update();
    
  }

  //得到一个平滑的动画效果
  requestAnimationFrame(loop);
}

loop();

//增加碰撞检测
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

balls[i].collisionDetect();
