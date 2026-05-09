(function () {
	var form = document.getElementById('question-form')
	var input = document.getElementById('question-input')
	var output = document.getElementById('answer-output')
	var history = document.getElementById('question-history')
	var clearButton = document.getElementById('clear-dialog')

	function renderAnswer(question) {
		var answer = getAnswer(question)
		output.innerHTML = answer

		if (question.trim()) {
			var item = document.createElement('li')
			item.innerHTML = '<b>' + escapeHtml(question) + '</b><br>' + answer
			history.prepend(item)
		}
	}

	function escapeHtml(value) {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault()
		renderAnswer(input.value)
	})

	clearButton.addEventListener('click', function () {
		input.value = ''
		output.textContent = 'Ответ появится здесь.'
		history.innerHTML = ''
		input.focus()
	})

	document.querySelectorAll('[data-question]').forEach(function (button) {
		button.addEventListener('click', function () {
			input.value = button.dataset.question
			renderAnswer(input.value)
		})
	})

})()
