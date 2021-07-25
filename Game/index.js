import { getRandom, createElement, getTime } from '../utils/index.js'
import { HIT, LOGS, ATTACK } from '../constants/index.js'
import Player from '../Player/index.js'

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')

let player1
let player2

// const player1 = new Player({
// 	player: 1,
// 	name: 'Scorpion',
// 	hp: 100,
// 	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
// 	weapon: ['Sword', 'Bow'],
// 	rootSelector: 'arenas'
// })

// const player2 = new Player({
// 	player: 2,
// 	name: 'Sub-Zero',
// 	hp: 100,
// 	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
// 	weapon: ['Sword', 'Bow'],
// 	rootSelector: 'arenas'
// })

console.log()

export default class Game {
	constructor(props) {}

	getLocalPlayer = () => JSON.parse(localStorage.getItem('player1'))

	gerPlayers = async () => {
		const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
		return body
	}

	playerWins = name => {
		const $winTitle = createElement('div', 'loseTitle')
		if (name) {
			$winTitle.innerText = name + ' Wins'
		} else {
			$winTitle.innerText = 'draw'
		}
		return $winTitle
	}

	createReloadButton = () => {
		const $div = createElement('div', 'reloadWrap')
		const $btn = createElement('button', 'button')
		$btn.textContent = 'Restart'
		$div.appendChild($btn)

		$btn.addEventListener('click', function () {
			window.location.reload()
		})

		$arenas.appendChild($div)
	}

	enemyAttack = () => {
		const hit = ATTACK[getRandom(3) - 1]
		const defence = ATTACK[getRandom(3) - 1]
		return {
			value: getRandom(HIT[hit]),
			hit,
			defence
		}
	}

	playerAttack = () => {
		const attack = {}

		for (let item of $formFight) {
			if (item.checked && item.name === 'hit') {
				attack.value = getRandom(HIT[item.value])
				attack.hit = item.value
			}
			if (item.checked && item.name === 'defence') {
				attack.defence = item.value
			}
			item.checked = false
		}
		return attack
	}
	showResult = () => {
		const { hp: hpPlayer1 } = player1
		const { hp: hpPlayer2 } = player2

		if (hpPlayer1 === 0 || hpPlayer2 === 0) {
			createReloadButton()
		}
		if (hpPlayer1 === 0 && hpPlayer1 < hpPlayer2) {
			$arenas.appendChild(playerWins(player2.name))
			this.generateLogs('end', player2, player1)
		} else if (hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
			$arenas.appendChild(playerWins(player1.name))
			this.generateLogs('end', player1, player2)
		} else if (hpPlayer1 === 0 && hpPlayer2 === 0) {
			$arenas.appendChild(playerWins())
			this.generateLogs('draw')
		}
	}
	getTextLog = (type, playerName1, playerName2) => {
		switch (type) {
			case 'start':
				return LOGS[type]
					.replace('[player1]', playerName1)
					.replace('[player2]', playerName2)
					.replace('[time]', getTime())
			case 'hit':
				return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
					.replace('[playerKick]', playerName1)
					.replace('[playerDefence]', playerName2)
			case 'defence':
				return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
					.replace('[playerKick]', playerName1)
					.replace('[playerDefence]', playerName2)
			case 'end':
				return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
					.replace('[playerWins]', playerName1)
					.replace('[playerLose]', playerName2)
			case 'draw':
				return LOGS[type]
		}
	}
	generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, damage) => {
		let text = this.getTextLog(type, name, playerName2)

		switch (type) {
			case 'hit':
				text = `${getTime()} ${text} -${damage} [${hp} / 100]`
				break
			case 'defence':
			case 'end':
			case 'draw':
				text = `${getTime()} ${text}`
				break
		}

		let el = `<p>${text}</p>`

		$chat.insertAdjacentHTML('afterbegin', el)
	}

	start = async () => {
		const players = await this.gerPlayers()

		const p1 = this.getLocalPlayer()

		const p2 = players[getRandom(players.length) - 1]

		player1 = new Player({
			...p1,
			player: 1,
			rootSelector: 'arenas'
		})
		player2 = new Player({
			...p2,
			player: 2,
			rootSelector: 'arenas'
		})
		player1.createPlayer()
		player2.createPlayer()

		this.generateLogs('start', player1, player2)
		$formFight.addEventListener('submit', e => {
			e.preventDefault()

			const { value: enemyValue, defence: enemyDefence, hit: enemyHit } = this.enemyAttack()
			const { value: playerValue, defence: playerDefence, hit: playerHit } = this.playerAttack()

			if (playerHit !== enemyDefence) {
				player2.changeHP(playerValue)
				player2.renderHP()
				this.generateLogs('hit', player1, player2, playerValue)
			} else {
				this.generateLogs('defence', player2, player1)
			}

			if (playerDefence !== enemyHit) {
				player1.changeHP(enemyValue)
				player1.renderHP()
				this.generateLogs('hit', player2, player1, enemyValue)
			} else {
				this.generateLogs('defence', player2, player1)
			}
			this.showResult()
		})
	}
}
