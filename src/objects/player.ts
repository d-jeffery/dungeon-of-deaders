import { BaseSprite } from './base-sprite'

export class Player extends BaseSprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.setSize(16, 20)
        this.setCollideWorldBounds(false)
    }
}
