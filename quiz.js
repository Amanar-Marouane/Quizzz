let i = 0
let currQuiz = ''
if (localStorage.getItem("quizToPlay") === null) {
    location.href = `admin.html`
} else {
    currQuiz = localStorage.getItem("quizToPlay")
}
const url = `http://localhost:3000/quizes/${currQuiz}/`
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

let correctAnswers = 0;

async function fetchData() {
    response = await fetch(url)
    data = await response.json()
    console.log(data);
    
    global()
}
fetchData()

function global() {
    if (result.style.display === 'flex') {
        resultScreen()
        return
    }
    questionScreen()
    answerEff()
}

function questionScreen() {
    if (i <= data.questions.length - 1) {
        let text = document.querySelector(".text");
        let question = data.questions[i].question
        text.querySelector("h1").textContent = question

        type = data.questions[i].quizType
        if (type === "Boolean") {
            YesOrNo.style.display = 'flex'
            Typing.style.display = 'none'
            FChoice.style.display = 'none'
            boolean.style.display = 'block'
            typing.style.display = 'none'
            qcm.style.display = 'none'
            yes.textContent = data.questions[i].a
            no.textContent = data.questions[i].b
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
        if (type === 'QCM') {
            Typing.style.display = 'none'
            YesOrNo.style.display = 'none'
            FChoice.style.display = 'flex'
            qcm.style.display = 'block'
            typing.style.display = 'none'
            boolean.style.display = 'none'
            first.textContent = data.questions[i].a
            second.textContent = data.questions[i].b
            third.textContent = data.questions[i].c
            forth.textContent = data.questions[i].d
            Array.from(Choice).forEach((e) => {
                e.style.background = '#CBDCEB'
            })
        }

        let explanation = document.querySelector(".explanation").querySelector("h2")
        explanation.innerText = data.questions[i].Explanation

        let points = document.getElementById("points")
        points.innerText = data.questions[i].points

        currQuestion.innerText = i + 1
        totalQuestions.innerText = data.questions.length

        let process = data.questions.length
        let bar = document.getElementById("progress")
        let currProcess = (i + 1) / process * 100
        bar.style.width = `${currProcess}%`
        bar.style.transition = 'all .5s'
    } else {
        return
    }
}
let timerFromStart = 0
function Timer2() {
    timerFromStart++
}
setInterval(Timer2, 1000)

function Timer() {
    if (i < data.questions.length) {
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
                if (i === data.questions.length) {
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
    if (type === "QCM") {
        Array.from(Choice).forEach((e) => {
            e.addEventListener("click", handleChoiceOnClick)
        })
        function handleChoiceOnClick(e) {
            let selectedText = e.target.innerText;
            if (selectedText.includes(data.questions[i].Correct)) {
                currScore.innerText = Number(currScore.innerText) + Number(points.innerText)
                correctAnswers++;
            } else {
                setTimeout(() => {
                    explanation.style.display = 'flex'
                }, 500)
                setTimeout(() => {
                    explanation.style.display = 'none'
                }, 2000);
            }
            Array.from(Choice).forEach((r) => {
                let textToCom = r.textContent
                if (!textToCom.includes(data.questions[i].Correct)) {
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
                if (i === data.questions.length) {
                    result.style.display = 'flex'
                }
                global()
            }, 2000);
        }
    }

    if (type === "Boolean") {
        Array.from(choices).forEach((e) => {
            e.addEventListener("click", handleChoiceOnClick)
        })
        function handleChoiceOnClick(e) {
            let selectedText = e.target.innerText.toLowerCase();
            if (selectedText.includes(data.questions[i].Correct.toLowerCase())) {
                currScore.innerText = Number(currScore.innerText) + Number(points.innerText)
                correctAnswers++;
            } else {
                setTimeout(() => {
                    explanation.style.display = 'flex'
                }, 500)
                setTimeout(() => {
                    explanation.style.display = 'none'
                }, 2000);
            }
            Array.from(choices).forEach((r) => {
                let textToCom = r.textContent.toLocaleLowerCase()
                if (!textToCom.includes(data.questions[i].Correct.toLocaleLowerCase())) {
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
                if (i === data.questions.length) {
                    result.style.display = 'flex'
                }
                global()
            }, 2000);
        }
    }
}

let flag = true;
function handleTypingClick() {
    value = answerInput.value.toLowerCase();
    Array.from(data.questions[i].Correct).forEach(e => {
        if (value === e.toLowerCase()) {
            flag = false
            answerSender.style.pointerEvents = "none";
            currScore.innerText = Number(currScore.innerText) + Number(points.innerText);
            answerInput.style.background = 'green';
            correctAnswers++;
            setTimeout(() => {
                clearInterval(Timer);
                timer.innerText = 30;
                i++;
                if (i === data.questions.length) {
                    result.style.display = 'flex'
                }
                global();
            }, 1000);
        }
    })
    if (flag === true) {
        answerInput.style.background = 'red';
    }
    answerInput.style.transition = 'background .5s';
}

if (localStorage.getItem("Hquiz" + currQuiz + "Score") === null) {
    localStorage.setItem("Hquiz" + currQuiz + "Score", 0)
}

function tryAgain() {
    location.reload(true);
}

let title = document.querySelector("#quizName")
let finalScore = document.querySelector("#finalScore")
let totalTime = document.querySelector("#totalTime")
let total = 0;
let motivation = document.querySelector("#motivation")
let C_T = document.querySelector("#C_T")
let p_ = document.querySelector("#p_")
let ScreenBlur = document.querySelector('.quizInterface')
let blurAgain = document.querySelector(".getBack")
let totalAttempts = 0
if (localStorage.getItem("totalAttemptsOf" + currQuiz) !== null) {
    totalAttempts = localStorage.getItem("totalAttemptsOf" + currQuiz)
} else {
    localStorage.setItem("totalAttemptsOf" + currQuiz, totalAttempts)
}

let TotalTime = 0
if (localStorage.getItem("TotalTimeOf"+currQuiz) !== null) {
    TotalTime = Number(localStorage.getItem("TotalTimeOf"+currQuiz))
} else {
    localStorage.setItem("TotalTimeOf"+currQuiz, TotalTime)
}

let SuccesNumber = 0;

function resultScreen() {
    totalAttempts++
    localStorage.setItem("totalAttemptsOf" + currQuiz, totalAttempts)
    clearInterval(Timer2)
    ScreenBlur.style.filter = 'blur(10px)'
    blurAgain.style.filter = 'blur(10px)'

    title.innerHTML = data.title
    totalTime.innerHTML = `Time spent: ${timerFromStart}sec`
    TotalTime += timerFromStart
    localStorage.setItem("TotalTimeOf"+currQuiz, TotalTime)

    C_T.innerHTML = `${correctAnswers}/${data.questions.length} Correct Answers!!`
    p_.innerHTML = `Succes rate: ${(correctAnswers / data.questions.length * 100).toFixed(2)}%`
    if (correctAnswers / data.questions.length * 100 >= 50) {
        SuccesNumber++
    }
    if (localStorage.getItem("SuccesNumber"+currQuiz) !== null) {
        SuccesNumber+= Number(localStorage.getItem("SuccesNumber"+currQuiz)) 
        localStorage.setItem("SuccesNumber"+currQuiz, SuccesNumber)
    }else {
        localStorage.setItem("SuccesNumber"+currQuiz, SuccesNumber)
    }

    if (Number(localStorage.getItem("Hquiz" + currQuiz + "Score")) < Number(currScore.innerText)) {
        localStorage.setItem("Hquiz" + currQuiz + "Score", currScore.innerText);
        finalScore.innerHTML = `New Score!! ${currScore.innerText} points`
    } else {
        finalScore.innerHTML = `Score: ${currScore.innerText} points`
    }
    if (Number(localStorage.getItem("Hquiz" + currQuiz + "Score")) > Number(currScore.innerText)) {
        localStorage.setItem("Mquiz" + currQuiz + "Score", currScore.innerText)
    }
    if (localStorage.getItem("TScoreOf" + currQuiz) !== null) {
        let Tscore = Number(currScore.innerText) + Number(localStorage.getItem("TScoreOf" + currQuiz))
        localStorage.setItem("TScoreOf" + currQuiz, Tscore)
    } if (localStorage.getItem("TScoreOf" + currQuiz) === null) {
        localStorage.setItem("TScoreOf" + currQuiz, currScore.innerText)
    }

    Array.from(data.questions).forEach((e) => {
        total += Number(e.points)
    })
    if (Number(currScore.innerText) < total) {
        motivation.innerHTML = 'Good! But You Can Do Better!!'
    } if (Number(currScore.innerText) <= total / 3) {
        motivation.innerHTML = 'Not Bad! Shall We Try Again??'
    } if (Number(currScore.innerText) === total) {
        motivation.innerHTML = 'Excellent!!!!!'
    }
}

