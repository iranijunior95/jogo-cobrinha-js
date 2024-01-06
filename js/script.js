const body = Array(document.querySelector('body'))[0].children;
const btnStart = document.querySelector('#btn-start');
const btnsTelaGameOver = document.querySelectorAll('.btns-game-over');

const jogo = new Jogo(body);

btnStart.addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('jogo', true);
});

btnsTelaGameOver[0].addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('inicio', false);
});

btnsTelaGameOver[1].addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('jogo', true);
});

jogo.selecionarEstadoDoJogo('inicio', false);

