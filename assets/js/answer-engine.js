// answer-engine.js

function getEnding(word) {
	for (var j = 0; j < endings.length; j++) {
		if (word.substring(word.length - endings[j][0].length) === endings[j][0]) {
			return j
		}
	}

	return -1
}

function small(str) {
	if (!str) return ''
	return str.substring(0, 1).toLowerCase() + str.substring(1)
}

function big(str) {
	if (!str) return ''
	return str.substring(0, 1).toUpperCase() + str.substring(1)
}

function clearQuestion(question) {
	return question
		.toLowerCase()
		.replace(/[?!.;,]+/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

function getAnswer(question) {
	var result = false
	var answer = ''

	question = clearQuestion(question)

	if (!question) {
		return 'Введите вопрос.'
	}

	var words = question.split(' ')

	for (var i = 0; i < words.length; i++) {
		var ending = getEnding(words[i])

		if (ending >= 0) {
			words[i] =
				words[i].substring(0, words[i].length - endings[ending][0].length) +
				endings[ending][1]

			var predicate = new RegExp(words[i], 'i')

			var subjectString = words.slice(i + 1).join('.*')

			if (subjectString.length > 2) {
				var subject = new RegExp('.*' + subjectString + '.*', 'i')

				// 1-й проход: ищем совпадение по сказуемому и подлежащему.
				for (var j = 0; j < knowledge.length; j++) {
					if (
						predicate.test(knowledge[j][1]) &&
						(subject.test(knowledge[j][0]) || subject.test(knowledge[j][2]))
					) {
						answer += big(
							knowledge[j][0] +
								' ' +
								knowledge[j][1] +
								' ' +
								knowledge[j][2] +
								'. ',
						)
						result = true
					}
				}

				// 2-й проход: если точного совпадения нет, ищем только по подлежащему.
				if (result === false) {
					for (var k = 0; k < knowledge.length; k++) {
						if (
							subject.test(knowledge[k][0]) ||
							subject.test(knowledge[k][2])
						) {
							answer += big(
								knowledge[k][0] +
									' ' +
									knowledge[k][1] +
									' ' +
									knowledge[k][2] +
									'. ',
							)
							result = true
						}
					}
				}
			}
		}
	}

	if (!result) {
		answer = 'Ответ не найден.'
	}

	return answer
}
