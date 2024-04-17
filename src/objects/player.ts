import { BaseSprite } from './base-sprite'

export class Player extends BaseSprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)


        this.scene.add.existing(this)
        scene.physics.add.existing(this)

        if (this.body) {
            this.body.setSize(16, 16, true)
        }
        this.setSize(16, 20)

    }
}
