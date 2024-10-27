// Función para crear estrellas
function createStars() {
    const starCount = 100; // Número de estrellas a crear
    const container = document.querySelector('.container');

    for (let i = 0; i < starCount; i++) {
        createStar(container);
    }
}

// Función para crear una estrella
function createStar(container) {
    const star = document.createElement('div');
    star.classList.add('star');
    // Posicionar cada estrella en un lugar aleatorio en la pantalla
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; // Duración de la animación entre 2 y 5 segundos
    container.appendChild(star);

    // Eliminar la estrella después de que cae
    star.addEventListener('animationend', () => {
        star.remove();
        createStar(container); // Crear una nueva estrella al terminar la animación
    });
}

// Función para salir del juego
function exitGame() {
    alert('¡Gracias por jugar!'); // Mensaje de despedida
    window.close(); // Cierra la ventana (funciona en algunos navegadores)
}

// Llamar a la función para crear estrellas
createStars();

