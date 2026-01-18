import Phaser from "phaser";
import { WorldGenerator, Tile } from "../systems/WorldGenerator";
import { Player } from "../entities/Player";
import { QuestSystem } from "../systems/QuestSystem";

export class OverworldScene extends Phaser.Scene {
  private worldGen!: WorldGenerator;
  private map: Tile[][] = [];
  private tileSize = 16; // visual pixel size per tile
  private mapWidth = 128;
  private mapHeight = 128;
  private worldTextureKey = "world-rt";
  private player!: Player;
  private questSystem = new QuestSystem();

  constructor() {
    super({ key: "OverworldScene" });
  }

  create(): void {
    // create generator and generate map
    this.worldGen = new WorldGenerator(Date.now() & 0xffffffff);
    this.map = this.worldGen.generate(this.mapWidth, this.mapHeight);

    // create a render texture to draw tiles once (for simplicity)
    const rtWidth = this.mapWidth * this.tileSize;
    const rtHeight = this.mapHeight * this.tileSize;
    const rt = this.add.renderTexture(0, 0, rtWidth, rtHeight);
    rt.setOrigin(0, 0);
    rt.setScrollFactor(0);
    rt.saveTexture(this.worldTextureKey);
    rt.clear();

    // draw tiles
    const g = this.make.graphics({});
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tile = this.map[y][x];
        const color = tileToColor(tile);
        g.fillStyle(color, 1);
        g.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }
    rt.draw(g);
    g.destroy();

    // Add a tile sprite using the generated texture; place it at 0,0 in world coordinates
    this.add.image(0, 0, this.worldTextureKey).setOrigin(0, 0);

    // World bounds
    this.cameras.main.setBounds(0, 0, rtWidth, rtHeight);
    this.physics.world.setBounds(0, 0, rtWidth, rtHeight);

    // Create player at center of map
    const startX = (this.mapWidth * this.tileSize) / 2;
    const startY = (this.mapHeight * this.tileSize) / 2;
    this.player = new Player(this, startX, startY);

    // camera follow
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(2); // zoom to get a pixelated look

    // small sample quest
    const q = this.questSystem.createQuest({
      id: "q-hello",
      title: "Hello Traveler",
      description: "Walk 200 pixels from the start.",
      objectives: { walk: 200 }
    });
    this.questSystem.activate(q.id);

    // show debug text
    const style = { font: "12px monospace", color: "#fff" };
    const info = this.add.text(10, 10, "Quest: Hello Traveler (active)", style).setScrollFactor(0);

    // update the info text each frame manually in update
    (this as { debugInfo: Phaser.GameObjects.Text }).debugInfo = info;
  }

  update(): void {
    this.player.update();
    const info = (this as { debugInfo: Phaser.GameObjects.Text }).debugInfo;
    info.setText(`Quest: ${this.questSystem.getActive().map((q) => q.title).join(", ")}`);
  }
}

function tileToColor(tile: Tile) {
  if (tile === 0) return 0x2f5fbf; // water (blue)
  if (tile === 1) return 0x4caf50; // grass (green)
  return 0x8b8b8b; // mountain (gray)
}
