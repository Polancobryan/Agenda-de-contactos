const boton = document.querySelector('button');
const Name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre = Name.value;
    const correo = email.value;
    const contrasena = password.value;

    if(nombre && correo && contrasena != ""){
        swal.fire({
            text: 'Usuario registrado!',
            showConfirmButton: false,
            timer: 5000,
        })        
    }else{
        swal.fire({
            text:'Tienes campos por completar!',
            toast: true,
            icon: 'warning',
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
    }
})

