const loadBook = () => {
    window.ipcRender.invoke('getBook').then((result) => {
        let { isbn, nombre, carrera, ubicacion, editorial } = result;

        let txtISBN = document.querySelector('#txtISBN');
        let txtNombre = document.querySelector('#txtNombre');
        let txtCarrera = document.querySelector('#txtCarrera');
        let txtUbicacion = document.querySelector('#txtUbicacion');
        let txtEditorial = document.querySelector('#txtEditorial');

        txtISBN.value = isbn;
        txtNombre.value = nombre;
        txtCarrera.value = carrera;
        txtUbicacion.value = ubicacion;
        txtEditorial.value = editorial;

        txtISBN.focus();
    });
}

loadBook();