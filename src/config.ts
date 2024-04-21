import { BootScene } from './scenes/boot-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Dungeon Of Deaders',
    url: 'https://github.com/d-jeffery/dungeon-of-deaders',
    version: '0.0.1',
    backgroundColor: 0x000000, //0x3a404d,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.MAX_ZOOM,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        //width: '640px',
        //height: '640px'
        width: '100%',
        height: '100%',
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    render: {
        pixelArt: true,
    },
    scene: [BootScene],
}
