import { GameScene } from './game-scene'
import { SplashScene } from './splash-scene'
import WebFontLoader from 'phaser3-rex-plugins/plugins/webfontloader.js'

export class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics
    private progressBar: Phaser.GameObjects.Graphics

    constructor() {
        super({
            key: 'BootScene',
        })
    }

    preload(): void {
        // set the background and create loading bar
        this.cameras.main.setBackgroundColor(0x98d687)
        this.createLoadingbar()

        // pass value to change the loading bar fill
        this.load.on(
            'progress',
            function (value: number) {
                this.progressBar.clear()
                this.progressBar.fillStyle(0xfff6d3, 1)
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                )
            },
            this
        )

        // delete bar graphics, when loading complete
        this.load.on(
            'complete',
            function () {
                this.progressBar.destroy()
                this.loadingBar.destroy()
            },
            this
        )

        WebFontLoader.call(this.load, {
            custom: {
                families: ['Organ', 'Impact'],
                urls: ['../assets/fonts.css'],
            },
        })

        this.load.image('player', '../assets/npc_paladin.png')
        this.load.image('weapon', '../assets/weapon_sword_black.png');

        // load out package
        // this.load.pack('preload', './assets/pack.json', 'preload');

        this.load.spritesheet('tiles', 'assets/tilemaps/tiles/16x16-dungeon.png',{frameWidth: 16, frameHeight: 16});
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map/dungeon.json');


        // Scenes
        this.scene.add('SplashScene', SplashScene, false)
        this.scene.add('GameScene', GameScene, false)
    }

    update(): void {
        this.scene.start('SplashScene')
    }

    private createLoadingbar(): void {
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0x5dae47, 1)
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        )
        this.progressBar = this.add.graphics()
    }
}
