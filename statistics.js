let data = ''
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
    })
}
fetchData()

let totalAttempts = '???'
let HScore = '???'
let MScore = '???'
let AScore = '???'
let SuccesRate = '???'
let ATP = 0

function addCard(e) {
    if (localStorage.getItem("totalAttemptsOf" + e.id) !== null) {
        totalAttempts = localStorage.getItem("totalAttemptsOf" + e.id)
    }
    if (localStorage.getItem("Hquiz" + e.id + "Score") !== null) {
        HScore = localStorage.getItem("Hquiz" + e.id + "Score")
    }
    if (localStorage.getItem("Mquiz" + e.id + "Score") !== null) {
        MScore = localStorage.getItem("Mquiz" + e.id + "Score")
    }
    if (localStorage.getItem("totalAttemptsOf" + e.id) !== null && localStorage.getItem("TScoreOf" + e.id) !== null) {
        AScore = (localStorage.getItem("TScoreOf" + e.id) / localStorage.getItem("totalAttemptsOf" + e.id)).toFixed(0)
    }
    if (localStorage.getItem("TotalTimeOf" + e.id) !== null) {
        ATP = localStorage.getItem("TotalTimeOf" + e.id)
    }
    if (localStorage.getItem("totalAttemptsOf" + e.id) !== null && localStorage.getItem("SuccesNumber"+e.id) !== null) {
        SuccesRate = (localStorage.getItem("SuccesNumber"+e.id) / localStorage.getItem("totalAttemptsOf" + e.id) * 100).toFixed(2)
    }

    const quizTemplate = `<div class="quizC">
                        <div class="info">
                            <img src="media/quiz-svgrepo-com.svg" alt="">
                            <h3>${e.title}</h3>
                            <h3>heigh Score: ${HScore}</h3>
                            <h3>Min Score: ${MScore}</h3>
                            <h3>Average Score: ${AScore}</h3>
                            <h3>Attempts Number: ${totalAttempts}</h3>
                            <h3>Success Rate: ${SuccesRate}%</h3>
                            <h3>Avg Time of Playing: ${ATP}sec</h3>
                        </div>
                    </div>`
    cardAdd.innerHTML += quizTemplate
    document.querySelectorAll(".quiz").forEach(e => {
        e.style.justifyContent = "center"
        e.style.textAlign = "center"
        e.style.height = "22em"
        e.querySelector(".info").style.width = "80%"
    })

    totalAttempts = '???'
    HScore = '???'
    MScore = '???'
    AScore = '???'
    SuccesRate = '???'
    ATP = 0
}
