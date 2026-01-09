const html = document.querySelector('html');

const displayTempo = document.querySelector('#timer');
const Banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');
const startPauseButton = document.querySelector('#start-pause');

const startPauseText = document.querySelector('#start-pause span');
const startPauseIcon = document.querySelector('#start-pause img');

const timer = document.getElementById('timer');

const musica = new Audio('sons/Resident-Evil-1-Save-Room-Theme.ogg');
const gameOverSound = new Audio('sons/beep.mp3');
musica.loop = true

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const startButton = document.getElementById('start-pause');

let duracaoFoco = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    duracaoFoco = 1500;

    alterarStatus('foco');
    alterarContesto(focoBt);
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    duracaoFoco = 300;

    alterarStatus('descanso-curto');
    alterarContesto(curtoBt);
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    duracaoFoco = 900;
    
    alterarStatus('descanso-longo');
    alterarContesto(longoBt);
    longoBt.classList.add('active');
})

const alterarContesto = (contexto) => {
    stop();
    showTimer();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
}

const alterarStatus = (contexto) => {
    html.setAttribute('data-contexto', contexto);
    Banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>            
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong> 
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const start = () => {
    const pauseAudio = new Audio('sons/pause.mp3');
    pauseAudio.play();

    if (intervaloId) {
        stop();
        return;
    }
    startPauseText.textContent = "Pausar";
    startPauseIcon.setAttribute('src', 'imagens/pause.png');
    intervaloId = setInterval(ContagemRegressivaFoco, 1000);
}

const stop = () => {
    startPauseText.textContent = "Começar";
    startPauseIcon.setAttribute('src', 'imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;
} 

const ContagemRegressivaFoco = () => {
    if (duracaoFoco <= 0) {
        stop();
        gameOverSound.play();
        return;
    }

    duracaoFoco -= 1;
    showTimer();
    
}

const showTimer = () => {
    const minutos = Math.floor(duracaoFoco / 60);
    const segundos = duracaoFoco % 60;
    const tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    timer.innerHTML = tempoFormatado
    document.title = `${tempoFormatado} - Fokus`
}

startPauseButton.addEventListener('click', start);
showTimer();