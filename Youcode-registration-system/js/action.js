import {personne} from './useClasse.js';
import {result} from './useClasse.js';
import {test} from './useClasse.js';
    let urll=document.URL;
    let role;
    
    // let verifAuthDash = sessionStorage.getItem('login');

    // console.log(verifAuthDash.role);
    //recherche role
    function chercherole(){
        

        if(urll.includes("formateur")){
            role="formateur";
        }else if(urll.includes("condidat")){
            role="condidat";
        }else if(urll.includes("staff")){
            role="staff";
        }else if(urll.includes("apprenant")){
            role="apprenant";
        }else if(urll.includes("auth")){
            role="auth";
        }else if(urll.includes("candidatList")){
            role="candidatList";
        }else if(urll.includes("login")){
            role="login";
        }else if(urll.includes("appranantlist")){
            role="appranantlist";
        }else if(urll.includes("dashboard")){
            role="dashboard";
        }else if(urll.includes("validertest")){
            role="validertest";
        }
        return role;
    }



    if(chercherole() == "auth" ){
        var emailAuthCandidat =localStorage.getItem('email');
        document.getElementById('email').value = emailAuthCandidat;
    }

    //deconnect d'un utilisateur
    document.querySelectorAll('.deconnect').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            sessionStorage.removeItem('login');
            window.location.href = "http://127.0.0.1:5500/login.html";
        })
    });


    //ajouter personne
    if(chercherole() == "candidatList" || chercherole() == "staff" || chercherole() == "formateur" || chercherole() == "condidat" ){
        document.querySelector("#ajouterf").addEventListener("click",async()=>{
            //declaration des variables
            let nom=document.getElementById("nom").value;
            let prenom=document.getElementById("prenom").value;
            let cin=document.getElementById("cin").value;
            let tel=document.getElementById("tel").value;
            let email=document.getElementById("email").value;
            let password=document.getElementById("email").value;
    
            // console.log(chercherole());
            let persone=new personne();
            let datapersonne= await persone.afficherall(chercherole());
            let personee;
            // console.log(datapersonne);
            let p=0;
        
            datapersonne.data.forEach(element => {
                if(element.cin==cin){
                    p=1;
                }
            });
            if(p==1){
                alert("deja existe")
            }else{
                
                if(chercherole()!="condidat"){
                    let dn="test";
                    personee=new personne(nom,prenom,cin,tel,dn,email,password,chercherole());
                    personee.ajouterpersonne();
                }else{
                    let datenaissance=document.getElementById("datens").value;
                    let r = (Math.random()).toString(36).substring(7);
                    let password = r+cin;
                    let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
                    if(age>=18 && age<=35){
                        personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,chercherole());
                        alert(`votre mot de passe est : ${password}`);
                        localStorage.setItem('email', email,nom,prenom );
                        personee.ajouterpersonne();
                        window.location.href = "http://127.0.0.1:5500/auth.html";
                    }else{
                        alert("age entre 18 et 35");
                    }
                }
            }
        });
    }

   
    //******************count********************//
    if(role=="dashboard"){
    let persone=new personne();
    let counttestenligne=await persone.afficherall("test");
    let c=0;
    let t=0;
    counttestenligne.data.forEach(element => {
           if(element.type=="test-en-ligne"){
                c++;
           }else if(element.type=="technique") {
                t++;                
           } 
    });
   document.getElementById("counttestenligne").innerHTML=c;
   document.getElementById("counttestsourcing").innerHTML=t;

  
    let countformateur=await persone.afficherall("formateur");
    let f=0;
    countformateur.data.forEach(element => {
            f++;
    });
    document.getElementById("countformateur").innerHTML=f;
    
    let countstaff=await persone.afficherall("staff");
    let s=0;
    countstaff.data.forEach(element => {
            s++;
    });
    document.getElementById("countstaff").innerHTML=s;

//****************************remplissage teble apprenant**************************************
let dataapprenant;
dataapprenant=await persone.afficherall("apprenant");
let table=document.getElementById("idtable");
dataapprenant.data.forEach(element => {
    table.innerHTML+=`
    <tr>
        <td>${element.nom}</td>
        <td>${element.prenom}</td>
        <td>${element.email}</td>
        <td>${element.tel}</td>
        <td>${element.datenaissance}</td>
        <td>${element.cin}</td>
    </tr>`
});

}


//******************************************************************************************** 

//valider condidat ->apprenant 
const ajouterapprenant=() =>{
        document.querySelectorAll(".btnvalideremail").forEach(Element =>{
        Element.addEventListener('click', async ()=>{
        //declaration des variables
        let condidat =new personne();

        let dataallcondidat=await condidat.afficherall("condidat");
        let idcondidatvalider=Element.getAttribute('data-type');

        dataallcondidat.data.forEach(element => {
            
            if(element.id==idcondidatvalider){

                    let nom=element.nom;
                    let prenom=element.prenom;
                    let cin=element.cin;
                    let tel=element.tel;
                    let email=element.email;
                    let password=element.password;
                    let datenaissance=element.datenaissance;
                    
                    let personee=new personne(nom,prenom,cin,tel,datenaissance,email,password,"apprenant");
                    personee.ajouterpersonne();
            }
        });     
    
    });
});
}

