class Jogo {
    constructor(body) {
        this.telaInicial = body[0];
        this.telaJogo = body[1];
        this.telaGameOver = body[2];

        this.statusDoJogo = false;
        this.telaAtual = 'jogo';
        this.loopId

        this.placar = body[1].children[0].children[0].children[1];
        this.ctx = body[1].children[0].children[1].getContext('2d');
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

    desenhaGrid() {
        if(!this.statusDoJogo) return;

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#bfb78fb2';

        for (let index = 28; index < 560; index += 28) {
            this.ctx.beginPath();
            this.ctx.lineTo(index, 0);
            this.ctx.lineTo(index, 560);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.lineTo(0, index);
            this.ctx.lineTo(560, index);
            this.ctx.stroke();
        }
    }

    loopJogo() {
        this.desenhaGrid();
        console.log('vai iniciar');
    }
}