const ContainerExpe = document.querySelector(".expContainer");
const ContainerExpe2 = document.querySelector(".expContainer2");
const form = document.querySelector("form")
const ListempAff = document.querySelector("#listEmployee")

const AddExperiece = document.querySelector(".btnAjout");
const Addnewworker = document.querySelector(".addemployer");
const inputImg = document.querySelector("#img");
const previewImg = document.querySelector("#previewImg");
const btnEnregistrer = document.querySelector("button[type=submit]")






let idEmp = JSON.parse(localStorage.getItem("CurrentId") || "1");


const modalOverlay = document.querySelector(".modalOverlay");
const closeModal = document.querySelector(".closeModal");

const modalOverlay2 = document.querySelector(".modalOverlay2");
const closeModal2 = document.querySelector(".closeModal2");


Addnewworker.addEventListener("click", () => {
    modalOverlay.style.display = "flex"

})
closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none"
    ContainerExpe.style.display = "none"


})



document.querySelectorAll(".employe-card").forEach(card => {
    card.addEventListener("click", () => {
        modalOverlay2.style.display = "flex";


    });
});
closeModal2.addEventListener("click", () => {
    modalOverlay2.style.display = "none"



})
document.querySelectorAll(".employe-card").forEach(card => {
    card.addEventListener("click", () => {
        modalOverlay2.style.display = "flex";


    });
});







const ListEmploye = JSON.parse(localStorage.getItem("ListEmploye") || "[]")




