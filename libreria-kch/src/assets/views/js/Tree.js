

class nodo {
    constructor ( key , objeto ){ //Aqui recibo la key que seria 
        this.key = key;
        this.objeto = objeto;
        this.izquierda = null;
        this.derecha = null;
    }

    insertar ( key , objeto){
        if( key < this.key ){
            if ( this.izquierda == null ){
                this.izquierda = new nodo( key , objeto );
            }else{
                this.izquierda.insertar( key, objeto );    
            }
        }else{ 
            if ( this.derecha == null ){
                this.derecha = new nodo ( key, objeto );
            }else{
                this.derecha.insertar( key, objeto );
            }

        }
    }
}

export class arbol {
    constructor (){
        this.nodoInicial = null;
    }

    insertar ( key , objeto ){ 
        if ( this.nodoInicial == null ){
            this.nodoInicial = new nodo ( key , objeto ); 
        }else{
            this.nodoInicial.insertar( key , objeto );
        }
    }

    lanzarInOrden ( nodo ){

        //SE DEFINE UN ARREGLO
        let datosInOrden = [];

        //Se manda el arreglo al metodo in Orden
        datosInOrden = this.inOrden( nodo , datosInOrden )
        return datosInOrden;
        
        
    }

    inOrden ( nodo, datosInOrden ){
        if ( nodo == null ){
            return;
        }else{
            this.inOrden( nodo.izquierda , datosInOrden );
            //console.log( nodo.key );
            datosInOrden.push ( nodo.objeto );
            this.inOrden( nodo.derecha , datosInOrden );
            //PUSHEA RECURSIVAMENTE AL DATOS IN ORDEN
        }

        //CUANDO NO PASA NADA SOLO LO REGRESA
        return datosInOrden;
    }
    //SE AÑADE EXISTE
    existe ( nodo, busqueda) {
        if (nodo == null) {
            return false;
        }
    
        if ( nodo.key == busqueda) {
            return true;
        } else if (busqueda < nodo.key ) {
            return this.existe(nodo.izquierda, busqueda);
        } else {
            return this.existe(nodo.derecha, busqueda);
        }
    
    }
    eliminar( nodo , keyBorrar) { 
        if( nodo == null ){
            return nodo;
        } 
        
        //METODO DE BUSQUEDA
        if( keyBorrar < nodo.key ) {
            
            nodo.izquierda = this.eliminar(nodo.izquierda , keyBorrar); 
    
        } else if( keyBorrar > nodo.key ) {
          
            nodo.derecha = this.eliminar(nodo.derecha, keyBorrar )
        } else {
    
            // Borrar nodo sin nodos hoja (nodos nodo)
            
            if(nodo.izquierda == null && nodo.derecha == null) {
                return null;
            } else if(nodo.izquierda == null) {
                return nodo.derecha;
            } else if(nodo.derecha == null) {
                return nodo.izquierda;
    
    
            } else {
                let valorMinimo = this.valorMinimo( nodo.derecha );

                nodo.key = valorMinimo.key;
                nodo.objeto = valorMinimo.objeto;
                nodo.derecha = this.eliminar( nodo.derecha, valorMinimo.key );
               
            }
        }
        return nodo;
    } 
    valorMinimo( nodo ) {
        if(nodo.izquierda != null) {
            return this.valorMinimo( nodo.izquierda );
        }
        return nodo;
    }

    filtrarCarrera ( nodo , carrera ){
        {
            if ( nodo == null ){
                return;
            }else{
                this.filtrarCarrera( nodo.izquierda , carrera );
             
                if ( nodo.objeto.CARRERA == carrera ){
                    
                    this.eliminar(this.nodoInicial , nodo.key );
                }

                this.filtrarCarrera( nodo.derecha , carrera );
            }
        }
    }
}