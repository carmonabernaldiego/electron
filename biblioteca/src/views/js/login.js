let error = document.querySelector('#text-error');
let email = document.querySelector('#txtEmail');
let password = document.querySelector('#txtPassword');

let btnLogin = document.querySelector('#btnLogin');

btnLogin.addEventListener('click', () => {
    validateInputs();
});

let btnInvitado = document.querySelector('#btnInvitado');

btnInvitado.addEventListener('click', () => {
    invitado();
});

const formSubmit = (event) => {
    event.preventDefault();
    login();
    return false;
}

const login = () => {
    if (!(email.value == '' && password.value == '')) {
        const data = { email: email.value, password: password.value };

        window.ipcRender.send('login', data);

        setTimeout(errorLogin, 300);
    }
}

const errorLogin = () => {
    error.innerHTML = 'Correo electrónico o contraseña equivocada.';
    error.classList.remove('text-muted');
    error.classList.add('text-danger');

    email.value = '';
    password.value = '';
    email.focus();
}

const validateInputs = () => {
    if (email.value == '') {
        error.innerHTML = 'Ingresá tú dirección de correo electrónico.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else if (password.value == '') {
        error.innerHTML = 'Ingresá tú contraseña.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    }
}

const invitado = () => {
    window.ipcRender.send('invitado', 'invitado');
}