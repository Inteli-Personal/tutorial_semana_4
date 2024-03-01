// Definindo a cena de boas-vindas usando a biblioteca Phaser
class Welcome extends Phaser.Scene {
  // Construtor da cena
  constructor() {
    super({
      key: "Welcome",
      backgroundColor: "#000", // Configuração da cor de fundo da cena
    });
  }

  // Pré-carregamento de recursos
  preload() {
    this.load.image("okBtn", "assets/okBtn.png"); // Carregando a imagem do botão
  }

  // Função chamada quando a cena é criada
  create() {
    // Configuração do texto de boas-vindas
    let title = "O Papa Títulos";
    this.add.text(
      this.game.config.width / 2.9,
      this.game.config.height / 10,
      title,
      {
        color: "#de0209",
        fontSize: 30,
        fontStyle: "bold",
      }
    );
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
    for (let i = 0; i < instructions.length; i++) {
      this.add.text(220, 150 + i * 20, instructions[i], {
        color: "#fff",
        fontSize: 20,
      });
    }

    // Configuração do botão de "OK"
    let okBtn = this.add
      .image(
        this.game.config.width / 2.2,
        (this.game.config.height / 4) * 2.7,
        "okBtn"
      )
      .setScale(0.7)
      .setOrigin(0, 0)
      .setInteractive()
      .setVisible(true);

    // Configuração de evento para iniciar o jogo ao clicar no botão "ok"
    okBtn.on(
      "pointerdown",
      function () {
        this.scene.start("PapaTitulos", this.game);
      },
      this
    );
  }
}
