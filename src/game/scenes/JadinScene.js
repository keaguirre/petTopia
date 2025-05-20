export default class Jardin extends Phaser.Scene {
  constructor() {
    super("Jardin");
  }

  preload() {
    this.load.image("tileset", "/tiles/tileset.png");
    this.load.atlas("gato", "/tiles/gato.png", "/tiles/gato.json");
    this.load.atlas("perro", "/tiles/perro.png", "/tiles/perro.json");
    this.load.atlas("pollito", "/tiles/pollito.png", "/tiles/pollito.json");
    this.load.tilemapTiledJSON("jardin", "/tiles/jardin.json");
    this.load.atlas(
      "jardinassets",
      "/tiles/jardinassets.png",
      "/tiles/jardinassets.json"
    );
    this.load.atlas("fuente", "/tiles/fuente.png", "/tiles/fuente.json");
    this.load.tilemapTiledJSON("jardin", "/tiles/jardin.json");
  }

  create() {
    const arbustosData = [
      // Fila superior
      { key: "arbusto1", x: 15, y: 8 },
      { key: "arbusto2", x: 31, y: 8 },
      { key: "arbusto3", x: 47, y: 8 },
      { key: "arbusto1", x: 63, y: 8 },
      { key: "arbusto2", x: 79, y: 8 },
      { key: "arbusto3", x: 95, y: 8 },
      { key: "arbusto1", x: 111, y: 8 },
      { key: "arbusto2", x: 127, y: 8 },
      { key: "arbusto2", x: 143, y: 8 },
      { key: "arbusto2", x: 159, y: 8 },
      { key: "arbusto2", x: 175, y: 8 },
      { key: "arbusto3", x: 272, y: 8 },
      { key: "arbusto2", x: 288, y: 8 },
      { key: "arbusto1", x: 304, y: 8 },
      { key: "arbusto2", x: 320, y: 8 },
      { key: "arbusto2", x: 336, y: 8 },
      { key: "arbusto2", x: 352, y: 8 },
      { key: "arbusto3", x: 368, y: 8 },
      { key: "arbusto2", x: 384, y: 8 },
      { key: "arbusto1", x: 400, y: 8 },
      { key: "arbusto2", x: 416, y: 8 },
      { key: "arbusto2", x: 432, y: 8 },

      // Fila inferior
      { key: "arbusto1", x: 15, y: 310 },
      { key: "arbusto2", x: 31, y: 310 },
      { key: "arbusto3", x: 47, y: 310 },
      { key: "arbusto1", x: 63, y: 310 },
      { key: "arbusto2", x: 79, y: 310 },
      { key: "arbusto3", x: 95, y: 310 },
      { key: "arbusto1", x: 111, y: 310 },
      { key: "arbusto2", x: 127, y: 310 },
      { key: "arbusto2", x: 143, y: 310 },
      { key: "arbusto2", x: 159, y: 310 },
      { key: "arbusto2", x: 175, y: 310 },
      { key: "arbusto3", x: 272, y: 310 },
      { key: "arbusto2", x: 288, y: 310 },
      { key: "arbusto1", x: 304, y: 310 },
      { key: "arbusto2", x: 320, y: 310 },
      { key: "arbusto2", x: 336, y: 310 },
      { key: "arbusto2", x: 352, y: 310 },
      { key: "arbusto3", x: 368, y: 310 },
      { key: "arbusto2", x: 384, y: 310 },
      { key: "arbusto1", x: 400, y: 310 },
      { key: "arbusto2", x: 416, y: 310 },
      { key: "arbusto2", x: 432, y: 310 },

      // Lateral izquierdo (excluye esquinas)
      { key: "arbusto3", x: 15, y: 24 },
      { key: "arbusto3", x: 15, y: 40 },
      { key: "arbusto2", x: 15, y: 54 },
      { key: "arbusto2", x: 15, y: 70 },
      { key: "arbusto3", x: 15, y: 86 },
      { key: "arbusto3", x: 15, y: 102 },
      { key: "arbusto1", x: 15, y: 118 },

      { key: "arbusto3", x: 15, y: 198 },
      { key: "arbusto3", x: 15, y: 214 },
      { key: "arbusto3", x: 15, y: 230 },
      { key: "arbusto1", x: 15, y: 246 },
      { key: "arbusto3", x: 15, y: 262 },
      { key: "arbusto2", x: 15, y: 278 },
      { key: "arbusto3", x: 15, y: 294 },

      // Lateral derecho (excluye esquinas)
      { key: "arbusto3", x: 432, y: 24 },
      { key: "arbusto3", x: 432, y: 40 },
      { key: "arbusto1", x: 432, y: 54 },
      { key: "arbusto2", x: 432, y: 70 },
      { key: "arbusto2", x: 432, y: 86 },
      { key: "arbusto3", x: 432, y: 102 },
      { key: "arbusto3", x: 432, y: 118 },

      { key: "arbusto2", x: 432, y: 198 },
      { key: "arbusto3", x: 432, y: 214 },
      { key: "arbusto3", x: 432, y: 230 },
      { key: "arbusto1", x: 432, y: 246 },
      { key: "arbusto3", x: 432, y: 262 },
      { key: "arbusto2", x: 432, y: 278 },
      { key: "arbusto3", x: 432, y: 294 },
    ];
    this.arbustos = this.physics.add.staticGroup();

    arbustosData.forEach((data, index) => {
      const arbusto = this.arbustos
        .create(data.x, data.y, "jardinassets", data.key)
        .setOrigin(0.5, 0.5)
        .setDepth(data.y);
      arbusto.name = `${data.key}_${index}`;
    });

    const pj = this.pj || "gato";
    const playerFrames = {
      gato: [
        "gato 0.aseprite",
        "gato 1.aseprite",
        "gato 2.aseprite",
        "gato 3.aseprite",
      ],
      perro: [
        "perro 0.aseprite",
        "perro 1.aseprite",
        "perro 2.aseprite",
        "perro 3.aseprite",
      ],
      pollito: [
        "pollito 0.aseprite",
        "pollito 1.aseprite",
        "pollito 2.aseprite",
        "pollito 3.aseprite",
      ],
    };

    if (!playerFrames[pj]) {
      console.warn(`Frames no definidos para personaje ${pj}, usando gato`);
      this.pj = "gato";
    }

    const map = this.make.tilemap({ key: "jardin" });
    const tileset1 = map.addTilesetImage("tiles", "tileset");
    const capa = map.createLayer("Capa de patrones 1", [tileset1], 0, 0);
    capa.setCollisionByProperty({ collides: true });

    // Crear animación de fuente
    this.createFuenteAnim();
    const fuente = this.add
      .sprite(225, 150, "fuente", "fuente 0.aseprite")
      .setOrigin(0.5);
    fuente.play("fuente_anim");

    // Jugador
    this.anims.create({
      key: "walk",
      frames: playerFrames[pj].map((f) => ({ key: pj, frame: f })),
      frameRate: 6,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(100, 100, pj, playerFrames[pj][0]);
    this.player.body.setSize(11, 2);
    this.player.body.setOffset(11, 15);
    this.player.anims.play("walk");
    this.player.setDepth(this.player.y);

    this.physics.add.collider(this.player, this.arbustos);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Volver al hall con tecla ESC
    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.start("MainScene");
    });
  }

  update() {
    const speed = 150;
    const body = this.player.body;

    body.setVelocity(0);

    if (this.cursors.left.isDown) body.setVelocityX(-speed);
    if (this.cursors.right.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown) body.setVelocityY(-speed);
    if (this.cursors.down.isDown) body.setVelocityY(speed);
  }

  createFuenteAnim() {
    this.anims.create({
      key: "fuente_anim",
      frames: this.anims.generateFrameNames("fuente", {
        start: 0,
        end: 12,
        prefix: "fuente ",
        suffix: ".aseprite",
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
