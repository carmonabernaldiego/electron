import { ordenamientoArbol, filtrarArbol } from './metodos-tree.js';

let pageBooks;

document.addEventListener('DOMContentLoaded', function () {
    pageBooks = new PageBooks(window);
});

class PageBooks {
    constructor() {
        this.attachEvents();
        this.buscarLibros('');
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnMostrarTodo = this.get('#btnMostrarTodo');
        let btnSoftware = this.get('#btnSoftware');
        let btnAmbiental = this.get('#btnAmbiental');
        let btnEnergia = this.get('#btnEnergia');
        let btnPymes = this.get('#btnPymes');
        let btnIngles = this.get('#btnIngles');
        let txtBuscar = this.get('#txtSearch');

        btnMostrarTodo.addEventListener('click', () => { this.buscarLibros(''); txtBuscar.value = ''; txtBuscar.focus(); });
        btnSoftware.addEventListener('click', () => { this.filtrarCarrera('Software'); txtBuscar.value = ''; txtBuscar.focus(); });
        btnAmbiental.addEventListener('click', () => { this.filtrarCarrera('Ambiental'); txtBuscar.value = ''; txtBuscar.focus(); });
        btnEnergia.addEventListener('click', () => { this.filtrarCarrera('Energía'); txtBuscar.value = ''; txtBuscar.focus(); });
        btnPymes.addEventListener('click', () => { this.filtrarCarrera('PyMES'); txtBuscar.value = ''; txtBuscar.focus(); });
        btnIngles.addEventListener('click', () => { this.filtrarCarrera('Inglés'); txtBuscar.value = ''; txtBuscar.focus(); });
        txtBuscar.addEventListener('change', () => { this.buscarLibros(txtBuscar.value); txtBuscar.focus(); });

        txtBuscar.focus();
    }

    buscarLibros = (data) => {
        window.ipcRender.invoke('getBooks').then((result) => {
            let { isbn, nombre, carrera, ubicacion, editorial } = result;

            isbn = isbn.replace(/(^_)|(_$)/g, '');
            nombre = nombre.replace(/(^_)|(_$)/g, '');
            carrera = carrera.replace(/(^_)|(_$)/g, '');
            ubicacion = ubicacion.replace(/(^_)|(_$)/g, '');
            editorial = editorial.replace(/(^_)|(_$)/g, '');

            isbn = isbn.split('_');
            nombre = nombre.split('_');
            carrera = carrera.split('_');
            ubicacion = ubicacion.split('_');
            editorial = editorial.split('_');

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

            mostrarLibrosBusqueda(libros, data);
        });
    }

    filtrarCarrera = (category) => {
        window.ipcRender.invoke('getBooks').then((result) => {
            let { isbn, nombre, carrera, ubicacion, editorial } = result;

            isbn = isbn.replace(/(^_)|(_$)/g, '');
            nombre = nombre.replace(/(^_)|(_$)/g, '');
            carrera = carrera.replace(/(^_)|(_$)/g, '');
            ubicacion = ubicacion.replace(/(^_)|(_$)/g, '');
            editorial = editorial.replace(/(^_)|(_$)/g, '');

            isbn = isbn.split('_');
            nombre = nombre.split('_');
            carrera = carrera.split('_');
            ubicacion = ubicacion.split('_');
            editorial = editorial.split('_');

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

            //La funcion 'filtrarCarrera' recibe la CARRERA y hace un select de los libros con esa carrera y lo envia a 'mostrarLibros'
            mostrarLibros(filtrarArbol(libros, category));
        });
    }
}

const mostrarLibros = (libros) => {
    let contenedorLibros = document.querySelector('#content-books');
    let texto = '';
    let contador = 1;

    libros = ordenamientoArbol(libros);

    contenedorLibros.innerHTML = '';

    for (let i = 0; i < libros.length; i++) {
        texto +=
            `
            <div class='col-md-4 stretch-card grid-margin grid-margin-md-0'>
                <div class='card'>
                    <div class='card-header border-0 text-center'>${libros[i].nombre}</div>
                    <img style='pointer-events: none;' src='../assets/images/book.jpg' class='card-img' alt=''>
                    <div class='card-body'>
                        <h6 class='card-subtitle text-body'>ISBN: ${libros[i].isbn}</h6>
                        <h6 class='card-subtitle text-body'>Editorial: ${libros[i].editorial}</h6>
                        <h6 class='card-subtitle text-body'>Carrera: ${libros[i].carrera}</h6>
                        <h6 class='card-subtitle text-body'>Ubicación: ${libros[i].ubicacion}</h6>
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

const mostrarLibrosBusqueda = (libros, data) => {
    let contenedorLibros = document.querySelector('#content-books');
    let texto = '';
    let contador = 1;

    libros = ordenamientoArbol(libros);

    contenedorLibros.innerHTML = '';

    for (let i = 0; i < libros.length; i++) {
        if (libros[i].nombre.toLowerCase().search(data.toLowerCase()) != -1) {
            texto +=
                `
                <div class='col-md-4 stretch-card grid-margin grid-margin-md-0'>
                    <div class='card'>
                        <div class='card-header border-0 text-center'>${libros[i].nombre}</div>
                        <img style='pointer-events: none;' src='../assets/images/book.jpg' class='card-img' alt=''>
                        <div class='card-body'>
                            <h6 class='card-subtitle text-body'>ISBN: ${libros[i].isbn}</h6>
                            <h6 class='card-subtitle text-body'>Editorial: ${libros[i].editorial}</h6>
                            <h6 class='card-subtitle text-body'>Carrera: ${libros[i].carrera}</h6>
                            <h6 class='card-subtitle text-body'>Ubicación: ${libros[i].ubicacion}</h6>
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
    }
    contenedorLibros.innerHTML += '<div class="row pb-4">' + texto + '</div>';
}