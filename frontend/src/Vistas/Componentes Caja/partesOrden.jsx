// partesOrden.js

// Inicializamos las variables con los valores del localStorage si existen, de lo contrario, usamos los valores por defecto
export let TextoOrden = localStorage.getItem('TextoOrden') || 'Orden';
export let Cantidad = parseInt(localStorage.getItem('Cantidad')) || 1;

export let Llaves = localStorage.getItem('Llaves') || '';
export let Comentario = localStorage.getItem('Comentario') || '';
export let Precio = parseInt(localStorage.getItem('Precio')) || 0;
export let Estado = parseInt(localStorage.getItem('Estado')) || 0;
export let Barra = parseInt(localStorage.getItem('Barra')) || 0;
export let Cliente = localStorage.getItem('Cliente') || 'Orden';
export let NumOrden = parseInt(localStorage.getItem('NumOrden')) || 0;
export let ListaPedido = JSON.parse(localStorage.getItem('Pedido')) || [];
export let ArregloPedidos = JSON.parse(localStorage.getItem('ArregloPedidos')) || [];

export let Tipos = JSON.parse(localStorage.getItem('Tipos')) || [];

// Función para agregar un nuevo elemento al arreglo Pedido y guardarlo en localStorage
export function agregarAlPedido(item) {
    ListaPedido.push(item);
    actualizarTextoOrden(); // Actualizar el valor de TextoOrden
    localStorage.setItem('Pedido', JSON.stringify(ListaPedido)); // Guardar ListaPedido en localStorage
    llaves();
    agregarTipo(item.tipo); // Llamar a la función para agregar el tipo
}

// Función para agregar el tipo de un item al arreglo Tipos
export function agregarTipo(tipo) {
    Tipos.push(tipo); // Agregar el tipo al arreglo
    localStorage.setItem('Tipos', JSON.stringify(Tipos)); // Guardar Tipos en localStorage
}


export function actualizarTextoOrden() {
    TextoOrden = ""; // Aquí estás actualizando la variable global TextoOrden

    if (ListaPedido.length > 0) {
        // Verificar si el primer elemento es tipo 1 o 10
        const primerElemento = ListaPedido[0];
        if (primerElemento.tipo === 1 || primerElemento.tipo === 10) {
            TextoOrden = primerElemento.nombre;
            for (let i = 1; i < ListaPedido.length; i++) {
                if (i === 1) {
                    TextoOrden += ' c/n ';
                } else {
                    TextoOrden += ' + ';
                }
                TextoOrden += ListaPedido[i].nombre;
            }
        } else {
            TextoOrden = ListaPedido.map(item => item.nombre).join(' + ');
        }
    }
   
    localStorage.setItem('TextoOrden', TextoOrden); // Guardar TextoOrden en localStorage
}

// Función para cambiar el valor de Cantidad y guardarlo en localStorage
export function cambiarCantidad(cantidad) {
    Cantidad = cantidad;
    localStorage.setItem('Cantidad', cantidad);
}

// Función para cambiar el valor de Comentario y guardarlo en localStorage
export function cambiarComentario(comentario) {
    Comentario = comentario;
    localStorage.setItem('Comentario', comentario);
}

// partesOrden.js

// Función para cambiar el valor de Precio y guardarlo en localStorage
export function cambiarPrecio(precio) {
    Precio = precio;
    localStorage.setItem('Precio', precio);
}

// Función para cambiar el valor de Estado y guardarlo en localStorage
export function cambiarEstado(estado) {
    Estado = estado;
    localStorage.setItem('Estado', estado);
}

// Función para cambiar el valor de Barra y guardarlo en localStorage
export function cambiarBarra(barra) {
    Barra = barra;
    localStorage.setItem('Barra', barra);
}

// Función para cambiar el valor de Cliente y guardarlo en localStorage
export function cambiarCliente(cliente) {
    Cliente = cliente;
    localStorage.setItem('Cliente', cliente);
}

