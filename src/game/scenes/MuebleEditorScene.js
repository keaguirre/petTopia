import Phaser from "phaser";

export default class MuebleEditorScene extends Phaser.Scene {
  constructor() {
    super("EditorScene");
  }

  preload() {
    this.load.image("tileset", "/tiles/tileset.png");
    this.load.atlas("hall", "/tiles/halltiles.png", "/tiles/halltiles.json");
    this.load.tilemapTiledJSON("mapa", "/tiles/mapa.json");
  }

  create() {
        const map = this.make.tilemap({ key: "mapa" });
    const tileset1 = map.addTilesetImage("tileset", "tileset");
    const capa2 = map.createLayer("Capa de patrones 2", [tileset1], 0, 0);

    this.gridVisible = true;
    this.gridGraphics = this.add.graphics();
    this.drawGrid();

    const mueblesData = [
      { key: "mostrador", x: 160, y: 96 },
      { key: "sofa", x: 220, y: 112 },
      { key: "plantapeque", x: 260, y: 128 },
      { key: "letrero", x: 300, y: 80 },
      { key: "mesita", x: 200, y: 140 },
      { key: "cuadro", x: 340, y: 60 },
      { key: "ventana", x: 380, y: 60 },
      { key: "libreria", x: 100, y: 96 },
      { key: "lampara", x: 130, y: 128 },
      { key: "plantagrande", x: 160, y: 160 },
      { key: "carrito", x: 200, y: 170 },
      { key: "sofa", x: 240, y: 112 },
      { key: "mesita", x: 230, y: 140 }
    ];

    this.muebles = [];
    this.muebleKeys = [
      "mostrador", "sofa", "plantapeque", "letrero", "mesita",
      "cuadro", "ventana", "libreria", "lampara", "plantagrande", "carrito"
    ];

    mueblesData.forEach((data, index) => {
      this.crearMueble(data.key, data.x, data.y, index);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.setDepth(dragY);
    });

    this.input.keyboard.on("keydown-S", () => {
      const result = this.muebles.map((m) => ({
        key: m.tipo,
        x: Math.round(m.x),
        y: Math.round(m.y)
      }));

      console.clear();
      console.log("Muebles exportados:", JSON.stringify(result, null, 2));
      alert("Coordenadas exportadas a consola (F12)");
    });

const infoText = document.createElement("div");
infoText.textContent = "Arrastra los muebles - Presiona 'S' para exportar";
infoText.style.position = "absolute";
infoText.style.top = "120px";
infoText.style.left = "480px";
infoText.style.background = "rgba(0,0,0,0.7)";
infoText.style.color = "#fff";
infoText.style.padding = "8px 12px";
infoText.style.borderRadius = "8px";
infoText.style.fontFamily = "monospace";
infoText.style.fontSize = "20px";
infoText.style.zIndex = 1000;
document.body.appendChild(infoText);

    // Crear menú para añadir nuevos muebles
    const select = document.createElement("select");
    select.style.marginRight = "8px";
    select.style.padding = "4px";
    select.style.fontSize = "14px";

    this.muebleKeys.forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.textContent = "Agregar mueble";
    button.style.marginRight = "8px";
    button.style.padding = "6px 12px";
    button.style.cursor = "pointer";

    button.onclick = () => {
      const tipo = select.value;
      const x = 100 + Math.floor(Math.random() * 200);
      const y = 100 + Math.floor(Math.random() * 150);
      this.crearMueble(tipo, x, y, this.muebles.length);
    };

    const gridButton = document.createElement("button");
    gridButton.textContent = "Mostrar/Ocultar Cuadrícula";
    gridButton.style.padding = "6px 12px";
    gridButton.style.cursor = "pointer";

    gridButton.onclick = () => {
      this.gridVisible = !this.gridVisible;
      this.gridGraphics.clear();
      if (this.gridVisible) this.drawGrid();
    };

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.background = "rgba(0,0,0,0.8)";
    container.style.padding = "12px";
    container.style.borderRadius = "10px";
    container.style.zIndex = 1000;
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.appendChild(select);
    container.appendChild(button);
    container.appendChild(gridButton);
    document.body.appendChild(container);
  }

  crearMueble(key, x, y, index) {
    const mueble = this.add.sprite(x, y, "hall", key)
      .setInteractive({ draggable: true })
      .setOrigin(0.5, 1)
      .setDepth(y);

    mueble.name = `${key}_${index}`;
    mueble.tipo = key;
    this.input.setDraggable(mueble);
    this.muebles.push(mueble);
  }

  drawGrid() {
    const tileSize = 32;
    const width = this.scale.width;
    const height = this.scale.height;

    this.gridGraphics.lineStyle(1, 0x555555, 0.3);

    for (let x = 0; x < width; x += tileSize) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, height);
      this.gridGraphics.strokePath();
    }

    for (let y = 0; y < height; y += tileSize) {
      this.gridGraphics.beginPath();
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(width, y);
      this.gridGraphics.strokePath();
    }
  }
}