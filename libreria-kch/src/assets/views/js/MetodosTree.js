/*
    Pseudo:
    Todo va a estar en una funcion que se llame inOrden que se va a encargar de ordenar todo,
    esta funcion recibe un arreglo de objetos.

    La Key = libro.NOMBRE
    Contenido de Arbol = libro;

    1. Se recibe un arreglo lleno de objetos (BASE DATOS)
    2. Se hace un Tree.Add ( key , objeto ), esto por medio de un for que se encarde de TreeAdd(libro[i].NOMBRE , libro)
    3. Se retorna un Tree.InOrden (Un arreglo ordenado que solo contenga los objetos)


*/

import { arbol } from './Tree.js';

const ordenamientoArbol = ( libro ) => {
    
    //RECIBO LA FUNCION LIBRO CON LOS RESULTADOS DE LA CONSULTA SQL DESORDENADO
    let raiz = new arbol();

    //SE INSERTAN TODOS LOS DATOS AL ARBOL
    for (let i = 0; i< libro.length;i++){
        raiz.insertar( libro[i].NOMBRE , libro[i] ) //SE MANDA EL TEXTO EN LA KEY Y EL OBJETO
    }

    let datosInOrden = [];
    datosInOrden = raiz.lanzarInOrden( raiz.nodoInicial );   
    return datosInOrden;
    
}


const filtrarArbol = ( libro , carrera ) => {
/*
    1. Recibo el arreglo con todos mis objetos
    2. Se hace un Tree.Add ( key , objeto ), esto por medio de un for que se encarge de TreeAdd(libro[i].NOMBRE, libro)

    3. Se recorre uno por uno con una condicional de if libro.objeto.carrera = carrera entonces libro.borrar(raiz.nodoInicial , carreras) 
*/

    let raiz = new arbol();
    for (let i = 0; i< libro.length;i++){
        raiz.insertar( libro[i].NOMBRE , libro[i] );
    }

    let carreras = [ 'SOFTWARE', 'AMBIENTAL','ENERGIA','PYMES','INGLES'];
    let i = carreras.indexOf( carrera );
    if ( i !== -1 ) {
        carreras.splice( i, 1 );
    }
    console.log(carreras);


    for (let i= 0; i<carreras.length; i++){
        console.log("Se lanza El For de Metodos "+ carreras[i])
        raiz.filtrarCarrera(raiz.nodoInicial, carreras[i]);
        raiz.filtrarCarrera(raiz.nodoInicial, carreras[i]);
        //SE MANDA A LLAMAR DOS VECES POR QUE AVECES QUEDAN RESTOS AL SER UN LENGUAJE NO TIPADO
    }
        
    return raiz.lanzarInOrden (raiz.nodoInicial); 

}










    


export { ordenamientoArbol , filtrarArbol }

