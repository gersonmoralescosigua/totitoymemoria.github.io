let currentPlayer = '';    // Variable para almacenar el jugador actual (X u O)
let board = ['', '', '', '', '', '', '', '', ''];    // Arreglo que representa el tablero, inicialmente vacío
let gameActive = false;    // Indica si el juego está activo o no
let timer;       // Variable para el temporizador del juego
let timeElapsed = 0;    // Contador para el tiempo transcurrido en el juego
let playerXName = '';   // Almacena el nombre del jugador X
let playerOName = '';   // Almacena el nombre del jugador 0
let turnMessageElement = document.getElementById('turnMessage');    // Referencia al elemento HTML que muestra el turno actual

// Obtén el elemento de audio
const backgroundMusic = document.getElementById('background-music');   // Referencia al elemento de audio de fondo

// Manejo de eventos
document.getElementById('startButton').addEventListener('click', showWhoStarts);   // Asigna el evento click al botón de iniciar juego
document.getElementById('exitButton').addEventListener('click', () => {
    window.location.href = 'index.html';  // Redirigir a index.html cuando se presiona el botón de salir
});
document.getElementById('startX').addEventListener('click', () => startGame('X'));       // Inicia el juego con el jugador X
document.getElementById('startO').addEventListener('click', () => startGame('O'));       // Inicia el juego con el jugador 0
document.getElementById('restartButton').addEventListener('click', restartGame);         // Asigna el evento click al botón de reiniciar el juego

function showWhoStarts() {
    playerXName = document.getElementById('nameX').value;        // Obtiene el nombre del jugador X del input
    playerOName = document.getElementById('nameO').value;        // Obtiene el nombre del jugador O del input

    if (!playerXName || !playerOName) {
        alert("Por favor, ingresa los nombres de ambos jugadores.");     // Muestra un mensaje de error si faltan nombres
        return;
    }

    // Mostrar opciones de quién comienza
    document.getElementById('playerNames').classList.add('hidden');
    document.getElementById('whoStarts').classList.remove('hidden');
}

function startGame(firstPlayer) {
    currentPlayer = firstPlayer; // Establece quién inicia
    gameActive = true;           // Activa el juego
    board.fill('');              // Limpia el tablero
    timeElapsed = 0;             // Reinicia el tiempo transcurrido


    // Reproduce la música de fondo cuando comienza el juego
    backgroundMusic.play();


    // Mostrar la sección del juego y ocultar la pantalla de elección
    document.getElementById('whoStarts').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('gameBoard').innerHTML = '';                         // Limpia el contenido del tablero

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');    // Crea una nueva celda
        cell.classList.add('cell');                    // Asigna la clase 'cell' a la celda
        cell.setAttribute('data-index', i);            // Asigna el índice de la celda
        cell.addEventListener('click', cellClicked);   // Agrega el evento click a la celda
        document.getElementById('gameBoard').appendChild(cell);           // Agrega la celda al tablero

    }

    // Mostrar el mensaje de turno inicial
    turnMessageElement.innerText = `Turno de ${currentPlayer === 'X' ? playerXName : playerOName}`;
    turnMessageElement.classList.remove('hidden');
    startTimer();           // Inicia el temporizador
}

function cellClicked() {
    const index = this.getAttribute('data-index');      // Obtiene el índice de la celda clickeada

    if (board[index] !== '' || !gameActive) {
        return;     // Evita que se haga clic en una celda ocupada o si el juego no está activo
    }

    board[index] = currentPlayer;      // Marca la celda con el jugador actual
    this.textContent = currentPlayer;  // Muestra el símbolo del jugador en la celda

    if (checkWinner()) {
        gameActive = false;      // Termina el juego si hay un ganador
        clearInterval(timer);    // Detiene el temporizador
        displayResult(`¡Felicidades! ${currentPlayer === 'X' ? playerXName : playerOName} ganó en ${formatTime(timeElapsed)}.`);    // Muestra el resultado
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;    // Termina el juego si hay un empate
        clearInterval(timer);  // Detiene el temporizador
        displayResult(`¡Es un empate! Jugaste en ${formatTime(timeElapsed)}.`);   // Muestra el resultado de empate
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Cambia de jugador
        turnMessageElement.innerText = `Turno de ${currentPlayer === 'X' ? playerXName : playerOName}`; // Actualiza el mensaje de turno
    }
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winnerFound = false;      // Variable para determinar si se encontró un ganador


    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
             // Variable para determinar si se encontró un ganador
            document.querySelector(`[data-index='${a}']`).classList.add('winning-cell');
            document.querySelector(`[data-index='${b}']`).classList.add('winning-cell');
            document.querySelector(`[data-index='${c}']`).classList.add('winning-cell');
            winnerFound = true;    // Marca que se encontró un ganador
        }
    });

    return winnerFound;       // Devuelve true si hay un ganador
}



