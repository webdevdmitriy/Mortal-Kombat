import { getRandom } from './utils.js'
import { ATTACK, HIT } from './constants.js'

import { $formFight } from './constants.js'

export const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

export const playerAttack = () => {
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
