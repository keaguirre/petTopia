import Phaser from "phaser";

export default class JardinEditorScene extends Phaser.Scene {
  constructor() {
    super("EditorScene");
  }

  preload() {
    this.load.image("tileset", "/tiles/tileset.png");
    this.load.atlas("jardinassets", "/tiles/jardinassets.png", "/tiles/jardinassets.json");
    this.load.tilemapTiledJSON("jardin", "/tiles/jardin.json");
    this.load.atlas("fuentes", "/tiles/fuentes.png", "/tiles/fuentes.json");
  }
   create() {
   
const map = this.make.tilemap({ key: "jardin" });
const tileset1 = map.addTilesetImage("tiles", "tileset"); 
const capa = map.createLayer("Capa de patrones 1", [tileset1], 0, 0);
    

    this.addGardenSprites();
    this.createFuenteAnimation();
    this.fuente = this.add.sprite(100, 100, "fuente", "fuente 0.aseprite").setOrigin(0.5);
    this.fuente.play("fuente_anim");
  }

addGardenSprites() {
  const nombres = ["arbusto1", "arbusto2", "arbusto3", "arbol"];
  let x = 200;
  let y = 100;

  nombres.forEach((nombre, index) => {
    const image = this.add.image(x + index * 50, y, "jardinassets", nombre)
      .setScale(2)
      .setOrigin(0);
    image.setName(nombre);
  });
}

  createFuenteAnimation() {
    const frames = this.anims.generateFrameNames("fuente", {
      start: 0,
      end: 12,
      prefix: "fuente ",
      suffix: ".aseprite"
    });

    this.anims.create({
      key: "fuente_anim",
      frames,
      frameRate: 10,
      repeat: -1
    });
  }
}