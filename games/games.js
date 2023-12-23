let alexClicker = document.getElementsByClassName('alexclicker')[0]
let colourMatcher = document.getElementsByClassName('colourmatcher')[0]
let alexMessanger = document.getElementsByClassName('alexmessanger')[0]

alexClicker.addEventListener('click', function () {
    window.location.href = ('/games/alex_clicker/alex_clicker.html');
});

colourMatcher.addEventListener('click', function () {
    window.open('/games/colour_matcher/colour_matcher.html', '_blank');
});

alexMessanger.addEventListener('click', function () {
    window.location.href = ('https://alex-and-dad.onrender.com/');
});
