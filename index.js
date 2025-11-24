import EnemyController from "./controllers/EnemyController.js"
import PlayerController from "./controllers/PlayerController.js"
import BulletController from "./controllers/BulletController.js"

const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 800

const background = new Image()
background.src = "images/space.png"

const playerBulletController = new BulletController(canvas, 10, "red", true)
const enemyBulletController = new BulletController(canvas, 4, "white", false)
const playerController = new PlayerController(canvas, 3, playerBulletController)
const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController,
    playerController
)

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
        let textOffset = didWin ? 3.5 : 3.5

        ctx.fillStyle = "white"
        ctx.font = "70px Arial"
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)

        // contributed by Sanskar 
        let scoreText = `Score: ${playerController.getScore()}`
        ctx.fillStyle = "green"
        ctx.font = "50px Arial"
        ctx.fillText(scoreText, canvas.width / 3.2, canvas.height / 1.5)
        // upto here
    }
}

function checkGameOver() {
    if (isGameOver) {
        return
    }

    if (enemyBulletController.collideWith(playerController)) {
        // contributed by: Sanskar Bhusal
        playerController.reduceRemainingLife()
        isGameOver = playerController.getRemainingLife() > 0 ? false : true

    }

    if (enemyController.collideWith(playerController)) {
        isGameOver = true
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true
        isGameOver = true
    }
}


setInterval(game, 1000 / 60);