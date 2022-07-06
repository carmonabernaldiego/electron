let pageBooks;

document.addEventListener('DOMContentLoaded', function () {
    pageBooks = new PageBooks(window);
});

const showBooks = (nombres, carreras, ubicaciones, editoriales) => {
    const contenedorLibros = document.querySelector('#content-books');
    let texto = '';
    let contador = 1;

    for (let i = 0; i < nombres.length; i++) {
        texto +=
            `
            <div class="col-md-4 stretch-card grid-margin grid-margin-md-0">
              <div class="card text-white bg-secondary">
                <div class="card-header border-0 text-center">${nombres[i]}</div>
                <img src="../assets/images/book.jpg" class="card-img" alt="">
                <div class="card-body">
                  <h6 class="card-subtitle text-white">Carrera: ${carreras[i]}</h6>
                  <h6 class="card-subtitle text-white">Ubicación: ${ubicaciones[i]}</h6>
                  <h6 class="card-subtitle text-white">Editorial: ${editoriales[i]}</h6>
                </div>
              </div>
            </div>
        `;

        if (contador == 3) {
            contenedorLibros.innerHTML += '<div class="row pb-4">' + texto + '</div>';
            texto = '';
            contador = 0;
        }
        contador++;
    }
    contenedorLibros.innerHTML += '<div class="row pb-4">' + texto + '</div>';
}

class PageBooks {
    constructor() {
        this.attachEvents();
        this.loadBooks();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnLogout = this.get('#btnLogout');
        btnLogout.addEventListener('click', this.logout);
    }

    loadBooks() {
        window.ipcRender.invoke('getBooks').then((results) => {
            const { nombre, carrera, ubicacion, editorial } = results;

            let nombres = nombre.replace(/(^_)|(_$)/g, '');
            let carreras = carrera.replace(/(^_)|(_$)/g, '');
            let ubicaciones = ubicacion.replace(/(^_)|(_$)/g, '');
            let editoriales = editorial.replace(/(^_)|(_$)/g, '');

            nombres = nombres.split("_");
            carreras = carreras.split("_");
            ubicaciones = ubicaciones.split("_");
            editoriales = editoriales.split("_");

            showBooks(nombres, carreras, ubicaciones, editoriales);
        });

    }

    logout() {
        window.ipcRender.send('logout', 'confirm-logout');
    }
}