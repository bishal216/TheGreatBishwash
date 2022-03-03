//Variables and Consts
const OProfile = document.querySelector('#OpponentPlayerProfile')

var Difficulty =0

var MyChoice = document.querySelector('#MyChoice')
var OpChoice = document.querySelector('#OpChoice')

ChoiceList  = document.querySelectorAll('.SetChoice');

const GArea = document.querySelector('#GameArea'); 

// Functions
function loadGame(type)
{
    GArea.style.display='inline-block'
    Difficulty=type
    if(type==0){OProfile.style.backgroundImage = `url(../images/KangaRPS.png)`;}
    if(type==1){OProfile.style.backgroundImage = `url(../images/Bishwash_Head.png)`;}
}


//Choose
ChoiceList.forEach(ch => ch.addEventListener('click', changeChoice))

function changeChoice(e) {
    temp = e.target.innerHTML
    MyChoice.innerHTML = temp
}

const possibleChoices = ['Rock', 'Paper', 'Scissors']

function Play(){
    if(Difficulty==0){
        OpChoice.innerHTML =possibleChoices[Math.floor(Math.random() * 3)]
    }
    if(Difficulty==1){
        if(MyChoice.innerHTML==possibleChoices[0]){OpChoice.innerHTML=possibleChoices[1];}
        if(MyChoice.innerHTML==possibleChoices[1]){OpChoice.innerHTML=possibleChoices[2];}
        if(MyChoice.innerHTML==possibleChoices[2]){OpChoice.innerHTML=possibleChoices[0];}
    }
}