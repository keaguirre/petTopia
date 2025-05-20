import Phaser from "phaser";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    const pj = this.registry.get("pj") || "gato"; 
    this.pj = pj;

    this.load.image("tileset", "/tiles/tileset.png");
    this.load.atlas("hall", "/tiles/halltiles.png", "/tiles/halltiles.json");
    this.load.atlas("gato", "/tiles/gato.png", "/tiles/gato.json");
    this.load.atlas("perro", "/tiles/perro.png", "/tiles/perro.json");
    this.load.atlas("pollito", "/tiles/pollito.png", "/tiles/pollito.json");
    this.load.tilemapTiledJSON("mapa", "/tiles/mapa.json");
  }

  create() {
    const pj = this.pj || "gato"; 
    const playerFrames = {
      gato: ["gato 0.aseprite", "gato 1.aseprite", "gato 2.aseprite", "gato 3.aseprite"],
      perro: ["perro 0.aseprite", "perro 1.aseprite", "perro 2.aseprite", "perro 3.aseprite"],
      pollito: ["pollito 0.aseprite", "pollito 1.aseprite", "pollito 2.aseprite", "pollito 3.aseprite"]
    };
  
    //  Validar que el personaje tenga frames
    if (!playerFrames[pj]) {
      console.warn(`Frames no definidos para personaje ${pj}, usando gato`);
      this.pj = "gato";
    }
    const map = this.make.tilemap({ key: "mapa" });
    const tileset1 = map.addTilesetImage("tileset", "tileset");
    const capa2 = map.createLayer("Capa de patrones 2", [tileset1], 0, 0);
    capa2.setCollisionByProperty({ collides: true });

    const mueblesData = [
      { key: "mostrador", x: 225, y: 97 },
      { key: "sofa", x: 49, y: 193 },
      { key: "plantapeque", x: 80, y: 193 },
      { key: "letrero", x: 225, y: 33 },
      { key: "mesita", x: 367, y: 225 },
      { key: "cuadro", x: 50, y: 38 },
      { key: "ventana", x: 429, y: 61 },
      { key: "libreria", x: 96, y: 74 },
      { key: "lampara", x: 19, y: 257 },
      { key: "plantagrande", x: 32, y: 73 },
      { key: "carrito", x: 226, y: 257 },
      { key: "sofa", x: 112, y: 193 },
      { key: "mesita", x: 80, y: 226 },
      { key: "ventana", x: 169, y: 61 },
      { key: "ventana", x: 279, y: 63 },
      { key: "plantagrande", x: 415, y: 77 },
      { key: "sofa", x: 336, y: 194 },
      { key: "sofa", x: 400, y: 193 },
      { key: "plantapeque", x: 367, y: 193 },
      { key: "lampara", x: 432, y: 256 },
    ];

    const sinColision = ["cuadro", "ventana", "letrero"];

    this.muebles = this.physics.add.staticGroup();
    mueblesData.forEach((data, index) => {
      const mueble = this.muebles
        .create(data.x, data.y, "hall", data.key)
        .setOrigin(0.5, 1)
        .setDepth(data.y);
      mueble.name = `${data.key}_${index}`;

      if (!sinColision.includes(data.key)) {
        const frame = this.textures.getFrame("hall", data.key);
        if (frame) {
          mueble.body.setSize(frame.width, 10);
          mueble.body.setOffset(0, frame.height - 10);
          mueble.refreshBody();
        }
      } else {
        mueble.body.enable = false;
      }

      mueble.refreshBody();

      if (["ventana", "cuadro", "letrero"].includes(data.key)) {
        mueble.setDepth(0); // Objetos de pared, siempre detrás del jugador
      } else {
        mueble.setDepth(data.y); // Objetos de suelo
      }
    });

    this.anims.create({
      key: "walk",
      frames: playerFrames[pj].map(f => ({ key: pj, frame: f })),
      frameRate: 6,
      repeat: -1
    });

    this.player = this.physics.add.sprite(100, 100, pj, playerFrames[pj][0]);
    this.player.body.setSize(11, 2);
    this.player.body.setOffset(11, 15);
    this.player.anims.play("walk");
    this.player.setDepth(this.player.y);

    const paredCollider = this.add.rectangle(20, 50, 800, 32).setOrigin(0.5, 1);
    this.physics.add.existing(paredCollider, true);
    const paredCollider2 = this.add
      .rectangle(50, 332, 800, 32)
      .setOrigin(0.5, 1);
    this.physics.add.existing(paredCollider2, true);

    const puerta = this.add.rectangle(350, 50, 18, 20, 0x0000ff, 0.2);
    this.physics.add.existing(puerta, true);

    this.physics.add.collider(this.player, capa2);
    this.physics.add.collider(this.player, this.muebles);
    this.physics.add.collider(this.player, paredCollider);
    this.physics.add.collider(this.player, paredCollider2);
    this.physics.add.collider(this.player, puerta, () => this.cambiarAEscenaJardin(), null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.player) return;

    const speed = 100;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("walk", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("walk", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("walk", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.stop();
    }

    this.player.setDepth(this.player.y);
  }
   cambiarAEscenaJardin() {
    this.scene.start("Jardin");
  }
}
