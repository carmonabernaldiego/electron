let txtISBN = document.querySelector('#txtISBN');
let txtNombre = document.querySelector('#txtNombre');
let selectCarrera = document.querySelector('#selectCarrera');
let txtUbicacion = document.querySelector('#txtUbicacion');
let txtEditorial = document.querySelector('#txtEditorial');

window.ipcRender.invoke('getCarreras').then((result) => {
    let { idCarrera, nombreCarrera } = result;

    idCarrera = idCarrera.replace(/(^_)|(_$)/g, '');
    idCarrera = idCarrera.split('_');
    nombreCarrera = nombreCarrera.replace(/(^_)|(_$)/g, '');
    nombreCarrera = nombreCarrera.split('_');

    let carreras = [];

    for (let i = 0; i < idCarrera.length; i++) {
        carreras.push({
            'idCarrera': idCarrera[i],
            'nombreCarrera': nombreCarrera[i]
        });
    }

    let texto = '';

    for (let i = 0; i < carreras.length; i++) {
        texto +=
            `
            <option value="${carreras[i].idCarrera}">${carreras[i].nombreCarrera}</option>
            `;
    }

    selectCarrera.innerHTML += texto;
});

txtISBN.focus();

txtISBN.addEventListener('keypress', function (e) {
    if (!soloNumeros(e)) {
        e.preventDefault();
    }
});

let btnAgregar = document.querySelector('#btnAgregar');

btnAgregar.addEventListener('click', () => {
    if (!(txtISBN.value == '' || txtNombre.value == '' || selectCarrera.value == '' || txtUbicacion.value == '' || txtEditorial.value == '')) {
        let data = { isbn: txtISBN.value, nombre: txtNombre.value, carrera: selectCarrera.value, ubicacion: txtUbicacion.value, editorial: txtEditorial.value };
        addBook(data);
    }
});

const addBook = (data) => {
    window.ipcRender.send('addBook', data);
    localStorage.setItem('reload', '1');
    location.reload();
}

if (localStorage.getItem('reload') == '1') {
    localStorage.removeItem('reload');

    window.ipcRender.invoke('confirmAddBook').then((confirm) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false,
            allowEscapeKey: false,
            allowOutsideClick: false
        });

        if (confirm == 1) {
            swalWithBootstrapButtons.fire({
                title: '¡Agregado!',
                text: "Registro agregado.",
                icon: 'success',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultBooks();
                }
            });
        } else if (confirm == 0) {
            swalWithBootstrapButtons.fire({
                title: '¡Error!',
                text: "No se puede agregar un nuevo registro a la base de datos.",
                icon: 'error',
                confirmButtonClass: 'mr-2'
            }).then((result) => {
                if (result.value) {
                    consultBooks();
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
                <td>${libros[i].editorial}</td>
                <td>${libros[i].carrera}</td>
                <td>${libros[i].ubicacion}</td>
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

function soloNumeros(e) {
    var key = e.charCode;
    return key >= 48 && key <= 57 || key == 13;
}

const formSubmit = (event) => {
    event.preventDefault();
    return false;
}