//affichage data
if(chercherole()!="condidat" && chercherole() !="auth"  && chercherole() != "login"){
    let table=document.getElementById("idtable");
    let persone=new personne();
    let resultat=new result();
    let test1=new test();
    let datapersonne;
    let datatest;
    let dataalltest=await test1.afficheralltest();

    let usersdata =JSON.parse(sessionStorage.getItem('login'));
    let rolee;

    if(chercherole()=="candidatList"){
        datapersonne=await persone.afficherall("condidat"); 
    }else if(chercherole()=="appranantlist"){
        datapersonne=await persone.afficherall("apprenant");
    }else if(chercherole()=="validertest"){
        datatest=await resultat.afficherallresult();
    }
    else{
        datapersonne=await persone.afficherall(chercherole());
    }
       
    if(chercherole()!="candidatList" && chercherole()!="appranantlist" && chercherole()!="validertest" ){
        datapersonne.data.forEach(element => {
            table.innerHTML+=`
            <tr>
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.email}</td>
                <td>${element.tel}</td>
                <td>${element.cin}</td>
                <td class="d-flex" > <button  class="supprimer  btn btn-danger text-white btn-sm" data-type="${element.id}">supprimer</button> &nbsp; &nbsp;
                <button class="modifier  btn btn-info btn-sm ml-2 text-white" data-type="${element.id}">modifier</button>
                </td>
            </tr>`
        });
    
    
    }else if(chercherole() =="candidatList" || chercherole() =="appranantlist"){
        datapersonne.data.forEach(element => {

            
            table.innerHTML+=`
            <tr>
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.email}</td>
                <td>${element.tel}</td>
                <td>${element.password}</td>
                <td>${element.datenaissance}</td>
                <td>${element.cin}</td>
                <td class="d-flex" > <button  class="supprimer btn btn-danger btn-sm text-white" data-type="${element.id}">supprimer</button> &nbsp;&nbsp;
                <button class="modifier btn btn-info btn-sm ml-2  text-white" data-type="${element.id}">modifier</button>
                </td>
            </tr>`
        });
    }else{
        document.querySelector("#type").addEventListener("change",async()=>{
            let table=document.getElementById("idtable");
            let types=document.getElementById("type");
        
            
          let type=types.options[types.selectedIndex].value;
        
        datatest.data.forEach(element => {
            
            let re = '';
            let a = '';
            element.idcondidat.forEach(element => {
                re += `<p>Nom condidat:${element.nom} <br> email:${element.email}</p>`;
                a += `<a href="mailto:${element.email}"  class="btn btn-info text-white btn-sm" >email</a> &nbsp; &nbsp;`;
                a += `<button data-type="${element.id}" class="btn btn-success text-white btn-sm btnvalideremail">valider</button>`;
            });


            dataalltest.data.forEach(element1 => {
                if(element1.id==element.idtest){
                    if(element1.type==type){

                    table.innerHTML=`
                    <thead>
                    <tr>
                        <th>test</th>
                        <th>scoore condidat</th>
                        <th>condidat</th>
                        <th>scoore test</th>
                        <th>action</th>
                    </tr>
                </thead>
                    <tr>
                        <td>nom test: ${element1.nom}</td>
                        <td>${element.scoore}</td>
                        <td>${re}</td>
                        <td>${element1.scoore}</td>
                        <td class="d-flex"> ${a} </td>
                    </tr>`
                }
            }
            });

        });
        ajouterapprenant();

    });

}

}






// if(chercherole() == "candidatList" || chercherole() == "staff" || chercherole() == "formateur" || chercherole() == "condidat" ){



//supprimer d'un utilisateur
document.querySelectorAll('.supprimer').forEach(Element =>{
    Element.addEventListener('click', async ()=>{
        let id=Element.getAttribute('data-type');
        let role=chercherole();
        if(role== "candidatList"){
            role="condidat";
        }else if(role== "appranantlist"){
            role="apprenant";
        }
        let persone=new personne();
        persone.supprimerpersonne(id,role);
    })
});


