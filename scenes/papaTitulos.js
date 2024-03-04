// Definindo a cena do jogo usando a biblioteca Phaser
let keyboard;
let player;
let score;
let enemy1;
let enemy2;
let enemy3;
let scoreValue = 0;
let path = {};
let enemy1x = 300;
let enemy2x = 375;
let enemy3x = 500;
let playerx = 300;
let playery = 600;
let trophies = [];
let trophiesX = {
  trophy1x: 300,
  trophy2x: 375,
  trophy3x: 450,
  trophy4x: 525,
};
let startGame = true;
let gameOverTitle;
let okBtn;
let message;
let bg;
let blackBg;
let gameOverMessage;

class PapaTitulos extends Phaser.Scene {
  // Construtor da cena
  constructor() {
    super({
      key: "PapaTitulos",
    });
  }

  // Pré-carregamento de recursos
  preload() {
    // Carregando imagens e sprites
    this.load.image("okBtn", "assets/okBtn.png"); // Botão "OK"
    this.load.image("background", "assets/background.jpg"); // Fundo do jogo
    this.load.image("bench", "assets/bench.png"); // Banco
    this.load.image("trophy1", "assets/trophy1.png"); // Troféu 1
    this.load.image("trophy2", "assets/trophy2.png"); // Troféu 2
    this.load.image("trophy3", "assets/trophy3.png"); // Troféu 3
    this.load.image("trophy4", "assets/trophy4.png"); // Troféu 4
    this.load.image("spfc", "assets/spfc.png"); // Time do jogador (São Paulo FC)
    this.load.image("enemy1", "assets/santos.png"); // Time inimigo 1 (Santos FC)
    this.load.image("enemy2", "assets/palmeiras.png"); // Time inimigo 2 (Palmeiras)
    this.load.image("enemy3", "assets/corinthians.png"); // Time inimigo 3 (Corinthians)
    this.load.image("blackBg", "assets/blackBackground.jpg"); // Tela de Game Over
  }

