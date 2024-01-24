class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)    //add to existing scene
        this.points = pointValue    //store pointValue
        let random = Math.random()
        this.moveSpeed = game.settings.spaceshipSpeed          //spaceship speed in pixels/frame
        if(random > 0.5) {
            this.moveSpeed = -(game.settings.spaceshipSpeed)          //spaceship speed in pixels/frame
        }

        
    }

    update() {
        //move spaceship left/right
        this.x -= this.moveSpeed
        //wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
        if(this.x > game.config.width + 100) {
            this.x = 0
        }
    }

    //reset positions
    reset() {
        this.x = game.config.width
    }

}