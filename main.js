import { getRandom } from './random.js'
import { player1, player2, changeHP, elHP, renderHP } from './players.js'
const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')

const HIT = {
	head: 30,
	body: 25,
	foot: 20
}
const ATTACK = ['head', 'body', 'foot']
const logs = {
	start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
	end: [
		'Результат удара [playerWins]: [playerLose] - труп',
		'[playerLose] погиб от удара бойца [playerWins]',
		'Результат боя: [playerLose] - жертва, [playerWins] - убийца'
	],
	hit: [
		'[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
		'[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
		'[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
		'[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
		'[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
		'[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
		'[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
		'[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
		'[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
		'[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
		'[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
		'[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
		'[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
		'[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
		'[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
		'[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
		'[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
		'[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.'
	],
	defence: [
		'[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
		'[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
		'[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
		'[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
		'[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
		'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
		'[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
		'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
	],
	draw: 'Ничья - это тоже победа!'
}

const createElement = (tag, className) => {
	const $tag = document.createElement(tag)

	if (className) $tag.classList.add(className)

	return $tag
}

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

const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

const playerAttack = () => {
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

const generateLogs = (type, player1, player2, damage) => {
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
