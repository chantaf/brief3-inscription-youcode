import {personne} from './useClasse.js';

    let urll=document.URL;
    let role;

    

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
        }
        return role;
    }



    function showForm(){
        var btn =document.getElementById("addformateur");
        btn.innerHTML=style
    }
    //ajouter personne

    if(chercherole() == "candidatList" || chercherole() == "staff" || chercherole() == "formateur" ){
        document.querySelector("#ajouterf").addEventListener("click",async()=>{
            //declaration des variables
            let nom=document.getElementById("nom").value;
            let prenom=document.getElementById("prenom").value;
            let cin=document.getElementById("cin").value;
            let tel=document.getElementById("tel").value;
            let email=document.getElementById("email").value;
            let password=document.getElementById("password").value;
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
                    let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
                    if(age>=18 && age<=35){
                        personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,chercherole());
                        personee.ajouterpersonne();
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


//affichage data
if(chercherole()!="condidat" && chercherole() !="auth"  && chercherole() != "login"){
    let table=document.getElementById("idtable");
    let persone=new personne();
    let datapersonne;
    let usersdata =JSON.parse(sessionStorage.getItem('login'));
    let rolee;
    usersdata.forEach(element => {
         rolee=element.role;
    });
            
    if(rolee!="admin"){
        document.getElementById("ajouterf").style.display="none";
    }
    

    if(chercherole()=="candidatList"){
        datapersonne=await persone.afficherall("condidat");    
    }else if(chercherole()=="appranantlist"){
        datapersonne=await persone.afficherall("apprenant");
    }else{
        datapersonne=await persone.afficherall(chercherole());
    }
    
    if(chercherole()!="candidatList" && chercherole()!="appranantlist" ){
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

    }else{
     
       
        datapersonne.data.forEach(element => {
            table.innerHTML+=`
            <tr>
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.email}</td>
                <td>${element.tel}</td>
                <td>${element.datenaissance}</td>
                <td>${element.cin}</td>
                <td class="d-flex" > <button  class="supprimer btn btn-danger btn-sm text-white" data-type="${element.id}">supprimer</button> &nbsp;&nbsp;
                <button class="modifier btn btn-info btn-sm ml-2  text-white" data-type="${element.id}">modifier</button>
                </td>
            </tr>`
        });
    }
}


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
            document.getElementById("datens").value = datapersonne.data.datenaissance;
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

        let personee;

        let role = chercherole();
        //verification de role avant l'ajout
        
        if(role!="candidatList" && role!="appranantlist"){
              let dn="sans date";
            personee=new personne(nom,prenom,cin,tel,dn,email,password,role);
            let id = document.getElementById("id").value;
            personee.modifierpersonne(id);
        }else if(role=="candidatList"){
            //modification des information de condidat en vérifiant l'age <35
            let datenaissance=document.getElementById("datens").value;
            let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
            //if age < 35 modifie
            if(age>=18 && age<=35){
                personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,"condidat");
                let id = document.getElementById("id").value;
                personee.modifierpersonne(id);
            }
            //sinon message alert 
            else{
                alert("age entre 18 et 35");
            } 
           
        }else if(role=="appranantlist"){
              //modification des information de condidat en vérifiant l'age <35
              let datenaissance=document.getElementById("datens").value;
              let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
              //if age < 35 modifie
              if(age>=18 && age<=35){
                  personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,"apprenant");
                  let id = document.getElementById("id").value;
                  personee.modifierpersonne(id);
              }
              //sinon message alert 
              else{
                  alert("age entre 18 et 35");
              }
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
        
        if( chercherole()== "auth") {
                dataApprenant.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verif=1;
                    }
                });
                dataCandidat.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verif=1;
                    }

                });
        }

        if(verif == 1){
            window.location.href = "http://127.0.0.1:5500/testEnLigne.html";
         }else{
            alert("les informations son incorrect");
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

// deconnect
