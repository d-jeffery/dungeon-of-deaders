export class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' })
    }

    preload(): void {}

    create(): void {
        const { width, height } = this.game.canvas

        this.add
            .text(width / 2, height / 2, 'Dungeon\nOf\nDeaders')
            .setFontFamily("Organ")
            .setAlign('center')
            .setOrigin(0.5, 0.5)
    }
}
