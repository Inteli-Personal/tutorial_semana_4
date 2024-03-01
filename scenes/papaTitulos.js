// Definindo a cena de boas-vindas usando a biblioteca Phaser
var keyboard;
var player;
var scoreValue = 0;
var score;
var bench1;
var bench2;
var bench3;
var bench4;
var bench5;
var bench6;
var bench7;
var bench8;
var bench9;
var trophy1;
var trophy2;
var trophy3;
var trophy4;
var enemy1;
var enemy2;
var enemy3;
var caminhoEnemy1;
var caminhoEnemy2;
var caminhoEnemy3;

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
    score = this.add.text(50, 50, "Títulos:" + scoreValue, {
      fontSize: "30x",
      fill: "#fff",
    });
    // Configuração da imagem de fundo
    this.add.image(250, 50, "background").setScale(0.8).setOrigin(0, 0);
    bench1 = this.physics.add.staticImage(575, 170, "bench");
    bench2 = this.physics.add.staticImage(575, 300, "bench");
    bench3 = this.physics.add.staticImage(575, 430, "bench");
    bench4 = this.physics.add.staticImage(575, 70, "bench");
    bench5 = this.physics.add
      .staticImage(235, 170, "bench")
      .setFlip(true, false);
    bench6 = this.physics.add
      .staticImage(235, 300, "bench")
      .setFlip(true, false);
    bench7 = this.physics.add
      .staticImage(235, 70, "bench")
      .setFlip(true, false);
    bench8 = this.physics.add
      .staticImage(235, 430, "bench")
      .setFlip(true, false);

    player = this.physics.add
      .sprite(250, 600, "spfc")
      .setScale(0.1)
      .setBounce(0.2, 0.2)
      .setDrag(300, 300)
      .setGravity(0, 0);
    player.setCollideWorldBounds(true);

    trophy1 = this.physics.add.sprite(300, 100, "trophy1").setScale(0.15);
    trophy2 = this.physics.add.sprite(375, 100, "trophy2").setScale(0.15);
    trophy3 = this.physics.add.sprite(450, 96, "trophy3").setScale(0.08);
    trophy4 = this.physics.add.sprite(525, 96, "trophy4").setScale(0.08);

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

    this.physics.add.collider(player, bench1);
    this.physics.add.collider(player, bench2);
    this.physics.add.collider(player, bench3);
    this.physics.add.collider(player, bench4);
    this.physics.add.collider(player, bench5);
    this.physics.add.collider(player, bench6);
    this.physics.add.collider(player, bench7);
    this.physics.add.collider(player, bench8);
    this.physics.add.collider(enemy1, bench1);
    this.physics.add.collider(enemy1, bench2);
    this.physics.add.collider(enemy1, bench3);
    this.physics.add.collider(enemy1, bench4);
    this.physics.add.collider(enemy1, bench5);
    this.physics.add.collider(enemy1, bench6);
    this.physics.add.collider(enemy1, bench7);
    this.physics.add.collider(enemy1, bench8);
    this.physics.add.collider(enemy2, bench1);
    this.physics.add.collider(enemy2, bench2);
    this.physics.add.collider(enemy2, bench3);
    this.physics.add.collider(enemy2, bench4);
    this.physics.add.collider(enemy2, bench5);
    this.physics.add.collider(enemy2, bench6);
    this.physics.add.collider(enemy2, bench7);
    this.physics.add.collider(enemy2, bench8);
    this.physics.add.collider(enemy3, bench1);
    this.physics.add.collider(enemy3, bench2);
    this.physics.add.collider(enemy3, bench3);
    this.physics.add.collider(enemy3, bench4);
    this.physics.add.collider(enemy3, bench5);
    this.physics.add.collider(enemy3, bench6);
    this.physics.add.collider(enemy3, bench7);
    this.physics.add.collider(enemy3, bench8);
    this.physics.add.collider(player, enemy1, () => {
      console.log('gameOver');
    });
    this.physics.add.collider(player, enemy2, () => {
      console.log('gameOver');
    });
    this.physics.add.collider(player, enemy3, () => {
      console.log('gameOver');
    });
    keyboard = this.input.keyboard.createCursorKeys();
    caminhoEnemy1 = "ida";
    caminhoEnemy2 = "ida";
    caminhoEnemy3 = "ida";
    console.log(enemy1);
    console.log(this.physics.add.overlap);
  }
  update() {
    if (caminhoEnemy1 === "ida") {
      enemy1.setVelocityX(-600);
      if (enemy1.body.blocked.left) {
        caminhoEnemy1 = "volta";
      }
    }
    if (caminhoEnemy1 === "volta") {
      enemy1.setVelocityX(600);
      if (enemy1.body.blocked.right) {
        caminhoEnemy1 = "ida";
      }
    }
    if (caminhoEnemy2 === "ida") {
      enemy2.setVelocityX(-200);
      if (enemy2.body.blocked.left) {
        caminhoEnemy2 = "volta";
      }
    }
    if (caminhoEnemy2 === "volta") {
      enemy2.setVelocityX(200);
      if (enemy2.body.blocked.right) {
        caminhoEnemy2 = "ida";
      }
    }
    if (caminhoEnemy3 === "ida") {
      enemy3.setVelocityX(-60);
      if (enemy3.body.blocked.left) {
        caminhoEnemy3 = "volta";
      }
    }
    if (caminhoEnemy3 === "volta") {
      enemy3.setVelocityX(60);
      if (enemy3.body.blocked.right) {
        caminhoEnemy3 = "ida";
      }
    }

    player.setAcceleration(0, 0);
    switch (keyboard.left.isDown) {
      case true:
        player.setAccelerationX(-300);
    }
    switch (keyboard.right.isDown) {
      case true:
        player.setAccelerationX(300);
    }
    switch (keyboard.up.isDown) {
      case true:
        player.setAccelerationY(-300);
    }
    switch (keyboard.down.isDown) {
      case true:
        player.setAccelerationY(300);
    }
  }
}

function ok() {
  console.log("gameover");
}
