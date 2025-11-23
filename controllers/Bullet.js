export default class Bullet {
    constructor(canvas, x, y, velocity, bulletColor) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.velocity = velocity
        this.bulletColor = bulletColor

        this.widht = 5
        this.height = 20
    }
}