  // Função chamada quando a cena é criada
  create() {
    // Criando e configurando elementos do jogo
    let enemies = []; // Array para armazenar os inimigos
    score = this.add.text(5, 50, "Títulos:" + scoreValue, {
      fontSize: "35px",
      fill: "#fff",
    }); // Texto para mostrar a pontuação
    bg = this.add // Imagem de fundo
      .image(250, 50, "background")
      .setScale(0.8)
      .setOrigin(0, 0);

    // Criando e configurando bancos (obstáculos)
    const benches = []; // Array para armazenar os bancos
    for (let i = 0; i < 8; i++) {
      // Criando oito bancos
      const bench = this.physics.add
        .staticImage(
          // Imóvel e com colisão
          i < 4 ? 575 : 235, // Posição X alternada entre esquerda e direita
          i % 2 === 0 ? 170 : i % 2 === 1 ? 300 : 430, // Posição Y alternada entre três alturas
          "bench"
        )
        .setImmovable(true);
      benches.push(bench); // Adicionando o banco ao array
    }

    // Criando e configurando o jogador
    player = this.physics.add
      .sprite(300, 600, "spfc") // Sprite do jogador
      .setScale(0.1) // Tamanho
      .setBounce(0.2, 0.2) // Recuo ao colidir
      .setDrag(300, 300) // Resistência ao movimento
      .setGravity(0, 0) // Sem gravidade
      .setCollideWorldBounds(true); // Colisão com as bordas do jogo

    // Criando e configurando o troféu 1
    const trophy1 = this.physics.add // Sprite do troféu
      .sprite(300, 100, "trophy1")
      .setScale(0.15) // Tamanho
      .setInteractive() // Deixando interativo
      .setVisible(true) // Deixando visível
      .setImmovable(true); // Deixando imóvel
    // Criando e configurando o troféu 2
    const trophy2 = this.physics.add // Sprite do troféu
      .sprite(375, 100, "trophy2")
      .setScale(0.15) // Tamanho
      .setInteractive() // Deixando interativo
      .setVisible(true) // Deixando visível
      .setImmovable(true); // Deixando imóvel;
    // Criando e configurando o troféu 3
    const trophy3 = this.physics.add // Sprite do troféu
      .sprite(450, 96, "trophy3")
      .setScale(0.08) // Tamanho
      .setInteractive() // Deixando interativo
      .setVisible(true) // Deixando visível
      .setImmovable(true); // Deixando imóvel;
    // Criando e configurando o troféu 4
    const trophy4 = this.physics.add // Sprite do troféu
      .sprite(525, 96, "trophy4")
      .setScale(0.08) // Tamanho
      .setInteractive() // Deixando interativo
      .setVisible(true) // Deixando visível
      .setImmovable(true); // Deixando imóvel;

    trophies.push(trophy1, trophy2, trophy3, trophy4); // Colocando os troféus dentro da lista;

    // Adicionando o inimigo
    enemy1 = this.physics.add // Sprite do inimigo
      .sprite(290, 180, "enemy1")
      .setScale(0.1) // Escala
      .setOrigin(0, 0) // Origem da imagem
      .setImmovable(true); // Tornando imóvel
    enemy1.setCollideWorldBounds(true); // Colidir com as bordas do mundo;

    // Adicionando o inimigo
    enemy2 = this.physics.add // Sprite do inimigo
      .sprite(390, 300, "enemy2")
      .setScale(0.03) // Escala
      .setOrigin(0, 0) // Origem da imagem
      .setImmovable(true); // Deixando imóvel;
    enemy2.setCollideWorldBounds(true); // Colidir com as bordas do mundo;;

    // Adicionando o inimigo
    enemy3 = this.physics.add // Sprite do inimigo
      .sprite(500, 375, "enemy3")
      .setScale(0.2) // Escala
      .setOrigin(0, 0) // Origem da imagem
      .setImmovable(true); // Deixando imóvel;
    enemy3.setCollideWorldBounds(true); // Colidir com as bordas do mundo;;
    enemies.push(enemy1, enemy2, enemy3); // Adicionando à lista de inimigos ;
    path = { enemy1: 1, enemy2: 1, enemy3: 1 }; // Deixando os caminhos como 1 (ida);

    // Adicionando a imagem de fundo do game over
    blackBg = this.physics.add // Sprite do fundo
      .sprite(0, 0, "blackBg")
      .setScale(3) // Escala
      .setInteractive() // Interatividade
      .setVisible(false); // Deixando invisível;

    let title = "Game Over!"; // Conteúdo do título;
    gameOverTitle = this.add // Adicionando o título de game over
      .text(
        this.game.config.width / 2.9 + 35, // posição x do texto
        this.game.config.height / 4, // posição y do texto
        title, // texto,
        {
          color: "#de0209", // cor do texto
          fontSize: 30, // tamanho do texto
          fontStyle: "bold", // fonte do texto em negrito
        }
      )
      .setInteractive() // Interatividade
      .setVisible(false); // Deixando Invisível
    message = "Pressione ok para reiniciar"; // Conteúdo da mensagem
    gameOverMessage = this.add // Adicionando a mensagem
      .text(
        this.game.config.width / 3.2, // posição x da mensagem
        this.game.config.height / 2.4, // posição y da imagem
        message, // texto
        {
          color: "#fff", // cor da mensagem
          fontSize: 20, // tamamho de fonte da mensagem
        }
      )
      .setInteractive() // Interatividade
      .setVisible(false); // Deixando invisível
    okBtn = this.add
      .image(
        this.game.config.width / 2.3 + 10,
        this.game.config.height / 2,
        "okBtn"
      )
      .setScale(0.7)
      .setOrigin(0, 0)
      .setInteractive()
      .setVisible(false);
    okBtn.on(
      "pointerdown",
      () => {
        scoreValue = 0;
        score.setText("Títulos:" + scoreValue);
        startGame = true;
        gameOver(this, blackBg, gameOverTitle, gameOverMessage, okBtn, false);
        this.physics.resume();
        enemy1.x = enemy1x;
        enemy2.x = enemy2x;
        enemy3.x = enemy3x;
        player.x = playerx;
        player.y = playery;
      },
      this
    );

    createCollisions(this, player, benches);
    for (const enemy of enemies) {
      createCollisions(this, enemy, benches);
    }

    createEndGameCollisions(this, player, enemies);
    createTrophyCollisions(this, player, trophies);

    keyboard = createKeyboard(this);
  }
  update() {
    if (startGame === false) {
      gameOver(this, blackBg, gameOverTitle, gameOverMessage, okBtn, true);
    }
    console.log(scoreValue);

    if (scoreValue > 0) {
      moveEnemy(enemy1, path, scoreValue / 4);
      moveEnemy(enemy2, path, scoreValue / 6);
      moveEnemy(enemy3, path, scoreValue / 8);
    } else {
      moveEnemy(enemy1, path, 1 / 4);
      moveEnemy(enemy2, path, 1 / 6);
      moveEnemy(enemy3, path, 1 / 8);
    }
    movePlayer(player, 3);
    for (const trophy of trophies) {
      newLevel(player, trophy);
    }
  }
}