function ExpDynamique() {
    ContainerExpe.style.display="none"

    AddExperiece.addEventListener("click", (e) => {
        e.preventDefault()
        ContainerExpe.style.display="flex"
        let Expprecedent = document.createElement('div')
        Expprecedent.classList.add('Expperecedent')
        Expprecedent.innerHTML = `
                    <div class="group">
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
            ContainerExpe.style.display="none"
            Expprecedent.remove()

        })
    })


}


ExpDynamique()


// function Afficherinfo() {
//     const InfoEmp = document.querySelector(".InfoEmp");
//     InfoEmp.innerHTML = "";
//     const listUnssigned =ListEmploye.filter((e)=>{
//        return  e.zone==="ussingned"
//     })

//     listUnssigned.forEach(e => {
        
//         InfoEmp.insertAdjacentHTML("beforeend",
//             `  
//         <div   class="employe-card" onclick="Afficheprofile(${e.idEmp})">
        
//             <img alt="image" class="imgprofile" src="${e.img}">
//             <div class="rolename">
//                 <h4>${e.nom}</h4>
//                 <h5>${e.role}</h5>
//             </div>
//         </div>
//         `);
//     });

//     ZoneAff()

// }



function Afficherinfo() {
    const InfoEmp = document.querySelector(".InfoEmp");
    InfoEmp.innerHTML = "";

    const listUnssigned = ListEmploye.filter(e => e.zone === "ussingned");

    listUnssigned.forEach(e => {
        InfoEmp.insertAdjacentHTML("beforeend",
            `  
        <div class="employe-card" onclick="Afficheprofile(${e.idEmp})">

            <img alt="image" class="imgprofile" src="${e.img || 'img/profile.png'}">
            <div class="rolename">
                <h4>${e.nom}</h4>
                <h5>${e.role}</h5>
            </div>
        </div>
        `);
    });

    ZoneAff(); 
}


Afficherinfo()

function AjoutEmploye() {

    btnEnregistrer.addEventListener("click", (e) => {
        e.preventDefault();
        const Employe = {
            idEmp: ++idEmp,
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
        localStorage.setItem("CurrentId", JSON.stringify(Employe.idEmp));
        Afficherinfo()
        form.reset()
        resetPreview()
        ContainerExpe.innerHTML = "";
        modalOverlay.style.display = "none"


    })
    // Afficherinfo()

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
function resetPreview() {
    previewImg.src = "";
    previewImg.style.display = "none";
}






function ZoneAff() {
    //salle reception

    document.querySelector("#sallRec").addEventListener("click", () => {

        const listRec = document.querySelector("#listRec");

        listRec.style.display = "flex"
        listRec.innerHTML = "";
        const ListRec = ListEmploye.filter((emp) => { return emp.zone === "ussingned" && (emp.role === "receptionnite" || emp.role === "Manager" || emp.role === "nettoyage") })
       
        if (ListRec.length === 0) {
            listRec.insertAdjacentHTML("beforeend", '<p>aucun</p>')
        }
        else {
            ListRec.forEach(emp => {

                listRec.insertAdjacentHTML("beforeend", `
                    <div class="employe-card2">
                        <img alt="image" class="imgprofile2" src="${emp.img}">
                        <div class="rolename2">
                            <h4>${emp.nom}</h4>
                            <h5>${emp.role}</h5>
                        </div>
                    </div>
            
            `)
                let card = listRec.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "reception", ".Reception", card)

                })
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
                let card = listPer.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "personnel", ".Personnel", card)

                })
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
              let card = ListC.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "conference", ".Conference", card)


                })

            })

            ListC.insertAdjacentHTML("afterbegin", `<button class="closeCon">Fermer</button>`);
            const close = document.querySelector(".closeCon");
            close.addEventListener("click", () => {
                ListC.style.display = "none";

            })
        }
    })










    //salle serveur
    document.querySelector("#sallSer").addEventListener("click", () => {
        const listSer = document.querySelector("#listSer");
        listSer.style.display = "flex"
        listSer.innerHTML = "";

        const ListServeurs = ListEmploye.filter(emp =>
            emp.zone === "ussingned" && (emp.role === "Technicien-IT" || emp.role === "Manager" || emp.role === "nettoyage")
        )

        if (ListServeurs.length === 0) {
            document.querySelector("#listSer").insertAdjacentHTML("beforeend", `<p>aucun</p>`)
        } else {
            ListServeurs.forEach(emp => {
                listSer.insertAdjacentHTML("beforeend", `
                     <div class="employe-card2">
                         <img alt="image" class="imgprofile2" src="${emp.img}">
                         <div class="rolename2">
                             <h4>${emp.nom}</h4>
                             <h5>${emp.role}</h5>
                         </div>
                     </div>
            
             `)
              let card = listSer.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "serveur", ".Serveur", card)

                })
            })

        }
        listSer.insertAdjacentHTML(
            "afterbegin",
            `<button class="closeSer">Fermer</button>`
        );
        const close = document.querySelector(".closeSer");
        close.addEventListener("click", () => {
            listSer.style.display = "none";

        })
    })

    //salle Archive
    document.querySelector("#sallAr").addEventListener("click", () => {
        const listArch = document.querySelector("#listArch");
        listArch.style.display = "flex"
        listArch.innerHTML = "";
        const ListArchive = ListEmploye.filter(emp =>
            emp.zone === "ussingned" && emp.role != "nettoyage"
        )

        if (ListArchive.length === 0) {
            listArch.insertAdjacentHTML("beforeend", `<p>aucun</p>`)

            

        } else {
            ListArchive.forEach(emp => {
                document.querySelector("#listArch").insertAdjacentHTML("beforeend", `
                     <div class="employe-card2">
                         <img alt="image" class="imgprofile2" src="${emp.img}">
                        <div class="rolename2">
                             <h4>${emp.nom}</h4>
                            <h5>${emp.role}</h5>
                        </div>
                     </div>
            
            `)
             let card = listArch.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "archive", ".Archives", card)

                })
            })

        }
        listArch.insertAdjacentHTML(
            "afterbegin",
            `<button class="closeArch">Fermer</button>`
        );
        const close = listArch.querySelector(".closeArch");
        close.addEventListener("click", () => {
            listArch.style.display = "none";
        });
    })


    //salle de securite
    document.querySelector("#sallSec").addEventListener("click", () => {
        const listSec = document.querySelector("#listSec");

        listSec.style.display = "flex";
        listSec.innerHTML = "";

        const ListSecu = ListEmploye.filter(emp =>
            emp.zone === "ussingned" &&
            (emp.role === " Agent-sécurité" || emp.role === "nettoyage")
        );

        if (ListSecu.length === 0) {
            listSec.insertAdjacentHTML("beforeend", `<p>aucun</p>`);
            
        } else {
            ListSecu.forEach(emp => {
                listSec.insertAdjacentHTML("beforeend", `
                <div class="employe-card2">
                    <img alt="image" class="imgprofile2" src="${emp.img}">
                    <div class="rolename2">
                        <h4>${emp.nom}</h4>
                        <h5>${emp.role}</h5>
                    </div>
                </div>
            `);
             let card = listSec.lastElementChild;
                card.addEventListener("click", () => {
                    AjoutEmployeDansLazone(emp, "securite", ".Securite", card)

                })
            });
        }


        listSec.insertAdjacentHTML(
            "afterbegin",
            `<button class="closeSec">Fermer</button>`
        );


        const close = listSec.querySelector(".closeSec");
        close.addEventListener("click", () => {
            listSec.style.display = "none";
        });
    });









}


