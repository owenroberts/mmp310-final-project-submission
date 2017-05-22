function check(){

    var quest1 = document.quiz.quest1.value;
    var quest2 = document.quiz.quest2.value;
    var quest3 = document.quiz.quest3.value;
    var score = 0;

        if (quest1 == 'Apple'){
            score++;
        }
        if (quest2 == 'Rock'){
            score++;
        }
        if (quest3 == 'Sunny'){
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
    document.getElementById('homeType').innerHTML = homeTypes[range];
    document.getElementById('picture').src = homePics[range];

}

function changeColor(){
    var quest1 = document.quiz.quest1.value;
    var quest2 = document.quiz.quest2.value;
    var quest3 = document.quiz.quest3.value;

    if (quest3 == 'Rainy'){
    document.body.style.backgroundColor = '#ccf2ff';
    }

    if (quest3 == 'Sunny'){
    document.body.style.backgroundColor = '#ffffb3';
    }
}

function resetPg(){
    window.location.reload();
}
