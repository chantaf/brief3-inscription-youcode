import {test} from "./useClasse.js";
import {question} from "./useClasse.js";


//afficher data question
document.querySelector("#type").addEventListener("change",async()=>{
    let table=document.getElementById("idtable");
    let types=document.getElementById("type");

    
  let type=types.options[types.selectedIndex].value;

    let quest=new question();
    let dataquestion=await quest.afficherallquestion();
        dataquestion.data.forEach(element => {
            if(element.type==type){
                let re = '';
                    element.repenses.forEach(element => {
                        re += `<p>repense:${element.repense} status:${element.status}</p>`;
            });
            table.innerHTML+=
            `
            <tr>
                <td>${element.type}</td>
                <td>${element.point}</td>
                <td>${element.nom}</td>
                <td>${re}</td>
                <td>
                   <input type="checkbox" name="choix" data-point="${element.point}" data-type="${element.id}" required/>
                </td>
            </tr>
            `
         ;
    
        }
    
        });

    });


    //ajouter question
    let array=[];
document.querySelector("#ajoutert").addEventListener("click",()=>{

    let types=document.getElementById("type");
    let type=types.options[types.selectedIndex].value;
    let nom=document.getElementById("nom").value;
    let affres=document.getElementById("affres").value;
    let dated=document.getElementById("dated").value;
    let datef=document.getElementById("datef").value;
    let questions=document.getElementsByName("choix");
    let scoore=0;
    let ver=0;


    if(type!=""){

    //verifier repense
    for (let index = 0; index < questions.length; index++) {
        
        if(questions[index].checked){
            ver=1;
        }
    }

    if(ver==1){
    questions.forEach(element => {
        if(element.checked){
            array.push({
                idquestions:element.getAttribute('data-type')
            });
            scoore=parseInt(scoore)+ parseInt(element.getAttribute('data-point'));   
        }
    }); 
            let teste=new test();
            teste=new test(type,nom,dated,datef,affres,scoore,array);
            teste.ajoutertest();

        }else{
            alert("Choisir Repense");
        }
    }else{
        alert("Choisir Type Test");
    }
        
});



// afficher data test
document.querySelector("#afftest").addEventListener("click",async()=>{
    let table=document.getElementById("idtabletest");
    let types=document.getElementById("type");
    
  let type=types.options[types.selectedIndex].value;
    let teste=new test();
    let dataquestion=await teste.afficheralltest();
    
    
    if(type!=""){

   
        dataquestion.data.forEach(element => {
    
            if(element.type==type){
                let re = '';
                    element.questions.forEach(element => {
                        re += `<p>idquestion:${element.idquestions}`;
                    });
    
            
            table.innerHTML+=`
            <tr>
                <td>${element.type}</td>
                <td>${element.nom}</td>
                <td>${element.datedebut}</td>
                <td>${element.datefin}</td>
                <td>${element.afficherresult}</td>
                <td>${element.scoore}</td>
                <td>${re}</td>
                <td> <button class="supprimer btn btn-danger text-white btn-sm" data-type="${element.id}">supprimer</button>
             
                </td>
            </tr>
            `
         ;
    
        }
    
        });
        DeleteFunction();
        updateFunction();
    }else{
            alert("Choisir Type Test");
    }
    });


    //supprimer question
const DeleteFunction = () =>{
    document.querySelectorAll('.supprimer').forEach(Element =>{
            Element.addEventListener('click', async ()=>{
                       let id=Element.getAttribute('data-type');
                       let teste=new test();
                       teste.supprimertest(id);
        
            })
        });
}


//modifier question
const updateFunction = () =>{

    document.querySelectorAll('.modifier').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
    
            let types=document.getElementById("type");
            let type=types.options[types.selectedIndex].value;
            let nom=document.getElementById("nom").value;
            let affres=document.getElementById("affres").value;
            let dated=document.getElementById("dated").value;
            let datef=document.getElementById("datef").value;
            let questions=document.getElementsByName("choix");
            let scoore=0;
            questions.forEach(element => {
                if(element.checked){
                    array.push({
                        idquestions:element.getAttribute('data-type')
                    });
                    scoore=parseInt(scoore)+ parseInt(element.getAttribute('data-point'));
                }
            });
        
            let id=Element.getAttribute('data-type');
            let teste=new test();
            teste=new test(type,nom,dated,datef,affres,scoore,array);
            teste.modifierteste(id); 
        });
    });
}