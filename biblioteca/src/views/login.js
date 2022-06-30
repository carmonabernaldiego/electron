let page;

document.addEventListener('DOMContentLoaded', function () {
    page = new PageLogin(window);
});

class PageLogin {
    constructor() {
        this.attachEvents();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnLogin = this.get('#btnLogin');
        btnLogin.addEventListener('click', this.login);

        let btnInvitado = this.get('#btnInvitado');
        btnInvitado.addEventListener('click', this.invitado);
    }

    login() {
        let error = page.get('#text-error');

        let email = page.get('#txtEmail').value;
        let password = page.get('#txtPassword').value;

        if (email == '') {
            error.innerHTML = 'Ingresá tú dirección de correo electrónico.';
            error.classList.remove("text-muted");
            error.classList.add("text-danger");
        } else if (password == '') {
            error.innerHTML = 'Ingresá tú contraseña.';
            error.classList.remove("text-muted");
            error.classList.add("text-danger");
        } else {
            const data = { email: email, password: password };

            window.ipcRender.send('login', data);
        }
    }

    invitado() {
        window.ipcRender.send('invitado', 'invitado');
    }
}