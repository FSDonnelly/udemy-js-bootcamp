import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', function (e) {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })

}

const startGame = async () => {
    const puzzle = await getPuzzle(`${Math.floor((Math.random() * 3) + 1)}`)
    game1 = new Hangman(puzzle, (Math.floor(puzzle.length / 2)))
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()