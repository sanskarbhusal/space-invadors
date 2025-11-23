import EnemyController from "./controllers/EnemyController.js"
import PlayerController from "./controllers/PlayerController.js"
import BulletController from "./controllers/BulletController.js"

const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

const background = new Image()
background.src = "images/space.png"

const playerBulletController = new BulletController(canvas, 10, "red", true)
const enemyBulletController = new BulletController(canvas, 4, "white", false)
const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
)
const playerController = new PlayerController(canvas, 3, playerBulletController)

let isGameOver = false
let didWin = false

function game() {
    checkGameOver()
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    displayGameOver()
    if (!isGameOver) {
        enemyController.draw(ctx)
        playerController.draw(ctx)
        playerBulletController.draw(ctx)
        enemyBulletController.draw(ctx)
        console.log(isGameOver)
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Won" : "Game Over"
        let textOffset = didWin ? 3.5 : 5

        ctx.fillStyle = "white"
        ctx.font = "70px Arial"
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
    }
}

function checkGameOver() {
    if (isGameOver) {
        return
    }

    if (enemyBulletController.collideWith(playerController)) {
        isGameOver = true
    }
}


setInterval(game, 1000 / 60);