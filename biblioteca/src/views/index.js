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
            console.log(result);
        });
    }

    logout() {
        window.ipcRender.send('render-to-main', 'confirm-logout');
    }
}