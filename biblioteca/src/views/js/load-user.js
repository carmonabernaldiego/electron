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
      const { user, email, permissions, image, name } = result;

      if (permissions == 'admin') {
        profileName.innerHTML = name;
        profileEmail.innerHTML = email;
        profileUser.src = 'http://mysoftup.com/images/users/' + image;
        profileUserBox.src = 'http://mysoftup.com/images/users/' + image;
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