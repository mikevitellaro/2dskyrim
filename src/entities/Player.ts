import Phaser from "phaser";
import { Entity } from "./Entity";

export class Player extends Entity {
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    this.setScale(4); // enlarge the 8x8 texture for visibility
    this.speed = 120;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    if (this.cursors.left?.isDown) {
      body.setVelocityX(-this.speed);
    } else if (this.cursors.right?.isDown) {
      body.setVelocityX(this.speed);
    }
    if (this.cursors.up?.isDown) {
      body.setVelocityY(-this.speed);
    } else if (this.cursors.down?.isDown) {
      body.setVelocityY(this.speed);
    }
    // Keep crisp pixel movement
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }
}
