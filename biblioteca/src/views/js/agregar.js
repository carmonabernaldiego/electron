let txtISBN = document.querySelector('#txtISBN');
txtISBN.focus();
let txtNombre = document.querySelector('#txtNombre');
let txtCarrera = document.querySelector('#txtCarrera');
let txtUbicacion = document.querySelector('#txtUbicacion');
let txtEditorial = document.querySelector('#txtEditorial');

let btnAgregar = document.querySelector('#btnAgregar');

txtISBN.addEventListener('keyup', function (e) {
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        txtNombre.focus();
    }
});

txtNombre.addEventListener('keyup', function (e) {
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        txtEditorial.focus();
    }
});

txtEditorial.addEventListener('keyup', function (e) {
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        txtCarrera.focus();
    }
});

txtCarrera.addEventListener('keyup', function (e) {
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        txtUbicacion.focus();
    }
});

txtUbicacion.addEventListener('keyup', function (e) {
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        btnAgregar.focus();
    }
});

btnAgregar.addEventListener('click', () => {
    if (!(txtISBN.value == '' || txtNombre.value == '' || txtCarrera.value == '' || txtUbicacion.value == '' || txtEditorial.value == '')) {
        let data = { isbn: txtISBN.value, nombre: txtNombre.value, carrera: txtCarrera.value, ubicacion: txtUbicacion.value, editorial: txtEditorial.value };
        addBook(data);
    } else {
        if (txtISBN.value == '') {
            txtISBN.focus();
        } else if (txtNombre.value == '') {
            txtNombre.focus();
        } else if (txtEditorial.value == '') {
            txtEditorial.focus();
        } else if (txtCarrera.value == '') {
            txtCarrera.focus();
        } else if (txtUbicacion.value == '') {
            txtUbicacion.focus();
        }
    }
});

btnAgregar.addEventListener("focus", () => {
    window.addEventListener("keypress", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });
});

const addBook = (data) => {
    window.ipcRender.invoke('addBook', data).then((confirm) => {
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
                    location.reload(true);
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
                    location.reload(true);
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

function validateInput(evt) {
    let theEvent = evt || window.event;

    if (theEvent.type === 'paste') {
        key = evt.clipboardData.getData('text/plain');
    } else {
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    let regex = /[0-9]|\./;

    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}