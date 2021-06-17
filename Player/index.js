import { createElement } from '../utils/index.js'

class Player {
	constructor(props) {
		this.name = props.name
		this.hp = props.hp
		this.img = props.img
		this.player = props.player
		this.selector = `player${this.player}`
		this.rootSelector = props.rootSelector
	}
	changeHP = numHp => {
		this.hp -= numHp
		if (this.hp <= 0) {
			this.hp = 0
		}
	}
	elHP = () => {
		return document.querySelector('.player' + this.player + ' .life')
	}
	renderHP = () => {
		this.elHP().style.width = this.hp + '%'
	}
	createPlayer = () => {
		const $player = createElement('div', this.selector)

		const $progressBar = createElement('div', 'progressbar')

		const $character = createElement('div', 'character')

		const $life = createElement('div', 'life')
		$life.style.width = this.hp + '%'

		const $name = createElement('div', 'name')
		$name.innerHTML = this.name

		const $img = createElement('img')
		$img.setAttribute('src', this.img)

		$progressBar.appendChild($life)
		$progressBar.appendChild($name)
		$character.appendChild($img)
		$player.appendChild($progressBar)
		$player.appendChild($character)

		const $root = document.querySelector(`.${this.rootSelector}`)
		$root.appendChild($player)

		return $player
	}
}

export default Player
