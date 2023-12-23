let alexClicker = document.getElementsByClassName('alexclicker')[0]
let colourMatcher = document.getElementsByClassName('colourmatcher')[0]
let alexMessanger = document.getElementsByClassName('alexmessanger')[0]

alexClicker.addEventListener('click', function () {
    window.open('/games/alex_clicker/alex_clicker.html', '_blank');
});

colourMatcher.addEventListener('click', function () {
    window.open('https://crazycat7100.github.io/ColourMatcher/', '_blank');
});

alexMessanger.addEventListener('click', function () {
    window.open('https://alex-messanger.onrender.com/', '_blank');
});
