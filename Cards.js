let data = ''
let i = 0
let cardAdd = document.querySelector(".quizContainer")

async function fetchData() {
    const response = await fetch(`http://localhost:3000/quizes`);
    if (!response.ok) {
        console.log(`Error!!!`);
    }
    data = await response.json();

    data.forEach(e => {
        addCard(e)
        Status0(e)
    })
    play()
    statusChanger()
}
fetchData()

let index = 0
function addCard(e) {
    const quizTemplate = `<div class="quiz">
                        <div class="info">
                            <img src="media/quiz-svgrepo-com.svg" alt="">
                            <h3>${e.title}</h3>
                            <h3>Category: <span>${e.category}</span></h3>
                            <h3>Number of qustions: <span>${e.questionsNum}</span></h3>
                            <h3>Estimated Time: <span>${e.tempMoy}</span></h3>
                            <h3>Difficulty: <span>${e.difficulty}</span></h3>
                        </div>
                        <div class="start">
                            <button>Enter</button>
                        </div>
                    </div>`
    if (location.pathname === "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html" && e.status === true) {
        cardAdd.innerHTML += quizTemplate
    } if (location.pathname !== "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html") {
        cardAdd.innerHTML += quizTemplate
    }

    localStorage.setItem("Card" + index, e.id)
    index++
}

function play() {
    let quizToPlay = document.querySelectorAll(".start")

    Array.from(quizToPlay).forEach((e, index) => {
        e.addEventListener("click", () => {
            localStorage.setItem("quizToPlay", index)
            location.href = `quizInterface.html`
        })
    });
}

let myQuiz = ''
let allQuizes = ''
function Status0(e) {
    if (location.pathname !== "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html") {
        allQuizes = document.querySelectorAll(".quiz")
        myQuiz = allQuizes[allQuizes.length - 1]
        if (e.status === false) {
            myQuiz.style.background = 'var(--inactif)'
        } else {
            myQuiz.style.background = 'var(--actif)'
        }
    }
}

function Status1(e, x) {
    if (location.pathname !== "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html") {
        if (e.status === false) {
            x.style.background = 'var(--inactif)'
        } else {
            x.style.background = 'var(--actif)'
        }
    }
}

function statusChanger() {
    if (location.pathname !== "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html") {
        allQuizes = document.querySelectorAll(".quiz")
        console.log(allQuizes);

        allQuizes.forEach((j, i) => {
            let id = localStorage.getItem("Card" + i)
            j.querySelector("img").onclick = () => {
                if (data[i].status === false) {
                    data[i].status = true
                    console.log(data[i].id, data[i].status);
                    Status1(data[i], j)
                } else {
                    data[i].status = false
                    console.log(data[i].id, data[i].status);
                    Status1(data[i], j)
                }
                fetch(`http://localhost:3000/quizes/${data[i].id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        "status": data[i].status
                    })
                })
            }
        })
    }
}

let addQuiz = document.querySelector(".addQuiz")
if (location.pathname !== "/C:/Users/lenovo/Desktop/My-Git-Projects/Quizzz/home.html") {
    addQuiz.onclick = () => {
        location.href = "Add.html"
    }
}