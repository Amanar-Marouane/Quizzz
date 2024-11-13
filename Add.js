let questionType = document.querySelector("#quizType")
let titleInput = document.querySelector("#questionTitle")
let qcm = document.querySelector(".qcm")
let next = document.querySelector("#next")
let boolean = document.querySelector(".boolean")
let boolInput = document.querySelector("#bool")
let Typing = document.querySelector(".typing")
let typingInput = document.querySelector("#Answer")
let AddAnswer = document.querySelector("#AddAnswer")
let finish = document.querySelector("#finish")
let infoDone = document.querySelector("#infoDone")
let questionExplanation = document.querySelector("#questionExplanation")
let questionPts = document.querySelector("#questionPts")
let correctQcm = document.querySelector("#correct")

next.addEventListener("click", (e) => {
    e.preventDefault()
})

AddAnswer.addEventListener("click", (e) => {
    e.preventDefault()
})

function selectOnChange() {
    if (questionType.value === "") {
        titleInput.style.display = 'none'
        qcm.style.display = 'none'
        boolean.style.display = 'none'
        next.style.display = 'none'
        AddAnswer.style.display = 'none'
        Typing.style.display = 'none'
        questionExplanation.style.display = 'none'
        questionPts.style.display = 'none'
        if (questionCounter >= 2) {
            finish.style.display = 'block'
        } if (questionCounter === 4) {
            questionType.style.display = 'none'
            return;
        }
    }
    if (questionType.value === "QCM") {
        titleInput.style.display = 'block'
        qcm.style.display = 'flex'
        boolean.style.display = 'none'
        AddAnswer.style.display = "none"
        Typing.style.display = "none"
        next.style.display = 'block'
        questionExplanation.style.display = 'block'
        questionPts.style.display = 'block'
        finish.style.display = 'none'
    }
    if (questionType.value === "Boolean") {
        titleInput.style.display = 'block'
        boolean.style.display = 'flex'
        Typing.style.display = "none"
        AddAnswer.style.display = "none"
        typingInput.style.display = 'none'
        qcm.style.display = 'none'
        next.style.display = 'block'
        questionExplanation.style.display = 'block'
        finish.style.display = 'none'
        questionPts.style.display = 'block'
    }
    if (questionType.value === "Typing") {
        titleInput.style.display = 'block'
        Typing.style.display = "flex"
        boolean.style.display = 'none'
        next.style.display = 'block'
        qcm.style.display = 'none'
        typingInput.style.display = 'block'
        AddAnswer.style.display = "block"
        questionExplanation.style.display = 'block'
        finish.style.display = 'none'
        questionPts.style.display = 'block'
    }
}

let questionsNum = 0

let quiz = []
let formatContainer = document.querySelector(".formatContainer")
let QformatContainer = document.querySelector(".QformatContainer")
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')

infoDone.onclick = () => {
    let quizTitleInput = document.querySelector("#title").value
    let categoryInput = document.querySelector("#category").value
    let tempMoyInput = document.querySelector("#tempMoy").value
    let difficultySelect = document.querySelector("#difficulty").value
    if (quizTitleInput !== '' && categoryInput !== '' && tempMoyInput !== '') {
        let quizInfo = {
            "title": `${quizTitleInput}`,
            "category": `${categoryInput}`,
            "questionsNum": questionsNum,
            "tempMoy": `${tempMoyInput}`,
            "difficulty": `${difficultySelect}`,
            "questions": [],
            "status": false
        }
        quiz.push(quizInfo);
        formatContainer.style.display = 'none'
        QformatContainer.style.display = 'flex'
    }
}

let questionCounter = 0;
let answers = []
let questions = []
function questionVal() {
    if (questionType.value === "Boolean") {
        if (boolInput.value.toLowerCase() !== "true" && boolInput.value.toLowerCase() !== "false") {
            boolInput.value = ''
            boolInput.placeholder = "Only True Or False!!"
            return
        }
        if (titleInput.value !== '' && questionExplanation.value !== '' && questionPts.value !== "") {
            let questionArrayBool = {
                "quizType": `${questionType.value}`,
                "question": `${titleInput.value}`,
                "a": `True`,
                "b": `False`,
                "Correct": `${boolInput.value}`,
                "Explanation": `${questionExplanation.value}`,
                "points": `${questionPts.value}`
            }
            questions.push(questionArrayBool)
            inputCleaner()
            questionCounter++
            selectOnChange()
        }
    }
    if (questionType.value === "QCM") {
        if (titleInput.value !== '' && correctQcm.value !== '' && a.value !== '' && b.value !== '' && c.value !== '' && d.value !== '' && questionExplanation.value !== '' && questionPts.value !== "") {
            if (correctQcm.value === a.value || correctQcm.value === b.value || correctQcm.value === c.value || correctQcm.value === d.value) {
                let questionArrayQcm = {
                    "quizType": `${questionType.value}`,
                    "question": `${titleInput.value}`,
                    "a": `${a.value}`,
                    "b": `${b.value}`,
                    "c": `${c.value}`,
                    "d": `${d.value}`,
                    "Correct": `${correctQcm.value}`,
                    "Explanation": `${questionExplanation.value}`,
                    "points": `${questionPts.value}`
                }
                questions.push(questionArrayQcm)
                inputCleaner()
                questionCounter++
                selectOnChange()
            } else {
                correctQcm.value = ''
                correctQcm.placeholder = 'The Correct Answer Should Include a Or b Or c Or d'
                return
            }
        }
    }
    if (questionType.value === "Typing") {
        if (titleInput.value !== '' && typingInput.value !== '' && questionExplanation.value !== '' && questionPts.value !== '') {
            let questionArrayType = {
                "quizType": `${questionType.value}`,
                "question": `${titleInput.value}`,
                "Explanation": `${questionExplanation.value}`,
                "Correct": [],
                "points": `${questionPts.value}`
            }
            answers.push(typingInput.value)
            questions.push(questionArrayType)
            answers.forEach(e => {
                questions[questions.length - 1].Correct.push(e)
            })
            inputCleaner()
            questionCounter++
            selectOnChange()
        }
    }
}

function addAnswer() {
    answers.push(typingInput.value)
    typingInput.value = ''
    typingInput.placeholder = 'Type Your Addational Answer'
}

function inputCleaner() {
    questionType.value = ''
    titleInput.value = ''
    typingInput.value = ''
    questionExplanation.value = ''
    questionPts.value = ''
    a.value = ''
    b.value = ''
    c.value = ''
    d.value = ''
    correctQcm.value = ''
    boolInput.value = ''
}

function finishQuiz() {
    quiz[0].questionsNum = questionCounter;
    questions.forEach(e => {
        quiz[0].questions.push(e)
    })
    fetch("http://localhost:3000/quizes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
    })
    formatContainer.style.display = 'none'
    QformatContainer.style.display = 'none'
}
