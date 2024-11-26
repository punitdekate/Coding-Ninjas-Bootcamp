//Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
const sentences =
    `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`;
const finalTime = 3;
let initialTime = 3;
const startBtn = document.getElementById('start-btn');
const sentence = document.getElementById('sentence');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const input = document.getElementById('input');
const retryTest = document.getElementById('retry-btn');

renderType();

function renderType() {
    startBtn.addEventListener('click', () => {
        input.disabled = false;
        sentence.textContent = sentences;
        startBtn.disabled = true;
        updateTimer();
    })
}


//date instance 


function updateTimer() {
    timerOut = setInterval(() => {
        let currentTime = new Date();
        console.log(date)
        timer.textContent = `00:${prependZero(initialTime)}${initialTime}`;
        initialTime--;
        if (initialTime < 0) {
            clearInterval(updateTimer);
            endTyping();
            input.value = '';
        }
    }, 1000)
}

function endTyping() {
    clearInterval(timerOut);
    result.style.display = 'block';
    const speed = document.getElementById('speed');
    const accuracy = document.getElementById('accuracy');
    speed.textContent = `${calculateSpeed()}`;
    accuracy.textContent = `${calculateAccuracy()}`;
    input.textContent = '';
    input.disabled = true;

}

function prependZero(initialTime) {
    if (initialTime <= 9) {
        return 0;
    }
    return '';
}

function calculateSpeed() {
    let count = 0;
    let correctWords = input.value;
    if (correctWords !== '') {
        correctWords = input.value.split(' ');
        const words = sentences.split(' ');
        correctWords.forEach(word => {
            if (words.includes(word)) {
                count++;
            }
        });
    }
    // console.log(count, correctWords);
    return count * 60;
}

function calculateAccuracy() {
    let count = 0;
    const correctWords = input.value.split('');
    const words = sentences.split('');
    correctWords.forEach(word => {
        if (words.includes(word)) {
            count++;
        }
    });
    return ((count / words.length) * 100).toFixed(2);
}

retryTest.addEventListener('click', () => {
    result.style.display = 'none';
    startBtn.disabled = false;
    timer.textContent = '';
    retryTest.textContent = '';
    initialTime = finalTime;
})