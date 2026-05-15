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

function getAnswerText(triad) {
	return '<li>' + big(triad[0] + ' ' + triad[1] + ' ' + triad[2]) + '</li>'
}

function getKnowledgeBase() {
	var base = []

	if (typeof knowledge !== 'undefined' && Array.isArray(knowledge)) {
		base = base.concat(knowledge)
	}

	if (typeof knowledgePhoto !== 'undefined' && Array.isArray(knowledgePhoto)) {
		base = base.concat(knowledgePhoto)
	}

	return base
}

function clearQuestion(question) {
	return question
		.toLowerCase()
		.replace(/[?!.;,]+/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

function getMeaningfulWords(value) {
	var stopWords = [
		'что',
		'чем',
		'где',
		'как',
		'когда',
		'куда',
		'кто',
		'каким',
		'какая',
		'какой',
		'какие',
		'для',
		'при',
		'под',
		'над',
		'перед',
		'после',
		'через',
	]

	return clearQuestion(String(value).replace(/<[^>]+>/g, ' '))
		.split(' ')
		.filter(function (word) {
			return word.length > 2 && stopWords.indexOf(word) === -1
		})
}

function questionContainsSubject(question, subject) {
	var subjectWords = getMeaningfulWords(subject)

	if (subjectWords.length === 0) {
		return false
	}

	return subjectWords.every(function (word) {
		return question.indexOf(word) !== -1
	})
}

function questionContainsPredicate(question, predicate) {
	var predicateWords = getMeaningfulWords(predicate)

	return predicateWords.some(function (word) {
		return question.indexOf(word) !== -1
	})
}

function getAnswer(question) {
	var result = false
	var answers = []
	var knowledgeBase = getKnowledgeBase()

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
				for (var j = 0; j < knowledgeBase.length; j++) {
					if (
						predicate.test(knowledgeBase[j][1]) &&
						(subject.test(knowledgeBase[j][0]) || subject.test(knowledgeBase[j][2]))
					) {
						answers.push(getAnswerText(knowledgeBase[j]))
						result = true
					}
				}

				// 2-й проход: если точного совпадения нет, ищем только по подлежащему.
				if (result === false) {
					for (var k = 0; k < knowledgeBase.length; k++) {
						if (
							subject.test(knowledgeBase[k][0]) ||
							subject.test(knowledgeBase[k][2])
						) {
							answers.push(getAnswerText(knowledgeBase[k]))
							result = true
						}
					}
				}
			}
		}
	}

	if (!result) {
		for (var m = 0; m < knowledgeBase.length; m++) {
			if (
				questionContainsSubject(question, knowledgeBase[m][0]) &&
				questionContainsPredicate(question, knowledgeBase[m][1])
			) {
				answers.push(getAnswerText(knowledgeBase[m]))
				result = true
			}
		}
	}

	if (!result) {
		return 'Ответ не найден.'
	}

	return '<ul class="answer-list">' + answers.join('') + '</ul>'
}
