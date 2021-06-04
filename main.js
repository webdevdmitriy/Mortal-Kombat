const Scorpion = {
	name: 'Scorpion',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	}
}

const subZero = {
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Sword', 'Bow'],
	attack: function () {
		console.log(this.name + ' Fight...')
	}
}

function createPlayer(player, character) {
	const $player1 = document.createElement('div')
	$player1.classList.add(player)

	const $progressBar = document.createElement('div')
	$progressBar.classList.add('progressbar')

	const $character = document.createElement('div')
	$character.classList.add('character')

	const $life = document.createElement('div')
	$life.classList.add('life')
	$life.style.width = character.hp + '%'

	const $name = document.createElement('div')
	$name.classList.add('name')
	$name.innerHTML = character.name

	const $img = document.createElement('img')
	$img.setAttribute('src', character.img)

	$progressBar.appendChild($life)
	$progressBar.appendChild($name)
	$character.appendChild($img)
	$player1.appendChild($progressBar)
	$player1.appendChild($character)

	document.querySelector('div.arenas').appendChild($player1)
}

createPlayer('player1', Scorpion)
createPlayer('player2', subZero)
