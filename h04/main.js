// 定义动画的关键帧和时间设置
const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
];
const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
};

// 获取三个图像元素
const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// 回调地狱版本
function animateWithCallbackHell() {
    alice1.animate(aliceTumbling, aliceTiming).finished.then(() => {
        alice2.animate(aliceTumbling, aliceTiming).finished.then(() => {
            alice3.animate(aliceTumbling, aliceTiming);
        });
    });
}

// Promise链版本
function animateWithPromiseChain() {
    alice1.animate(aliceTumbling, aliceTiming).finished
      .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
      .then(() => alice3.animate(aliceTumbling, aliceTiming));
}

// async/await版本
async function animateWithAsyncAwait() {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming);
}

// 调用其中一个函数来启动动画，这里以Promise链版本为例
animateWithPromiseChain();