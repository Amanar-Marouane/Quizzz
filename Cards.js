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
        // console.log(e.id)
        let currInfo = e[0]
        let currId = e.id
        addCard(currInfo,currId)
    })
    Status()
    play()
}
fetchData()

let index = 0
function addCard(currInfo,currId) {
    const quizTemplate = `<div class="quiz">
                        <div class="info">
                            <img src="media/quiz-svgrepo-com.svg" alt="">
                            <h3>${currInfo.title}</h3>
                            <h3>Category: <span>${currInfo.category}</span></h3>
                            <h3>Number of qustions: <span>${currInfo.questionsNum}</span></h3>
                            <h3>Estimated Time: <span>${currInfo.tempMoy}</span></h3>
                            <h3>Difficulty: <span>${currInfo.difficulty}</span></h3>
                        </div>
                        <div class="start">
                            <button>Enter</button>
                        </div>
                    </div>`

    cardAdd.innerHTML += quizTemplate
    console.log(currId);
    
    localStorage.setItem("Card" + index, currId)
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

function Status() {
    let allQuizes = document.querySelectorAll(".quiz")
    console.log(allQuizes);

    // Array.from(allQuizes).forEach((e, i) => {
    //     let id = localStorage.getItem("Card" + i)
    //     console.log(id);

    // })
}

