/*
    PSEUDO:
    ¿Que es lo que tenemos que hacer para que el programa agregue los libros de mi base de datos?
    -Primero: tenemos que extraer los datos de la base de datos utilizando la conexión que creamos en el otro archivo
    -Segundo: tenemos que enviar todos esos datos a un arbol y regresar un arreglo ordenado de mis datos (PENDIENTE)
    -Tercero: crear una funcion que los agrege todos en el article con id="content-books" que tengo en mi index.

*/
// AQUI EL REQUIRE APLICA DESDE EL HTML QUE ES INVOCADO
const connection2 = require('./crearConexion.js');

//REFERENCIAS HTML
const article = document.querySelector('#content-books');
const inputBuscar = document.querySelector('#inputBuscar');


const mostrarLibros = (libros) => {
  //La funcion "mostrarLibros" recibe un arreglo de libros y agrega todos los libros sin ordenar al programa, lo que hay que implementar aqui a futuro, es el ordenamiento de mis libros por medio de un arbol(Se puede hacer por SQL, pero se pide en la rubrica de trabajo la implementación de un arbol)

  //primero borra los datos que tengamos en nuestro article, para evitar cualquier problema
  article.innerHTML = "";
  /*
      Ejemplo de como seria en un futuro:
      let datosOrdenados = arbol.inOrden( libros ); 

      Y el for se trabajaria con "datosOrdenados", no con "libros"
    */

  for (let i = 0; i < libros.length; i++) {
    let texto =
      `
        <div class="col-md-4 stretch-card grid-margin grid-margin-md-0">
          <div class="card text-white bg-secondary">
            <div class="card-header border-0 text-center">${libros[i].NOMBRE}</div>
              <img src="../assets/images/book.jpg" class="card-img" alt="">
              <div class="card-body">
                <h6 class="card-subtitle text-white">Carrera: ${libros[i].CARRERA}</h6>
                <h6 class="card-subtitle text-white">Ubicacion: ${libros[i].UBICACION}</h6>
                <h6 class="card-subtitle text-white">Editorial: ${libros[i].EDITORIAL}</h6>
              </div>
            </div>
          </div>
        </div>
      `;

    article.innerHTML += texto;
  }
}


//La funcion "iniciarPrograma" inicia el programa.
const iniciarPrograma = () => {
  connection2.query('SELECT * FROM `LIBRO`', (err, results, fields) => {
    mostrarLibros(results);
  }
  );
}
//Se manda a llamar a la funcion iniciarPrograma() para dar comienzo a la pagina
iniciarPrograma();