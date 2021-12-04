import {test} from "./useClasse.js";
import {question} from "./useClasse.js";
import {result} from "./useClasse.js";
    let reponses_candidat=[];
// document.querySelector("#type").addEventListener("load",async()=>{
    let quest=document.getElementById("question");
    // let zonerep=document.getElementById("divrep");

        //nomber test
        let c=0;
        let min=1;
        let max=0;

        let qq=1;

        let ques=new question();
        let toutquestions=await ques.afficherallquestion();
        let questions=[];
        let teste=new test();
        let datatest=await teste.afficheralltest();

        datatest.data.forEach(element => {
    
            if(element.type=="technique"){

                c++;

            }
    });

 
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min; 
    }
     
     min=1;
     max=c;
   
     let valeurrandem=randomNum(min, max);
     let testchoisir="";

     let tableidquestion=[];
 

     datatest.data.forEach(element => {
            if(element.id==valeurrandem){
                    testchoisir=element;
            }
     });


     testchoisir.questions.forEach(element => {
        tableidquestion.push(element.idquestions);
    });

        toutquestions.data.forEach(element => {
            tableidquestion.forEach(element1 => {

            if(element1==element.id){
                questions.push(element);
            }

     });
    });

    questions.forEach((element,i) => {
            let responses=``;
            element.repenses.forEach((rep,i)=>{
                responses+=`
                <p class="resp" data-id="${element.id}">${rep.repense}</p>
                `;
            })
                quest.innerHTML+=`<div class="qst ${i===0?"active":""}">
                    <h3> ${element.nom}</h3>
                    ${responses}
                </div>`;


            });
function calculScore(resps) {
    let score=0;
    resps.forEach(item=>{
        
let qst_current=questions.filter(qst=>qst.id===item.qst_id)[0];
      let rep_true=  qst_current.repenses.filter(rep=>rep.status=="true")[0].repense
if(rep_true===item.rep){

     score +=Number(qst_current.point)
}
        })
        return score


}
document.querySelectorAll(".resp").forEach(item=>{
item.addEventListener("click",e=>{
    const qst_id = e.target.dataset.id;
    reponses_candidat.push({qst_id,rep:e.target.innerText.trim()})
     if( e.target.parentElement.nextSibling && e.target.parentElement.nextSibling !== null){
        e.target.parentElement.classList.remove("active");
        e.target.parentElement.nextSibling.classList.add("active")
     }else{

        let scorre=calculScore(reponses_candidat);
        let idtest=testchoisir.id;
        let idcondidatt=1;//condidat li teconnecta
        let res=new result(idcondidatt,idtest,scorre);
        res.ajouterresult();
        
        quest.innerHTML="<h1>Test End</h1>";


        // window.location.href = "http://127.0.0.1:5500/testEnLigne.html";

     }
    
 })
 
});

    



