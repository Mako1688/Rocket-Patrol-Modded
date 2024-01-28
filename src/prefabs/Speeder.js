class Speeder extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)    //add to existing scene
        this.points = pointValue    //store pointValue
        let random = Math.random()
        this.moveSpeed = game.settings.spaceshipSpeed      //spaceship speed in pixels/frame
        if(random > 0.5) {
            this.moveSpeed = -(game.settings.spaceshipSpeed)          //spaceship speed in pixels/frame
        }

        console.log('Speeder created')
    }

    update() {
        //move spaceship left/right
        this.x += this.moveSpeed * 1.5
        //wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
            console.log('speeder has wrapped around screen')
        }
        if(this.x > game.config.width + 100) {
            this.x = 0
            console.log('speeder has wrapped around screen')
        }
    }

    //reset positions
    reset() {
        this.x = game.config.width
    }

}