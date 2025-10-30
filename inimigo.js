function Inimigo(context, imagem, imgExplosao, nave, somAbate) {
   this.context = context;
   this.imagem = imagem;
   this.imgExplosao = imgExplosao;
   this.somAbate = somAbate; // <-- NOVO: som para abate
   this.largura = 60;
   this.altura = 40;
   this.x = 0;
   this.y = -this.altura;
   this.velocidade = 2 + Math.random()*2;
   this.vivo = true;
   this.explodindo = false;
   this.frameExplosao = 0;
   this.nave = nave;
   // this.onDestruir -> será definido no arquivo HTML
}

Inimigo.prototype.atualizar = function(){
   if(this.explodindo){
      this.frameExplosao++;
      if(this.frameExplosao>5){
         const i=this.animacao.sprites.indexOf(this);
         if(i>=0) this.animacao.sprites.splice(i,1);
      }
      return;
   }
   if(!this.vivo) return;

   this.y+=this.velocidade;

   if (this.y < 0) {
      return;
   }

   // Colisão com tiros
   for(let s of this.animacao.sprites){
      if(s instanceof Tiro && this.colidiuCom(s)){
         this.explodir();
         
         // <-- NOVO: Toca som de abate quando é atingido por tiro
         if (this.somAbate) {
            this.somAbate.currentTime = 0;
            this.somAbate.play();
         }
         
         // O contador de pontos vem para CÁ.
         // Só conta pontos se a colisão foi com um TIRO.
         if (this.onDestruir) {
            this.onDestruir();
         }
         
         const idx=this.animacao.sprites.indexOf(s);
         if(idx>=0) this.animacao.sprites.splice(idx,1);
         break;
      }
   }

   // Colisão com nave -> perder vida
   if(this.colidiuCom(this.nave)){
      this.nave.levarDano(); 
      this.explodir();
      // Não contamos pontos aqui (foi um suicídio, não um abate).
   }
};

Inimigo.prototype.desenhar = function(){
   if(this.explodindo){
      this.context.drawImage(this.imgExplosao,this.x,this.y,this.largura,this.altura);
      return;
   }
   if(!this.vivo) return;
   this.context.drawImage(this.imagem,this.x,this.y,this.largura,this.altura);
};

Inimigo.prototype.colidiuCom = function(outro){
   return !(outro.x>this.x+this.largura ||
            outro.x+outro.largura<this.x ||
            outro.y>this.y+this.altura ||
            outro.y+outro.altura<this.y);
};

Inimigo.prototype.explodir = function(){
   this.explodindo = true;
   this.vivo = false;
   this.frameExplosao = 0;
};