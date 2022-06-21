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
    }

    login() {
        let email = page.get('#txtEmail').value;
        let password = page.get('#txtPassword').value;

        if (email == '') {
            alert('Ingresá tú dirección de correo electrónico.');
        } else if (password == '') {
            alert('Ingresá tú contraseña.');
        } else {
            const data = { email: email, password: password };

            window.ipcRender.send('login', data);
        }
    }
}