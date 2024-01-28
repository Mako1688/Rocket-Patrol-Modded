//Marco Ogaz-Vega
//1/24/24
//CMPM 120

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let musicPlaying = false

//UPDATE:
// - Track a high score that persists across scenes and display it in the UI (1)
// - Add your own (copyright-free) looping background music to the Play scene 
// (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// - Randomize each spaceship's movement direction at the start of each play (1)
// - Create a new scrolling tile sprite for the background (1)
// - Allow the player to control the Rocket after it's fired (1)
// - Display the time remaining (in seconds) on the screen (3)
// - random explosion sound for each hit (3)
// - new rocket fire sound(1)
// - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// - Implement parallax scrolling for the background (3)
// 20 points total