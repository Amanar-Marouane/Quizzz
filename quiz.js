let i = 0
let currQuiz = ''
if (localStorage.getItem("quizToPlay") === null) {
    currQuiz = 0
} else {
    currQuiz = localStorage.getItem("quizToPlay")
}
const url = `./quiz/quiz${currQuiz}.json`
let response = ''
let data = ""

let type = ''

let Typing = document.querySelector(".typing")
let YesOrNo = document.querySelector(".YesOrNo")
let FChoice = document.querySelector(".FChoices")

let boolean = document.getElementById("boolean")
let qcm = document.getElementById("qcm")
let typing = document.getElementById("typing")

let yes = document.querySelector(".yes").querySelector("h1")
let no = document.querySelector(".no").querySelector("h1")

let first = document.querySelector(".first").querySelector("h1")
let second = document.querySelector(".second").querySelector("h1")
let third = document.querySelector(".third").querySelector("h1")
let forth = document.querySelector(".forth").querySelector("h1")

let currQuestion = document.getElementById("currQuestion")
let totalQuestions = document.getElementById("totalQuestions")

let currScore = document.querySelector("#score")
let Choice = document.getElementsByClassName("choice")
let explanation = document.getElementById("explanationArea")
let choices = document.getElementsByClassName("bool")

let answerInput = document.querySelector("#input")
let answerSender = document.querySelector("#sender")
let value = ''

let timer = document.querySelector(".timer").querySelector("h1")

let explanationDelay = 5000

let result = document.querySelector(".result")

async function fetchData() {
    response = await fetch(`./quiz/quiz${currQuiz}.json`)
    data = await response.json()
    console.log("fetching")
    global()
}
fetchData()

function global() {
    console.log("enter global fun")
    if (result.style.display === 'flex') {
        resultScreen()
        return
    }
    questionScreen()
    answerEff()
}

function questionScreen() {
    console.log("enter question screen fun")
    if (i <= data.length) {
        let text = document.querySelector(".text");
        let question = data[i].question
        text.querySelector("h1").textContent = question

        type = data[i].quizType
        if (type === "YesOrNo") {
            YesOrNo.style.display = 'flex'
            Typing.style.display = 'none'
            FChoice.style.display = 'none'
            boolean.style.display = 'block'
            typing.style.display = 'none'
            qcm.style.display = 'none'
            yes.textContent = data[i].a
            no.textContent = data[i].b
            Array.from(choices).forEach((e) => {
                e.style.background = '#CBDCEB'
            })

        }
        if (type === "Typing") {
            Typing.style.display = 'flex'
            YesOrNo.style.display = 'none'
            FChoice.style.display = 'none'
            typing.style.display = 'block'
            boolean.style.display = 'none'
            qcm.style.display = 'none'
            answerInput.value = ''
            answerInput.style.background = 'white'
            answerSender.style.pointerEvents = "auto";

        }
        if (type === 'qcm') {
            Typing.style.display = 'none'
            YesOrNo.style.display = 'none'
            FChoice.style.display = 'flex'
            qcm.style.display = 'block'
            typing.style.display = 'none'
            boolean.style.display = 'none'
            first.textContent = data[i].a
            second.textContent = data[i].b
            third.textContent = data[i].c
            forth.textContent = data[i].d
            Array.from(Choice).forEach((e) => {
                e.style.background = '#CBDCEB'
            })
        }

        let explanation = document.querySelector(".explanation").querySelector("h2")
        explanation.innerText = data[i].Explanation

        let points = document.getElementById("points")
        points.innerText = data[i].points

        currQuestion.innerText = i + 1
        totalQuestions.innerText = data.length - 1

        let process = data.length - 1
        let bar = document.getElementById("progress")
        let currProcess = (i + 1) / process * 100
        bar.style.width = `${currProcess}%`
        bar.style.transition = 'all .5s'
    } else {
        return
    }
}

function Timer() {
    if (i < data.length) {
        timer.innerText = Number(timer.innerText) - 1
        if (timer.innerText === "0") {
            clearInterval(Timer)
            setTimeout(() => {
                explanation.style.display = 'flex'
            }, 500)
            setTimeout(() => {
                explanation.style.display = 'none'
                i++
                timer.innerText = 30
                clearInterval(Timer)
                console.log("calling by timer");
                if (i === data.length - 1) {
                    result.style.display = 'flex'
                }
                global()
            }, 5000)
        }
    } else {
        timer.innerText = 0
    }
}
setInterval(Timer, 1000)

