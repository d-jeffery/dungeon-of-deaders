

export class Sword extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'weapon')

        this.scene.add.existing(this)
        scene.physics.add.existing(this)

        if (this.body) {
            this.body.onCollide = true
            this.body.setSize(16, 16)
        }
    }
}
