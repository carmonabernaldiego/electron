let pageBooks;

document.addEventListener('DOMContentLoaded', function () {
    pageBooks = new PageBooks(window);
});

const showBooks = (isbn, nombres, carreras, ubicaciones, editoriales) => {
    const contenedorLibros = document.querySelector('#content-books');
    let texto = '';
    let contador = 1;

    for (let i = 0; i < nombres.length; i++) {
        texto +=
            `
            <div class="col-md-4 stretch-card grid-margin grid-margin-md-0">
              <div class="card">
                <div class="card-header border-0 text-center">${nombres[i]}</div>
                <img src="../assets/images/book.jpg" class="card-img" alt="">
                <div class="card-body">
                    <h6 class="card-subtitle text-body">ISBN: ${isbn[i]}</h6>
                  <h6 class="card-subtitle text-body">Carrera: ${carreras[i]}</h6>
                  <h6 class="card-subtitle text-body">Ubicación: ${ubicaciones[i]}</h6>
                  <h6 class="card-subtitle text-body">Editorial: ${editoriales[i]}</h6>
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
        this.loadBooks();
    }

    get(id) {
        return document.querySelector(id);
    }

    loadBooks() {
        window.ipcRender.invoke('getBooks').then((result) => {
            let { isbn, nombre, carrera, ubicacion, editorial } = result;

            isbn = isbn.replace(/(^_)|(_$)/g, '');
            nombre = nombre.replace(/(^_)|(_$)/g, '');
            carrera = carrera.replace(/(^_)|(_$)/g, '');
            ubicacion = ubicacion.replace(/(^_)|(_$)/g, '');
            editorial = editorial.replace(/(^_)|(_$)/g, '');

            isbn = isbn.split("_");
            nombre = nombres.split("_");
            carrera = carreras.split("_");
            ubicacion = ubicaciones.split("_");
            editorial = editoriales.split("_");

            showBooks(isbn, nombre, carrera, ubicacion, editorial);
        });
    }
}