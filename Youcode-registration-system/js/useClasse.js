const url="http://localhost:3000"

//classe personne 
export class personne{

    //les attributes
    nom;
    prenom;
    cin;
    tel;
    datenaissance;
    email;
    password;
    role;

    //declaration de constructeur
    constructor (n,p,c,t,dn,e,ps,r)
    {
            this.nom=n;
            this.prenom=p;
            this.cin=c;
            this.tel=t;
            this.datenaissance=dn;
            this.email=e;
            this.password=ps;
            this.role=r;
    }

    //ajour d'un nouvelle personne par apport au role
    ajouterpersonne(){
        let  data={
              nom:this.nom,
              prenom:this.prenom,
              cin:this.cin,
              tel:this.tel,
              email:this.email,
              password:this.password
          }
          if(this.role == "condidat"){
            data={
                nom:this.nom,
                prenom:this.prenom,
                cin:this.cin,
                tel:this.tel,
                datenaissance:this.datenaissance,
                email:this.email,
                password:this.password
            }
        }
        axios.post(`${url}/${this.role}`,data);
    }

    //suppression d'un utilisateur
    supprimerpersonne(id,role){
        axios.delete(`${url}/${role}/${id}`);
    }

    //actualisatuon des info utilisateur
    modifierpersonne(id){
       let  data={
              nom:this.nom,
              prenom:this.prenom,
              cin:this.cin,
              tel:this.tel,
              email:this.email,
              password:this.password
          }
          if(this.role == "condidat"){
            data={
                nom:this.nom,
                prenom:this.prenom,
                cin:this.cin,
                tel:this.tel,
                datenaissance:this.datenaissance,
                email:this.email,
                password:this.password
            }
        }
        axios.put(`${url}/${this.role}/${id}`,data);
    }

    //affichage des utilisateurs
    afficherall(role){
        let aff= axios.get(`${url}/${role}`);
        return aff
    }

    //affichage d'utilisateur pour la modification
    affcherpersone(id,role){
        let aff= axios.get(`${url}/${role}/${id}`);
        return aff
    }
}



//class question
export  class question{

    type;
    point;
    nom;
    repenses;
    role;

    constructor (t,p,n,r,rl)
    {
            this.type=t;
            this.point=p;
            this.nom=n;
            this.repenses=r;
            // this.role=rl;
    }

    ajouterquestion(){
        let  data={
            type:this.type,
            point:this.point,
            nom:this.nom,
            repenses:this.repenses,
            // roleprconnect:this.role,
        }
        axios.post(`${url}/questions`,data);
    }

    afficherallquestion(){
        let aff= axios.get(`${url}/questions`);
        return aff
    }

    supprimerquestion(id){
        axios.delete(`${url}/questions/${id}`);
    }

    affcherquestion(id){
        let aff= axios.get(`${url}/questions/${id}`);
        return aff
    }

    modifierquestion(id){
        let  data={
            type:this.type,
            point:this.point,
            nom:this.nom,
            repenses:this.repenses,
            // roleprconnect :this.role,
        }
         axios.put(`${url}/questions/${id}`,data);
     }
}



//class test
export  class test{

    type;
    // formateur;
    nom;
    datedebut;
    datefin;
    afficherresult;
    scoore;
    questions;
  
    constructor (t,n,dated,datef,affres,scoore,quest)
    {
            this.type=t;
            // this.formateur=f;
            this.nom=n;
            this.datedebut=dated;
            this.datefin=datef;
            this.afficherresult=affres;
            this.scoore=scoore;
            this.questions=quest;
    }

    afficherallquestion(){
        let aff= axios.get(`${url}/questions`);
        return aff
    }
    

    
    ajoutertest(){ 
        let  data={
            type:this.type, 
            // formateur:this.formateur,
            nom:this.nom,
            datedebut:this.datedebut,
            datefin:this.datefin,
            afficherresult:this.afficherresult,
            scoore:this.scoore,
            questions:this.questions
          }
        axios.post(`${url}/test`,data);
    }


    
    afficheralltest(){
        let aff= axios.get(`${url}/test`);
        return aff
    }


    affichertest(id){
        let aff= axios.get(`${url}/test/${id}`);
        return aff  
    }


    supprimertest(id){
        axios.delete(`${url}/test/${id}`);
    }


   modifierteste(id){
        let  data={
            type:this.type, 
            // formateur:this.formateur,
            nom:this.nom,
            datedebut:this.datedebut,
            datefin:this.datefin,
            afficherresult:this.afficherresult,
            scoore:this.scoore,
            questions:this.questions     
        }
        axios.put(`${url}/test/${id}`,data);
     }

}



//class result
export  class result{

    idtest;
    idcondidat;
    scoore;


    constructor (idt,idc,scoore)
    {
            this.idtest=idt;
            this.idcondidat=idc;
            this.scoore=scoore;
    }

    afficherallresult(){
        let aff= axios.get(`${url}/result`);
        return aff
    }
    

    
    ajouterresult(){ 
        let  data={
            idtest:this.idtest, 
            idcondidat:this.idcondidat,
            scoore:this.scoore
          
          }
        axios.post(`${url}/result`,data);
    }
}