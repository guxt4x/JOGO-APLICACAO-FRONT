function PowerUp(context, imagem, nave, tipo, somVidaExtra, somPegadinha) {
   this.context = context;
   this.imagem = imagem;
   this.nave = nave;
   this.tipo = tipo;
   
   this.somVidaExtra = somVidaExtra;
   this.somPegadinha = somPegadinha;
   
   this.largura = 45;
   this.altura = 45;
   
   this.x = Math.random() * (context.canvas.width - this.largura);
   this.y = -this.altura;
   
   this.velocidade = 2.5 + Math.random() * 1.5;
}

PowerUp.prototype = {
   atualizar: function() {
      if (this.animacao.pausado) return;
   
      this.y += this.velocidade;
      
      if (this.y > this.context.canvas.height) {
         this.removerDoJogo();
         return;
      }
      
      if (this.colidiuCom(this.nave)) {
         
         if (this.tipo === 'vida') {
            this.nave.ganharVida();
            
            if (this.somVidaExtra) {
               this.somVidaExtra.currentTime = 0;
               this.somVidaExtra.play();
            }
            
            if (this.onColetarVida) {
               this.onColetarVida();
            }
         } 
         else if (this.tipo === 'pegadinha') {
            this.nave.levarDano();
            
            if (this.somPegadinha) {
               this.somPegadinha.currentTime = 0;
               this.somPegadinha.play();
            }
         }
         
         this.removerDoJogo();
      }
   },

   desenhar: function() {
      this.context.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
   },
   
   removerDoJogo: function() {
      const idx = this.animacao.sprites.indexOf(this);
      if (idx >= 0) this.animacao.sprites.splice(idx, 1);
   },

   colidiuCom: function(outro) {
      return !(outro.x > this.x + this.largura ||
               outro.x + outro.largura < this.x ||
               outro.y > this.y + this.altura ||
               outro.y + outro.altura < this.y);
   }
};