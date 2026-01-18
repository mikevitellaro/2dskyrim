import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    // Nothing external for now; we will create textures dynamically
  }

  create(): void {
    // Create a simple 8x8 player texture (white)
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1);
    g.fillRect(0, 0, 8, 8);

    // Render texture to a key
    const rt = this.add.renderTexture(0, 0, 8, 8);
    rt.draw(g, 0, 0);
    rt.saveTexture("player");

    g.destroy();
    rt.destroy();

    this.scene.start("OverworldScene");
  }
}
