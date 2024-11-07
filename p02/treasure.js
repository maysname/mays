// 检查两个元素是否碰撞
function isCollision(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    return!(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

// 移动角色到目标位置
async function moveToLocation(character, target) {
    const startRect = character.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const startX = startRect.left;
    const startY = startRect.top;
    const targetX = targetRect.left;
    const targetY = targetRect.top;
    const distanceX = targetX - startX;
    const distanceY = targetY - startY;
    const steps = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / 5;
    const stepX = distanceX / steps;
    const stepY = distanceY / steps;
    let currentStep = 0;
    return new Promise((resolve) => {
        const moveInterval = setInterval(() => {
            if (currentStep < steps) {
                character.style.left = (startX + stepX * currentStep) + 'px';
                character.style.top = (startY + stepY * currentStep) + 'px';
                character.style.transform = 'scale(' + (1 + (currentStep * 0.1)) + ')';
                currentStep++;
            } else {
                clearInterval(moveInterval);
                character.style.transform = 'scale(1)';
                resolve();
            }
        }, 100);
    });
}

// 模拟寻宝过程的函数
async function treasureHunt() {
    const messageBox = document.getElementById('messageBox');
    const character = document.getElementById('character');
    const library = document.getElementById('library');
    const temple = document.getElementById('temple');
    const secretPassage = document.getElementById('secretPassage');
    const treasureBox = document.getElementById('treasureBox');
    const oldMan = document.getElementById('oldMan');

    // 初始线索
    await new Promise((resolve) => {
        setTimeout(() => {
            messageBox.textContent = "在古老的图书馆里找到了第一个线索...";
            library.style.opacity = 1;
            resolve();
        }, 1000);
    });

    // 前往图书馆
    await moveToLocation(character, library);

    // 解码古代文字
    await new Promise((resolve) => {
        setTimeout(() => {
            messageBox.textContent = "解码成功!宝藏在一座古老的神庙中...";
            temple.style.opacity = 1;
            resolve();
        }, 1500);
    });

    // 前往神庙
    await moveToLocation(character, temple);

    // 与神秘老人交谈
    await moveToLocation(character, oldMan);
    await new Promise((resolve) => {
        setTimeout(() => {
            messageBox.textContent = "老人告诉你在神庙的地下室有秘密通道。";
            secretPassage.style.opacity = 1;
            resolve();
        }, 1500);
    });

    // 探索秘密通道
    await moveToLocation(character, secretPassage);

    // 寻找宝藏箱
    await moveToLocation(character, treasureBox);
    await new Promise((resolve) => {
        setTimeout(() => {
            messageBox.textContent = "找到了一个神秘的箱子...";
            resolve();
        }, 2000);
    });

    // 打开宝藏箱
    await new Promise((resolve) => {
        setTimeout(() => {
            messageBox.textContent = "恭喜!你找到了传说中的宝藏!";
            resolve();
        }, 1000);
    });
}

treasureHunt();