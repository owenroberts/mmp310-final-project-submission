var greeting = document.getElementById('greeting'),
    navDiv = document.getElementById('nav-div'),
    colorSwitcher = document.getElementById('color-switcher'),
    footer = document.getElementsByTagName('footer')[0],
    navToggle = document.getElementById('nav-toggle');

navToggle.style.display = 'none';
navDiv.style.display = 'none';
colorSwitcher.style.display = 'none';
footer.style.display = 'none';

var userName = prompt("What is your name?");
if (!userName) {
    userName = "friend";
}

greeting.innerHTML = 'Hello, ' + userName + '!';

navToggle.addEventListener('click', toggleNavMenu);

function toggleNavMenu() {    
    if (navDiv.style.marginLeft != '-25%') {
        navToggle.innerHTML = 'OPEN MENU'
        navDiv.style.marginLeft = '-25%';
    } else {
        navToggle.innerHTML = 'CLOSE MENU'
        navDiv.style.marginLeft = '0';
    }
}

var generator = document.getElementById('generator'),
    genLinks = generator.getElementsByTagName('li');

genLinks[0].addEventListener('click', generateNav);

function generateNav() {
    this.parentNode.removeChild(this);
    
    navDiv.style.display = 'inherit';
    navToggle.style.display = 'inherit';
}

genLinks[1].addEventListener('click', generateColorSwitcher);

function generateColorSwitcher() {
    this.parentNode.removeChild(this);
    
    colorSwitcher.style.display = 'inherit';
}

genLinks[2].addEventListener('click', generateFooter);

function generateFooter() {
    this.parentNode.removeChild(this);
    
    if (genLinks.length == 0) {
        generator.parentNode.removeChild(generator);
    }
    
    footer.style.display = 'inherit';
}

var colorSliders = colorSwitcher.querySelectorAll('#color-switcher input'),
    body = document.getElementsByTagName('body')[0];

for (var i=0; i < colorSliders.length; i++) {
    colorSliders[i].addEventListener('change', setBackgroundColor);
}

function setBackgroundColor() {
    body.style.background = 'rgb(' + colorSliders[0].value + ',' + colorSliders[1].value + ',' + colorSliders[2].value + ')';
}

var coinButton = document.getElementById('coin-flip'),
    coin = document.getElementById('coin');

coinButton.addEventListener('click', flipCoin);

function flipCoin() {
    var result = Math.floor(Math.random() * 10) + 1;
    
    coin.style.backgroundImage = 'url("coin.jpg")';
    
    if (result <= 5) {
        showHeads();
    } else {
        showTails();
    }
    
    function showHeads() {
        coin.style.backgroundPosition = '100% 0';
    }
    
    function showTails() {
        coin.style.backgroundPosition = '0';
    }
}