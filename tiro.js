function Tiro(context, nave, direcaoX, direcaoY){
   this.context = context;
   this.nave = nave;
   
   // MODIFICADO: Agora aceita as direções que a nave enviar
   this.direcaoX = direcaoX;
   this.direcaoY = direcaoY;
   
   this.largura = 12;
   this.altura = 12;
   this.x = nave.x + nave.largura/2 - this.largura/2;
   this.y = nave.y + nave.altura/2 - this.altura/2;
   this.velocidade = 10;
   this.cor = 'cyan';
}

Tiro.prototype = {
   atualizar: function(){
      // MODIFICADO: Movimenta nos dois eixos (X e Y)
      this.x += this.direcaoX * this.velocidade;
      this.y += this.direcaoY * this.velocidade;

      // Remover tiro se sair da tela (em qualquer direção)
      if (this.y < -this.altura || 
          this.y > this.context.canvas.height ||
          this.x < -this.largura ||
          this.x > this.context.canvas.width) 
      {
         const idx = this.animacao.sprites.indexOf(this);
         if(idx>=0) this.animacao.sprites.splice(idx,1);
      }
   },
   
   desenhar: function(){
      const ctx = this.context;
      ctx.save();
      ctx.fillStyle = this.cor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.cor;
      const raio = 6;
      ctx.beginPath();
      ctx.arc(this.x+raio, this.y+raio, raio, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
   }
};