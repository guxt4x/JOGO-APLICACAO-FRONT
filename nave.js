function Nave(context, teclado, imagem, somColisao) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.somColisao = somColisao; // <-- NOVO: som para colisão
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.escala = 0.1;
    this.largura = 0;
    this.altura = 0;
    this.vidas = 3;
    this.danoTimer = 0;
    this.imagemVidas = null;
}

Nave.prototype = {
    atualizarDimensoes: function() { 
        this.largura = this.imagem.width * this.escala; 
        this.altura = this.imagem.height * this.escala; 
    },

    atualizar: function() {
        if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) 
            this.x -= this.velocidade;
        if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.largura) 
            this.x += this.velocidade;
        if(this.teclado.pressionada(SETA_ACIMA) && this.y > 0) 
            this.y -= this.velocidade;
        if(this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.altura) 
            this.y += this.velocidade;
    },

    desenhar: function() {
        const ctx = this.context;
        
        // Efeito de dano
        if(this.danoTimer > 0) {
            ctx.globalAlpha = this.danoTimer % 10 < 5 ? 0.5 : 1;
            this.danoTimer--;
        }
        
        // Desenha a nave principal
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
        ctx.globalAlpha = 1;

        // Desenha vidas no canto superior esquerdo
        const padding = 5;
        const tamanhoVida = 30;
        
        for(let i = 0; i < this.vidas; i++){
            if(this.imagemVidas && this.imagemVidas.complete) {
                ctx.drawImage(
                    this.imagemVidas, 
                    padding + i * (tamanhoVida + 5), 
                    padding, 
                    tamanhoVida, 
                    tamanhoVida
                );
            } else {
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(padding + i * (tamanhoVida + 5) + 15, padding + 15, 10, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = 'white';
                ctx.font = '10px Arial';
                ctx.fillText('V', padding + i * (tamanhoVida + 5) + 12, padding + 20);
            }
        }
    },

    atirar: function() {
        if (this.animacao.pausado) return;
    
        const somTiro = new Audio('som-novo.mp3');
        somTiro.volume = 0.5;
        somTiro.play();

        let direcaoY = -1;
        let direcaoX = 0;

        if (this.teclado.pressionada(SETA_ESQUERDA)) {
            direcaoX = -1; 
        } else if (this.teclado.pressionada(SETA_DIREITA)) {
            direcaoX = 1;
        }

        const t = new Tiro(this.context, this, direcaoX, direcaoY);
        this.animacao.novoSprite(t);
    },

    levarDano: function() {
        this.vidas--;
        this.danoTimer = 60;
        
        // <-- NOVO: Toca som de colisão quando leva dano
        if (this.somColisao) {
            this.somColisao.currentTime = 0;
            this.somColisao.play();
        }
    },
    
    ganharVida: function() {
        if (this.vidas < 5) {
            this.vidas++;
        }
    },

    setImagemVidas: function(imagem) {
        this.imagemVidas = imagem;
    }
};