// Función para cambiar el valor de NumOrden y guardarlo en localStorage
export function cambiarNumOrden(numOrden) {
    NumOrden = numOrden;
    localStorage.setItem('NumOrden', numOrden);
}

export function llaves() {
    // Obtener los IDs de los elementos de ListaPedido y concatenarlos con un guion
    const ids = ListaPedido.map(item => item.id).join('-');

    // Guardar las llaves en el localStorage
    localStorage.setItem('Llaves', ids);

    // Actualizar la variable global Llaves como un string
    Llaves = ids;
}



// partesOrden.js
export function resetearArregloPedidos(){
    ArregloPedidos = [];
    localStorage.setItem('ArregloPedidos', JSON.stringify(ArregloPedidos));
}


// Función para resetear todos los valores a sus valores por defecto
export function resetearValores() {
    TextoOrden = 'Orden';
    Cantidad = 1;
    Llaves = '';
    Comentario = '';
    Precio = 0;
    Estado = 0;
    Barra = 0;
    Cliente = 'Orden';
    NumOrden = 0;
    ListaPedido = [];
    Tipos=[];

    // Actualizar los valores en el almacenamiento local
    localStorage.setItem('TextoOrden', TextoOrden);
    localStorage.setItem('Cantidad', Cantidad);
    
    localStorage.setItem('Llaves', Llaves);
    localStorage.setItem('Comentario', Comentario);
    localStorage.setItem('Precio', Precio);
    localStorage.setItem('Estado', Estado);
    localStorage.setItem('Barra', Barra);
    localStorage.setItem('Cliente', Cliente);
    localStorage.setItem('NumOrden', NumOrden);
    localStorage.setItem('Pedido', JSON.stringify(ListaPedido));
    localStorage.setItem('Tipos', JSON.stringify(Tipos));
}

export function imprimirVariables() {
    console.log("TextoOrden:", TextoOrden);
    console.log("Cantidad:", Cantidad);
    console.log("Llaves:", Llaves);
    console.log("Comentario:", Comentario);
    console.log("Precio:", Precio);
    console.log("Estado:", Estado);
    console.log("Barra:", Barra);
    console.log("Cliente:", Cliente);
    console.log("NumOrden:", NumOrden);
    console.log("ListaPedido:", ListaPedido);
}

export function cerrarPedido() {


    // Verifica si la Cantidad es diferente de cero y el TextoOrden es diferente de 'Orden'
    if (Cantidad !== 0 && TextoOrden !== 'Orden') {
        // Crea un objeto con todas las variables relevantes del pedido
        const pedidoListo = {
            TextoOrden,
            Cantidad,
            Llaves,
            Comentario,
            Precio,
            Estado,
            Barra,
            Cliente,
            NumOrden,
            ListaPedido
        };

        // Agrega el objeto a ArregloPedidos
        ArregloPedidos.push(pedidoListo);

        // Almacena ArregloPedidos en el localStorage
        localStorage.setItem('ArregloPedidos', JSON.stringify(ArregloPedidos));

        // Resetea todas las variables relacionadas con el pedido
        resetearValores();
    } else {
        // Muestra un mensaje de error si la Cantidad es cero o el TextoOrden es 'Orden'
        console.error("La cantidad no puede ser cero y el texto de la orden no puede ser 'Orden'.");
    }
}


export function eliminarPedido(posicion) {
    // Verifica si la posición proporcionada es válida
    if (posicion < 0 || posicion >= ArregloPedidos.length) {
        console.error("La posición proporcionada no es válida.");
        return;
    }

    // Elimina el pedido en la posición especificada del arreglo
    ArregloPedidos.splice(posicion, 1);

    // Actualiza el localStorage con el nuevo arreglo de pedidos
    localStorage.setItem('ArregloPedidos', JSON.stringify(ArregloPedidos));
}
