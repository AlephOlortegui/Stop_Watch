const milli = document.getElementById('milli')
const seconds = document.getElementById('seconds')
const minutes = document.getElementById('minutes')

const start = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const reset = document.getElementById('reset')

let counter = 0;
let interval; // undefined
let secCounter = 0;
let minCounter = 0;
let isRunning = false;

// LS loaded
window.addEventListener('DOMContentLoaded', displayLIS);

function run() {
    counter++;
    milli.innerText = counter > 9 ? counter : `0${counter}`;
    if(counter > 99){
        //Reset since we reach one second
        counter = 0;
        milli.innerText = '00'
        //Start a new counting
        secCounter++;
        seconds.innerText = secCounter > 9 ? secCounter : `0${secCounter}`;

        //same logic for the minutes
        if(secCounter > 59){
            //restart
            secCounter = 0;
            seconds.innerText = '00'
            //start minutes counting
            minCounter++;
            minutes.innerText = minCounter > 9 ? minCounter : `0${minCounter}`;
        }
    }
}

start.addEventListener('click',()=>{
    if(!isRunning){
        isRunning = true
        interval = setInterval(run,10)
    }
})
stopBtn.addEventListener('click', () => {
    isRunning = false
    clearInterval(interval)
})
reset.addEventListener('click', () => {
    isRunning = false
    clearInterval(interval);
    //reset every single counter and display it as 0
    counter = 0;
    secCounter = 0;
    minCounter = 0;
    milli.innerText = '00'
    seconds.innerText = '00'
    minutes.innerText = '00'
})

//Laps Functions
const laps = document.getElementById('laps') // my <ul>
const lapBtn = document.getElementById('lap')

lapBtn.addEventListener('click',() =>{
    let text = `${minutes.innerText}:${seconds.innerText}:${milli.innerText}`
    createLIS(text)

    let id = new Date().getTime().toString();
    addToLS(id, text)
})

// Clear BTN
const clearBtn = document.getElementById('clear')
clearBtn.addEventListener('click', () => {
    laps.innerHTML = null
    // Cleaning LS
    localStorage.clear();
})

// LocalStorage Part
//let items = []
function addToLS(id,text) {
    let obj = {id,text}
    let items = getLS()
    items.push(obj)
    localStorage.setItem('laps', JSON.stringify(items))
}

//getting the LS
function getLS() {
    return localStorage.getItem('laps') ?
            JSON.parse(localStorage.getItem('laps')) :
            []
}

function displayLIS() {
    getLS().forEach(obj => {
        let {text} = obj;// destructuring.
        createLIS(text)
    });
}

function createLIS(text) {
    let li = document.createElement('li');
    li.innerText = text;
    laps.append(li);
    laps.scrollTo(0, li.getBoundingClientRect().y * laps.childElementCount) //or laps.children.length
}