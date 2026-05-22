var dialogOn = false
var yandexSpeechkitAlertShown = false

function dialog_window() {
	if (document.getElementById('dialog')) {
		return
	}

	document.body.insertAdjacentHTML(
		'beforeend',
		"<div id='dialog' class='dialog'>" +
			"<div class='label' onclick='openDialog()'>Нажми, чтобы спросить!</div>" +
			"<div class='header'>История:</div>" +
			"<div class='history' id='history'></div>" +
			"<div class='question'>" +
			"<input id='Qdialog' placeholder='Введите вопрос' autocomplete='off' />" +
			"<input id='Qmicrophone' class='microphone-input' readonly aria-label='Голосовой ввод' autocomplete='off' />" +
			"<button type='button' onclick='ask(\"Qdialog\")'>Спросить</button>" +
			'</div>' +
			'</div>',
	)

	prepareDialogPosition()

	var input = document.getElementById('Qdialog')
	input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			event.preventDefault()
			ask('Qdialog')
		}
	})

	initSpeechInput(input)
}

function prepareDialogPosition() {
	var $dialog = $('#dialog')

	$dialog.stop(true, true).css({
		right: -$dialog.outerWidth(),
	})

	$(window).on('resize.activeDialog', function () {
		if (!dialogOn) {
			$dialog.css('right', -$dialog.outerWidth())
		}
	})
}

function openDialog() {
	var $dialog = $('#dialog')

	if (!$dialog.length) {
		return
	}

	$dialog.stop(true, false)

	if (dialogOn) {
		$dialog.animate(
			{
				right: -$dialog.outerWidth(),
			},
			350,
		)
		$dialog.attr('aria-hidden', 'true')
		dialogOn = false
		return
	}

	$dialog.animate(
		{
			right: 0,
		},
		350,
	)
	$dialog.attr('aria-hidden', 'false')
	dialogOn = true
}

function ask(questionInput) {
	var input = document.getElementById(questionInput)
	var history = document.getElementById('history')
	var question = input.value.trim()

	if (!question) {
		input.focus()
		return
	}

	if (!dialogOn) {
		openDialog()
	}

	var questionBlock = document.createElement('div')
	questionBlock.className = 'question'
	questionBlock.textContent = question
	history.appendChild(questionBlock)

	var answer = getDialogAnswer(question)
	var answerBlock = document.createElement('div')
	answerBlock.className = 'answer'
	answerBlock.innerHTML = answer

	history.appendChild(answerBlock)
	history.scrollTop = history.scrollHeight
	input.value = ''
	input.focus()
}

function getDialogAnswer(question) {
	if (typeof getAnswer !== 'function') {
		return 'Функция getAnswer() не подключена.'
	}

	return getAnswer(question)
}

function initSpeechInput(input) {
	var voiceInput = document.getElementById('Qmicrophone')

	if (!voiceInput) {
		return
	}

	var apiKey = 'AQVN2qTAw0xo4oqc859JgLWEBBffc93Qz_HR9nII'

	if (apiKey) {
		waitForYandexSpeechkit(function (isReady) {
			if (isReady) {
				initYandexSpeechInput(input, voiceInput, apiKey)
				return
			}

			voiceInput.readOnly = true
			voiceInput.placeholder = 'Микрофон недоступен'
			showYandexSpeechkitLoadAlert()
		})
		return
	}

	voiceInput.readOnly = true
	voiceInput.placeholder = 'Нет API-ключа'
}

function showYandexSpeechkitLoadAlert() {
	if (yandexSpeechkitAlertShown) {
		return
	}

	yandexSpeechkitAlertShown = true
	window.alert(
		'Библиотека Yandex SpeechKit для голосового ввода не загрузилась. ' +
			'Отключите блокировщики рекламы/скриптов для этой страницы и обновите сайт.',
	)
}

function waitForYandexSpeechkit(callback, attempt) {
	var currentAttempt = attempt || 0
	var isReady =
		window.ya && ya.speechkit && ya.speechkit.Textline && ya.speechkit.settings

	if (window.yandexSpeechkitLoadFailed) {
		callback(false)
		return
	}

	if (isReady) {
		callback(true)
		return
	}

	if (currentAttempt >= 50) {
		callback(false)
		return
	}

	setTimeout(function () {
		waitForYandexSpeechkit(callback, currentAttempt + 1)
	}, 100)
}

function initYandexSpeechInput(input, voiceInput, apiKey) {
	ya.speechkit.settings.apikey = apiKey

	new ya.speechkit.Textline(voiceInput.id, {
		apikey: apiKey,
		lang: 'ru-RU',
		model: 'queries',
		onInputFinished: function (text) {
			input.value = text
			voiceInput.value = ''
			input.focus()
		},
	})
}
