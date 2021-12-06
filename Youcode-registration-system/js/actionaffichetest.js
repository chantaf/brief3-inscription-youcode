import { test } from "./useClasse.js";
import { question } from "./useClasse.js";
import { result } from "./useClasse.js";

let urll = document.URL;
let typeTest;

let reponses_candidat = [];
let quest = document.getElementById("question");


//initialisation des variable
let c = 0;
let min = 0;
let max = 0;
let qq = 1;



let ques = new question();
let toutquestions = await ques.afficherallquestion();
let questions = [];
let teste = new test();
let datatest = await teste.afficheralltest();



function chercheTest() {
    if (urll.includes("technique")) {
        typeTest = "technique";
    } else if (urll.includes("motivation")) {
        typeTest = "motivation";
    } else if (urll.includes("testEnLigne")) {
        typeTest = "test-en-ligne";
    } else if (urll.includes("serious-game")) {
        typeTest = "serious game";
    }
    return typeTest;
}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max));
}
min = 1;

const tabletest_Choisir = datatest.data.filter(el => el.type === chercheTest())

max = tabletest_Choisir.length;

let valeurrandem = randomNum(min, max);
let testchoisir = "";

let tableidquestion = [];
//  console.log(valeurrandem);
tabletest_Choisir.forEach((element, i) => {
    if (i == valeurrandem) {
        testchoisir = element;
    }
});

// console.log(tabletest_Choisir);
testchoisir.questions.forEach(element => {
    tableidquestion.push(element.idquestions);
});



toutquestions.data.forEach(element => {
    tableidquestion.forEach(element1 => {
        if (element1 == element.id) {
            questions.push(element);
        }
    });
});

// console.log(toutquestions);
questions.forEach((element, i) => {
    let responses = ``;
    if (chercheTest() === "motivation" || chercheTest() === "serious game") {

        responses = `<form class="resp-form resp" data-id="${element.id}">
                    <textarea name="resp"></textarea>
                    <input type="hidden" value="${element.id}" name="qst_id" />
                    <button type="submit">Submit</button>
                    </form>`;

        quest.innerHTML += `<div class="qst ${i === 0 ? "active" : ""}">
                        <h3> ${element.nom}</h3>
                        ${responses}
                    </div>`;
    } else {
        element.repenses.forEach((rep, i) => {
            responses += `<p class="resp" data-id="${element.id}">${rep.repense}</p>`;
        })
        quest.innerHTML += `<div class="qst ${i === 0 ? "active" : ""}">
                    <h3> ${element.nom}</h3>
                    ${responses}
                </div>`;
    }



});
function calculScore(resps) {
    let score = 0;
    resps.forEach(item => {
        let qst_current = questions.filter(qst => qst.id == item.qst_id)[0];
        console.log(resps);
        let rep_true = qst_current.repenses.filter(rep => rep.status == "true")[0].repense
        if (rep_true === item.rep) {
            score += Number(qst_current.point)
        }
    })
    return score
}
if (chercheTest() === "motivation" || chercheTest() === "serious game") {

    document.querySelectorAll(".resp-form").forEach(item => {
        item.addEventListener("submit", e => {
            e.preventDefault()
            // console.log(e);
            const qst_id = e.target.qst_id.value;
            reponses_candidat.push({ qst_id, rep: e.target.resp.value.trim() })
            if (e.target.parentElement.nextSibling && e.target.parentElement.nextSibling !== null) {
                e.target.parentElement.classList.remove("active");
                e.target.parentElement.nextSibling.classList.add("active");
            } else {
                // console.log(reponses_candidat);
                let scorre = calculScore(reponses_candidat);
                // console.log(scorre);
                let idtest = testchoisir.id;
                let infocondidatt = JSON.parse(sessionStorage.getItem('auth'));
                // console.log(infocondidatt);
                let res = new result(idtest, infocondidatt, scorre);
                console.log(res);
                res.ajouterresult();
                quest.innerHTML = "<h1>Test End</h1>";
                // localStorage.removeItem('auth');
                // window.location.href = "http://127.0.0.1:5500/";
            }
        })
    });
}
else {

    document.querySelectorAll(".resp").forEach(item => {
        item.addEventListener("click", e => {
            const qst_id = e.target.dataset.id;
            reponses_candidat.push({ qst_id, rep: e.target.innerText.trim() })
            if (e.target.parentElement.nextSibling && e.target.parentElement.nextSibling !== null) {
                e.target.parentElement.classList.remove("active");
                e.target.parentElement.nextSibling.classList.add("active");
            } else {
                // console.log(reponses_candidat);
                let scorre = calculScore(reponses_candidat);
                // console.log(scorre);
                let idtest = testchoisir.id;
                let infocondidatt = JSON.parse(sessionStorage.getItem('auth'));
                let res = new result(idtest, infocondidatt, scorre);
                res.ajouterresult();
                quest.innerHTML = "<h1>Test End</h1>";
                localStorage.removeItem('auth');
                window.location.href = "http://127.0.0.1:5500/";
            }
        })
    });
}