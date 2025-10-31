function Fundo(context, imagem) {
   this.context = context;
   this.imagem = imagem;
   this.velocidade = 0;
   this.posicaoEmenda = 0;
}
Fundo.prototype = {
   atualizar: function() {
      // Atualizar a posição de emenda
      this.posicaoEmenda += this.velocidade;
      
      if (this.posicaoEmenda > this.context.canvas.height) {
         this.posicaoEmenda = 0;
      }
   },
   
   desenhar: function() {
      var img = this.imagem;
      var canvas = this.context.canvas;
      
      var posicaoY = this.posicaoEmenda - canvas.height;
      
      this.context.drawImage(img, 0, posicaoY, canvas.width, canvas.height); 
      
      posicaoY = this.posicaoEmenda;
      
      this.context.drawImage(img, 0, posicaoY, canvas.width, canvas.height);
   }
}