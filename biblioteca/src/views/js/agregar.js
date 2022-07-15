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

        btnAgregar.addEventListener('click', () => {
            let txtISBN = this.get('#txtISBN').value;
            let txtNombre = this.get('#txtNombre').value;
            let txtCarrera = this.get('#txtCarrera').value;
            let txtUbicacion = this.get('#txtUbicacion').value;
            let txtEditorial = this.get('#txtEditorial').value;

            if (!(txtISBN == '' || txtNombre == '' || txtCarrera == '' || txtUbicacion == '' || txtEditorial == '')) {
                let data = { isbn: txtISBN, nombre: txtNombre, carrera: txtCarrera, ubicacion: txtUbicacion, editorial: txtEditorial };
                this.addBook(data);
            }
        });
    }

    addBook(data) {
        window.ipcRender.send('addBook', data);
        location.reload();
    }
}