function answerEff() {
    if (type === "qcm") {
        Array.from(Choice).forEach((e) => {
            e.addEventListener("click", handleChoiceOnClick)
        })
        function handleChoiceOnClick(e) {
            let selectedText = e.target.innerText;
            if (selectedText.includes(data[i].Correct)) {
                currScore.innerText = Number(currScore.innerText) + Number(points.innerText)
            } else {
                setTimeout(() => {
                    explanation.style.display = 'flex'
                }, 500)
                setTimeout(() => {
                    explanation.style.display = 'none'
                }, explanationDelay);
            }
            Array.from(Choice).forEach((r) => {
                let textToCom = r.textContent
                if (!textToCom.includes(data[i].Correct)) {
                    r.style.background = 'red'
                } else {
                    r.style.background = 'green'
                }
                r.style.transition = 'background .5s'
                r.removeEventListener("click", handleChoiceOnClick)
            })
            setTimeout(() => {
                i++
                clearInterval(Timer)
                timer.innerText = 30
                if (i === data.length - 1) {
                    result.style.display = 'flex'
                }
                global()
            }, explanationDelay);
        }
    }

    if (type === "YesOrNo") {
        Array.from(choices).forEach((e) => {
            e.addEventListener("click", handleChoiceOnClick)
        })
        function handleChoiceOnClick(e) {
            let selectedText = e.target.innerText;
            if (selectedText.includes(data[i].Correct)) {
                currScore.innerText = Number(currScore.innerText) + Number(points.innerText)
            } else {
                setTimeout(() => {
                    explanation.style.display = 'flex'
                }, 500)
                setTimeout(() => {
                    explanation.style.display = 'none'
                }, explanationDelay);
            }
            Array.from(choices).forEach((r) => {
                let textToCom = r.textContent
                if (!textToCom.includes(data[i].Correct)) {
                    r.style.background = 'red'
                } else {
                    r.style.background = 'green'
                }
                r.style.transition = 'background .5s'
                localStorage.setItem("quiz" + currQuiz + "Score", currScore.innerText)
                r.removeEventListener("click", handleChoiceOnClick)
            })
            setTimeout(() => {
                i++
                clearInterval(Timer)
                timer.innerText = 30
                if (i === data.length - 1) {
                    result.style.display = 'flex'
                }
                global()
            }, explanationDelay);
        }
    }
}

let flag = true;
function handleTypingClick() {
    value = answerInput.value.toLowerCase();
    console.log("Curr input ==> " + value);
    if (Array.isArray(data[i].Correct)) {
        Array.from(data[i].Correct).forEach(e => {
            if (value === e.toLowerCase()) {
                flag = false
                answerSender.style.pointerEvents = "none";
                currScore.innerText = Number(currScore.innerText) + Number(points.innerText);
                answerInput.style.background = 'green';
                console.log("correct validation");
                setTimeout(() => {
                    clearInterval(Timer);
                    timer.innerText = 30;
                    i++;
                    console.log("calling global() by correct validation");
                    if (i === data.length - 1) {
                        result.style.display = 'flex'
                    }
                    global();
                }, 1000);
            }
        })
        if (flag === true) {
            answerInput.style.background = 'red';
            console.log("incorrect validation");
        }
    } else {
        if (value === data[i].Correct.toLowerCase()) {
            answerSender.style.pointerEvents = "none";
            currScore.innerText = Number(currScore.innerText) + Number(points.innerText);
            answerInput.style.background = 'green';
            console.log("correct validation");
            setTimeout(() => {
                clearInterval(Timer);
                timer.innerText = 30;
                i++;
                console.log("calling global() by correct validation");
                if (i === data.length - 1) {
                    result.style.display = 'flex'
                }
                global();
            }, 1000);
        } else {
            answerInput.style.background = 'red';
            console.log("incorrect validation");
        }
    }
    answerInput.style.transition = 'background .5s';
}

if (localStorage.getItem("quiz" + currQuiz + "Score") === null) {
    localStorage.setItem("quiz" + currQuiz + "Score", 0)
}

function tryAgain() {
    location.reload(true);
}

let title = document.querySelector("#quizName")
let finalScore = document.querySelector("#finalScore")
let total = 0;
let motivation = document.querySelector("#motivation")
let ScreenBlur = document.querySelector('.quizInterface')
let blurAgain = document.querySelector(".getBack")
function resultScreen() {
    ScreenBlur.style.filter = 'blur(10px)'
    blurAgain.style.filter = 'blur(10px)'
    title.innerHTML = data[data.length - 1].title
    if (Number(localStorage.getItem("quiz" + currQuiz + "Score")) < Number(currScore.innerText)) {
        localStorage.setItem("quiz" + currQuiz + "Score", currScore.innerText);
        finalScore.innerHTML = `New Score!! ${currScore.innerText}`
    } else {
        finalScore.innerHTML = `Score: ${currScore.innerText}`
    }
    Array.from(data).forEach((e, i) => {
        if (data[i] === data[data.length - 1]) {
            return
        }
        total += data[i].points
    })
    if (Number(currScore.innerText) <= total / 3) {
        motivation.innerHTML = 'Not Bad! Shall We Try Again??'
    } if (Number(currScore.innerText) < total) {
        motivation.innerHTML = 'Good! But You Can Do Better!!'
    } else {
        motivation.innerHTML = 'Excellent!!!!!'
    }
}

