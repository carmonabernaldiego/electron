let page;

document.addEventListener('DOMContentLoaded', function () {
    page = new Page(window);

    let profileUser = page.get('#profileUser');
    let profileUserBox = page.get('#profileUserBox');
    let profileName = page.get('#profileName');
    let profileEmail = page.get('#profileEmail');
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
            const { user, email, permissions, image, name, surnames } = result;

            profileUser.src = "http://mysoftup.com/images/users/" + image;
            profileUserBox.src = "http://mysoftup.com/images/users/" + image;
            profileName.innerHTML = name + ' ' + surnames;
            profileEmail.innerHTML = email;
        });
    }

    logout() {
        window.ipcRender.send('logout', 'confirm-logout');
    }
}