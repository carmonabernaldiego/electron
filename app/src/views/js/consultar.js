let pageConsult;

document.addEventListener('DOMContentLoaded', function () {
    pageConsult = new PageConsult(window);
});

class PageConsult {
    constructor() {
        this.consultBooks();
    }

    consultBooks() {
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

            mostrarLibros(libros);
        });
    }
}

const mostrarLibros = (libros) => {
    let TablaLibros = document.querySelector('#tabla-libros');
    let texto = '';

    TablaLibros.innerHTML = '';

    for (let i = 0; i < libros.length; i++) {
        texto +=
            `
            <tr>
                <td>${libros[i].isbn}</td>
                <td>${libros[i].nombre}</td>
                <td>${libros[i].editorial}</td>
                <td>${libros[i].carrera}</td>
                <td>${libros[i].ubicacion}</td>
            </tr>
        `;
    }

    TablaLibros.innerHTML = texto;
}