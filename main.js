import { getRandom, createElement } from './utils.js'
import { player1, player2, changeHP, elHP, renderHP } from './players.js'
import { ATTACK, logs } from './constants.js'
import { enemyAttack, playerAttack } from './attack.js'
import { generateLogs } from './generatelogs.js'
import { $arenas, $formFight, $chat } from './constants.js'

const createPlayer = characterObj => {
	const $player = createElement('div', 'player' + characterObj.player)

	const $progressBar = createElement('div', 'progressbar')

	const $character = createElement('div', 'character')

	const $life = createElement('div', 'life')
	$life.style.width = characterObj.hp + '%'

	const $name = createElement('div', 'name')
	$name.innerHTML = characterObj.name

	const $img = createElement('img')
	$img.setAttribute('src', characterObj.img)

	$progressBar.appendChild($life)
	$progressBar.appendChild($name)
	$character.appendChild($img)
	$player.appendChild($progressBar)
	$player.appendChild($character)

	return $player
}

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

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

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
		generateLogs('draw', player1, player2)
	}
}

$formFight.addEventListener('submit', function (e) {
	if ($chat.innerHTML === '') {
		generateLogs('start', player1, player2)
	}
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
