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