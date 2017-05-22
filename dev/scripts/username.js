function addName(){

    var entry = document.getElementById('entry');
    var userName = document.getElementById('userName');
    var userEntry = document.getElementById('userEntry').value;
    entry.innerHTML = userEntry + '!';
    userName.style.visibility = 'hidden';
}
