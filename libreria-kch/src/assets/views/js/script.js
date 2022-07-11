/*
    PSEUDO:
    ¿Que es lo que tenemos que hacer para que el programa agregue los libros de mi base de datos?
    -Primero: tenemos que extraer los datos de la base de datos utilizando la conexión que creamos en el otro archivo
    -Segundo: tenemos que enviar todos esos datos a un arbol y regresar un arreglo ordenado de mis datos (PENDIENTE)
    -Tercero: crear una funcion que los agrege todos en el article con id="contenido" que tengo en mi index.

*/
// AQUI EL REQUIRE APLICA DESDE EL HTML QUE ES INVOCADO
const connection = require('../../../connection');

//REFERENCIAS HTML
const article        = document.querySelector('#contenido');
const inputBuscar    = document.querySelector('#inputBuscar');
const btnMostrarTodo = document.getElementById('btnMostrarTodo');
const btnSoftware    = document.getElementById('btnSoftware');
const btnAmbiental   = document.getElementById('btnAmbiental');
const btnEnergia     = document.getElementById('btnEnergia');
const btnPymes       = document.getElementById('btnPymes');
const btnIngles      = document.getElementById('btnIngles');


//EXPORTS 
import { ordenamientoArbol, filtrarArbol } from './MetodosTree.js';


const mostrarLibros = ( libros ) =>{
  
    article.innerHTML = "";

    libros = ordenamientoArbol( libros );
    
    for (let i = 0; i < libros.length; i++) {
        let texto =
        `
            <div class="libro">
                <h3>${libros[i].NOMBRE}</h3>
                <img src="../img/libroPlantilla.jpg">
                <span>Carrera: ${libros[i].CARRERA}</span>
                <span>Ubicacion: ${libros[i].UBICACION}</span>                     
                <span>Editorial: ${libros[i].EDITORIAL}</span>
            </div>
        `;

        article.innerHTML += texto;
    }
}
const filtrarCarrera = ( CARRERA ) => {
  //La funcion "filtrarCarrera" recibe la CARRERA y hace un select de los libros con esa carrera y lo envia a "mostrarLibros"
    connection.query(
        `SELECT * FROM LIBRO; `,
        function(err, results, fields) {  
            mostrarLibros( filtrarArbol( results, CARRERA ) );
        }
      );
}
const buscarLibros = () => {
  let textoBuscar = inputBuscar.value;
  
  //Borro los datos del article para ingresar los datos que tengan el mismo nombre
  article.innerHTML = "";

  //SACO TODOS MIS LIBROS
  connection.query( 'SELECT * FROM `LIBRO`', (err, libros, fields) => {
    libros = ordenamientoArbol( libros );
    for (let i = 0; i < libros.length; i++) {
        let texto = '';
        if (libros[i].NOMBRE.toLowerCase().search(textoBuscar.toLowerCase()) != -1) {

          let texto =
          `
            <div class="libro">
                <h3>${libros[i].NOMBRE}</h3>
                <img src="../img/libroPlantilla.jpg">
                <span>Carrera: ${libros[i].CARRERA}</span>
                <span>Ubicacion: ${libros[i].UBICACION}</span>                     
                <span>Editorial: ${libros[i].EDITORIAL}</span>
            </div>
          `;

            article.innerHTML += texto;
        }
        console.log('no');
    }
  });
}

//La funcion "iniciarPrograma" inicia el programa.
const iniciarPrograma = () => {
  connection.query( 'SELECT * FROM `LIBRO`', (err, results, fields) => {
    mostrarLibros(results);
  }
);
}
//Se manda a llamar a la funcion iniciarPrograma() para dar comienzo a la pagina
iniciarPrograma();


//EVENT LISTENERS
btnBuscar.addEventListener('click', () => {
  buscarLibros();
});
btnMostrarTodo.addEventListener('click' , () =>{
  iniciarPrograma  (  );
})
btnSoftware.addEventListener('click' , () =>{
  filtrarCarrera( 'SOFTWARE' );
})
btnAmbiental.addEventListener('click' , () =>{
  filtrarCarrera( 'AMBIENTAL' );
})
btnEnergia.addEventListener('click' , () =>{
  filtrarCarrera( 'ENERGIA' );
})
btnPymes.addEventListener('click' , () =>{
  filtrarCarrera( 'PYMES' );
})
btnIngles.addEventListener('click' , () =>{
  filtrarCarrera( 'INGLES' );
})