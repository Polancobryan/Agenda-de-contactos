const nombre = document.querySelector('.nombre');
const apellido = document.querySelector('.apellido');
const telefono = document.querySelector('.telefono');
const correo = document.querySelector('.email');
const ul = document.querySelector('ul');
const add = document.querySelector('.add');
const emptyScreen = document.querySelector('.empty');
const contenedor = document.querySelector('.contenedor');
const agregar = document.querySelector('.agregar');
const logout = document.querySelector('.logout');
let contactos = [];
let id = Date.now();

loadContacs();

add.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nombre.value;
    const lastName = apellido.value;
    const phone = telefono.value;
    const email = correo.value;

    if (name !== "") {

        const contact = {
            name,
            lastName,
            phone,
            email,
            id
        }
        contactos = [...contactos,contact];
        localStorage.setItem("contacts",JSON.stringify(contactos));

        const p = document.createElement('p');
        const img = document.createElement('section');
        const div = document.createElement("div");
        const li = document.createElement('li');

        p.innerHTML = `<b>${name} ${lastName}<b/> <br/> ${phone} <br/> ${email}`;
        img.innerHTML = '<img src="/Agenda de contactos/media/abstract-user-flat-4.svg" class="contactP">'
        
        li.appendChild(img);
        li.appendChild(p);
        div.appendChild(remove());
        li.appendChild(div);
        ul.appendChild(li);

        swal.fire({
            text:'Contacto agregado exitosamente',
            position: 'top',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }); 

        nombre.value = "";
        apellido.value = "";
        telefono.value = "";
        correo.value = "";
        ul.style.display = "flex";

        empty();
    } else{
          swal.fire({
            text:'NO puedes agregar un contacto sin nombre',
            position: 'top',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
})

function loadContacs(){
    document.addEventListener('DOMContentLoaded',() => {
        contactos = JSON.parse(localStorage.getItem("contacts")) || [];
        contactos.forEach(contact => {
            const p = document.createElement('p');
            const img = document.createElement('section');
            const li = document.createElement('li');
            const div = document.createElement("div");

            p.innerHTML = `<b>${contact.name} ${contact.lastName}<b/> <br/> ${contact.phone} <br/> ${contact.email}`;
            img.innerHTML = '<img src="/Agenda de contactos/media/abstract-user-flat-4.svg" class="contactP">'
            
            li.appendChild(img);
            li.appendChild(p);
            div.appendChild(remove());
            li.appendChild(div);
            ul.appendChild(li);
        })
        empty();
    })
}

function remove() {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<svg class="delete" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="48px"><path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"/></svg>'
    deleteBtn.setAttribute("id", id);
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
        Swal.fire({
            icon: 'question' ,
            title: 'Quieres eliminar este contacto?',
            text: 'Esta accion no puede ser deshecha',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    showConfirmButton: false,
                    position: 'top',
                    toast: true,
                    text:'Contacto eliminado',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })

                const contacto = e.target.parentNode.parentNode.parentNode;
                ul.removeChild(contacto);
                contactos = JSON.parse(localStorage.getItem('contacts'));
                contactos.splice(e,1);
                localStorage.setItem('contacts', JSON.stringify(contactos));

                empty();

            } else if (result.isDenied) {
                swal.fire({
                    showConfirmButton: false,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    text:'Ok',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }
          })
    })
    return deleteBtn;
}

function empty() {
    const items = document.querySelectorAll("li");
        if (items.length == 0){
            emptyScreen.style.display = "flex";
            ul.style.display = "none";
            contenedor.style.backgroundColor = 'rgb(233, 233, 233)';
            contenedor.style.boxShadow = '0px 0px 5px black;'
            agregar.style.backgroundColor = 'none';
            agregar.style.boxShadow = "none";
            li.display.boxShadow = 'none';
        }else{
            emptyScreen.style.display = "none";
            ul.style.display = "flex";
            contenedor.style.backgroundColor = "transparent";
            contenedor.style.boxShadow = 'none';
            agregar.style.boxShadow = "0px 0px 5px black";
            agregar.style.backgroundColor = 'rgb(233, 233, 233)';
            li.display.boxShadow = '0px 0px 5px black';
        }   
}

document.addEventListener("keyup", e => {
    if (e.target.matches('.search')){

        if(e.key === 'Scape')e.target.value = "";

        document.querySelectorAll('li').forEach(contact => {
            contact.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?contact.classList.remove('filter')
                :contact.classList.add('filter');
        })
    }
})

logout.addEventListener("click",(e) => {
    Swal.fire({
        title: 'Quieres cerra la sesion?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Sesión Cerrada')
            setTimeout(irVentana, 5000);
        } else if (result.isDenied) {
          Swal.fire('Ok')
        }
      })
    } 
)

function irVentana() {
    window.location.href = "/Agenda%20de%20contactos/loginvista.html";
}