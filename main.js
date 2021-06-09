const $arenas = document.querySelector('.arenas')
// const $randomButton = document.querySelector('.button')

const $formFight = document.querySelector('.control')

const HIT = {
	head: 30,
	body: 25,
	foot: 20
}
const ATTACK = ['head', 'body', 'foot']

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	},
	changeHP,
	elHP,
	renderHP
}

const player2 = {
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	},
	changeHP,
	elHP,
	renderHP
}

function changeHP(numHp) {
	this.hp -= numHp
	if (this.hp <= 0) {
		this.hp = 0
	}
}
function elHP() {
	return document.querySelector('.player' + this.player + ' .life')
}
function renderHP() {
	this.elHP().style.width = this.hp + '%'
}

function createElement(tag, className) {
	const $tag = document.createElement(tag)

	if (className) $tag.classList.add(className)

	return $tag
}

function createPlayer(characterObj) {
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

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle')
	if (name) {
		$winTitle.innerText = name + ' Wins'
	} else {
		$winTitle.innerText = 'draw'
	}
	return $winTitle
}

function getRandom(num) {
	return Math.ceil(Math.random() * num)
}

// $randomButton.addEventListener('click', function () {
// 	player1.changeHP(getRandom(20))
// 	player1.renderHP()
// 	player2.changeHP(getRandom(20))
// 	player2.renderHP()

// 	if (player1.hp === 0 || player2.hp === 0) {
// 		// $randomButton.disabled = true
// 		createReloadButton()
// 	}
// 	if (player1.hp === 0 && player1.hp < player2.hp) {
// 		$arenas.appendChild(playerWins(player2.name))
// 	} else if (player2.hp === 0 && player2.hp < player1.hp) {
// 		$arenas.appendChild(playerWins(player1.name))
// 	} else if (player1.hp === 0 && player2.hp === 0) {
// 		$arenas.appendChild(playerWins())
// 	}
// })

function createReloadButton() {
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

function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

$formFight.addEventListener('submit', function (e) {
	e.preventDefault()
	console.dir($formFight)
	const enemy = enemyAttack()

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

	if (attack.hit != enemy.defence) {
		player2.changeHP(attack.value)
		player2.renderHP()
	}

	if (enemy.hit != attack.defence) {
		player1.changeHP(enemy.value)
		player1.renderHP()
	}

	if (player1.hp === 0 || player2.hp === 0) {
		// $randomButton.disabled = true
		createReloadButton()
	}
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name))
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name))
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins())
	}
})
