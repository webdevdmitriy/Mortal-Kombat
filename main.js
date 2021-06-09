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
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
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
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
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

$randomButton.addEventListener('click', function () {
	player1.changeHP(getRandom(20))
	player1.renderHP()
	player2.changeHP(getRandom(20))
	player2.renderHP()

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
	const $div = createElement('div', 'reloadWrap')

	const $btn = createElement('button')
	$btn.classList.add('button')
	$btn.textContent = 'Restart'

	$div.appendChild($btn)

	$btn.addEventListener('click', function () {
		window.location.reload()
	})

	$arenas.appendChild($div)
}
