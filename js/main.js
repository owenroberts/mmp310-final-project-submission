/* five interactions... 
    1. slider 2. play/pause button 3. mute/unmute button 4. Accordian 5. Google Maps*/


var mytrack = document.getElementById('mytrack');
var playButton = document.getElementById('playButton');
var muteButton = document.getElementById('muteButton');
var duration = document.getElementById('fullTime');
var currentTime = document.getElementById('currentTime');
var minutes = parseInt (mytrack.duration/60);
var seconds =parseInt (mytrack.duration%60);
var barSize = 900;
var bar = document.getElementById('bar')
var progressBar = document.getElementById('progressBar')
var image=['images/trav.jpg', 'images/Earl.jpg','images/Kendrick.jpg']
var accItem = document.getElementsByClassName('accItem');
var accHeading = document.getElementsByClassName('accItemHeading');








/*Accordian*/
    
for (i = 0; i < accHeading.length; i++) {
        accHeading[i].addEventListener('click', toggleItem, false);
    }
    function toggleItem() {
        var itemClass = this.parentNode.className;
        for (i = 0; i < accItem.length; i++) {
            accItem[i].className = 'accItem close';
        }
        if (itemClass == 'accItem close') {
            this.parentNode.className = 'accItem open';
        }
    }
/*end Accordian*/






/* Slider */
var num=0;
function next(){
    var slide= document.getElementById('slider');
    num++;
    if(num>=image.length)
        num=0;
    slide.src=image[num];
}

function prev(){
     var slide= document.getElementById('slider');
    num--;
    if (num<0)
        num=image.length-1;
    slide.src=image[num];
    
}
/* End of Slider */



playButton.addEventListener('click', playOrPause,false);
muteButton.addEventListener('click', muteOrUnmute, false);
bar.addEventListener('click' , clickedBar , false);

/* Making a mute and unmute function*/


function muteOrUnmute(){
    if(mytrack.muted ==true){
        mytrack.muted=false;
        muteButton.style.backgroundImage = 'url(../images/makesound.png)'
    }
    else{
        mytrack.muted = true;
        muteButton.style.backgroundImage = 'url(../images/makenosound.png)'
    }
    
    
}


/* end of mute & unmute buttons */

/* Making a PLay and Pause function*/
function playOrPause(){
    if(!mytrack.paused && !mytrack.ended){
        mytrack.pause();
        playButton.style.backgroundImage = 'url(../images/makefg.png)';
    window.clearInterval(updateTime);
    }
    else{
        mytrack.play();
       playButton.style.backgroundImage = 'url(../images/makepause.png)';
       updateTime = setInterval(update,500);
    }
}

function update() {
    if(!mytrack.ended){
       var playedSeconds = parseInt(mytrack.currentTime%60)  ;         
        var playedMinutes = parseInt(mytrack.currentTime/60);
        currentTime.innerHTML = playedMinutes + ':'+playedSeconds;
        var size = parseInt(mytrack.currentTime*barSize/mytrack.duration);
        progressBar.style.width = size + "px";
    
    } else {
        currentTime.innerHTML = "0:00";
        playButton.style.backgroundImage = 'url(../images/makefg.png)';
        progressBar.style.width =  "0px";
        window.clearInterval(updateTime);
   
     }
}

function muteOrUnmute(){
    if(mytrack.muted ==true){
        mytrack.muted=false;
        muteButton.style.backgroundImage = 'url(../images/makesound.png)'
    }
    else{
        mytrack.muted = true;
        muteButton.style.backgroundImage = 'url(../images/makenosound.png)'
    }
    
    
}

/* Google maps */

function initMap() {
        var place = {lat: 40.712784, lng: -74.005941};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: place
        });
        var marker = new google.maps.Marker({
          position: place,
          map: map
        });
      }


/* end of play & pause buttons*/




/* Video Progressbar skip / notworking correctly  */
/*
 function clickedBar(e){
    if (!mytrack.ended){
        var mouseX = e.pageX - bar.offsetLeft;
        var newTime = mouseX*mytrack.duration/barSize;
        mytrack.currentTime = newTime;
        progressBar.style.width = mouseX + 'px';
        
        }} */

