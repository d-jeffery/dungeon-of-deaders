

export class BaseSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, null)

        this.scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

        if (this.body) {

            this.body.onCollide = true
            this.body.setSize(16, 16, false)
        }
    }
}
