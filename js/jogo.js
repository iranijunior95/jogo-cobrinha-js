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
        this.fruta = [{ x: Math.round(Math.round(Math.random() * (532 - 0) + 0) / 28) * 28, y: Math.round(Math.round(Math.random() * (532 - 0) + 0) / 28) * 28}];

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

    gerarNovaFruta() {
        this.fruta = [{ x: Math.round(Math.round(Math.random() * (532 - 0) + 0) / 28) * 28, y: Math.round(Math.round(Math.random() * (532 - 0) + 0) / 28) * 28}];
    }

    desenharFruta() {
        if(!this.statusDoJogo) return;

        this.ctx.fillStyle = '#F2A71B';
        this.ctx.fillRect(this.fruta[0].x, this.fruta[0].y, this.size, this.size);
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
        this.verificaColisaoBordas();
        this.verificarColisaoCobra();
    }

    mudarDirecao(direcao) {
        if(!this.statusDoJogo) return;

        if(this.direcao == 'direita' && direcao == 'esquerda') {
            return;
        }

        if(this.direcao == 'esquerda' && direcao == 'direita') {
            return;
        }

        if(this.direcao == 'cima' && direcao == 'baixo') {
            return;
        }

        if(this.direcao == 'baixo' && direcao == 'cima') {
            return;
        }

        this.direcao = direcao; 
    }

    verificaColisaoBordas() {
        if(!this.statusDoJogo) return;

        const cabecaCobra = this.cobra[this.cobra.length -1];

        if(cabecaCobra.x > 532) {
            this.cobra.push({ x: 0, y: cabecaCobra.y });
            this.cobra.shift();
        }

        if(cabecaCobra.x < 0 ) {
            this.cobra.push({ x: 532, y: cabecaCobra.y });
            this.cobra.shift();
        }

        if(cabecaCobra.y > 532) {
            this.cobra.push({ x: cabecaCobra.x, y: 0 });
            this.cobra.shift();
        }

        if(cabecaCobra.y < 0) {
            this.cobra.push({ x: cabecaCobra.x, y: 532 });
            this.cobra.shift();
        }
    }

    verificarColisaoCobra() {
        if(!this.statusDoJogo) return;

        const cabecaCobra = this.cobra[this.cobra.length -1];
        const indexCabecaCobra = this.cobra.length -2;

        const colisao = this.cobra.find((posicao, index) => {
            return index < indexCabecaCobra && posicao.x == cabecaCobra.x && posicao.y == cabecaCobra.y;
        });

        if(colisao) {
            this.fimDeJogo();
        }
    }

    fimDeJogo() {
        if(!this.statusDoJogo) return;
        this.cobra.length = 0;
        this.cobra.push({ x: 140, y: 140 }, { x: 168, y: 140 });
        this.direcao = '';
        this.selecionarEstadoDoJogo('game over', false);
    }

    loopJogo() {
        if(!this.statusDoJogo) return;

        clearInterval(this.loopId);
        this.ctx.clearRect(0, 0, 560, 560);

        this.desenhaGrid();
        this.moverCobra();
        this.desenhaCobra();
        this.desenharFruta();
        
        this.loopId = setTimeout(() => {
            this.loopJogo();
        }, 300);
    }
}