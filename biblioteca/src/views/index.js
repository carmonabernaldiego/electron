let page;

document.addEventListener('DOMContentLoaded', function () {
    page = new Page(window);
});

class Page {
    constructor() {
        this.attachEvents();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnLogout = this.get('#btnLogout');
        btnLogout.addEventListener('click', this.loadDataUser);
    }

    loadDataUser() {
        window.ipcRender.invoke('getUserData').then((result) => {
            console.log(result);
        });
    }
}