//get info d'un seul personne
document.querySelectorAll('.modifier').forEach(Element=>{
    Element.addEventListener('click', async()=>{
        let id= Element.getAttribute('data-type');
        let role = chercherole();
        let persone=new personne();
        if(role== "candidatList"){
            role="condidat";
        }else if(role== "appranantlist"){
            role="apprenant";
        }
        let datapersonne=await persone.affcherpersone(id,role);
        if(role !="condidat" && role!="apprenant"){
            document.getElementById("nom").value= datapersonne.data.nom;
            document.getElementById("prenom").value = datapersonne.data.prenom;
            document.getElementById("cin").value = datapersonne.data.cin;
            document.getElementById("tel").value = datapersonne.data.tel;
            document.getElementById("email").value = datapersonne.data.email;
            document.getElementById("password").value = datapersonne.data.password;
            document.getElementById("id").value =id;
        }
        else {
            document.getElementById("nom").value= datapersonne.data.nom;
            document.getElementById("prenom").value = datapersonne.data.prenom;
            document.getElementById("cin").value = datapersonne.data.cin;
            document.getElementById("tel").value = datapersonne.data.tel;
            document.getElementById("dateNaissance").value = datapersonne.data.datenaissance;
            document.getElementById("email").value = datapersonne.data.email;
            document.getElementById("password").value = datapersonne.data.password;
            document.getElementById("id").value =id;
        }
    })
});

//modifier des infos d'un personne
document.querySelectorAll('.updatef').forEach(Element =>{
    //Si en clique sur le button modifié
    Element.addEventListener('click', async ()=>{
        let nom=document.getElementById("nom").value;
        let prenom=document.getElementById("prenom").value;
        let cin=document.getElementById("cin").value;
        let tel=document.getElementById("tel").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let dateNaissance =document.getElementById("dateNaissance").value
        let personee;

        let role = chercherole();
        //verification de role avant l'ajout
        if(role!="candidatList" && role!="appranantlist"){
            let dn="sans date";
            personee=new personne(nom,prenom,cin,tel,dn,email,password,role);
            let id = document.getElementById("id").value;
            personee.modifierpersonne(id);
        }else if(role=="candidatList"){
            personee=new personne(nom,prenom,cin,tel,dateNaissance,email,password,"condidat");
            let id = document.getElementById("id").value;
            personee.modifierpersonne(id); 
        }else if(role=="appranantlist"){
            personee=new personne(nom,prenom,cin,tel,dateNaissance,email,password,"apprenant");
            let id = document.getElementById("id").value;
            personee.modifierpersonne(id);
        }
    });
});


//auth condidat
document.querySelectorAll('#auth').forEach(Element =>{
    let verif = 0;
    Element.addEventListener('click', async ()=>{
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let persone=new personne();
        let dataCandidat= await persone.afficherall("condidat");
        let dataApprenant= await persone.afficherall("apprenant");
        let arrayAuth =[];
        if( chercherole()== "auth") {
            dataApprenant.data.forEach(element => {
                if(element.email==email && element.password==password){
                    verif=1;
                    arrayAuth.push({
                        role:'apprenant',
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id,
                        });
                        sessionStorage.setItem('auth',JSON.stringify(arrayAuth));
                        window.location.href = "http://127.0.0.1:5500/sourcing.html";
                        // alert("ddd");
                    }
            });
            dataCandidat.data.forEach(element => {
                if(element.email==email && element.password==password){
                    verif=1;
                    arrayAuth.push({
                        role:'candidat',
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id,
                        });
                    sessionStorage.setItem('auth',JSON.stringify(arrayAuth));
                    window.location.href = "http://127.0.0.1:5500/testEnLigne.html";
                }
            });
        }
    });
});



//auth admin
document.querySelectorAll('#login').forEach(Element =>{
    let verifdash = 0;
    Element.addEventListener('click', async ()=>{
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let persone=new personne();
        let dataStaf= await persone.afficherall("staff");
        let dataFormateur= await persone.afficherall("formateur");
        let dataAdmin= await persone.afficherall("admin");
        let arrayAuth =[];
        if( chercherole()== "login"){
            dataStaf.data.forEach(element => {
                if(element.email==email && element.password==password){
                    verifdash=1;
                    arrayAuth.push({
                        role:'staff',
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id,
                        });
                        sessionStorage.setItem('login',JSON.stringify(arrayAuth));
                    window.location.href = "http://127.0.0.1:5500/dashboard.html";
                }
            });

            dataFormateur.data.forEach(element => {
                if(element.email==email && element.password==password){
                    verifdash=1;
                    arrayAuth.push({
                        role:'formateur',
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id,
                        });
                        sessionStorage.setItem('login',JSON.stringify(arrayAuth));
                    window.location.href = "http://127.0.0.1:5500/dashboard.html";
                }
            });
            dataAdmin.data.forEach(element => {
                if(element.email==email && element.password==password){
                    verifdash=1;
                    arrayAuth.push({
                        role:'admin',
                        nom: element.nom,
                        prenom: element.prenom,
                        email: element.email,
                        id: element.id,
                        });
                        sessionStorage.setItem('login',JSON.stringify(arrayAuth));
                    window.location.href = "http://127.0.0.1:5500/dashboard.html";
                    
                }
            });
            if(verifdash!=1){
                alert("les informations son incorrect");
            }
        }
    });
});