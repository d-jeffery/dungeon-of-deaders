import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import Vector2 = Phaser.Math.Vector2
import { Prisoner } from '../objects/prisoner'
import TilemapLayer = Phaser.Tilemaps.TilemapLayer
import { Sword } from '../objects/sword'

export class GameScene extends Phaser.Scene {
    private player: Player
    private sword: Sword
    private keys: any

    private walls: TilemapLayer

    constructor() {
        super({ key: 'GameScene' })
    }

    preload(): void {

    }

    create(): void {

        const map = this.add.tilemap( 'map' );
        const tiles = map.addTilesetImage('16x16-dungeon', 'tiles');

        const floor = map.createLayer(0, tiles)
        this.walls = map.createLayer(1, tiles);
        const roof = map.createLayer(2, tiles)

        const monsters = map.createFromObjects('Monsters', {gid: 290, classType: Enemy})
        const treasure = map.createFromObjects('Treasure', {gid: 368})

        const prisoners = map.createFromObjects('Prisoners', {gid: 458, classType: Prisoner})

        this.player = map.createFromObjects('Player', {gid: 496, classType: Player}).pop() as Player
        this.player.setTexture("player").setOffset(0.5, 0.5)

        this.walls.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, this.walls, () => {
            console.log("colldie")
        }, null, this);

        this.physics.add.collider(monsters, this.walls, () => {
            console.log("colldie")
        }, null, this);

        this.physics.add.collider(this.player, monsters, () => {
            console.log("colldie")
        });

        this.cameras.main.setZoom(2,2)
        //this.cameras.main.setBounds(floor.x, floor.y, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player)

        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys(
                'A, D, W, S, LEFT, RIGHT, UP, DOWN, SPACE'
            )
        }

        this.input.on('pointerdown', () => {
            const angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY);

            const x1 = this.player.x + Math.cos(angleToPointer) * 20;
            const y1 = this.player.y + Math.sin(angleToPointer) * 20;

            this.sword = new Sword(this, x1, y1)
                .setRotation(angleToPointer + (90*Math.PI/180))
                .setOrigin(0.5, 0.5)

            // this.time.addEvent({
            //     delay: 100,
            //     callback: () => {
            //        this.sword.destroy(true)
            //     }
            // })
        })

        this.input.on('pointerup', () => {
            if (this.sword) {
                this.sword.destroy(true)
            }
        })

        this.input.on('gameout', () => {
            if (this.sword) {
                this.sword.destroy(true)
            }
        })

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

        const maxSpeed = 60
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



        if (this.sword && this.input.activePointer.isDown) {

            if (this.input.activePointer.isDown) {
                const angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY);

                const x1 = this.player.x + Math.cos(angleToPointer) * 20;
                const y1 = this.player.y + Math.sin(angleToPointer) * 20;

                this.sword.setPosition(x1, y1)
                    .setRotation(angleToPointer + (90 * Math.PI / 180));
            } else {
                this.sword.destroy(true)
                this.sword = undefined
            }
        }


        // Turn player to pointer
        // const angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        // this.player.setRotation(Phaser.Math.Angle.RotateTo(
        //     this.player.rotation,
        //     angleToPointer,
        // ));
    }
}
