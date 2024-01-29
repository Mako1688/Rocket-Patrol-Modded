class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //place tile sprites
        this.starfield = this.add.tileSprite(0, 0, 700, 500, 'starfield-new').setOrigin(0, 0)
        this.parallax = this.add.tileSprite(0, 0, 700, 500, 'starfield-parallax').setOrigin(0, 0)

        //Pink UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFACADE).setOrigin(0,0)

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship-new', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship-new', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship-new', 0, 10).setOrigin(0, 0)

        // add speeder
        this.speeder = new Speeder(this, game.config.width /2, game.config.height / 2 + 100, 'speeder', 0, 50).setOrigin(0, 0)

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)


        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //initialize scores
        this.p1Score = 0
        this.highScore = localStorage.getItem('rocketPatrolHighScore') || 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //high Score config
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        //display scores
        this.scoreLeft = this.add.text(borderUISize + borderPadding + game.config.width - 200, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.highScoreText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'High Score: ' + this.highScore, highScoreConfig)

        //GAME OVER flag
        this.gameOver = false

        //60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        this.clockText = this.add.text(game.config.width / 2, borderUISize + borderPadding*2, 'Time: ' + (this.clock.getElapsed() / 100), highScoreConfig)
    }

    update() {
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        
        this.starfield.tilePositionX -= 1
        this.parallax.tilePositionX -= 3
        
        if(!this.gameOver) {
            //update rocket sprite
            this.p1Rocket.update()
            //update spaceships (x3)
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            //update spaceship
            this.speeder.update()

            

            //display clock
            this.clockText.text = 'Time: ' + Math.trunc((game.settings.gameTimer - (this.clock.getElapsed())) / 1000)
            
            //update high score if applicable
            if(this.p1Score > this.highScore) {
                this.highScore = this.p1Score
                this.highScoreText.text = 'High Score: ' + this.highScore

                //save high score to local storage
                localStorage.setItem('rocketPatrolHighScore', this.highScore);
            }
        }
        

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

        if(this.checkCollision(this.p1Rocket, this.speeder)){
            this.p1Rocket.reset()
            this.speederExplode(this.speeder)
        }
    }

    checkCollision(rocket, ship) {
        //simple AAB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprie at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')              //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            ship.reset()                        //reset ship position
            ship.alpha = 1                      //make ship visible again
            boom.destroy()                      //remove explosion sprite
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        // random explosion sound
        let random = Math.random(); // Use Math.random() to get a float between 0 and 1

        if (random < 0.25) {
            this.sound.play('explosion1');
        } else if (random < 0.5) {
            this.sound.play('explosion2');
        } else if (random < 0.75) {
            this.sound.play('explosion3');
        } else {
            this.sound.play('explosion4');
    }
    }

    speederExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprie at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'spederExplosion').setOrigin(0, 0);
        boom.anims.play('speederExplode')              //play explode animation
        boom.on('animationcomplete', () => {    //callback after anim completes
            ship.reset()                        //reset ship position
            ship.alpha = 1                      //make ship visible again
            boom.destroy()                      //remove explosion sprite
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        this.sound.play('speederSound')
    }
}