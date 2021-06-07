const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	},
	changeHP: function (numHp) {
		this.hp -= numHp
		if (this.hp <= 0) {
			this.hp = 0
		}
	},
	elHP: function () {
		return document.querySelector('.player' + this.player + ' .life')
	},
	renderHP: function () {
		this.elHP().style.width = this.hp + '%'
	}
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
	changeHP: function (numHp) {
		this.hp -= numHp
		if (this.hp <= 0) {
			this.hp = 0
		}
	},
	elHP: function () {
		return document.querySelector('.player' + this.player + ' .life')
	},
	renderHP: function () {
		this.elHP().style.width = this.hp + '%'
	}
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

function changeHP(player) {
	// const $playerLife = document.querySelector('.player' + player.player + ' .life')
	// player.hp -= Math.ceil(Math.random() * 20)

	player.changeHP(Math.ceil(Math.random() * 20))
	console.log(player.name, player.hp)

	// if (player.hp <= 0) {
	// 	player.hp = 0
	// }
	player.renderHP()
	// $playerLife.style.width = player.hp + '%'
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

$randomButton.addEventListener('click', function () {
	changeHP(player1)
	changeHP(player2)

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true
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

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

function createReloadButton() {
	const $div = createElement('div')
	$div.classList.add('reloadWrap')

	const $btn = createElement('button')
	$btn.classList.add('button')
	$btn.textContent = 'Restart'

	$div.appendChild($btn)

	$btn.addEventListener('click', function () {
		window.location.reload()
	})

	document.querySelector('.arenas').appendChild($div)
}
