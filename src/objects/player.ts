export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, null)

        this.scene.add.existing(this)
        scene.physics.add.existing(this)
    }
}
