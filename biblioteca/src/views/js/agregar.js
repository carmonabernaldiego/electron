let pageAgregar;

document.addEventListener('DOMContentLoaded', function () {
    pageAgregar = new PageAgregar(window);
});

class PageAgregar {
    constructor() {
        this.attachEvents();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnAgregar = this.get('#btnAgregar');
        let txtISBN = this.get('#txtISBN');
        let txtNombre = this.get('#txtNombre');
        let txtCarrera = this.get('#txtCarrera');
        let txtUbicacion = this.get('#txtUbicacion');
        let txtEditorial = this.get('#txtEditorial');
        const data = { isbn: txtISBN, nombre: txtNombre, carrera: txtCarrera, ubicacion: txtUbicacion, editorial: txtEditorial };

        btnAgregar.addEventListener('click', this.addBook(data));
    }

    addBook(data) {
        window.ipcRender.send('login', data);
    }
}