function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;           // Incrementa el tiempo transcurrido cada segundo
        document.getElementById('time').innerText = formatTime(timeElapsed);         // Actualiza la visualización del tiempo
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);   // Calcula hora
    const minutes = Math.floor((seconds % 3600) / 60);   // Calcula minutos
    const secs = seconds % 60;    // Calcula segundos
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;      // Formatea el tiempo en hh:mm:ss
}

function displayResult(message) {
    document.getElementById('result').innerText = message;     // Muestra el mensaje de resultado
    document.getElementById('result').classList.remove('hidden');    // Muestra el mensaje
    document.getElementById('gameBoard').classList.add('hidden');    // Oculta el tablero
    document.getElementById('restartButton').classList.remove('hidden');   // Muestra el botón de reiniciar
}

function restartGame() {
    currentPlayer = '';     // Resetea el jugador actual
    board = ['', '', '', '', '', '', '', '', ''];    // Limpia el tablero
    gameActive = false;     // Desactiva el juego
    clearInterval(timer);   // Detiene el temporizador
    timeElapsed = 0;        // Reinicia el tiempo transcurrido
    document.getElementById('gameBoard').classList.add('hidden');   // Oculta el tablero
    document.getElementById('timer').classList.add('hidden');       // Oculta el temporizador
    document.getElementById('result').classList.add('hidden');      // Oculta el resultado
    document.getElementById('restartButton').classList.add('hidden');   // Oculta el botón de reiniciar
    document.getElementById('playerNames').classList.remove('hidden');   // Muestra el botón de reiniciar

    // Limpiar las celdas y quitar el efecto de brillo
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = ''; // Limpia el contenido de las celdas
        cell.classList.remove('winning-cell'); // Elimina el efecto de brillo
    });

}


// Función para crear estrellas
function createStars() {
    const starCount = 100; // Número de estrellas a crear
    const container = document.querySelector('.container');   // Obtiene el contenedor donde se colocarán las estrellas

    for (let i = 0; i < starCount; i++) {    // Bucle que itera 100 veces para crear 100 estrellas

        createStar(container);     // Llama a la función `createStar` para crear una estrella en cada iteración
    }
}

// Función para crear una estrella
function createStar(container) {
    const star = document.createElement('div');    // Crea un nuevo elemento `div` que representará una estrella
    star.classList.add('star');       // Añade la clase `star` al div, lo que le dará su estilo de estrella
    // Posicionar cada estrella en un lugar aleatorio en la pantalla
    star.style.left = Math.random() * window.innerWidth + 'px';  // Coloca la estrella en una posición horizontal aleatoria dentro del ancho de la ventana
    star.style.animationDuration = Math.random() * 3 + 2 + 's';  // Define la duración de la animación, que será entre 2 y 5 segundos

    container.appendChild(star);     // Añade la estrella al contenedor pasado como parámetro

    // Eliminar la estrella después de que cae
    star.addEventListener('animationend', () => {     // Agrega un evento que escucha el final de la animación
        star.remove();         // Agrega un evento que escucha el final de la animación
        createStar(container);// Llama a `createStar` nuevamente para generar una nueva estrella al terminar la anterior
    });
}


// Llamar a la función para crear estrellas
createStars();


