let txtISBN = document.querySelector('#txtISBN');
txtISBN.focus();

let btnAgregar = document.querySelector('#btnAgregar');

btnAgregar.addEventListener('click', () => {
    txtISBN = document.querySelector('#txtISBN').value;
    let txtNombre = document.querySelector('#txtNombre').value;
    let txtCarrera = document.querySelector('#txtCarrera').value;
    let txtUbicacion = document.querySelector('#txtUbicacion').value;
    let txtEditorial = document.querySelector('#txtEditorial').value;

    if (!(txtISBN == '' || txtNombre == '' || txtCarrera == '' || txtUbicacion == '' || txtEditorial == '')) {
        let data = { isbn: txtISBN, nombre: txtNombre, carrera: txtCarrera, ubicacion: txtUbicacion, editorial: txtEditorial };
        addBook(data);
    }
});

const addBook = (data) => {
    window.ipcRender.send('addBook', data);
    consultBooks();
    location.reload();
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
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}