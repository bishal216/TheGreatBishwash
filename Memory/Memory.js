function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
var score =100;

const CardArray = [
{name: 'POGmish1',},
{name: 'POGmish2',},
{name: 'POGmish3',},
{name: 'POGmish4',},
{name: 'POGmish5',},
{name: 'POGmish6',},

{name: 'POGmish1',},
{name: 'POGmish2',},
{name: 'POGmish3',},
{name: 'POGmish4',},
{name: 'POGmish5',},
{name: 'POGmish6',},

]

GRID = document.getElementById('GRID');
scoreboard = document.getElementById('score');

function startGame(){
	GRID.innerHTML = '';
	shuffle(CardArray);
	starttime =   new Date().getTime();
  running = true;
	for (let i = 0; i < CardArray.length; i++) {
  		card = document.createElement('img');
  		card.setAttribute("class","cards redborder "+CardArray[i].name)
      card.setAttribute("id","Card"+i)
  		card.setAttribute("src","../images/TGB.png")
      card.setAttribute("onclick","clicked(\""+CardArray[i].name+"\",this.id)")
      
      GRID.appendChild(card);
      scoreboard.innerHTML = score;
  }
}
lastCard = ""
lastCardID = ""
function clicked(argument1,argument2) {
  
  pic = document.getElementById(argument2)
  pic.setAttribute("src","../images/"+argument1+".png")
  pic.classList.add("rotated")
  setTimeout(()=>{pic.classList.remove("rotated")},500)
  if (lastCard == "") 
  {
    lastCard = argument1;
    lastCardID = argument2;
  }
  else if(lastCard == argument1 && lastCardID!=argument2){
    score--;
    pic.classList.remove("redborder");
    pic.classList.add("greenborder");
    pic.removeAttribute("onclick");
    document.getElementById(lastCardID).removeAttribute("onclick");
    document.getElementById(lastCardID).classList.remove("redborder");
    document.getElementById(lastCardID).classList.add("greenborder");
    lastCard=""
    lastCardID=""
  }
  else if(lastCard != argument1){
    score--;
    setTimeout(()=>
      {
        pic.setAttribute("src","../images/TGB.png");
        document.getElementById(lastCardID).setAttribute("src","../images/TGB.png");
        lastCard =""
        lastCardID=""
      }, 
      500);
    
  }
  scoreboard.innerHTML = score;
}
