var userName = 'Tahsin',
    greeting = document.getElementById('greeting');

greeting.innerHTML = 'Hello, ' + userName + '!';

var navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', toggleNavMenu);

function toggleNavMenu() {
    var navDiv = document.getElementById('nav-div');
    
    if (navDiv.style.marginLeft != '-25%') {
        navToggle.innerHTML = 'OPEN MENU'
        navDiv.style.marginLeft = '-25%';
    } else {
        navToggle.innerHTML = 'CLOSE MENU'
        navDiv.style.marginLeft = '0';
    }
}