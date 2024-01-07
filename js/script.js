const body = Array(document.querySelector('body'))[0].children;
const btnStart = document.querySelector('#btn-start');
const btnsTelaGameOver = document.querySelectorAll('.btns-game-over');

const jogo = new Jogo(body);

btnStart.addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('jogo', true);
    jogo.loopJogo();
});

btnsTelaGameOver[0].addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('inicio', false);
});

btnsTelaGameOver[1].addEventListener('click', () => {
    jogo.selecionarEstadoDoJogo('jogo', true);
    jogo.loopJogo();
});

jogo.selecionarEstadoDoJogo('inicio', false);

document.addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'ArrowRight':
            jogo.mudarDirecao('direita');
            break;
        
        case 'ArrowLeft':
            jogo.mudarDirecao('esquerda');
            break;

        case 'ArrowDown':
            jogo.mudarDirecao('baixo');
            break;

        case 'ArrowUp':
            jogo.mudarDirecao('cima');
            break;
    }
});

