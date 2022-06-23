let page;

document.addEventListener('DOMContentLoaded', function () {
    page = new Page(window);
});

class Page {
    constructor() {
        this.attachEvents();
        this.loadDataUser();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnLogout = this.get('#btnLogout');
        btnLogout.addEventListener('click', this.logout);
    }

    loadDataUser() {
        window.ipcRender.invoke('getUserData').then((result) => {
            const { user, email, permissions, image } = result;

            console.log(user);
            console.log(email);
            console.log(permissions);
            console.log(image);
        });
    }

    logout() {
        window.ipcRender.send('logout', 'confirm-logout');
    }
}