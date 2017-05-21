var userName = 'Tahsin',
    greeting = document.getElementById('greeting'),
    navDiv = document.getElementById('nav-div'),
    colorSwitcher = document.getElementById('color-switcher'),
    footer = document.getElementsByTagName('footer')[0];

greeting.innerHTML = 'Hello, ' + userName + '!';

var navToggle = document.getElementById('nav-toggle');

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