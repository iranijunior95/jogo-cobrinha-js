class Jogo {
    constructor(body) {
        this.telaInicial = body[0];
        this.telaJogo = body[1];
        this.telaGameOver = body[2];

        this.statusDoJogo = false;
        this.telaAtual = 'jogo';
        this.loopId
        this.direcao
        this.size = 28;
        this.cobra = [{ x: 140, y: 140 }, { x: 168, y: 140 }];

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

    desenhaCobra() {
        if(!this.statusDoJogo) return;

        this.ctx.fillStyle = '#f2f2f2';

        this.cobra.forEach((element, index) => {

            if(index === this.cobra.length -1) {
                this.ctx.fillStyle = '#025E73';
            }

            this.ctx.fillRect(element.x, element.y, this.size, this.size);

        });
    }

    moverCobra() {
        if(!this.statusDoJogo) return;

        if(!this.direcao) return;

        const cabecaCobra = this.cobra[this.cobra.length -1];

        switch (this.direcao) {
            case "direita":
                this.cobra.push({ x: cabecaCobra.x + this.size, y: cabecaCobra.y });
                break;

            case "esquerda":  
                this.cobra.push({ x: cabecaCobra.x - this.size, y: cabecaCobra.y }); 
                break;

            case "baixo":
                this.cobra.push({ x: cabecaCobra.x, y: cabecaCobra.y + this.size });
                break;
                    
            case "cima":
                this.cobra.push({ x: cabecaCobra.x, y: cabecaCobra.y - this.size });
                break;
        }

        this.cobra.shift();
    }

    mudarDirecao(direcao) {
        if(!this.statusDoJogo) return;

        this.direcao = direcao;
    }

    loopJogo() {
        if(!this.statusDoJogo) return;

        clearInterval(this.loopId);
        this.ctx.clearRect(0, 0, 560, 560);

        this.desenhaGrid();
        this.desenhaCobra();
        this.moverCobra();

        this.loopId = setTimeout(() => {
            this.loopJogo();
        }, 300);
    }
}