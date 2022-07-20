let txtISBN = document.querySelector('#txtISBN');
let txtNombre = document.querySelector('#txtNombre');
let txtCarrera = document.querySelector('#txtCarrera');
let txtUbicacion = document.querySelector('#txtUbicacion');
let txtEditorial = document.querySelector('#txtEditorial');

const loadBook = () => {
    window.ipcRender.invoke('getBook').then((result) => {
        let { isbn, nombre, carrera, ubicacion, editorial } = result;

        txtISBN.value = isbn;
        txtNombre.value = nombre;
        txtCarrera.value = carrera;
        txtUbicacion.value = ubicacion;
        txtEditorial.value = editorial;

        txtNombre.focus();
    });
}

loadBook();

let btnCancelar = document.querySelector('#btnCancelar');

btnCancelar.addEventListener('click', () => {
    location.href = './modificar.html';
});

let btnActualizar = document.querySelector('#btnActualizar');

btnActualizar.addEventListener('click', () => {
    if (!(txtISBN.value == '' || txtNombre.value == '' || txtCarrera.value == '' || txtUbicacion.value == '' || txtEditorial.value == '')) {
        const data = { isbn: txtISBN.value, nombre: txtNombre.value, carrera: txtCarrera.value, ubicacion: txtUbicacion.value, editorial: txtEditorial.value };
        updateBook(data);
    }
});

const updateBook = (data) => {
    window.ipcRender.invoke('updateBook', data).then((result) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });
        if (result == 1) {
            swalWithBootstrapButtons.fire({
                title: '¡Actualizado!',
                text: "Registro actualizado.",
                icon: 'success',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultBooks();
                    location.href = './modificar.html';
                }
            });
        } else if (result == 0) {
            swalWithBootstrapButtons.fire({
                title: '¡Error!',
                text: "La información permanece segura :)",
                icon: 'error',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultBooks();
                    location.href = './modificar.html';
                }
            });
        }
    });
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
                <td>${libros[i].carrera}</td>
                <td>${libros[i].ubicacion}</td>
                <td>${libros[i].editorial}</td>
                <td class="text-center"><button type="button" class="btn btn-danger" onclick="showSwal('passing-parameter-execute-cancel', '${libros[i].isbn}')">Eliminar</button></td>
            </tr>
        `;
    }

    TablaLibros.innerHTML = texto;
}

const consultBooks = () => {
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