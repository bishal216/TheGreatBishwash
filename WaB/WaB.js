
//gametime
Gametime = 60000;
gameRun = false;
//Other variables
HoleList  = document.querySelectorAll('.hole');
MoleList  = document.querySelectorAll('.mole');
scoreBoard= document.querySelector('.score'); 
score =0;


//FUNCTIONS

//Peep
function peep() 
{
    //get a random time to determine how long mole should peep
    const time = Math.random()*500+500; 
    //get the random hole 
    const hole = HoleList[Math.floor(Math.random()*HoleList.length)]; 
    //add the CSS class so selected mole can "pop up"
    hole.classList.add('up'); 

    setTimeout(() => {hole.classList.remove('up');if(gameRun) {peep();}},time);
}
//startgame
function startGame()
{
    console.log('START');
   
    if(gameRun){alert('Game Already Running');}
    else{
         gameRun = true;
        score = 0;
        scoreBoard.textContent = score;
        
        peep();
        setTimeout(() => {gameRun = false;if(score>document.cookie) document.cookie=score;}, Gametime);
    }
   
}

//Wack
function wack(e)
{
    if(!e.isTrusted) return;
    score++;
    console.log(score);
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
MoleList.forEach(mole => mole.addEventListener('click', wack))

//highscore

