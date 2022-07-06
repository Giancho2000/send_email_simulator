// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');

const Formulario = document.querySelector('#enviar-mail');

const cmpEmail = document.querySelector('#email');
const cmpAsunto = document.querySelector('#asunto');
const cmpMensaje = document.querySelector('#mensaje');
// Expresion Regular para validar un Email.
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {

    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del Formulario
    cmpEmail.addEventListener('blur', validarCampo);
    cmpAsunto.addEventListener('blur', validarCampo);
    cmpMensaje.addEventListener('blur', validarCampo);

    // Resetear formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar Email
    Formulario.addEventListener('submit', enviarEmail);

}

// Funciones
    //Iniciar App
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

    //Validar Campos del Formulario
function validarCampo(e) {

    if (e.target.value.length > 0) {
        // Elimina los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        //e.target.style.borderBottomColor = 'red'; Agregarle un atributo en los ESTILOS
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los comentarios son obligatorios');
    }

    if (e.target.type === 'email') {

        if (er.test( e.target.value)) {
            const error = document.querySelector('p.error');
                if (error) {
                    error.remove();
                }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (er.test( cmpEmail.value ) && cmpAsunto.value !== '' && cmpMensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('background-red-100', 'text-red-500', 'p-3', 'text-center', 'mt-5', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

function enviarEmail(e) {
    e.preventDefault();

    //Mostrar el Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Desaparecer el spinner despues de 3 segundos
    setTimeout(() => {// Ejecuta la funcion despues de el tiempo(3 segundos)
        spinner.style.display = 'none';

        // Mostramos un mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Se envio el mensaje con Exito';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'color-green-500', 'text-white', 'font-bold', 'uppercase');
        Formulario.insertBefore(parrafo, spinner); 
            setTimeout(() => {
                parrafo.remove();
                resetearFormulario();
            }, 4000);
    }, 3000);
    //setInnterval ejecuta la funcion cada determinado tiempo (3 segundo o el tiempo programado)

}

// Reiniciar el formulario
function resetearFormulario() {
    Formulario.reset();

    iniciarApp();
}