function check(){

    var quest1 = document.quiz.quest1.value;
    var quest2 = document.quiz.quest2.value;
    var quest3 = document.quiz.quest3.value;
    var score = 0;

        if (quest1 == 'Winter'){
            score++;
        }
        if (quest2 == 'Cats'){
            score++;
        }
        if (quest3 == 'Blue'){
            score++;
        }

    var range;
        //0 right
        if (score < 1){
            range = 3;
        }

        //1 right
        if (score > 0 && score < 2){
            range = 2;
        }

        if (score > 1 && score < 3){
            range = 1;
        }

        // 3 right
        if (score > 2){
            range = 0;
        }

    document.getElementById('results').style.visibility = 'visible';
    document.getElementById('personType').innerHTML = personTypes[range];
    document.getElementById('picture').src = pictures[range];

}

function changeColor(){
    var quest1 = document.quiz.quest1.value;
    var quest2 = document.quiz.quest2.value;
    var quest3 = document.quiz.quest3.value;

    if (quest3 == 'Blue'){
    document.body.style.backgroundColor = '#ccf2ff';
    }

    if (quest3 == 'Yellow'){
    document.body.style.backgroundColor = '#ffffb3';
    }
}

function resetPg(){
    window.location.reload();
}
