
//game settings
const Gametime = 60000;
let gameRun = false;
let score =0;
//DOM elements
const HoleList  = document.querySelectorAll('.hole');
const MoleList  = document.querySelectorAll('.mole');
const scoreBoard= document.querySelector('.score'); 



//FUNCTIONS
// randomize time
function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
  }
// randomize holes
function getRandomHole() {
    const randomIndex = Math.floor(Math.random() * HoleList.length);
    return HoleList[randomIndex];
  }
//Peep
function peep() 
{
    //get a random time and hole
    const time = getRandomTime(500, 1000); 
    const hole = getRandomHole(); 
    hole.classList.add('up'); 

    setTimeout(() => {hole.classList.remove('up');if(gameRun) {peep();}},time);
}
// Function to handle the game over scenario
function gameOver() {
    gameRun = false;
    alert(`Game Over!\nYour Score: ${score}`);
  }
//startgame
function startGame()
{   
    if(gameRun){alert('Game Already Running');}
    else{
         gameRun = true;
        score = 0;
        scoreBoard.textContent = score;
        
        peep();
        setTimeout(gameOver, Gametime);
    }
   
}

//Wack
function wack(e)
{
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
MoleList.forEach(mole => mole.addEventListener('click', wack))


