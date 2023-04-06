const start = document.getElementById('start')
const time = document.querySelector('.time')
// We are going to use destructuring to declare a variable
// This line it's gonna power up our code.
let [milli, seconds, minutes] = [0,0,0]; //like they were our counters.

let interval;
let isRunning = false;

    // Load LS
    window.addEventListener('DOMContentLoaded',displayLIS)

start.addEventListener('click',()=>{
    if(!isRunning){
        isRunning = true
        interval = setInterval(run,10)
    }
})

function run() {
    milli++;
    if(milli > 99){
        milli = 0;
        seconds++
        if(seconds > 59){
            seconds = 0;
            minutes++;
        }
    }

    let ms = milli > 9 ? milli : `0${milli}`;
    let s = seconds > 9 ? seconds : `0${seconds}`;
    let m = minutes > 9 ? minutes : `0${minutes}`;
    time.innerText = `${m}:${s}:${ms}`;
}
// Then after this everything will be the same as the previos code.
const stopBtn = document.getElementById('stop')
const reset = document.getElementById('reset')

stopBtn.addEventListener('click', () => {
    isRunning = false
    clearInterval(interval)
})

reset.addEventListener('click', () => {
    isRunning = false
    clearInterval(interval);
    [milli, seconds, minutes] = [0,0,0];
    time.innerText = '00:00:00';
})
 // then the laps section
 const laps = document.getElementById('laps')
const lapBtn = document.getElementById('lap')
const clearBtn = document.getElementById('clear')

//we star by adding our laps to our <ul>
lapBtn.addEventListener('click', () => {
    let text = time.innerText
    let id = new Date().getTime().toString()
    addToLS(id,text)
    //DOM
    createLIS(text)
})

clearBtn.addEventListener('click',() => {
    laps.innerHTML = null;
    // Clear LS
    localStorage.clear()
})

    //Local Storage
    function addToLS(id,text) {
        let obj = {id,text}
        let items = getLS()
        items.push(obj)
        localStorage.setItem('laps', JSON.stringify(items))
    }

    function getLS(){
        return localStorage.getItem('laps') ?
                JSON.parse(localStorage.getItem('laps')) :
                []
    }

    function displayLIS() {
        getLS().forEach(item => {
            createLIS(item.text)
        });
    }

function createLIS(text) {
    let li = document.createElement('li')
    li.innerText = text;
    laps.append(li)
    laps.scrollTo(0,li.getBoundingClientRect().y * laps.childElementCount)
}