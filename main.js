const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const scorpion = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	}
}

const subZero = {
	player: 2,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
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
	const $playerLife = document.querySelector('.player' + player.player + ' .life')
	player.hp -= Math.ceil(Math.random() * 20)

	if (player.hp <= 0) $playerLife.style.width = 0 + '%'
	else $playerLife.style.width = player.hp + '%'

	if (player.hp < 0) {
		// $arenas.appendChild(playerLose(player.name))
		$arenas.appendChild(playerWin(scorpion, subZero))
	}
}

// function playerLose(name) {
// 	const $loseTitle = createElement('div', 'loseTitle')
// 	$loseTitle.innerText = name + ' lose'

// 	return $loseTitle
// }

function playerWin(player1, player2) {
	let name
	if (player1.hp < 0) name = player2.name
	else name = player1.name
	const $winTitle = createElement('div', 'loseTitle')
	$winTitle.innerText = name + ' Win'

	$randomButton.disabled = true

	return $winTitle
}

$randomButton.addEventListener('click', function () {
	changeHP(scorpion)
	changeHP(subZero)
})

$arenas.appendChild(createPlayer(scorpion))
$arenas.appendChild(createPlayer(subZero))
