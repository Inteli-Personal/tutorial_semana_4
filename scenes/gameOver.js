class GameOver extends Phaser.Scene {
  // Construtor da cena
  constructor() {
    super({
      key: "GameOver",
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
    let title = "Game Over!";
    this.add.text(
      this.game.config.width / 2.9 + 25,
      this.game.config.height / 5,
      title,
      {
        color: "#de0209",
        fontSize: 30,
        fontStyle: "bold",
      }
    );
    let message = [
      "Oops! Parece que seus rivais te",
      "derrotaram.",
      "",
      "Clique em ok se quiser reiniciar",
    ];
    for (let i = 0; i < message.length; i++) {
      this.add.text(220, 200 + i * 20, instructions[i], {
        color: "#fff",
        fontSize: 20,
      });
    }

    // Configuração do botão de "OK"
    let okBtn = this.add
      .image(this.game.config.width / 2.2, this.game.config.height / 2 + 65, "okBtn")
      .setScale(0.7)
      .setOrigin(0, 0)
      .setInteractive()
      .setVisible(true);

    // Configuração de evento para iniciar o jogo ao clicar no botão "ok"
    // okBtn.on(
    //   "pointerdown",
    //   function () {
    //     this.scene.start("Welcome", this.game);
    //   },
    //   this
    // );
  }
}
