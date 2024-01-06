class Jogo {
    constructor(body) {
        this.telaInicial = body[0];
        this.telaJogo = body[1];
        this.telaGameOver = body[2];

        this.statusDoJogo = true;
        this.telaAtual = 'jogo';

        this.placar = body[1].children[0].children[0].children[1];
        this.ctx = body[1].children[0].children[1];
    }

    selecionarEstadoDoJogo(tela, status) {
        this.telaAtual = tela;
        this.statusDoJogo = status;

        this.atualizarTela();
    }

    atualizarTela() {
        if(this.telaAtual == 'inicio' && !this.statusDoJogo) {
            this.telaInicial.style.display = 'block';
            this.telaJogo.style.display = 'none';
            this.telaGameOver.style.display = 'none';
        }

        if(this.telaAtual == 'jogo' && this.statusDoJogo) {
            this.telaInicial.style.display = 'none';
            this.telaJogo.style.display = 'block';
            this.telaGameOver.style.display = 'none';
        }

        if(this.telaAtual == 'game over' && !this.statusDoJogo) {
            this.telaInicial.style.display = 'none';
            this.telaJogo.style.display = 'none';
            this.telaGameOver.style.display = 'block';
        }
    }

    test() {
        
    }
}