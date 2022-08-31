/* Variables */
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    /* Cuando agregas un curso presionando "agregar al carrito" */
listaCursos.addEventListener('click', agregarCurso);

    /* Elimina Cursos del Carrito */
    carrito.addEventListener('click', eliminarCurso);

    /* Vaciar el carrito */
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML()
    })

}

/* Funciones */
function agregarCurso(e){
    e.preventDefault(); //esto es para evitar que se ejectuten las acciones por default

    //nos aseguramos que hayan seleccionado el boton agregar carrito
    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement; //accedemos a todo el div que tiene el contenido del curso
        leerDatosCurso(cursoSeleccionado);
    }
}
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //Elina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}

//lee el html al que le dimos click y extrae info del curso
function leerDatosCurso(curso) {
    console.log(curso);

    //crea un objeto con en contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            } else {
                return curso; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    
    } else {
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //limpiar HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        //uso distructuring para evitar tener que poner todo el tiempo curso.imagen o curso.precio, etc
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement ('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width=100>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        //Agrega HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })

}

//Elimina los cursos del tbody
function limpiarHTML() {
/*     //forma lenta (bajo performance)
    contenedorCarrito.innerHTML = ``; */

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

