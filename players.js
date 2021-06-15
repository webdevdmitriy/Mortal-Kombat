export const player1 = {
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

export const player2 = {
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

export function changeHP(numHp) {
	this.hp -= numHp
	if (this.hp <= 0) {
		this.hp = 0
	}
}
export function elHP() {
	return document.querySelector('.player' + this.player + ' .life')
}
export function renderHP() {
	this.elHP().style.width = this.hp + '%'
}
