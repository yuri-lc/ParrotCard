document.addEventListener("DOMContentLoaded", iniciarJogo);

let primeiraCarta = null;
let segundaCarta = null;
let jogadas = 0;
let paresEncontrados = 0;

function iniciarJogo() {
  let quantidadeCartas;

  do {
    quantidadeCartas = parseInt(prompt("Com quantas cartas deseja jogar? (De 4 a 14, apenas números pares)"));
  } while (isNaN(quantidadeCartas) || quantidadeCartas < 4 || quantidadeCartas > 14 || quantidadeCartas % 2 !== 0);

  gerarCartas(quantidadeCartas);
}

function gerarCartas(quantidade) {
  const jogo = document.querySelector(".jogo");
  jogo.innerHTML = ""; 

  const imagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
  ];

  const cartasEscolhidas = imagens.slice(0, quantidade / 2).flatMap(imagem => [imagem, imagem]);
  cartasEscolhidas.sort(() => Math.random() - 0.5); 

  cartasEscolhidas.forEach(imagem => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    carta.innerHTML = `
      <div class="card" onclick="virar(this)" data-imagem="${imagem}">
        <img class="face frente-face" src="projeto__parrots__imagens/assets/${imagem}" alt="Frente da Carta">
        <img class="face verso-face" src="projeto__parrots__imagens/assets/back.png" alt="Verso da Carta">
      </div>
    `;

    jogo.appendChild(carta);
  });
}

function virar(elemento) {
  if (elemento.classList.contains("virada") || segundaCarta) return;

  elemento.classList.add("virada");
  jogadas++;

  if (!primeiraCarta) {
    primeiraCarta = elemento;
  } else {
    segundaCarta = elemento;

    if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
    
      primeiraCarta = null;
      segundaCarta = null;
      paresEncontrados++;

    
      if (paresEncontrados === document.querySelectorAll(".card").length / 2) {
        setTimeout(() => alert(`Você ganhou em ${jogadas} jogadas!`), 500);
      }
    } else {
    
      setTimeout(() => {
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");
        primeiraCarta = null;
        segundaCarta = null;
      }, 1000);
    }
  }
}


