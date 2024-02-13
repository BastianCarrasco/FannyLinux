// partesOrden.js

// Inicializamos las variables con los valores del localStorage si existen, de lo contrario, usamos los valores por defecto
export let TextoOrden = localStorage.getItem('TextoOrden') || 'Orden';
export let Cantidad = parseInt(localStorage.getItem('Cantidad')) || 0;
export let Comentario = localStorage.getItem('Comentario') || '';

// Función para cambiar el valor de TextoOrden y guardarlo en localStorage
export function cambiarTextoOrden(n) {
    TextoOrden = n;
    localStorage.setItem('TextoOrden', n);
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
