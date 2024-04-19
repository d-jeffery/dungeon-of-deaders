import * as phaser from 'phaser'

export class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' })
    }

    create(): void {
        const { width, height } = this.game.canvas

        this.add
            .text(width / 2, height / 2 - 80, 'Dungeon\nOf\nDeaders')
            .setFontFamily('Organ')
            .setFontSize('64px')
            .setAlign('center')
            .setOrigin(0.5, 0.5)

        this.add
            .text(width / 2, height / 2 + 160, 'Click to Begin')
            .setFontFamily('Organ')
            .setFontSize('48px')
            .setAlign('center')
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene')
            })
    }
}
