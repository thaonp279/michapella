//intro
function typeIntro(){
    let intro1 = "Hello I'm Micha!";
    let intro2 = "Drop me some tunes from below to create an acapella!";
    let array = intro1.split('').concat('<br>').concat(intro2.split(''));
    let type = [];
    let introDiv = document.getElementById('intro');
    document.getElementById('slot-3').classList.remove('inactive');
    array.forEach((x, i, arr) => {
      setTimeout(function(){
        type.push(x);
        introDiv.innerHTML = type.join('')
        if (i==arr.length-1){
          document.getElementById('slot-3').classList.add('inactive');
        }}, 2000+50*i)});
  }
  
  typeIntro();
  //timer
  let timer = 0;
  let startDate = new Date();
  let startTime = startDate.getTime();
  function restartTimer(){
    startDate = new Date();
    startTime = startDate.getTime();
  }
  
  function tickTock(){
    let currentDate = new Date();
    let currentTime = currentDate.getTime();
    timer = currentTime-startTime;
    for (let i=0; i<6; i++){
    let loading = document.getElementsByClassName('loading');
  loading[i].style.width = timer/12000*100+'%';
    }
  }
  
  
  function setTimer(interval, loop){
    let intervalLoop = setInterval(restartTimer, interval*1000);
    let intervalSec = setInterval(tickTock, 100);
    
    setTimeout(function(){
      clearInterval(intervalSec);
      clearInterval(intervalLoop);
  }, interval*1000*loop)
  }
  
  setTimer(12, 50);
  
  function drag(event){
    event.dataTransfer.setData('id', event.target.id) 
  }
  function allowDrop(event){
    event.preventDefault();
  }
  function drop(event){
    event.preventDefault();
    let buttonId = event.dataTransfer.getData('id');
    document.getElementById(buttonId).classList.add('inactive');
    let dropSlot = document.getElementById(event.target.id);
    let audio = document.getElementById(buttonId+'-audio');
    let img = document.getElementById(buttonId+'-img');
    let loader = document.getElementById(dropSlot.id+'-loader');
    loader.classList.remove('invisible');
    setTimeout(function(){
      audio.currentTime=0;
      audio.play();
      audio.loop = true;
      dropSlot.setAttribute('host', buttonId);
      dropSlot.src = img.src;
      dropSlot.classList.remove('inactive');
      loader.classList.add('invisible');
    }, 12000-timer)
  }
  
  function remove(event){
    let item = document.getElementById(event.target.id);
    item.src = "https://www.dropbox.com/s/crbut5o0cp9286e/Main.png?raw=1";
    item.classList.add('inactive');
    let hostId = item.getAttribute('host')
   let audio = document.getElementById(hostId+'-audio');
    audio.pause();
    let button = document.getElementById(hostId);
    button.classList.remove('inactive')
    
  }
  