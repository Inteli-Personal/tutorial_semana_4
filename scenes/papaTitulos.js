// Definindo a cena de boas-vindas usando a biblioteca Phaser
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
    this.load.image("okBtn", "assets/okBtn.png"); // Carregando a imagem do botão
    this.load.image("background", "assets/background.jpg");
    this.load.image("bench", "assets/bench.png"); // Carregando a imagem de fundo
    this.load.image("trophy1", "assets/trophy1.png");
    this.load.image("trophy2", "assets/trophy2.png");
    this.load.image("trophy3", "assets/trophy3.png");
    this.load.image("trophy4", "assets/trophy4.png");
    this.load.image("spfc", "assets/spfc.png");
    this.load.image("enemy1", "assets/santos.png");
    this.load.image("enemy2", "assets/palmeiras.png");
    this.load.image("enemy3", "assets/corinthians.png");
    this.load.image("okBtn", "assets/okBtn.png"); // Carregando a imagem do botão
    this.load.image("blackBg", "assets/blackBackground.jpg"); // Carregando a imagem do botão
  }

  // Função chamada quando a cena é criada
  create() {
    let enemies = [];
    score = this.add.text(5, 50, "Títulos:" + scoreValue, {
      fontSize: "35px",
      fill: "#fff",
    });
    // Configuração da imagem de fundo
    bg = this.add.image(250, 50, "background").setScale(0.8).setOrigin(0, 0);
    const bench1 = this.physics.add
      .staticImage(575, 170, "bench")
      .setImmovable(true);
    const bench2 = this.physics.add
      .staticImage(575, 300, "bench")
      .setImmovable(true);
    const bench3 = this.physics.add
      .staticImage(575, 430, "bench")
      .setImmovable(true);
    const bench4 = this.physics.add
      .staticImage(575, 70, "bench")
      .setImmovable(true);
    const bench5 = this.physics.add
      .staticImage(235, 170, "bench")
      .setFlip(true, false)
      .setImmovable(true);
    const bench6 = this.physics.add
      .staticImage(235, 300, "bench")
      .setFlip(true, false)
      .setImmovable(true);
    const bench7 = this.physics.add
      .staticImage(235, 70, "bench")
      .setFlip(true, false)
      .setImmovable(true);
    const bench8 = this.physics.add
      .staticImage(235, 430, "bench")
      .setFlip(true, false)
      .setImmovable(true);
    let benches = [];
    benches.push(
      bench1,
      bench2,
      bench3,
      bench4,
      bench5,
      bench6,
      bench7,
      bench8
    );
    player = this.physics.add
      .sprite(300, 600, "spfc")
      .setScale(0.1)
      .setBounce(0.2, 0.2)
      .setDrag(300, 300)
      .setGravity(0, 0);
    player.setCollideWorldBounds(true);

    const trophy1 = this.physics.add
      .sprite(300, 100, "trophy1")
      .setScale(0.15)
      .setInteractive()
      .setVisible(true)
      .setImmovable(true);
    const trophy2 = this.physics.add
      .sprite(375, 100, "trophy2")
      .setScale(0.15)
      .setInteractive()
      .setVisible(true)
      .setImmovable(true);
    const trophy3 = this.physics.add
      .sprite(450, 96, "trophy3")
      .setScale(0.08)
      .setInteractive()
      .setVisible(true)
      .setImmovable(true);
    const trophy4 = this.physics.add
      .sprite(525, 96, "trophy4")
      .setScale(0.08)
      .setInteractive()
      .setVisible(true)
      .setImmovable(true);

    trophies.push(trophy1, trophy2, trophy3, trophy4);

    enemy1 = this.physics.add
      .sprite(290, 180, "enemy1")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setImmovable(true);
    enemy1.setCollideWorldBounds(true);

    enemy2 = this.physics.add
      .sprite(390, 300, "enemy2")
      .setScale(0.03)
      .setOrigin(0, 0)
      .setImmovable(true);
    enemy2.setCollideWorldBounds(true);

    enemy3 = this.physics.add
      .sprite(500, 375, "enemy3")
      .setScale(0.2)
      .setOrigin(0, 0)
      .setImmovable(true);
    enemy3.setCollideWorldBounds(true);
    enemies.push(enemy1, enemy2, enemy3);
    path = { enemy1: 1, enemy2: 1, enemy3: 1 };

    blackBg = this.physics.add
      .sprite(0, 0, "blackBg")
      .setScale(3)
      .setInteractive()
      .setVisible(false);

    let title = "Game Over!";
    gameOverTitle = this.add
      .text(
        this.game.config.width / 2.9 + 35,
        this.game.config.height / 4,
        title,
        {
          color: "#de0209",
          fontSize: 30,
          fontStyle: "bold",
        }
      )
      .setInteractive()
      .setVisible(false);
    message = "Pressione ok para reiniciar";
    gameOverMessage = this.add
      .text(
        this.game.config.width / 3.2,
        this.game.config.height / 2.4,
        message,
        {
          color: "#fff",
          fontSize: 20,
        }
      )
      .setInteractive()
      .setVisible(false);
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
