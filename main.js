import { getRandom, createElement, getTime } from './utils/index.js'
import { HIT, LOGS, ATTACK } from './constants/index.js'
import Player from './Player/index.js'

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')

const player1 = new Player({
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Sword', 'Bow'],
	rootSelector: 'arenas'
})

const player2 = new Player({
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Sword', 'Bow'],
	rootSelector: 'arenas'
})

const playerWins = name => {
	const $winTitle = createElement('div', 'loseTitle')
	if (name) {
		$winTitle.innerText = name + ' Wins'
	} else {
		$winTitle.innerText = 'draw'
	}
	return $winTitle
}

const createReloadButton = () => {
	const $div = createElement('div', 'reloadWrap')

	const $btn = createElement('button', 'button')
	$btn.textContent = 'Restart'
	$div.appendChild($btn)

	$btn.addEventListener('click', function () {
		window.location.reload()
	})

	$arenas.appendChild($div)
}

const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

const playerAttack = () => {
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

const showResult = () => {
	const { hp: hpPlayer1 } = player1
	const { hp: hpPlayer2 } = player2

	if (hpPlayer1 === 0 || hpPlayer2 === 0) {
		createReloadButton()
	}
	if (hpPlayer1 === 0 && hpPlayer1 < hpPlayer2) {
		$arenas.appendChild(playerWins(player2.name))
		generateLogs('end', player2, player1)
	} else if (hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
		$arenas.appendChild(playerWins(player1.name))
		generateLogs('end', player1, player2)
	} else if (hpPlayer1 === 0 && hpPlayer2 === 0) {
		$arenas.appendChild(playerWins())
		generateLogs('draw')
	}
}

const getTextLog = (type, playerName1, playerName2) => {
	switch (type) {
		case 'start':
			return LOGS[type].replace('[player1]', playerName1).replace('[player2]', playerName2).replace('[time]', getTime())
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

const generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, damage) => {
	let text = getTextLog(type, name, playerName2)

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

$formFight.addEventListener('submit', function (e) {
	e.preventDefault()

	// const player = playerAttack()

	const { value: enemyValue, defence: enemyDefence, hit: enemyHit } = enemyAttack()
	const { value: playerValue, defence: playerDefence, hit: playerHit } = playerAttack()

	if (playerHit !== enemyDefence) {
		player2.changeHP(playerValue)
		player2.renderHP()
		generateLogs('hit', player1, player2, playerValue)
	} else {
		generateLogs('defence', player2, player1)
	}

	if (playerDefence !== enemyHit) {
		player1.changeHP(enemyValue)
		player1.renderHP()
		generateLogs('hit', player2, player1, enemyValue)
	} else {
		generateLogs('defence', player2, player1)
	}
	showResult()
})

function init() {
	player1.createPlayer()
	player2.createPlayer()
	generateLogs('start', player1, player2)
}

init()
