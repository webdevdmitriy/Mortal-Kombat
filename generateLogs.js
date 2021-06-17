import { getRandom } from './utils.js'
import { logs } from './constants.js'
import { player1, player2 } from './players.js'

const $chat = document.querySelector('.chat')

export const generateLogs = (type, player1, player2, damage) => {
	let el = ``

	const time = new Date().toLocaleTimeString().slice(0, -3)

	switch (type) {
		case 'start':
			el = startFight(time, player1, player2)
			break
		case 'hit':
			el = hitFight(time, damage, player1, player2)
			break
		case 'defence':
			el = defenceFight(time, player1, player2)
			break
		case 'end':
			el = endFight(player1, player2)
			break
		case 'draw':
			el = drawFight()
			break
		default:
	}
	$chat.insertAdjacentHTML('afterbegin', el)
}

const startFight = time => {
	const text = logs['start']
		.replace('[time]', time)
		.replace('[player1]', player1.name)
		.replace('[player2]', player2.name)
	return `<p>${text}</p>`
}
const hitFight = (time, damage, name1, name2) => {
	const text = logs['hit'][getRandom(logs['hit'].length - 1)]
		.replace('[playerKick]', name1.name)
		.replace('[playerDefence]', name2.name)
	return `<p>${time} ${text} -${damage} 
	[${name1.player === 2 ? player1.hp : player2.hp} / 100]</p>`
}
const defenceFight = (time, player1, player2) => {
	const text = logs['defence'][getRandom(logs['defence'].length - 1)]
		.replace('[playerKick]', player1.name)
		.replace('[playerDefence]', player2.name)
	return `<p>${time} ${text}</p>`
}

const endFight = (player1, player2) => {
	const text = logs['end'][getRandom(logs['end'].length - 1)]
		.replace('[playerWins]', player1.name)
		.replace('[playerLose]', player2.name)
	return `<p>${text}</p>`
}
const drawFight = () => {
	const text = logs['draw']
	return `<p>${text}</p>`
}
