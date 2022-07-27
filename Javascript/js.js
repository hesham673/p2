// Array of words
const words = [
    'hello','programing','background','code',
    'javascript','town','country','testing',
    'with','labtop','anything','notime','alone','space','game over',
    'create','creative','arabic','tutorials','asking','facebook',
    'try','boom','gates','darkness','demons','god father','vapulus','startup'
    ,'challenge'
];

// set levels
const lvls = {
    'easy': 6,
    'normal': 4,
    'hard': 3
};
// default level
let defaultLevelName = 'normal'
let defaultLevelSeconds = lvls[defaultLevelName];

let choose = document.querySelectorAll('.choose span')
choose.forEach((span) =>{
    span.addEventListener('click', () =>{
    let defaultLevelName = span.innerHTML.toLocaleLowerCase()
        defaultLevelSeconds = lvls[defaultLevelName]
        span.parentElement.remove()
        
    })
})



 //change level from here


//catch selectors
let startButton = document.querySelector('.start')
let lvlNameSpan = document.querySelector('.message .lvl')
let secondsSpan = document.querySelector('.message .seconds')
let theWord = document.querySelector('.the-word')
let upComingWords = document.querySelector('.upcoming-words')
let input = document.querySelector('.input')
let timeLeftSpan = document.querySelector('.time span')
let scoreGot = document.querySelector('.score .got')
let scoreTotal = document.querySelector('.score .total')
let finishMessage = document.querySelector('.finish')

//    setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName
secondsSpan.innerHTML = defaultLevelSeconds
timeLeftSpan.innerHTML = defaultLevelSeconds
scoreTotal.innerHTML = words.length

// disable paste event
input.onpaste = function (){
    return false;
}

//  start game
startButton.onclick = function (){
    this.remove();
    input.focus();
    //generate words function
    genWords();
}

function genWords(){
    // get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)]
    // console.log(randomWord)
    let wordIndex = words.indexOf(randomWord)
    // remove word from array
    words.splice(wordIndex, 1)
    // show the random word
    theWord.innerHTML = randomWord
    // empty upcoming words div
    upComingWords.innerHTML='';
    // generate words
    for(let i=0 ; i < words.length ; i++){
        // create div element
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upComingWords.appendChild(div)
    }
    startPlay();
}

function startPlay(){
    timeLeftSpan.innerHTML = defaultLevelSeconds
    let start = setInterval(() =>{
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === '0'){
            // stop timer
            clearInterval(start);
            // compare words
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                // empty input field
                input.value = '';
                // increase score
                scoreGot.innerHTML++;
                // check if the is empty or 
                if(words.length > 0){
                    // call generate word function
                    genWords();
                }
                else{
                    let span = document.createElement('span');
                    span.className = 'good';
                    let spanText = document.createTextNode('congratulation');
                    span.appendChild(spanText);
                    finishMessage.appendChild(span)
                    // remove up coming words box
                    upComingWords.remove();
                }
            }
            else{
                let span = document.createElement('span');
                span.className = 'bad';
                let spanText = document.createTextNode('game over');
                span.appendChild(spanText)
                finishMessage.appendChild(span)
            }
        }
    },1000)
}


