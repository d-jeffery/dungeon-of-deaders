import { Player } from '../objects/player'
import Vector2 = Phaser.Math.Vector2

export class GameScene extends Phaser.Scene {
    private player: Player
    private keys: any

    constructor() {
        super({ key: 'GameScene' })
    }

    preload(): void {}

    create(): void {
        this.player = new Player(this, 100, 100)

        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys(
                'A, D, W, S, LEFT, RIGHT, UP, DOWN, SPACE'
            )
        }

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

    update(time: number, delta: number) {
        super.update(time, delta)

        const maxSpeed = 100
        let walkVector = new Vector2(0, 0)

        if (this.keys) {
            if (this.keys.W.isDown || this.keys.UP.isDown) {
                walkVector.y = -maxSpeed
            }
            if (this.keys.S.isDown || this.keys.DOWN.isDown) {
                walkVector.y = +maxSpeed
            }
            if (this.keys.A.isDown || this.keys.LEFT.isDown) {
                walkVector.x = -maxSpeed
            }
            if (this.keys.D.isDown || this.keys.RIGHT.isDown) {
                walkVector.x = +maxSpeed
            }
            walkVector = walkVector.normalize()
        }

        this.player.setVelocity(
            walkVector.x * maxSpeed,
            walkVector.y * maxSpeed
        )

        // Turn player to pointer
        // const angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        // this.player.setRotation(Phaser.Math.Angle.RotateTo(
        //     this.player.rotation,
        //     angleToPointer,
        // ));
    }
}
