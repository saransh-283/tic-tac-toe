const cells = Array.from(document.getElementsByClassName('cell'))
const winconf = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
]
const resetBtn = document.getElementById('reset-btn')
const startBtn = document.getElementById('start-btn')
const overlay = document.getElementById('overlay-div')
const resultPara = document.getElementById('result-div')

var player1
var player2
var players
var cell
var move
var moves
var user

function init(e) {
    e.preventDefault()
    player1 = document.getElementById("player-1").value
    player2 = document.getElementById("player-2").value
    if (player1 != "" && player2 != "") {
        players = {
            x: player1,
            o: player2
        }
        user = {
            x: [],
            o: []
        }
        cells.map(elem => {
            elem.innerHTML = ''
            elem.addEventListener('click', cellClick)
        })
        move = 'x'
        moves = 0
        overlay.style.display = 'none'
    }
}

startBtn.addEventListener('click', init)

function reset(e) {
    init(e)
    overlay.style.display = 'unset'
}

function subArray(arr, sub) {
    return sub.map(elem => arr.indexOf(elem) != -1).indexOf(false) == -1
}

function wincheck() {
    if (winconf.map(win => {
            return subArray(user[move], win)
        }).indexOf(true) != -1) {
        cells.map(cell => cell.removeEventListener('click', cellClick))
        resultPara.innerHTML = `${players[move]} wins`
    }
}

function cellClick(e) {
    if (moves <= 8) {
        cell = e.target
        if (cell.innerHTML == "") {
            cell.innerHTML = move
            user[move].push(cell.getAttribute('id'))

            wincheck()


            move = move == 'x' ? 'o' : 'x'
            moves++
        }
    }
}

resetBtn.addEventListener('click', reset)