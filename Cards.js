let data = ''
let i = 0
let cardAdd = document.querySelector(".quizContainer")

async function fetchData() {
    while (true) {
        const response = await fetch(`./quiz/quiz${i}.json`);
        if (!response.ok) {
            console.log(`No more files. Last file index is: ${i - 1}`);
            break;
        }
        data = await response.json();
        addCard()
        i++;
    }
    play()
}
fetchData()

function addCard() {
    const quizTemplate = `<div class="quiz">
                        <div class="info">
                            <img src="media/quiz-svgrepo-com.svg" alt="">
                            <h3>${data[data.length - 1].title}</h3>
                            <h3>Category: <span>${data[data.length - 1].category}</span></h3>
                            <h3>Number of qustions: <span>${data[data.length - 1].questionsNum}</span></h3>
                            <h3>Estimated Time: <span>${data[data.length - 1].tempMoy}</span></h3>
                            <h3>Difficulty: <span>${data[data.length - 1].difficulty}</span></h3>
                        </div>
                        <div class="start">
                            <button>Enter</button>
                        </div>
                    </div>`

    cardAdd.innerHTML += quizTemplate
}

function play() {
    let quizToPlay = document.querySelectorAll(".start")
    let index = 0

    Array.from(quizToPlay).forEach((e, index) => {
        e.addEventListener("click", () => {
            localStorage.setItem("quizToPlay", index)
            location.href = `quizInterface.html`
        })
    });
}
