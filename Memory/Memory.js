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
function sleep(milliseconds) {
  const date = Date.now();
  do {currentDate = Date.now();} while (currentDate - date < milliseconds);
}
starttime=new Date().getTime();
running = false;
const CardArray = [
{name: 'POGmish1',face:'false',},
{name: 'POGmish2',face:'false',},
{name: 'POGmish3',face:'false',},
{name: 'POGmish4',face:'false',},
{name: 'POGmish5',face:'false',},
{name: 'POGmish6',face:'false',},

{name: 'POGmish1',},
{name: 'POGmish2',},
{name: 'POGmish3',},
{name: 'POGmish4',},
{name: 'POGmish5',},
{name: 'POGmish6',},

// {name: 'POGmish1',image: '../images/POGmish1.png',},
// {name: 'POGmish2',image: '../images/POGmish2.png',},
// {name: 'POGmish3',image: '../images/POGmish3.png',},
// {name: 'POGmish4',image: '../images/POGmish4.png',},
// {name: 'POGmish5',image: '../images/POGmish5.png',},
// {name: 'POGmish6',image: '../images/POGmish6.png',},
]

GRID = document.getElementById('GRID');

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

  }
}
lastCard = ""
lastCardID = ""
function clicked(argument1,argument2) {
 
  pic = document.getElementById(argument2)
  pic.setAttribute("src","../images/"+argument1+".png")
  console.log(lastCard+","+argument1+","+argument2)
  if (lastCard == "") 
  {
    lastCard = argument1;
    lastCardID = argument2;
    console.log("New")
  }
  else if(lastCard == argument1){
    console.log("Success")
    pic.classList.remove("redborder");
    pic.classList.add("greenborder");
    document.getElementById(lastCardID).classList.remove("redborder");
    document.getElementById(lastCardID).classList.add("greenborder");
    lastCard=""
    lastCardID=""
  }
  else if(lastCard != argument1){
    
    setTimeout(()=>
      {
        pic.setAttribute("src","../images/TGB.png");
        document.getElementById(lastCardID).setAttribute("src","../images/TGB.png");
        console.log("Failed");
        lastCard =""
        lastCardID=""
      }, 
      500);
    
  }
}
