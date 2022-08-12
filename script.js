let container = document.getElementById("container");
let score = document.getElementById("score");
let input = document.getElementById("input");
let btn = document.getElementById("getWordBtn");
let language = document.getElementById("language")
let word = document.getElementById("word")

let time = 10;

function countdown() {
    let timer = document.getElementById("timer");
    time--
    timer.innerText = time;
    if (time == 0) {
        clearInterval(looper)
        alert("your score: " + points)
        let restartBtn = document.createElement("button")
        restartBtn.setAttribute("id", "restartBtn")
        restartBtn.addEventListener("click", restartGame)
        restartBtn.textContent = "Restart"
        container.appendChild(restartBtn)
    }
}

let looper = setInterval(countdown, 1000)

language.onchange = getWord;

score.textContent = 0
let points = 0;

function correct() {
    if (word.textContent == input.value) {
        points++;
        score.textContent = points
    }
}

function restartGame() {
    clear();
    restartTimer();
    getWord();
    document.getElementById("restartBtn").remove()
    looper = setInterval(countdown, 1000)
}

function clear() {
    points = 0;
    score.textContent = points;
    input.value = ""
    input.focus()
}

function restartTimer() {
    time = 10;
    timer.textContent = time;
}

function getWord() {
    fetch(`https://random-word-api.herokuapp.com/word?number=200&lang=${language.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        word.textContent = data[0]
        let counter = 1;
        btn.addEventListener("click", e => {
            e.preventDefault()
            correct();
            word.textContent = data[counter];
            counter++
            input.value = ""
        })
    })
    clear()
}

getWord()

