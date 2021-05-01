//variable definition
var SCORE = document.getElementById('score')  //Element
var GameRunning = false;                      //Bool 
var score =0;                                 //Integer

var holesList = document.querySelectorAll('.hole');  //static Nodelist
var upTime = 500; //int






//function defn

function randomize(holesList){
    var i = Math.random() * holesList.length; //Math random gives 0 to 1
    i = Math.round(i);
    if(i != 0)
     i = i-1;      
    //console.log(i);                  //rounds float to int
    var hole = holesList[i];                       //selects hole
    return hole;                                //returns hole
}


function MolePopUp() {
    var randomHole = randomize(holesList);  //gets random hole from function
    randomHole.classList.add('active');               //add the CSS class so selected mole can "pop up"
    setTimeout(
        function(){
            randomHole.classList.remove('active');
            if(GameRunning==true)
                MolePopUp();
             }
        , upTime); //mole pops down after upTime
}


function startGame() 
{
   // alert("Start");
   if(GameRunning == false)
   {
    SCORE.textContent = 0;   //Start at 0
    GameRunning = true;      //Signifies Game has started
    score = 0;               //Initial Score
    MolePopUp();         //Starts to pop up mole
    setTimeout(function(){GameRunning = false;}, 30000) //show random moles for 30 seconds
   }
    else
    {
        alert("Game Already Running");
    }
}

function UpdateScoreBoard(){
    if(GameRunning==true)
    {
        var MousePosX = event.clientX;
        var MousePosY = event.clientY;
        var activeElement = document.querySelector('.active');
        var rect = activeElement.getBoundingClientRect();
        
        console.log(rect.top ,"-", MousePosY , "-" , rect.bottom);
        if(MousePosY>rect.top && MousePosY<rect.bottom)
        {
            if(MousePosX>rect.left && MousePosX<rect.right)
            {
                score++;
            }
        }
        //console.log(score);
        SCORE.textContent = score;
    }
}
