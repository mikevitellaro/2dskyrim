import Phaser from "phaser";

export abstract class Entity extends Phaser.Physics.Arcade.Sprite {
  id: string;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.id = Phaser.Utils.String.UUID();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
  }

  abstract update(time: number, delta: number): void;
}
