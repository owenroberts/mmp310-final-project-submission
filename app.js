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
    
    footer.style.display = 'inherit';
}

var colorSetter = document.getElementById('color-setter'),
    colorSliders = colorSwitcher.getElementsByTagName('input'),
    body = document.getElementsByTagName('body')[0];

colorSetter.addEventListener('click', setBackgroundColor);

function setBackgroundColor() {
    body.style.background = 'rgba(' + colorSliders[0].value + ',' + colorSliders[1].value + ',' + colorSliders[2].value + ',1)';
}