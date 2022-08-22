const boton = document.getElementById('button');
const correo = document.getElementById('correo');
const clave = document.getElementById('clave');

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = correo.value;
    const password = clave.value;

    if(email & password == ""){
        swal.fire({
            text:'Completa todos los campos para iniciar sesion!',
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
          })
    } else {
        vacio(email, password);
    }
});

function vacio(email, password) {
    if(email !== "" & password !== "") {
        validaEmail(email);

    } else {
        swal.fire({
        icon: 'warning',
        text:'Completa los campos vacios',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__shakeX'
        },

        hideClass:{
            popup: 'animate__animated animate__fadeOut'

            }
        });
    };
};

function validaEmail(valor){  
    const email = valor;

    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor)) {

        swal.fire({
            icon: 'warning',
            text:'EL correo que ingresaste es incorrecto',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },

            hideClass:{
                popup: 'animate__animated animate__fadeOut'
                }
            });

        return false;

    } else {
       bloqueados(email);

        return true;
    };
};

function bloqueados(email) {
    if(email == "carlos@gmail.com" || email == "luis@gmail.com") {
        swal.fire({
            icon: 'warning',
            text:'Este usuario esta baneado',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
    
            hideClass:{
                popup: 'animate__animated animate__fadeOut'}
            });

    } else {
        swal.fire({
            text:'Has iniciado sesion',
            showConfirmButton: false,});

            correo.value = "";
            clave.value = "";
    
            setTimeout(irVentana, 5000);
    }
}

function irVentana() {
    window.location.href = "/Agenda%20de%20contactos/main.html";
}


    