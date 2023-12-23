let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
let yellow = document.querySelector('.yellow');
let green = document.querySelector('.green');
let back = document.querySelector('.back')

let block = document.querySelector('.block');
let start = document.querySelector('.start');
let counter = document.querySelector('.counter');
let score = 0;
let intervalDuration = 100; // Initial interval duration
let lastColor = ''; // Global variable to store the last chosen color
let moveSpeed = 15; // Speed for horizontal movement
block.style.left = parseInt(window.innerWidth) / 2 + 50 + 'px'
let currentLeft = parseInt(getComputedStyle(block).left);
console.log(currentLeft)



start.addEventListener('click', function () {
    startGame();
});

function startGame() {
    start.style.display = 'none';
    blockFall();
}

function blockFall() {
    block.style.display = 'block';
    setBlockColour();
    startBlockFall();
}

function setBlockColour() {
    let colors = ['red', 'blue', 'yellow', 'green'];
    let randomIndex;
    let chosenColor = lastColor; // Assign lastColor initially to avoid staying on the same color
    
    while (chosenColor === lastColor) {
        randomIndex = Math.floor(Math.random() * colors.length);
        chosenColor = colors[randomIndex];
    }
    
    lastColor = chosenColor; // Update the last chosen color
    block.dataset.color = chosenColor;
    block.style.backgroundColor = chosenColor;
}

function startBlockFall() {
    let intervalId = setInterval(function () {
        let currentTop = parseInt(block.style.top) || 0;
        currentTop += 10; // Adjust vertical speed here
        block.style.top = currentTop + 'px';
        block.style.transition = `top ${(intervalDuration / 1000)}s linear`; // Adjust transition duration based on falling speed

        if (checkCollision()) {
            clearInterval(intervalId);
        }
    }, intervalDuration);
}

// prompt('whats ur name')

function checkCollision() {
    let blockRect = block.getBoundingClientRect();
    let redRect = red.getBoundingClientRect();
    let blueRect = blue.getBoundingClientRect();
    let yellowRect = yellow.getBoundingClientRect();
    let greenRect = green.getBoundingClientRect();

    if (isTouching(blockRect, redRect)) {
        handleCollision('red');
        return true;
    } else if (isTouching(blockRect, blueRect)) {
        handleCollision('blue');
        return true;
    } else if (isTouching(blockRect, yellowRect)) {
        handleCollision('yellow');
        return true;
    } else if (isTouching(blockRect, greenRect)) {
        handleCollision('green');
        return true;
    }

    return false;
}

function handleCollision(color) {
    let blockColor = block.dataset.color;
    if (color === blockColor) {
        block.style.display = 'none';
        score += 10;
        counter.textContent = 'Score: ' + score;
        intervalDuration -= 5; // Reduce interval duration by a larger value (adjustable)
        moveSpeed += 2;
        if (intervalDuration < 10) {
            intervalDuration = 10; // Set a minimum interval duration of 10 milliseconds
        }
        setTimeout(() => {
            block.style.top = '0px'; // Reset block position to the top
            block.style.display = 'block'; // Show the block again
            setBlockColour(); // Set a new random color for the block
            startBlockFall(); // Start block fall with updated settings
        }, intervalDuration); // Adjust the timeout duration as needed
    } else {
        setTimeout(() => {
            window.location.reload(); // Reload the page if the collision is incorrect
        }, intervalDuration); // Adjust the timeout duration as needed
    }
}

function isTouching(rect1, rect2) {
    return !(
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

function changeX () {
    block.style.left = currentLeft + 'px';
}

document.addEventListener('keydown', function (event) {
   
    if (event.key === 'ArrowLeft') {
        if (currentLeft > 0 ) {
            currentLeft -= moveSpeed
            changeX()

    }

    } else if (event.key === 'ArrowRight') {
        if (currentLeft < window.innerWidth - 100) {
            currentLeft += moveSpeed

            changeX()
        }

    }
});

back.addEventListener('click', function () {
    window.location.href = '/games/games.html'
})
