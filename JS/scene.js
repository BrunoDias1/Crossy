import Car from "./car.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    init() {
        this.input.on("pointerdown", e => {this.movePlayer(e)});
        this.input.on("pointerup", e => {this.stopPlayer(e)});

        this.playerIsMoving = false;
        this.playerVelocity = 5;
    }

    movePlayer(event) {
        this.playerIsMoving = true;
    }

    stopPlayer(event) {
        this.playerIsMoving = false;
    }

    preload() {
        this.load.image("background", "./images/map.png");
        this.load.image("player", "./images/character_blonde_green.png");
        this.load.image("ycar", "./images/car_yellow_1.png");
        this.load.image("Mcycle", "./images/motorcycle_green.png");
    }

    create() {
        let bg = this.add.sprite(0 , 0, "background");
        bg.setOrigin(0);

        /* bg.setPosition(
            this.game.config.width / 2,
            this.game.config.height / 2
        );

        bg.x = this.game.config.width / 2;
        bg.y = this.game.config.height / 2;
        */

        this.motoC = this.add.sprite(
                    this.game.config.width / 2, 
                    70, "Mcycle");

        this.player = this.add.sprite(640 , 1200, "player");
        //player.setScale(2);

        this.cars = []
        this.cars.push(
            this.add.existing(
            new Car(this,
                10 * 128 - 64, 
                2 * 128 + 64, 
                "ycar", false)));

        this.cars.push(
            this.add.existing(
            new Car(this,
                128 - 64, 
                4 * 128 + 64, 
                "ycar", true)));

        this.cars.push(
            this.add.existing(
            new Car(this,
                10 * 128 - 64 , 
                3 * 128 + 64, 
                "ycar", false)));


        this.cars.push(
            this.add.existing(
            new Car(this,
                128 - 64, 
                5 * 128 + 64, 
                "ycar", true)));
            
        this.cars.push(
            this.add.existing(
            new Car(this,
                10 * 128 - 64, 
                6 * 128 + 64, 
                "ycar", false)));

        this.cars.push(
            this.add.existing(
            new Car(this,
                128 - 64, 
                128 + 64, 
                "ycar", true)));


        

        /*this.car002 = this.add.sprite(
            128 - 64 , 
            128 + 64, 
            "ycar");

        this.car002.setFlip(true, false)*/
        //car002.flipX = true     
    }

    update(time) {
        /*Fazer crescer o carro ao longo do tempo
        if(this.car002.scaleX < 2) {
            this.car002.scaleX += 0.01;
            this.car002.scaleY += 0.01;
        }*/

        if(this.playerIsMoving) {
            this.player.y += -this.playerVelocity;
        }


        /*if(this.car001.x <= -64 || this.car001.x >=
            this.game.config.width + 64) {
            this.car001.flipX = !this.car001.flipX;
        }

        if(this.car001.flipX == true){
            this.car001.x += this.carSpeed;
        } else {
            this.car001.x += -this.carSpeed;
        }

        this.car001.x += 
            this.car001.flipX === true ? 
                this.carSpeed : 
                -this.carSpeed;*/

        for(let i = 0; i < this.cars.length; i++){
            this.cars[i].update(time);
        }
        
        let playerRect = this.player.getBounds();
        let motoCRect = this.motoC.getBounds();

        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, motoCRect)) {

            this.scene.restart();
        }

        for(let i = 0; i < this.cars.length; i++){
           if(this.cars[i].overlaps(this.player)){
               this.scene.restart();
           }
        }

    }
}