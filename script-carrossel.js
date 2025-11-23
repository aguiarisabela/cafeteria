// Seleciona o elemento da lista de depoimentos.
// Isso é o container principal onde os itens (depoimentos) estão alinhados horizontalmente.
const carrossel = document.querySelector(".depoimentos-list");

// Seleciona todos os botões de navegação (setas esquerda e direita, com classe fa-solid).
// São os controles para mover o carrossel manualmente.
const botoesDep = document.querySelectorAll(".fa-solid");

// Calcula a largura do primeiro depoimento (li.depoimentos).
// Usamos offsetWidth para incluir padding/margem. Isso define quanto rolar a cada "passo".
// É como medir o tamanho de uma bagagem para saber quanto empurrar a esteira por vez.
const primeiroDepoimentoWidth =
  carrossel.querySelector(".depoimentos").offsetWidth;

// Cria um array com todos os filhos do carrossel (os <li> originais).
// Usamos spread operator [...] para converter NodeList em array, facilitando operações como slice().
// Fazer uma lista das bagagens originais antes de duplicá-las.
const carrosselFilhos = [...carrossel.children];

// Variáveis globais para controle de estado.
// isDragging: Flag booleana (true/false) para indicar se o usuário está arrastando (mouse ou toque).
// Um interruptor que liga quando você "segura" a esteira.
let isDragging = false;

// startX: Posição inicial do mouse/toque no eixo X (horizontal).
// startScrollLeft: Posição inicial de rolagem do carrossel.
// Essas são usadas para calcular quanto deslizar durante o arrasto.
let startX;
let startScrollLeft;

// timeOutId: ID do setTimeout para o autoplay, para podermos cancelá-lo (com clearTimeout).
let timeOutId;

// Calcula quantos depoimentos cabem na tela atual (visíveis de uma vez).
// Divide a largura do carrossel pela largura de um item e arredonda.
// Por exemplo: Contar quantas bagagens cabem na vista da esteira de uma vez (ex: 3 em desktop, 1 em mobile).
let depPerView = Math.round(carrossel.offsetWidth / primeiroDepoimentoWidth);

// Duplica os últimos 'depPerView' itens e insere no INÍCIO (em ordem reversa).
// Por quê reversa? Para manter a sequência lógica quando rolar para esquerda.
// Por exemplo: Copiar o final da esteira e colar no começo, mas invertido, como enrolar em um círculo.
carrosselFilhos
  .slice(-depPerView)
  .reverse()
  .forEach(function (depoimentos) {
    carrossel.insertAdjacentHTML("afterbegin", depoimentos.outerHTML);
  });

// Duplica os primeiros 'depPerView' itens e insere no FIM.
// Exemplo: Copiar o início e colar no final, completando o loop.
carrosselFilhos.slice(0, depPerView).forEach(function (depoimentos) {
  carrossel.insertAdjacentHTML("beforeend", depoimentos.outerHTML);
});

// Para cada botão, adiciona um event listener de clique.
// Rola para esquerda (- largura) ou direita (+ largura).
botoesDep.forEach(function (btn) {
  btn.addEventListener("click", function () {
    carrossel.scrollLeft +=
      btn.id === "left" ? -primeiroDepoimentoWidth : primeiroDepoimentoWidth;
  });
});

// Inicia o arrasto ao pressionar o mouse.
// Ativa flag, adiciona classe 'dragging' (para CSS: muda cursor para 'grab', desativa snap).
// Captura posições iniciais.
function dragStart(e) {
  isDragging = true;
  carrossel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carrossel.scrollLeft;
}

// Durante o movimento do mouse, calcula e aplica rolagem.
// Sai cedo se não dragging. Subtrai distância movida.
function dragging(e) {
  if (!isDragging) return;
  carrossel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

// Para o arrasto ao soltar o mouse.
// Desativa flag e remove classe.
function dragStop() {
  isDragging = false;
  carrossel.classList.remove("dragging");
}

// Funções para touch (mobile)
function touchStart(e) {
  isDragging = true;
  carrossel.classList.add("dragging");
  startX = e.touches[0].pageX;
  startScrollLeft = carrossel.scrollLeft;
}

function touchMove(e) {
  if (!isDragging) return;
  carrossel.scrollLeft = startScrollLeft - (e.touches[0].pageX - startX);
}

function touchEnd() {
  isDragging = false;
  carrossel.classList.remove("dragging");
}

// Agenda rolagem para direita a cada 2500ms (2.5s).
// Usa setTimeout recursivo (chama a si mesma).
// Analogia: Um timer que empurra a esteira periodicamente.
const autoPlay = () => {
 if (window.innerWidth < 800) return;
 timeOutId = setTimeout(() => carrossel.scrollLeft += primeiroDepoimentoWidth, 2500)
};
autoPlay()

// Inicia o ciclo de autoplay.
autoPlay();

// Chamada a cada scroll. Verifica se chegou ao início (scrollLeft=0) ou fim.
// Adiciona classe 'no-transition' (CSS: desativa animação suave para reset instantâneo).
// Reseta posição para o "meio" do loop duplicado.
// Remove classe após reset.
// Analogia: Quando a esteira chega ao fim, "teleporta" de volta ao início sem que veja a costura.
function infiniteScroll() {
  if (carrossel.scrollLeft === 0) {
    carrossel.classList.add("no-transition");
    carrossel.scrollLeft = carrossel.scrollWidth - 2 * carrossel.offsetWidth;
    carrossel.classList.remove("no-transition");
  } else if (
    Math.ceil(carrossel.scrollLeft) ===
    carrossel.scrollWidth - carrossel.offsetWidth
  ) {
    carrossel.classList.add("no-transition");
    carrossel.scrollLeft = carrossel.offsetWidth;
    carrossel.classList.remove("no-transition");
  }

  // Limpa timeout atual (pausa autoplay durante interação).
  clearTimeout(timeOutId);
  // Reinicia autoplay se mouse NÃO estiver sobre o carrossel (usa :hover).
  if (!carrossel.matches(":hover")) {
    autoPlay();
  }
}

// Para mouse: mousedown (início), mousemove (movimento), mouseup (fim, no document para capturar fora).
carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// Para touch: touchstart, touchmove, touchend (similar).
carrossel.addEventListener("touchstart", touchStart);
carrossel.addEventListener("touchmove", touchMove);
document.addEventListener("touchend", touchEnd);

// Para scroll: ativa infiniteScroll a cada mudança de rolagem.
carrossel.addEventListener("scroll", infiniteScroll);