function Afficheprofile(id) {
    id = Number(id);
    const Empl = ListEmploye.find(e => {
        return e.idEmp === id
    })
    const url = document.querySelector(".Img")
    url.src = Empl.img
    const name = document.querySelector(".name1")
    const tele = document.querySelector(".tel1")
    const role = document.querySelector(".role")
    const email = document.querySelector(".email1")

    name.textContent = Empl.nom
    tele.textContent = Empl.tel
    role.textContent = Empl.role

    email.textContent = Empl.email

    modalOverlay2.style.display = "flex";

    if (Empl.Expriences.length === 0) {

        ContainerExpe2.style.display = "none"


    } else {

        ContainerExpe2.innerHTML = `
      
        <div class="Expperecedent">
          
        ${Empl.Expriences.map(e => {


            return `<div class="group"> Post :${e.post}</div>
             <div class="group"> companige :${e.Compagnie}</div>
              <div class="group"> nombre experience :${e.Fin - e.Deb}</div>`
        }


        ).join("")} </div>`


    }



}









const capaciteZone = {
    conference: 8,
    reception: 3,
    serveur: 2,
    personnel: 6,
    archive: 4,
    securite: 3
};


function AjoutEmployeDansLazone(emp, zoneName, zoneSelector, cardElement) {
    const zone = document.querySelector(zoneSelector);

      // Création du wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "emp-wrapper";
    const occupants = zone.querySelectorAll(".emp-wrapper").length;
    const max = capaciteZone[zoneName];

    if (occupants >= max) {
        alert(`La zone ${zoneName} est pleine (${max}/${max})`);
        return;
    }

    
    emp.zone = zoneName;
    localStorage.setItem("ListEmploye", JSON.stringify(ListEmploye));

  

    const newImg = document.createElement("img");
    newImg.className = "imgprofil-z";
    newImg.src = emp.img;
    newImg.alt = emp.nom;
    // newImg.id = emp.idEmp;

    newImg.addEventListener("click", () => {
        Afficheprofile(emp.idEmp);
    });

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "X";
    btnRemove.className = "btn-remove-zone";
    btnRemove.addEventListener("click", () => {
        
        emp.zone = "ussingned";
        localStorage.setItem("ListEmploye", JSON.stringify(ListEmploye));
        renderZones();
        Afficherinfo(); 

        
        const zonesBtns = ["#sallRec","#sallP","#sallC","#sallSer","#sallAr","#sallSec"];
        zonesBtns.forEach(z => {
            const list = document.querySelector(z.replace("#sall","#list"));
            if(list && list.style.display === "flex"){
                document.querySelector(z).click(); 
            }
        });
    });

    wrapper.appendChild(newImg);
    wrapper.appendChild(btnRemove);
    zone.appendChild(wrapper);

    if(cardElement) cardElement.remove();

    
    Afficherinfo();

    colorierToutesLesZones();
}


function renderZones() {
    const zones = {
        conference: document.querySelector(".Conference"),
        reception: document.querySelector(".Reception"),
        serveur: document.querySelector(".Serveur"),
        personnel: document.querySelector(".Personnel"),
        archive: document.querySelector(".Archives"),
        securite: document.querySelector(".Securite")
    };

   
    Object.values(zones).forEach(z => z.innerHTML = "");

    ListEmploye.forEach(emp => {
        if (!emp.zone || emp.zone === "ussingned") return;

        const zoneDiv = zones[emp.zone];
        if (!zoneDiv) return;

        const wrapper = document.createElement("div");
        wrapper.className = "emp-wrapper";

        const newImg = document.createElement("img");
        newImg.src = emp.img;
        newImg.className = "imgprofil-z";
        newImg.addEventListener("click", () => Afficheprofile(emp.idEmp));

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "X";
        btnRemove.className = "btn-remove-zone";
        btnRemove.addEventListener("click", () => {
            emp.zone = "ussingned";
            localStorage.setItem("ListEmploye", JSON.stringify(ListEmploye));
            renderZones();
            Afficherinfo();
        });

        wrapper.appendChild(newImg);
        wrapper.appendChild(btnRemove);
        zoneDiv.appendChild(wrapper);
    });

    colorierToutesLesZones();
}

function colorierZone(zoneSelector) {
    const zone = document.querySelector(zoneSelector);
    const parent = zone.parentElement;
    const count = zone.querySelectorAll(".emp-wrapper").length;
    parent.style.backgroundColor = count > 0 ? "rgba(0,128,0,0.5)" : "rgba(255,0,0,0.5)";

}

function colorierToutesLesZones() {
   
    colorierZone(".Reception");
    colorierZone(".Serveur");
   
    colorierZone(".Archives");
    colorierZone(".Securite");
}

renderZones();
colorierToutesLesZones();









