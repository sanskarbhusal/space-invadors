import EnemyController from "./controllers/EnemyController.js"
import PlayerController from "./controllers/PlayerController.js"
import BulletController from "./controllers/BulletController.js"

const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")

const gameSettings = {
    enemyBulletSoundEnabled: false,
    soundButtionStateManager: document.getElementById("sound-button-state-manager")
}

const playButton = document.getElementById("play")
playButton.onclick = () => {
    isFirstLoad = false
}

const playAgainButton = document.getElementById("play-again")
disablePlayAgainButton(playAgainButton)

canvas.width = 800
canvas.height = 700

const background = new Image()
background.src = "images/space.png"

console.log(gameSettings.soundButtionStateManager.checked)
let playerBulletController = new BulletController(canvas, 10, "red", "player", gameSettings)
let enemyBulletController = new BulletController(canvas, 4, "white", "enemy", gameSettings)
let playerController = new PlayerController(canvas, 3, playerBulletController)
let enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController,
    playerController,
    gameSettings
)

let isGameOver = false
let didWin = false
var isFirstLoad = true
let didGameOverSoundPlay = false

function game() {
    if (!isFirstLoad) {
        disablePlayButton()
        checkGameOver()
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        displayGameOver()
        if (!isGameOver) {
            enemyController.draw(ctx)
            playerController.draw(ctx)
            playerBulletController.draw(ctx)
            enemyBulletController.draw(ctx)
        }
    }
}

function displayGameOver() {
    if (isGameOver) {

        if (!didWin) {
            if (!didGameOverSoundPlay && gameSettings.soundButtionStateManager.checked) {
                new Audio("sounds/game-over-sound.wav").play()
                didGameOverSoundPlay = true
            }
        }

        let text = didWin ? "You Won" : "Game Over"
        let textOffset = didWin ? 5 : 8.5

        ctx.fillStyle = "white"
        ctx.font = "70px 'Press Start 2P'"
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2.1)

        // contributed by Sanskar 
        let scoreText = `Score: ${playerController.getScore()}`
        ctx.fillStyle = "green"
        ctx.font = "50px 'Press Start 2P'"
        ctx.fillText(scoreText, canvas.width / 4.5, canvas.height / 1.5)

        displayPlayAgain()
    }
}

function disablePlayButton() {
    playButton.pointerEvents = "none"
    playButton.style.color = "transparent"
    playButton.style.backgroundColor = "transparent"
}

function displayPlayAgain() {
    if (isGameOver) {
        playAgainButton.style.display = "block"

        enablePlayAgainButton()
        playAgainButton.onclick = () => {
            isGameOver = false
            didWin = false

            // reset the controllers by creating new instances
            playerBulletController = new BulletController(canvas, 10, "red", "player", gameSettings)
            enemyBulletController = new BulletController(canvas, 4, "white", "enemy", gameSettings)
            playerController = new PlayerController(canvas, 3, playerBulletController)
            enemyController = new EnemyController(
                canvas,
                enemyBulletController,
                playerBulletController,
                playerController,
                gameSettings
            )
            disablePlayAgainButton()
        }
    }
}

function enablePlayAgainButton() {
    playAgainButton.style.color = "white"
    playAgainButton.style.backgroundColor = "green"
    playAgainButton.style.pointerEvents = "auto"
}

function disablePlayAgainButton() {
    playAgainButton.style.color = "transparent" // hides button text
    playAgainButton.style.backgroundColor = "transparent" // hides button itself
    playAgainButton.style.pointerEvents = "none" // disables hover and click
}


function checkGameOver() {
    if (isGameOver) {
        return
    }

    if (enemyBulletController.collideWith(playerController)) {
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

setInterval(game, 1000 / 60)