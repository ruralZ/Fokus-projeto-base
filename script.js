const html = document.querySelector('html');

const displayTempo = document.querySelector('#timer');
const Banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const startButton = document.getElementById('start-pause');

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarStatus('foco');
    alterarContesto(focoBt);
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarStatus('descanso-curto');
    alterarContesto(curtoBt);
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarStatus('descanso-longo');
    alterarContesto(longoBt);
    longoBt.classList.add('active');
})

startButton.addEventListener('click', () => {
    
})

const alterarContesto = (contexto) => {
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