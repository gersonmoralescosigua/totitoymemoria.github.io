const images = [
    'assets/images/tigresa.png', 
    'assets/images/mantis2.png',
    'assets/images/ubuey.png',
    'assets/images/shifu.png',
    'assets/images/po.png',
    'assets/images/pavo.png',
    'assets/images/tailong.webp', 
    'assets/images/La_camaleona.webp'
];

// Obtén el elemento de audio
const backgroundMusic = document.getElementById('background-music');

// Obtén los elementos de la interfaz
let flippedCards = []; //Almacena las cartas volteadas
let matchedCards = []; //Almacena las cartas emparejadas
let timer;             //variable que almacena al termporizador que cuenta el tiempo restante
let timeLeft = 600; // 10 minutos en segundos

document.getElementById('startBtn').addEventListener('click', startGame);  //botones de inicio y reinicio, que llaman a la función startGame cuando se hace clic en ellos.
document.getElementById('restartBtn').addEventListener('click', startGame);

function startGame() {      //funcion para iniciar el juego 
    // Reiniciar variables
    flippedCards = [];
    matchedCards = [];
    timeLeft = 600; // Reiniciar el tiempo a 10 minutos

    // Reproduce la música de fondo cuando comienza el juego
    backgroundMusic.play();

    // Ocultar el botón de inicio y mostrar el contenedor de cartas y el temporizador
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('cardsContainer').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('restartBtn').classList.add('hidden'); // Ocultar el botón de reiniciar

    createCards();
    startTimer();
}

function createCards() {     //funcion para crear las cartas
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';  //limpia el contenedor de cartas antes de crear nuevas

    // Duplicar imágenes para crear pares
    const cardImages = [...images, ...images].sort(() => 0.5 - Math.random());

    cardImages.forEach(image => {
        const card = document.createElement('div');  //para crear cada carta
        card.classList.add('card');
        card.dataset.image = image;
        card.addEventListener('click', flipCard);   //cliquea las cartas
        cardsContainer.appendChild(card);
    });
}

function flipCard() {   //funcion para voltear una carta
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = `<img src="${this.dataset.image}" alt="Card Image">`;   //muestra la carta
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);    //verifica coincidencia y si no esta bien los oculta en  seg
        }
    }
}

function checkForMatch() {      //funcion para verificar coincidencia
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards.push(firstCard, secondCard);
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        // Aplicar efecto resplandor a las cartas coincidentes
        firstCard.classList.add('glow');
        secondCard.classList.add('glow');

        flippedCards = [];

        // Verificar si se ganaron todas las cartas
        if (matchedCards.length === images.length * 2) {
            clearInterval(timer);
            displayResult('¡Felicidades! Ganaste en ' + (600 - timeLeft) + ' segundos.'); 
            document.getElementById('restartBtn').classList.remove('hidden');
             // Mostrar botón de reiniciar
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        flippedCards = [];
    }
}


function startTimer() {
    // Mostrar tiempo inicial en formato de minutos y segundos
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            displayResult('Juego terminado. ¡Tiempo agotado!');
            document.getElementById('restartBtn').classList.remove('hidden'); // Mostrar botón de reiniciar
        }
    }, 1000);      //updateTimerDisplay()  Actualiza la visualización del temporizador.
}

function updateTimerDisplay() {    //funcion para actualizar la visualizacion del temprizador
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}    //covierte el tiempo restante a formato mm:ss y lo muestra en el elemento con id time.

function displayResult(message) {     //funcion para mostrar el resultado
    document.getElementById('result').innerText = message;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('cardsContainer').classList.add('hidden');
}

function exitGame() {   //funcion para salir del juego
    // Redirigir a la página principal o a otra página deseada
    window.location.href = 'index.html'; // Cambia 'index.html' por la URL que quieras
}


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


// Llamar a la función para crear estrellas
createStars();






