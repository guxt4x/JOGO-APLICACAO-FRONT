SETA_ESQUERDA = 37;
SETA_ACIMA = 38;
SETA_DIREITA = 39;
SETA_ABAIXO = 40;
ESPACO = 32;
P_KEY = 80;

function Teclado(elemento){
   this.elemento = elemento;
   this.pressionadas = [];
   this.disparadas = [];
   this.funcoesDisparo = [];

   // MODIFICAÇÃO: Criamos referências para as funções de evento
   // para que possamos removê-las depois.
   var teclado = this;
   
   this.onKeyDown = function(evento) {
      var tecla = evento.keyCode;
      teclado.pressionadas[tecla] = true;

      if(teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]){
         teclado.disparadas[tecla] = true;
         teclado.funcoesDisparo[tecla]();
      }
   };
   
   this.onKeyUp = function(evento) {
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   };

   elemento.addEventListener('keydown', this.onKeyDown);
   elemento.addEventListener('keyup', this.onKeyUp);
}

Teclado.prototype = {
   pressionada: function(tecla){ return this.pressionadas[tecla]; },
   disparou: function(tecla, callback){ this.funcoesDisparo[tecla] = callback; },
   
   // MODIFICAÇÃO: Nova função para desligar os ouvintes
   desligar: function() {
      this.elemento.removeEventListener('keydown', this.onKeyDown);
      this.elemento.removeEventListener('keyup', this.onKeyUp);
   }
};