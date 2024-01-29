class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load image/tile sprites
        this.load.image('rocket', './assets/Sprites/newRocket.png')
        this.load.image('spaceship', './assets/Sprites/spaceship.png')
        this.load.image('speeder', './assets/Sprites/Aestroid.png')
        this.load.image('starfield', './assets/Sprites/starfield.png')
        this.load.image('starfield-new', './assets/Sprites/starfield-new.png')
        this.load.image('starfield-parallax', './assets/Sprites/starfield parallax.png')
        this.load.image('spaceship-new', './assets/Sprites/spaceshipNew.png')

        //load audio
        this.load.audio('sfx-select', './assets/Sounds/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/Sounds/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/Sounds/sfx-shot.wav')
        this.load.audio('gameMusic', './assets/Sounds/gameMusic.m4a')
        this.load.audio('explosion1', './assets/Sounds/Explosion 1.wav')
        this.load.audio('explosion2', './assets/Sounds/Explosion 3.wav')
        this.load.audio('explosion3', './assets/Sounds/Explosion 5.wav')
        this.load.audio('explosion4', './assets/Sounds/Explosion 8.wav')
        this.load.audio('laserShoot', './assets/Sounds/Laser_shoot 15.wav')
        this.load.audio('speederSound', './assets/Sounds/Pickup_coin 4.wav')



        //load spritesheet
        this.load.spritesheet('explosion', './assets/SpriteSheets/ShipExplosion.png', {
            frameWidth: 63,
            frameHeight: 32,
            startFrame:  0,
            endFrames: 2
        })

        this.load.spritesheet('speederExplosion', './assets/SpriteSheets/AestroidSpriteSheet.png', {
            frameWidth: 15,
            frameHeight: 15,
            startFrame: 0,
            endFrames: 2
        })
    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 15
        })

        this.anims.create({
            key: 'speederExplode',
            frames: this.anims.generateFrameNumbers('speederExplosion', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 15
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <-> arrows to move & (F) to fire', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#FACADE'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', 
        menuConfig).setOrigin(0.5)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //play background music
        
        if(!musicPlaying){
            this.backgroundMusic = this.sound.add('gameMusic', {loop: true})
            this.backgroundMusic.play()

            musicPlaying = true
        }
        
        

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            let random = Math.random()
            let speed =3
            if(random > 0.5) {
                speed = -3
            }
            //easy mode
            game.settings = {
                spaceshipSpeed: speed,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            let random = Math.random()
            let speed = 4
            if(random > 0.5) {
                speed = -4
            }
            //hard mode
            game.settings = {
                spaceshipSpeed: speed,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}