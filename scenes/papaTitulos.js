// Definindo a cena de boas-vindas usando a biblioteca Phaser
let keyboard;
let player;
let score;
let enemy1;
let enemy2;
let enemy3;
let path = {};

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
  }

  // Função chamada quando a cena é criada
  create() {
    let scoreValue = 0;
    let enemies = [];
    score = this.add.text(50, 50, "Títulos:" + scoreValue, {
      fontSize: "30x",
      fill: "#fff",
    });
    // Configuração da imagem de fundo
    const bg = this.add
      .image(250, 50, "background")
      .setScale(0.8)
      .setOrigin(0, 0);
    const bench1 = this.physics.add.staticImage(575, 170, "bench");
    const bench2 = this.physics.add.staticImage(575, 300, "bench");
    const bench3 = this.physics.add.staticImage(575, 430, "bench");
    const bench4 = this.physics.add.staticImage(575, 70, "bench");
    const bench5 = this.physics.add
      .staticImage(235, 170, "bench")
      .setFlip(true, false);
    const bench6 = this.physics.add
      .staticImage(235, 300, "bench")
      .setFlip(true, false);
    const bench7 = this.physics.add
      .staticImage(235, 70, "bench")
      .setFlip(true, false);
    const bench8 = this.physics.add
      .staticImage(235, 430, "bench")
      .setFlip(true, false);
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
      .sprite(250, 600, "spfc")
      .setScale(0.1)
      .setBounce(0.2, 0.2)
      .setDrag(300, 300)
      .setGravity(0, 0);
    player.setCollideWorldBounds(true);

    const trophy1 = this.physics.add
      .sprite(300, 100, "trophy1")
      .setScale(0.15)
      .setInteractive()
      .setVisible(true);
    const trophy2 = this.physics.add
      .sprite(375, 100, "trophy2")
      .setScale(0.15)
      .setInteractive()
      .setVisible(true);
    const trophy3 = this.physics.add
      .sprite(450, 96, "trophy3")
      .setScale(0.08)
      .setInteractive()
      .setVisible(true);
    const trophy4 = this.physics.add
      .sprite(525, 96, "trophy4")
      .setScale(0.08)
      .setInteractive()
      .setVisible(true);
    let trophies = [];
    trophies.push(trophy1, trophy2, trophy3, trophy4);

    enemy1 = this.physics.add
      .sprite(290, 180, "enemy1")
      .setScale(0.1)
      .setOrigin(0, 0);
    enemy1.setCollideWorldBounds(true);

    enemy2 = this.physics.add
      .sprite(390, 300, "enemy2")
      .setScale(0.03)
      .setOrigin(0, 0);
    enemy2.setCollideWorldBounds(true);

    enemy3 = this.physics.add
      .sprite(525, 375, "enemy3")
      .setScale(0.2)
      .setOrigin(0, 0);
    enemy3.setCollideWorldBounds(true);
    enemies.push(enemy1, enemy2, enemy3);
    path = { enemy1: 1, enemy2: 1, enemy3: 1 };

    createCollisions(this, player, benches);
    for (const enemy of enemies) {
      createCollisions(this, enemy, benches);
    }

    createEndGameCollisions(this, player, enemies);
    createTrophyCollisions(this, player, trophies);

    keyboard = createKeyboard(this);
  }
  update() {
    moveEnemy(enemy1, path, 3);
    moveEnemy(enemy2, path, 2);
    moveEnemy(enemy3, path, 1);
    movePlayer(player, 3);
  }
}
function addCollider(scene, element1, element2) {
  scene.physics.add.collider(element1, element2);
}
function addEndGameCollider(scene, element1, element2) {
  scene.physics.add.collider(element1, element2, () => {});
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
  console.log("gameOver");
  // scene.physics.pause();
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
function addTrophyCollider(scene, element1, element2) {
  scene.physics.add.collider(element1, element2, () => {
    console.log("ganhou");
  });
}
function createTrophyCollisions(scene, player, trophyList) {
  for (const trophy of trophyList) {
    addTrophyCollider(scene, player, trophy);
  }
  // scene.physics.pause();
}
