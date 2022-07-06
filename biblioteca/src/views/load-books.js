const article = document.querySelector('#content-books');
const inputBuscar = document.querySelector('#inputBuscar');

const mostrarLibros = (nombres, carreras, ubicaciones, editoriales) => {
    let contador = 1;
    let texto = '';

    for (let i = 0; i < nombres.length; i++) {
        texto +=
            `
            <div class="col-md-4 stretch-card grid-margin grid-margin-md-0">
              <div class="card text-white bg-secondary">
                <div class="card-header border-0 text-center">${nombres[i]}</div>
                <img src="../assets/images/book.jpg" class="card-img" alt="">
                <div class="card-body">
                  <h6 class="card-subtitle text-white">Carrera: ${carreras[i]}</h6>
                  <h6 class="card-subtitle text-white">Ubicación: ${ubicaciones[i]}</h6>
                  <h6 class="card-subtitle text-white">Editorial: ${editoriales[i]}</h6>
                </div>
              </div>
            </div>
        `;

        if (contador == 3) {
            article.innerHTML += '<div class="row pb-4">' + texto + '</div>';
            texto = '';
            contador = 0;
        }
        contador++;
    }
    article.innerHTML += '<div class="row pb-4">' + texto + '</div>';
}

const iniciarPrograma = () => {
    window.ipcRender.invoke('getBooks').then((results) => {
        const { nombre, carrera, ubicacion, editorial } = results;

        let nombres = nombre.replace(/(^_)|(_$)/g, '');
        let carreras = carrera.replace(/(^_)|(_$)/g, '');
        let ubicaciones = ubicacion.replace(/(^_)|(_$)/g, '');
        let editoriales = editorial.replace(/(^_)|(_$)/g, '');

        nombres = nombres.split("_");
        carreras = carreras.split("_");
        ubicaciones = ubicaciones.split("_");
        editoriales = editoriales.split("_");

        mostrarLibros(nombres, carreras, ubicaciones, editoriales);
    });

}

iniciarPrograma();