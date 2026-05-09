const ZONES = [
	{
		id: 'panel',
		label: 'Панель управления',
		desc: `Панель управления предназначена для задания параметров реза.
           Здесь вводится размер, настраивается положение заднего упора и сохраняются программы рéзки.
           Через дисплей оператор контролирует текущие координаты, состояние станка и возможные ошибки.`,
		type: 'rect',
		x: 35,
		y: 10,
		w: 34,
		h: 17,
	},
	{
		id: 'table',
		label: 'Рабочий стол',
		desc: `Рабочий стол предназначен для размещения и перемещения стопы бумаги.
Поверхность стола обеспечивает ровное положение материала перед резом.
Загрязнения или повреждения поверхности могут повлиять на точность позиционирования.`,
		type: 'poly',
		points: [
			[12, 43],
			[6, 50],
			[6, 54],
			[29, 54],
			[29, 50],
			[68.5, 50],
			[68.5, 54],
			[92, 54],
			[92, 50],
			[87, 43],
		],
	},
	{
		id: 'two_start',
		label: 'Двойной пуск',
		desc: `Двойной пуск — это система безопасности запуска реза.
Для начала цикла оператор должен одновременно нажать обе кнопки.
Это исключает возможность нахождения рук в зоне ножа во время движения.
`,
		type: 'rect',
		x: 29,
		y: 50,
		w: 39.5,
		h: 4,
	},
	{
		id: 'knife',
		label: 'Ножевая зона',
		desc: `Ножевая зона — это область выполнения реза. Здесь расположен нож и прижимная балка.
Во время цикла сначала опускается прижим, затем нож выполняет силовой рез.
Доступ к зоне во время работы запрещён.`,
		type: 'rect',
		x: 27,
		y: 30,
		w: 43,
		h: 10,
	},
	{
		id: 'uporki',
		label: 'Левый упор/кроншт.',
		desc: `Левый и правый боковой упор служит для выравнивания стопы бумаги по вертикали.
Он обеспечивает прямой угол относительно линии реза.
Неправильная укладка материала к упору приводит к перекосу и браку.
`,
		type: 'poly',
		points: [
			[17, 30],
			[21, 30],
			[21, 39],
			[18, 43],
			[13.5, 43],
			[13.5, 41],
		],
	},
	{
		id: 'uporki',
		label: 'Правый упор/кроншт.',
		desc: `Левый и правый боковой упор служит для выравнивания стопы бумаги по вертикали.
Он обеспечивает прямой угол относительно линии реза.
Неправильная укладка материала к упору приводит к перекосу и браку.
`,
		type: 'poly',
		points: [
			[84.5, 30],
			[88, 30],
			[92.5, 40],
			[92.5, 43],
			[89, 43],
			[84.5, 39],
		],
	},
	{
		id: 'error',
		label: 'Аварийная остановка',
		desc: `Кнопка аварийной остановки предназначена для немедленного прекращения работы станка.
При её нажатии движение ножа и приводов останавливается.
Используется в случае угрозы травмы или неисправности оборудования.`,
		type: 'rect',
		x: 15.5,
		y: 62.6,
		w: 3,
		h: 3,
	},
	{
		id: 'bottom',
		label: 'Нижний отсек/привод',
		desc: `Нижний отсек содержит приводные механизмы станка.
Здесь расположены элементы электропривода и силовые узлы.
Доступ разрешён только обслуживающему персоналу при отключённом питании.`,
		type: 'poly',
		points: [
			[19, 61],
			[19, 66],
			[15.5, 66],
			[15.5, 89],
			[90, 89],
			[90, 61],
		],
	},
]

// рендер зон в svg
const overlay = document.getElementById('overlay')
const hud = document.getElementById('hud')

function createRectZone(z) {
	const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
	el.setAttribute('x', z.x)
	el.setAttribute('y', z.y)
	el.setAttribute('width', z.w)
	el.setAttribute('height', z.h)
	return el
}

function createPolyZone(z) {
	const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
	const pts = z.points.map(([x, y]) => `${x},${y}`).join(' ')
	el.setAttribute('points', pts)
	return el
}

let currentAudio = null
const audioBaseUrl = new URL('../audio/', document.currentScript.src)

function speak(id) {
	if (!id) return

	if (currentAudio) {
		currentAudio.pause()
		currentAudio.currentTime = 0
	}

	const src = new URL(`${id}.mp3`, audioBaseUrl).href
	const audio = new Audio(src)
	currentAudio = audio

	audio.preload = 'auto'

	audio.play().catch(err => {
		console.error(`Не удалось воспроизвести аудио: ${src}`, err)
	})
}

function onZoneClick(zone) {
	hud.innerHTML = `<b>${zone.label}</b> <br><br> <p>${zone.desc}</p>`
	speak(zone.id)
	//console.log('Clicked zone:', zone)
}

function render() {
	overlay.innerHTML = ''
	for (const z of ZONES) {
		const el = z.type === 'poly' ? createPolyZone(z) : createRectZone(z)
		el.classList.add('zone')
		el.dataset.id = z.id
		el.addEventListener('click', e => {
			e.stopPropagation()
			onZoneClick(z)
		})
		overlay.appendChild(el)
	}
}

render()

// клик вне зон сбрасывает аудио
document.querySelector('body').addEventListener('click', () => {
	hud.textContent = 'Нажмите на одну из синих зон...'
	if (!currentAudio) return
	currentAudio.pause()
	currentAudio.currentTime = 0
	currentAudio = null
})
