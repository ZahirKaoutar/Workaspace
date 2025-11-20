const ContainerExpe = document.querySelector(".expContainer");
const form = document.querySelector("form")
const ListempAff = document.querySelector("#listEmployee")

const AddExperiece = document.querySelector(".btnAjout");
const Addnewworker = document.querySelector(".addemployer");
const inputImg = document.querySelector("#img");
const previewImg = document.querySelector("#previewImg");





const modalOverlay = document.querySelector(".modalOverlay");

const closeModal = document.querySelector(".closeModal");
const btnEnregistrer = document.querySelector(".submit")

Addnewworker.addEventListener("click", () => {
    modalOverlay.style.display = "flex"

})
closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none"

})




const ListEmploye = JSON.parse(localStorage.getItem("ListEmploye") || "[]")


function ExpDynamique() {

    AddExperiece.addEventListener("click", (e) => {
        e.preventDefault()
        let Expprecedent = document.createElement('div')
        Expprecedent.classList.add('Expperecedent')
        Expprecedent.innerHTML = `<div class="group">
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

        const SuppExperience = Expprecedent.querySelector(".btnSupprimer")
        SuppExperience.addEventListener("click", () => {
            Expprecedent.remove()

        })
    })


}


ExpDynamique()


function Afficherinfo() {
    const InfoEmp = document.querySelector(".InfoEmp");
    InfoEmp.innerHTML = "";

    ListEmploye.forEach(e => {
        InfoEmp.insertAdjacentHTML("beforeend",
            `  
        <div class="employe-card">
            <img alt="image" class="imgprofile" src="${e.img}">
            <div class="rolename">
                <h4>${e.nom}</h4>
                <h5>${e.role}</h5>
            </div>
        </div>
        `);
    });

   ZoneAff()
}








Afficherinfo()

function AjoutEmploye() {

    btnEnregistrer.addEventListener("click", (e) => {
        e.preventDefault();
        const Employe = {
            nom: document.querySelector(".nom").value,
            email: document.querySelector(".email").value,
            tel: document.querySelector(".tel").value,
            img: document.querySelector(".img").value || 'img/profile.png',
            role: document.querySelector("#role").value,
            zone: "ussingned",
            Expriences: []

        }
        const Allexp = ContainerExpe.querySelectorAll(".Expperecedent")
        Allexp.forEach(e => {
            const Experience = {
                post: e.querySelector(".post").value,
                Debut: e.querySelector(".Deb").value,
                Fin: e.querySelector(".Fin").value,
                Compagnie: e.querySelector(".Compangie").value,
            }
            Employe.Expriences.push(Experience);

        })

        ListEmploye.push(Employe);
        localStorage.setItem("ListEmploye", JSON.stringify(ListEmploye));
        Afficherinfo()
        form.reset()
        ContainerExpe.innerHTML = "";
        modalOverlay.style.display = "none"


    })
    Afficherinfo()

}
AjoutEmploye()



inputImg.addEventListener("input", () => {
    url = inputImg.value;
    if (url === "") {
        previewImg.style.display = "none"
        previewImg.src = ""
        return;
    } else {
        previewImg.src = url;
        previewImg.style.display = "block";
    }


})





 function ZoneAff() {
    //salle reception

    document.querySelector("#sallRec").addEventListener("click", () => {

        const listRec = document.querySelector("#listRec");

        listRec.style.display = "flex"
        listRec.innerHTML = "";
        const ListRec = ListEmploye.filtre((emp) => { return emp.zone === "ussingned" && (emp.role === "receptionnite" || emp.role === "Manager" || emp.role === "nettoyage") })
        if (ListRec.length === 0) {
            listRec.insertAdjacentElement("beforeend", '<p>aucun</p>')
        }
        else {
            ListEmploye.forEach(emp => {

                document.querySelector("#listRec").insertAdjacentHTML("beforeend", `
                    <div class="employe-card2">
                        <img alt="image" class="imgprofile2" src="${emp.img}">
                        <div class="rolename2">
                            <h4>${emp.nom}</h4>
                            <h5>${emp.role}</h5>
                        </div>
                    </div>
            
            `)
            }

            )
        }

        listRec.insertAdjacentHTML("afterbegin", `<button class="closeRec">Fermer</button>`);
        const close = document.querySelector(".closeRec");
        close.addEventListener("click", () => {
            listRec.style.display = "none";

        })
    })


    //SALLE de personnel


     document.querySelector("#sallP").addEventListener("click", () => {
         const listPer = document.querySelector("#listPer")


         listPer.style.display = "flex"
         listPer.innerHTML = "";
         const ListPer = ListEmploye.filter(em => {
             return em.zone === "ussingned"
         })

        if (ListPer.length === 0) {
         listPer.insertAdjacentHTML("beforeend", `   <p>aucun</p> `)

         }
         else {
             ListPer.forEach(emp => {

                listPer.insertAdjacentHTML("beforeend", `
                    <div class="employe-card2">
                         <img alt="image" class="imgprofile2" src="${emp.img}">
                         <div class="rolename2">
                             <h4>${emp.nom}</h4>
                             <h5>${emp.role}</h5>
                         </div>
                     </div>
            
            `)
            }
             )
         }
         listPer.insertAdjacentHTML("afterbegin", `<button class="closePer">Fermer</button>`);
         const close = document.querySelector(".closePer");
         close.addEventListener("click", () => {
            listPer.style.display = "none";

        })
            ;
    })

    //salle de conference   

    document.querySelector("#sallC").addEventListener("click", () => {
        const ListC = document.querySelector("#listC")
        ListC.style.display = "flex"
         ListC.innerHTML = "";
         const ListConference = ListEmploye.filter(emp => {
             return emp.zone === "ussingned"
         })

        if (ListConference.length === 0) {
            ListC.insertAdjacentHTML("beforeend", `<p>aucun</p>`)
        } else {
            ListConference.forEach(emp => {

                ListC.insertAdjacentHTML("beforeend", `
                    <div class="employe-card2">
                        <img alt="image" class="imgprofile2" src="${emp.img}">
                         <div class="rolename2">
                             <h4>${emp.nom}</h4>
                            <h5>${emp.role}</h5>
                        </div>
                    </div>
            
             `)
             })

            ListC.insertAdjacentHTML("afterbegin", `<button class="closeCon">Fermer</button>`);
            const close = document.querySelector(".closeCon");
            close.addEventListener("click", () => {
                 ListC.style.display = "none";

            })
        }
    })










    // //salle serveur
    // document.querySelector("#salSer").addEventListener("click", () => {
    //     const listSer = document.querySelector("#listSer");
    //     listSer.style.display = "flex"
    //     listSer.innerHTML = "";

    //     const ListServeurs = ListEmploye.filter(emp =>
    //         emp.zone === "ussingned" && (emp.role === "Technicien-IT" || emp.role === "Manager" || emp.role === "nettoyage")
    //     )

    //     if (ListServeurs.length === 0) {
    //         document.querySelector("#listSer").insertAdjacentHTML("beforeend", `<p>aucun</p>`)
    //     } else {
    //         ListServeurs.forEach(emp => {
    //             listSer.insertAdjacentHTML("beforeend", `
    //                 <div class="employe-card2">
    //                     <img alt="image" class="imgprofile2" src="${emp.img}">
    //                     <div class="rolename2">
    //                         <h4>${emp.nom}</h4>
    //                         <h5>${emp.role}</h5>
    //                     </div>
    //                 </div>
            
    //         `)
    //         })

    //     }
    //     listArch.insertAdjacentHTML(
    //         "afterbegin",
    //         `<button class="closeSer">Fermer</button>`
    //     );
    //     const close = document.querySelector(".closeSer");
    //     close.addEventListener("click", () => {
    //         listSer.style.display = "none";

    //     })
    // })

    // //salle Archive
    // document.querySelector("#sallAr").addEventListener("click", () => {
    //     const listArch = document.querySelector("#listArch");
    //     listArch.style.display = "flex"
    //     listArch.innerHTML = "";
    //     const ListArchive = ListEmploye.filter(emp =>
    //         emp.zone === "ussingned" && emp.role != "nettoyage"
    //     )

    //     if (ListArchive.length === 0) {
    //         listArch.insertAdjacentHTML("beforeend", `<p>aucun</p>`)
    //     } else {
    //         ListArchive.forEach(emp => {
    //             document.querySelector("#listArch").insertAdjacentHTML("beforeend", `
    //                 <div class="employe-card2">
    //                     <img alt="image" class="imgprofile2" src="${emp.img}">
    //                     <div class="rolename2">
    //                         <h4>${emp.nom}</h4>
    //                         <h5>${emp.role}</h5>
    //                     </div>
    //                 </div>
            
    //         `)
    //         })

    //     }
    //     listArch.insertAdjacentHTML(
    //         "afterbegin",
    //         `<button class="closeArch">Fermer</button>`
    //     );
    //     const close = listArch.querySelector(".closeArch");
    //     close.addEventListener("click", () => {
    //         listArch.style.display = "none";
    //     });
    // })


    // //salle de securite
    // document.querySelector("#sallSec").addEventListener("click", () => {
    //     const listSec = document.querySelector("#listSec");

    //     listSec.style.display = "flex";
    //     listSec.innerHTML = "";

    //     const ListSecu = ListEmploye.filter(emp =>
    //         emp.zone === "ussingned" &&
    //         (emp.role === "Agent-sécurité" || emp.role === "nettoyage")
    //     );

    //     if (ListSecu.length === 0) {
    //         listSec.insertAdjacentHTML("beforeend", `<p>aucun</p>`);
    //     } else {
    //         ListSecu.forEach(emp => {
    //             listSec.insertAdjacentHTML("beforeend", `
    //             <div class="employe-card2">
    //                 <img alt="image" class="imgprofile2" src="${emp.img}">
    //                 <div class="rolename2">
    //                     <h4>${emp.nom}</h4>
    //                     <h5>${emp.role}</h5>
    //                 </div>
    //             </div>
    //         `);
    //         });
    //     }


    //     listSec.insertAdjacentHTML(
    //         "afterbegin",
    //         `<button class="closeSec">Fermer</button>`
    //     );


    //     const close = listSec.querySelector(".closeSec");
    //     close.addEventListener("click", () => {
    //         listSec.style.display = "none";
    //     });
    // });










}


