function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
   this.pausado = false; // <-- MODIFICAÇÃO: Estado de pause
}

Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.animacao = this;
   },
   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   
   // <-- MODIFICAÇÃO: Função para desenhar a tela de pause
   desenharPause: function() {
      // Desenha o fundo semi-transparente
      this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      
      // Desenha o texto
      this.context.fillStyle = 'white';
      this.context.font = '50px Arial';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText('PAUSADO', this.context.canvas.width / 2, this.context.canvas.height / 2);
   },

   proximoFrame: function() {
      if(!this.ligado) return;

      // <-- MODIFICAÇÃO: Lógica de pause
      if (this.pausado) {
         // Se pausado, não limpa, não atualiza, só redesenha tudo e a tela de pause
         for(let s of this.sprites) s.desenhar();
         this.desenharPause();
         
         // Continua o loop no estado "pausado"
         requestAnimationFrame(() => this.proximoFrame());
         return; // Pula o resto da função
      }
      // Fim da modificação de pause

      this.limparTela();

      for(let s of this.sprites) s.atualizar();
      for(let s of this.sprites) s.desenhar();

      requestAnimationFrame(() => this.proximoFrame());
   },
   limparTela: function() {
      this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
   }
}; 