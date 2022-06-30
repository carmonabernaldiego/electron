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
        let profileUser = this.get('#profileUser');
        let profileUserBox = this.get('#profileUserBox');
        let profileName = this.get('#profileName');
        let profileEmail = this.get('#profileEmail');
        let navUser = this.get('#navUser');

        window.ipcRender.invoke('getUserData').then((result) => {
            const { user, email, permissions, image, name, surnames } = result;

            if (permissions == 'admin') {
                profileUser.src = "http://mysoftup.com/images/users/" + image;
                profileUserBox.src = "http://mysoftup.com/images/users/" + image;
                profileName.innerHTML = name + ' ' + surnames;
                profileEmail.innerHTML = email;

                let texto =
                    `
                    <li class="nav-item nav-category">Estantes</li>
                    <li class="nav-item">
                      <a href="consultar.html" class="nav-link">
                        <i class="link-icon" data-feather="search"></i>
                        <span class="link-title">Consultar Libros</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="agregar.html" class="nav-link">
                        <i class="link-icon" data-feather="plus-circle"></i>
                        <span class="link-title">Agregar Libros</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="modificar.html" class="nav-link">
                        <i class="link-icon" data-feather="edit"></i>
                        <span class="link-title">Modificar Libros</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="eliminar.html" class="nav-link">
                        <i class="link-icon" data-feather="delete"></i>
                        <span class="link-title">ELiminar Libros</span>
                      </a>
                    </li>
                `;

                navUser.innerHTML += texto;
            } else if (permissions == 'invitado') {
                profileName.innerHTML = 'Invitado';
                profileEmail.innerHTML = 'invitado@ckh.com';
            }
        });
    }

    logout() {
        window.ipcRender.send('logout', 'confirm-logout');
    }
}