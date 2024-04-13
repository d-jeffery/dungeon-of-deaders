// import { Redhat } from '../objects/redhat';
// @ts-ignore
import bsp from 'bsp-tree'

export class GameScene extends Phaser.Scene {
    private bsp: any

    constructor() {
        super({ key: 'GameScene' })
    }

    preload(): void {
        this.bsp = bsp(8)
        let vertical = true
    }

    create(): void {
        /*

   const emitter = this.add.particles(0, 0, 'redParticle', {
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    });

    this.myRedhat = new Redhat({
      scene: this,
      x: 400,
      y: 300,
      texture: 'redhat'
    });

    emitter.startFollow(this.myRedhat);

*/
    }
}
