import {question} from "./useClasse.js";

let array=[];
//ajouterrepense
document.querySelector("#plusrepense").addEventListener("click",()=>{

    let div=document.getElementById("divrep");
    div.innerHTML+=`
    <div class="rrr">
        repense: <input type="text" class="form-control" id="repense">

        <select class="form-select" id="status" aria-label="Default select example">
            <option >status de la question</option>
            <option value="true">true</option>
            <option value="false">false</option>
        </select> 
        </div>
        `
});



//ajouter question
document.querySelector("#ajouterq").addEventListener("click",()=>{

    let type=document.getElementById("type").value;
    let point=document.getElementById("point").value;
    let nom=document.getElementById("nom").value;
    
    // console.log("ana f ajout");
     
    document.querySelectorAll(".rrr").forEach( element => {
        array.push({
          repense:element.querySelector("#repense").value,
          status:element.querySelector("#status").value
        });
    });
    let quest=new question();
    quest=new question(type,point,nom,array);
    quest.ajouterquestion();
});


//afficher data question
document.querySelector("#type").addEventListener("change",async()=>{
    let table=document.getElementById("idtable");
    let types=document.getElementById("type");
    // let type = types.options[types.selectedIndex].value;
    let type = types.options[types.selectedIndex].value;

    console.log(type);
    let quest=new question();
    let dataquestion=await quest.afficherallquestion();

    dataquestion.data.forEach(element => {

        if(element.type==type){
            let re = '';
                element.repenses.forEach(element => {
                    re += `<p>repense:${element.repense} status:${element.status}</p>`;
                });
            table.innerHTML+=`
            <tr>
 
                <td>${element.type}</td>
                <td>${element.point}</td>
                <td>${element.nom}</td>
                <td class="x">${re}</td>
            
                <td> 
                    <button class="supprimer btn btn-danger" data-type="${element.id}">supprimer</button>
                    <button class="modifier  btn btn-info"  data-type="${element.id}">modifier</button>
                </td>
            </tr>`;
        }
    });
    DeleteFunction();
    updateFunction();
    ModifieFunction();
});


//supprimer question
const DeleteFunction = () =>{
    document.querySelectorAll('.supprimer').forEach(Element =>{
            Element.addEventListener('click', async ()=>{
                let id=Element.getAttribute('data-type');
                let quest=new question();
                quest.supprimerquestion(id);
            })
        });
}

// modifie une question
const ModifieFunction = () =>{
    document.querySelectorAll('.modifier').forEach(Element =>{
            Element.addEventListener('click', async ()=>{
                let id=Element.getAttribute('data-type');
                let quest=new question();
                let dataquestion=await quest.affcherquestion(id);

                document.getElementById("type").value= dataquestion.data.type;
                document.getElementById("point").value = dataquestion.data.point;
                document.getElementById("nom").value = dataquestion.data.nom;
                document.getElementById("id").value =id;
                dataquestion.data.repenses.forEach(element => {
                    if(dataquestion.data.repenses.length == 1){
                        document.getElementById("repense").value = element.repense;
                        document.getElementById("status").value = element.status;  
                    } 
                });
                if(dataquestion.data.repenses.length > 1){
                    let div=document.getElementById("divrep");
                    document.getElementById("repense").style.display="none";
                    document.getElementById("status").style.display="none";
                    document.getElementById("rep-status").style.display="none";
                    document.getElementById("rep-status1").style.display="none"
                    dataquestion.data.repenses.forEach(element => {
                        div.innerHTML+=`
                            <div class="rrr">
                                repense: <input type="text" class="form-control" value="${element.repense}" id="repense">

                                <select class="form-select"  id="status" aria-label="Default select example">
                                <option value="${element.status}">${element.status}</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                                </select> 
                            </div>`
                    });
                }
            })
        });
}

//modifier question
const updateFunction = () =>{
    document.querySelectorAll('#updateq').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            let type=document.getElementById("type").value;
            let point=document.getElementById("point").value;
            let nom=document.getElementById("nom").value;
            
            let  quest=new question();
            console.log(id);
            document.querySelectorAll(".rrr").forEach(element => {
                array.push({
                  repense:element.querySelector("#repense").value,
                  status:element.querySelector("#status").value
                });
                let id=document.getElementById("id").value;
                quest=new question(type,point,nom,array);
                quest.modifierquestion(id);
            });
        })
    });
}