$(function () {
    showSwal = function (type, ISBN) {
        'use strict';
        if (type === 'passing-parameter-execute-cancel') {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger mr-2'
                },
                buttonsStyling: false,
                allowOutsideClick: false
            });
            swalWithBootstrapButtons.fire({
                title: '¿Estas seguro?',
                text: "¡Esta acción no se puede revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'mr-2',
                confirmButtonText: '¡Si, eliminar!',
                cancelButtonText: '¡No, cancelar!',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    window.ipcRender.invoke('deleteBook', ISBN).then((confirm) => {
                        if (confirm == 1) {
                            swalWithBootstrapButtons.fire({
                                title: '¡Eliminado!',
                                text: "Registro eliminado.",
                                icon: 'success',
                                confirmButtonClass: 'mr-2'
                            }).then((result) => {
                                if (result.value) {
                                    consultBooks();
                                    location.reload(true);
                                }
                            });
                        } else if (confirm == 0) {
                            swalWithBootstrapButtons.fire(
                                'Cancelado',
                                'La información permanece segura :)',
                                'error'
                            );
                        }
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'La información permanece segura :)',
                        'error'
                    );
                }
            });
        }
    }
});

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

consultBooks();