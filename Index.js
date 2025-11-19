 const ContainerExpe =document.querySelector(".expContainer");
 const form=document.querySelector("form")
 const ListempAff=document.querySelector("#listEmployee")

 const AddExperiece =document.querySelector(".btnAjout");
 const Addnewworker=document.querySelector(".addemployer");
 const inputImg = document.querySelector("#img");
const previewImg = document.querySelector("#previewImg");


const modalOverlay = document.querySelector(".modalOverlay");

const closeModal = document.querySelector(".closeModal");
const btnEnregistrer=document.querySelector(".submit")

Addnewworker.addEventListener("click",()=>{
    modalOverlay.style.display="flex"

})
closeModal.addEventListener("click",()=>{
     modalOverlay.style.display="none"

})



function ExpDynamique(){
    
    AddExperiece.addEventListener("click",(e)=>{
        e.preventDefault()
    let Expprecedent = document.createElement('div')
    Expprecedent.classList.add('Expperecedent')
    Expprecedent.innerHTML=`<div class="group">
                        <label for="post">Nom de post</label>
                        <input id="post" class="post" required type="text" name="post">
                    </div>
                     <div class="group">
                        <label for="periodeDeb">Date debut</label>
                        <input id="periodeDeb"  class="Deb" required type="date" name="periodeDeb">
                    </div>
                    <div class="group">
                        <label for="periodeDeb">Date fin</label>
                        <input id="periodeFin" class="Fin" required type="date" name="periodeFin">
                    </div>
                    <div class="group">
                        <label for="nameCompangie">Nom de la compagnie</label>
                        <input id="nameCompangie" class="Compangie" required type="text" name="nameCompangie">
                    </div>
                    <div>
                        <button class="btnSupprimer">Supprimer</button>
                        
                    </div>  `

        ContainerExpe.appendChild(Expprecedent)
     
    const SuppExperience=Expprecedent.querySelector(".btnSupprimer")
    SuppExperience.addEventListener("click",()=>{
        Expprecedent.remove()

    })
    })


}


ExpDynamique()
function Afficherinfo(){
    const InfoEmp=document.querySelector(".InfoEmp");
    InfoEmp.innerHTML=ListEmploye.map(e=>

        `  
        <div class="employe-card">
            <img alt="image" class="imgprofile" src="${e.img}">
            <div class="rolename">
                <h4>${e.nom}</h4>
                <h5>${e.role}</h5>
            </div>
        </div>
        `

    ).join("")
     


}



const ListEmploye=JSON.parse(localStorage.getItem("ListEmploye") ||"[]")
Afficherinfo()

function AjoutEmploye(){
    
  btnEnregistrer.addEventListener("click",(e)=>{
     e.preventDefault();
    const Employe={
    nom:document.querySelector(".nom").value,
    email:document.querySelector(".email").value,
    tel:document.querySelector(".tel").value,
    img:document.querySelector(".img").value,
    role:document.querySelector("#role").value,
    zone:"ussingned",
    Expriences:[]
    
    }
    const Allexp=ContainerExpe.querySelectorAll(".Expperecedent")
    Allexp.forEach(e=>{
        const Experience={
        post:e.querySelector(".post").value,
        Debut:e.querySelector(".Deb").value,
        Fin:e.querySelector(".Fin").value,
        Compagnie:e.querySelector(".Compangie").value,
    }
    Employe.Expriences.push(Experience);

    })
     
    ListEmploye.push(Employe); 
     localStorage.setItem("ListEmploye", JSON.stringify(ListEmploye));
      Afficherinfo()
      form.reset()
    ContainerExpe.innerHTML = "";
     modalOverlay.style.display="none"


  })
  Afficherinfo()
 
}
AjoutEmploye()


