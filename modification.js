let data = ''
let IdToMod = localStorage.getItem("CardToMod")
const url = `http://localhost:3000/quizes/${IdToMod}`
let questionIndex = 0

async function fetchForModify() {
    const response = await fetch(url)
    if (!response.ok) {
        console.log(`Error!!!`);
    }
    data = await response.json();
    InfoFiller()
}
fetchForModify()

let quizTitle = document.querySelector("#title")
let quizCategory = document.querySelector("#category")
let quizTempMoy = document.querySelector("#tempMoy")
let quizDifficulty = document.querySelector("#difficulty")
let infoDone = document.querySelector("#infoDone")
let formatContainer = document.querySelector(".formatContainer")
let QformatContainer = document.querySelector(".QformatContainer")

function InfoFiller() {
    quizTitle.value = data.title
    quizCategory.value = data.category
    quizTempMoy.value = data.tempMoy
    quizDifficulty.value = data.difficulty
    BasicInfoMod()
}

function BasicInfoMod() {
    const inputs = [quizTitle, quizCategory, quizTempMoy, quizDifficulty];
    if (inputs.every(input => input.value !== '')) {
        infoDone.addEventListener("click", () => {
            data.title = quizTitle.value
            data.category = quizCategory.value
            data.tempMoy = quizTempMoy.value
            data.difficulty = quizDifficulty.value
            fetch(`${url}`, {
                method: "Put",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data),
            }).then(data => {
                formatContainer.style.display = 'none'
                QformatContainer.style.display = 'flex'
            })
            questionsFiller()
        });
    }
}

let questionType = document.querySelector("#quizType")
let questionTitle = document.querySelector("#questionTitle")

let qcm = document.querySelector(".qcm")
let a = document.querySelector("#a")
let b = document.querySelector("#b")
let c = document.querySelector("#c")
let d = document.querySelector("#d")
let qcmCorrect = document.querySelector("#correct")

let questionPts = document.querySelector("#questionPts")
let questionExplanation = document.querySelector("#questionExplanation")

let next = document.querySelector("#next")
let finish = document.querySelector("#finish")

let boolean = document.querySelector(".boolean")
let boolInput = document.querySelector("#bool")

let typingInput = document.querySelector("#Answer")
let AddAnswer = document.querySelector("#AddAnswer")
let Typing = document.querySelector(".typing")

finish.onclick = () => {
    location.href = "admin.html"
}

function selectOnChange() {
    if (questionType.value === "QCM") {
        questionTitle.style.display = 'block'
        qcm.style.display = 'flex'
        boolean.style.display = 'none'
        AddAnswer.style.display = "none"
        Typing.style.display = "none"
        next.style.display = 'block'
        finish.style.display = 'block'
        questionExplanation.style.display = 'block'
        questionPts.style.display = 'block'
    }
    if (questionType.value === "Boolean") {
        questionTitle.style.display = 'block'
        boolean.style.display = 'flex'
        qcm.style.display = 'none'
        Typing.style.display = "none"
        AddAnswer.style.display = "none"
        typingInput.style.display = 'none'
        next.style.display = 'block'
        finish.style.display = 'block'
        questionExplanation.style.display = 'block'
        questionPts.style.display = 'block'
    }
    if (questionType.value === "Typing") {
        questionTitle.style.display = 'block'
        Typing.style.display = "flex"
        boolean.style.display = 'none'
        next.style.display = 'block'
        qcm.style.display = 'none'
        typingInput.style.display = 'block'
        AddAnswer.style.display = "block"
        finish.style.display = 'block'
        questionExplanation.style.display = 'block'
        questionPts.style.display = 'block'
    }
}

function questionsFiller() {
    questionTitle.value = '';
    a.value = '';
    b.value = '';
    c.value = '';
    d.value = '';
    correct.value = '';
    questionExplanation.value = '';
    questionPts.value = '';
    boolInput.value = '';

    questionType.value = data.questions[questionIndex].quizType
    questionTitle.value = data.questions[questionIndex].question
    questionExplanation.value = data.questions[questionIndex].Explanation
    questionPts.value = data.questions[questionIndex].points
    selectOnChange()
    if (questionType.value === "QCM") {
        a.value = data.questions[questionIndex].a
        b.value = data.questions[questionIndex].b
        c.value = data.questions[questionIndex].c
        d.value = data.questions[questionIndex].d
        correct.value = data.questions[questionIndex].Correct
    }

    if (questionType.value === "Boolean") {
        boolInput.value = data.questions[questionIndex].Correct
    }
    console.log(data.questions[questionIndex].Correct);
    questionsMod()
}

function questionsMod() {
    const QCMinputs = [questionTitle, a, b, c, d, correct, questionExplanation, questionPts];
    const BOOLinputs = [questionTitle, boolInput, questionExplanation, questionPts];
    if (questionType.value === "QCM") {
        if (QCMinputs.every(input => input.value !== '')) {
            next.onclick = () => {
                data.questions[questionIndex].question = questionTitle.value;
                data.questions[questionIndex].a = a.value;
                data.questions[questionIndex].b = b.value;
                data.questions[questionIndex].c = c.value;
                data.questions[questionIndex].d = d.value;
                data.questions[questionIndex].Correct = correct.value;
                data.questions[questionIndex].Explanation = questionExplanation.value;
                data.questions[questionIndex].points = questionPts.value;
                fetching()
            }
        }
    }

    else if (questionType.value === "Boolean") {
        if (BOOLinputs.every(input => input.value !== '')) {
            if (boolInput.value.toLowerCase() !== "true" && boolInput.value.toLowerCase() !== "false") {
                boolInput.value = ''
                boolInput.placeholder = "Only True Or False!!"
                return
            }
            next.onclick = () => {
                data.questions[questionIndex].question = questionTitle.value;
                data.questions[questionIndex].Correct = boolInput.value;
                data.questions[questionIndex].Explanation = questionExplanation.value;
                data.questions[questionIndex].points = questionPts.value;
                fetching()
            }
        }
    }
}

function fetching() {
    fetch(`${url}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data),
    }).then(() => {
        questionIndex++
        questionsFiller()
    })
}