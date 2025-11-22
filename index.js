import EnemyController from "./controllers/EnemyController.js"


const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

const background = new Image()
background.src = "images/space.png"

const enemeyController = new EnemyController(canvas)

function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    enemeyController.draw(ctx)
}

setInterval(game, 1000 / 30);