// Dados das imagens por tema
const imagensPorTema = {
    drama: ["drama1.jpg", "drama2.jpg", "drama3.jpg", "drama4.jpg", "drama5.jpg", "drama6.jpg"],
    realities: ["realities1.jpg", "realities2.jpg", "realities3.jpg", "realities4.jpg", "realities5.jpg", "realities6.jpg"],
    ação: ["acao1.jpg", "acao2.jpg", "acao3.jpg", "acao4.jpg", "acao5.jpg", "acao6.jpg"], // Acentuação corrigida
    comédia: ["comedia1.jpg", "comedia2.jpg", "comedia3.jpg", "comedia4.jpg", "comedia5.jpg", "comedia6.jpg"], // Acentuação corrigida
    policial: ["policial1.jpg", "policial2.jpg", "policial3.jpg", "policial4.jpg", "policial5.jpg", "policial6.jpg"],
    filmes: ["filmes1.jpg", "filmes2.jpg", "filmes3.jpg", "filmes4.jpg", "filmes5.jpg", "filmes6.jpg"],
};

// Lista de opções com acentuação
const opcoes = ["Drama", "Realities", "Ação", "Comédia", "Policial", "Filmes"];

// Elementos do DOM
const opcoesContainer = document.querySelector(".opcoes");
const gridImagens = document.querySelector(".grid-imagens");
const setaEsquerda = document.querySelector(".seta-esquerda");
const setaDireita = document.querySelector(".seta-direita");

let posicaoAtual = 0; // Começa com o primeiro item (Drama) como ativo

// Função para carregar as imagens do tema selecionado
function carregarImagens(tema) {
    gridImagens.innerHTML = ""; // Limpa o grid de imagens
    imagensPorTema[tema.toLowerCase()].forEach((imagem) => {
        const img = document.createElement("img");
        img.src = `img/${imagem}`; // Caminho das imagens
        gridImagens.appendChild(img);
    });
}

// Função para calcular a posição correta (considerando o carrossel infinito)
function calcularPosicao(posicao) {
    if (posicao < 0) {
        return opcoes.length - 1; // Volta para o último item se estiver no primeiro
    } else if (posicao >= opcoes.length) {
        return 0; // Volta para o primeiro item se estiver no último
    }
    return posicao;
}

// Função para atualizar o carrossel
function atualizarCarrossel() {
    opcoesContainer.innerHTML = ""; // Limpa as opções atuais

    // Adiciona as opções ao carrossel
    for (let i = posicaoAtual - 1; i <= posicaoAtual + 1; i++) {
        const posicao = calcularPosicao(i); // Calcula a posição correta (considerando o carrossel infinito)
        const opcao = document.createElement("span");
        opcao.classList.add("opcao");
        if (i === posicaoAtual) {
            opcao.classList.add("ativo"); // Destaca o item do meio
        }
        opcao.textContent = opcoes[posicao];
        opcao.dataset.tema = opcoes[posicao].toLowerCase();
        opcoesContainer.appendChild(opcao);

        // Adiciona evento de clique para carregar as imagens
        opcao.addEventListener("click", () => {
            posicaoAtual = posicao; // Atualiza a posição atual
            atualizarCarrossel(); // Atualiza o carrossel
            carregarImagens(opcoes[posicao].toLowerCase()); // Carrega as imagens
        });
    }

    // Carrega as imagens do tema ativo
    carregarImagens(opcoes[posicaoAtual].toLowerCase());
}

// Navegação do carrossel
setaEsquerda.addEventListener("click", () => {
    posicaoAtual = calcularPosicao(posicaoAtual - 1); // Vai para o item anterior
    atualizarCarrossel();
});

setaDireita.addEventListener("click", () => {
    posicaoAtual = calcularPosicao(posicaoAtual + 1); // Vai para o próximo item
    atualizarCarrossel();
});

// Inicializa o carrossel
atualizarCarrossel();