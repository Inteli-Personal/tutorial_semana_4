// Definindo a cena de boas-vindas usando a biblioteca Phaser
class Welcome extends Phaser.Scene {
  // Construtor da cena
  constructor() {
    super({
      key: "Welcome",
      // Configuração da cor de fundo da cena
      backgroundColor: "#000",
    });
  }

  // Pré-carregamento de recursos
  preload() {
    // Carregando a imagem do botão
    this.load.image("okBtn", "assets/okBtn.png");
  }

  // Função chamada quando a cena é criada
  create() {
    // Configuração do texto de boas-vindas
    let title = "O Papa Títulos";
    this.add.text(
      // Posiciona o título no centro da tela (horizontalmente) e 10% da altura da tela abaixo do topo
      this.game.config.width / 2.9,
      this.game.config.height / 10,
      title,
      {
        color: "#de0209",
        fontSize: 30,
        fontStyle: "bold",
      }
    );

    // Define o texto das instruções
    let instructions = [
      "Olá! Aqui está o passo a passo",
      "para que você aproveite o máximo",
      "do Papa Títulos.",
      "",
      "- Objetivo: Tente chegar às",
      "taças sem ser sabotado por",
      "nenhum time adversário.",
      "- Botões de comando: Use as",
      "setas para cima, baixo, direita ",
      "e esquerda para mover seu escudo.",
    ];

    // Cria e configura cada linha de instrução
    for (let i = 0; i < instructions.length; i++) {
      this.add.text(
        220, // Posição horizontal fixa a 220 pixels da borda esquerda
        150 + i * 20, // Posiciona a primeira linha a 150 pixels da borda superior e as demais com espaçamento de 20 pixels
        instructions[i],
        {
          color: "#fff",
          fontSize: 20,
        }
      );
    }

    // Configuração do botão "OK"
    let okBtn = this.add
      // Posiciona o botão no centro da tela (horizontalmente) e 2.7 vezes a 1/4 da altura da tela abaixo do topo
      .image(
        this.game.config.width / 2.2,
        (this.game.config.height / 4) * 2.7,
        "okBtn"
      )
      // Escala a imagem do botão para 70%
      .setScale(0.7)
      // Define a origem da imagem no canto superior esquerdo
      .setOrigin(0, 0)
      // Torna o botão interativo e visível
      .setInteractive()
      .setVisible(true);

    // Configuração de evento para iniciar o jogo ao clicar no botão "ok"
    okBtn.on(
      "pointerdown",
      // Função para iniciar o jogo ao clicar no botão
      function () {
        // Inicia a cena "PapaTitulos" e passa o objeto "game" como parâmetro
        this.scene.start("PapaTitulos", this.game);
      },
      // Define o contexto da função como a cena atual
      this
    );
  }
}
