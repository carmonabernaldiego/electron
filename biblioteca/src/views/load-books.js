let pageBooks;

document.addEventListener('DOMContentLoaded', function () {
    pageBooks = new PageBooks(window);
});

const filtrarCarrera = (carrera) => {
    connection.query(
        `SELECT * FROM LIBRO WHERE carrera = "${carrera}"; `,
        function (error, results, fields) {
            mostrarLibros(results);
        }
    );
}

import { ordenamientoArbol } from './metodos-tree.js';

const mostrarLibros = (libros) => {
    const contenedorLibros = document.querySelector('#content-books');
    let texto = '';
    let contador = 1;

    libros = ordenamientoArbol(libros);

    for (let i = 0; i < libros.length; i++) {
        texto +=
            `
            <div class="col-md-4 stretch-card grid-margin grid-margin-md-0">
              <div class="card">
                <div class="card-header border-0 text-center">${libros[i].nombre}</div>
                <img src="../assets/images/book.jpg" class="card-img" alt="">
                <div class="card-body">
                    <h6 class="card-subtitle text-body">ISBN: ${libros[i].isbn}</h6>
                  <h6 class="card-subtitle text-body">Carrera: ${libros[i].carrera}</h6>
                  <h6 class="card-subtitle text-body">Ubicación: ${libros[i].ubicacion}</h6>
                  <h6 class="card-subtitle text-body">Editorial: ${libros[i].editorial}</h6>
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
        let btnMostrarTodo = this.get('#btnMostrarTodo');
        btnMostrarTodo.addEventListener('click', this.loadBooks);
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
            nombre = nombre.split("_");
            carrera = carrera.split("_");
            ubicacion = ubicacion.split("_");
            editorial = editorial.split("_");

            let libros = [];

            for (let i = 0; i < isbn.length; i++) {
                libros.push({
                    'isbn': isbn[i],
                    'nombre': nombre[i],
                    'carrera': carrera[i],
                    'ubicacion': ubicacion[i],
                    'editorial': editorial[i]
                });
            }

            mostrarLibros(libros);
        });

    }

    logout() {
        //window.ipcRender.send('logout', 'confirm-logout');
    }
}