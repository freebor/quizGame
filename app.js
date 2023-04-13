const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = infoBox.querySelector('.buttons .restart');
const quixBox = document.querySelector('.quizBox');
const timeCount = quixBox.querySelector('.timer .timerSec');
const timeLine = quixBox.querySelector('header .time_line');
const timeOff = quixBox.querySelector('header .timerText');

const optionList = document.querySelector('.optionList');

// If Start Qiuz Button Clicked
startBtn.addEventListener('click', ()=>{
    infoBox.classList.add('activeInfo');//show the info button
})

// If Exit Button Clicked
exitBtn.addEventListener('click', ()=>{
    infoBox.classList.remove('activeInfo');//hides the info box
})

// If Continue Button Clicked
continueBtn.addEventListener('click', ()=>{
    infoBox.classList.remove('activeInfo');//hides the info box
    quixBox.classList.add('activeQuiz');//shows the quiz box 
    showQuestion(0);
    queCouter(1);
    startTimer(15);
    startTimerLine(0);
})

// this helps you to move from one question to the next one 
let queCount = 0; 
let queNumb = 1; 
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quixBox.querySelector('.nextBtn');
const resultBox = document.querySelector('.resultBox');
const restartQuiz = resultBox.querySelector('.buttons .restart');
const quitQuiz = resultBox.querySelector('.buttons .quit');

restartQuiz.addEventListener('click', () =>{
    quixBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    let queCount = 0; 
    let queNumb = 1; 
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestion(queCount);
    queCouter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";

});

quitQuiz.addEventListener('click', () =>{
    window.location.reload();
});

nextBtn.addEventListener('click', ()=>{
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestion(queCount);
        queCouter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeOff.textContent = "Time Left";

    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("complete");
        showResultBox();
    }
});

// getting questions and option from the array 
const showQuestion = (index)=>{
    const queText = document.querySelector('.queText');
    let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", 'optionSelected(this)');
    }
}

// Check and Cross icons 
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i "fas fa-times"></i></div>';


const optionSelected = (answer)=>{
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
        console.log("correct answer");
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add('incorrect');
        console.log("incorrect answer");
        answer.insertAdjacentHTML("beforeend", crossIcon);

// if user answer is incorrect then automatically select the correct answer 
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // Once user selects disable all options 
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");        
    }
    nextBtn.style.display = "block";
}

const showResultBox = () =>{
    infoBox.classList.remove('activeInfo');//hides the info box
    quixBox.classList.remove('activeQuiz');//hides the quiz box 
    resultBox.classList.add('activeResult');//shows the result box 
    const scoreText = resultBox.querySelector(".scoreText");
    if (userScore > 3) {
            let scoreTag = "<span>and congrats!, you got <p>"+ userScore +"</p> out of <p>"+ questions.length +"</p></span>";
            scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
            let scoreTag = "<span>and nice, you got <p>"+ userScore +"</p> out of <p>"+ questions.length +"</p></span>";
            scoreText.innerHTML = scoreTag;
    }else{
            let scoreTag = "<span>and sorry, you got only <p>"+ userScore +"</p> out of <p>"+ questions.length +"</p></span>";
            scoreText.innerHTML = scoreTag;
    }
};


// top timer function 
const startTimer = (time)=>{
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;
        

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute("class", "option correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled");        
            }
            nextBtn.style.display = "block";
        }
    };
}

// progress bar timer function 
const startTimerLine = (time)=>{
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    };
}



// page counter 
const queCouter = (index)=>{
    const bottomQuesCounter = quixBox.querySelector('.totalQue');
    let totalQuesCountTag = '<span><p>'+ index +'</p>Of<p>'+ questions.length +'</p> Question</span>';
    bottomQuesCounter.innerHTML = totalQuesCountTag ;
}