let data = ''
let i = 0
let cardAdd = document.querySelector(".quizContainer")
let quizIds = ''

async function fetchData() {
    const response = await fetch(`http://localhost:3000/quizes`);
    if (!response.ok) {
        console.log(`Error!!!`);
    }
    data = await response.json();

    data.forEach(e => {
        addCard(e)
        Status(e)
    })
    play()
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

    cardAdd.innerHTML += quizTemplate

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

function Status(e) {
    let myQuiz = ''
    let allQuizes = ''
    allQuizes = document.querySelectorAll(".quiz")
    myQuiz = allQuizes[allQuizes.length - 1]

    if (e.status === false) {
        myQuiz.style.background = 'var(--inactif)'
    } else {
        myQuiz.style.background = 'var(--actif)'
    }

    allQuizes.forEach((j, i) => {
        let id = localStorage.getItem("Card" + i)
        console.log(id);
        j.querySelector("img").onclick = () => {
            if (e.status === false) {
                console.log("it was false");
                e.status = true
                Status(e)
            } else {
                console.log("it was true");
                e.status = false
                Status(e)
            }
            fetch(`http://localhost:3000/quizes/722d`, {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    "status": true
                })
            })
        }
    })
}


function StatusUpdater() {
    console.log("event");


}