function addCollider(scene, element1, element2) {
  scene.physics.add.collider(element1, element2);
}
function addEndGameCollider(scene, element1, element2) {
  scene.physics.add.collider(element1, element2, () => {
    startGame = false;
  });
}
function createCollisions(scene, element, list) {
  for (const listItem of list) {
    addCollider(scene, element, listItem);
  }
}
function createEndGameCollisions(scene, player, enemyList) {
  for (const enemy of enemyList) {
    addEndGameCollider(scene, player, enemy);
  }
}
function createKeyboard(scene) {
  return scene.input.keyboard.createCursorKeys();
}
function moveEnemy(enemy, path, multiplier) {
  const key = enemy.body.gameObject.texture.key;
  if (path[`${key}`] === 1) {
    enemy.setVelocityX(-(multiplier * 100));
    if (enemy.body.blocked.left) {
      path[`${key}`] = 2;
    }
  }
  if (path[`${key}`] === 2) {
    enemy.setVelocityX(multiplier * 100);
    if (enemy.body.blocked.right) {
      path[`${key}`] = 1;
    }
  }
}
function movePlayer(player, multiplier) {
  player.setAcceleration(0, 0);
  switch (keyboard.left.isDown) {
    case true:
      player.setAccelerationX(-100 * multiplier);
  }
  switch (keyboard.right.isDown) {
    case true:
      player.setAccelerationX(100 * multiplier);
  }
  switch (keyboard.up.isDown) {
    case true:
      player.setAccelerationY(-100 * multiplier);
  }
  switch (keyboard.down.isDown) {
    case true:
      player.setAccelerationY(100 * multiplier);
  }
}
function addTrophyOverlap(scene, element1, element2) {
  scene.physics.add.overlap(element1, element2, () => {
    scoreValue += 1;
    score.setText("Títulos:" + scoreValue);
    element2.setVisible(false);
    element2.x = 3000;
  });
}
function createTrophyCollisions(scene, player, trophyList) {
  for (const trophy of trophyList) {
    addTrophyOverlap(scene, player, trophy);
  }
}
function newLevel(player, trophy) {
  if (player.y > 375) {
    const key = trophy.body.gameObject.texture.key;
    trophy.x = trophiesX[`${key}x`];
    trophy.setVisible(true);
  }
}
function gameOver(scene, background, title, message, btn, visibility) {
  scene.physics.pause();
  background.setVisible(visibility);
  title.setVisible(visibility);
  message.setVisible(visibility);
  btn.setVisible(visibility);
}
