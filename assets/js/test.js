function getTestApi(overrides) {
	var source = overrides || globalThis

	return {
		knowledge: source.knowledge,
		getAnswer: source.getAnswer,
	}
}

function normalizeTestAnswer(value) {
	return String(value)
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim()
}

var questionTests = [
	{ category: 'назначение', question: 'Чем является промышленный резак для бумаги?' },
	{ category: 'назначение', question: 'Что режет промышленный резак?' },
	{ category: 'назначение', question: 'Как резак режет материалы?' },
	{ category: 'назначение', question: 'Где используется промышленный резак?' },
	{ category: 'назначение', question: 'На что влияет промышленный резак?' },
	{ category: 'качество', question: 'Чем определяется качество конечного изделия?' },
	{ category: 'качество', question: 'Чем определяется ровность нарезанных листов?' },
	{ category: 'устройство', question: 'Чем является современный резак?' },
	{ category: 'устройство', question: 'Как работает механика?' },
	{ category: 'устройство', question: 'Как работает привод?' },
	{ category: 'устройство', question: 'Как работает измерительная система?' },
	{ category: 'устройство', question: 'Как работает безопасность?' },
	{ category: 'изображения', question: 'Где показан общий вид промышленного гильотинного резака?' },
	{ category: 'операции', question: 'В чём состоит главная задача резака?' },
	{ category: 'операции', question: 'Что разрезает резак?' },
	{ category: 'операции', question: 'Что выполняет резак?' },
	{ category: 'операции', question: 'Что даёт печатная машина?' },
	{ category: 'операции', question: 'Что даёт резак?' },
	{ category: 'история', question: 'Когда появилась потребность в ровной резке бумаги?' },
	{ category: 'история', question: 'Чем стала бумага?' },
	{ category: 'история', question: 'Как резали бумагу?' },
	{ category: 'история', question: 'Что сделал рост тиражей?' },
	{ category: 'история', question: 'Чем стало появление специализированной машины?' },
	{ category: 'история', question: 'Что напоминал принцип специализированной машины?' },
	{ category: 'история', question: 'Чем фиксируется стопа бумаги?' },
	{ category: 'история', question: 'Что совершает нож?' },
	{ category: 'история', question: 'По чему движется нож?' },
	{ category: 'история', question: 'Кто разработал бумагорезательную машину гильотинного типа?' },
	{ category: 'история', question: 'Кто запатентовал бумагорезательную машину гильотинного типа?' },
	{ category: 'история', question: 'Когда был оформлен патент?' },
	{ category: 'история', question: 'Что позволила идея?' },
	{ category: 'история', question: 'Что предполагала идея?' },
	{ category: 'история', question: 'Чем служит контрнож?' },
	{ category: 'история', question: 'Чем служит марзан?' },
	{ category: 'история', question: 'Чем стала идея?' },
	{ category: 'развитие', question: 'Что совершенствовало дальнейшее развитие?' },
	{ category: 'развитие', question: 'К чему перешли производители?' },
	{ category: 'развитие', question: 'Что добавились к промышленным резакам?' },
	{ category: 'развитие', question: 'Что добавилась к промышленным резакам?' },
	{ category: 'изображения', question: 'Где показаны ранние конструкции бумагорезательных машин?' },
	{ category: 'применение', question: 'Где используются промышленные резаки?' },
	{ category: 'применение', question: 'Для чего типографии используют резак?' },
	{ category: 'применение', question: 'Для чего переплётные цеха используют резак?' },
	{ category: 'применение', question: 'Что формирует резак?' },
	{ category: 'применение', question: 'Для чего производство упаковки использует резак?' },
	{ category: 'применение', question: 'Для чего рекламное производство использует резак?' },
	{ category: 'применение', question: 'Что используют офисные центры?' },
	{ category: 'применение', question: 'Как работают меньшие модели резаков?' },
	{ category: 'применение', question: 'Чем являются меньшие модели резаков?' },
	{ category: 'изображения', question: 'Где показана резка стопы бумаги?' },
	{ category: 'процесс', question: 'Чем зафиксирован материал?' },
	{ category: 'процесс', question: 'Как выполняется силовой рез?' },
	{ category: 'конструкция', question: 'Чем является основа резака?' },
	{ category: 'конструкция', question: 'Для чего нужна жёсткость?' },
	{ category: 'конструкция', question: 'Когда возникают микроперекосы?' },
	{ category: 'конструкция', question: 'Что даёт малый прогиб?' },
	{ category: 'конструкция', question: 'Где расположена рабочая поверхность?' },
	{ category: 'конструкция', question: 'Чем является рабочая поверхность?' },
	{ category: 'конструкция', question: 'Что может иметь стол?' },
	{ category: 'конструкция', question: 'Что облегчает воздушная подушка?' },
	{ category: 'задний упор', question: 'Чем является задний упор?' },
	{ category: 'задний упор', question: 'Как задний упор позиционирует стопу?' },
	{ category: 'задний упор', question: 'Что задаёт задний упор?' },
	{ category: 'задний упор', question: 'Что вводит оператор?' },
	{ category: 'задний упор', question: 'Когда перемещается упор?' },
	{ category: 'задний упор', question: 'Куда упирается стопа?' },
	{ category: 'задний упор', question: 'Когда фиксируется стопа?' },
	{ category: 'задний упор', question: 'Чем движется современный упор?' },
	{ category: 'задний упор', question: 'Чем контролируется позиция упора?' },
	{ category: 'задний упор', question: 'Во что превращает резак задний упор?' },
	{ category: 'прижим', question: 'Когда нужно зафиксировать стопу?' },
	{ category: 'прижим', question: 'Когда смещается незафиксированная стопа?' },
	{ category: 'прижим', question: 'Что создаёт смещение листов?' },
	{ category: 'прижим', question: 'Что фиксирует прижим?' },
	{ category: 'прижим', question: 'Чем является прижим?' },
	{ category: 'прижим', question: 'Откуда опускается прижим?' },
	{ category: 'прижим', question: 'Что удерживает прижим?' },
	{ category: 'прижим', question: 'Что имеют промышленные модели?' },
	{ category: 'прижим', question: 'Что может менять оператор?' },
	{ category: 'прижим', question: 'Под что настраивается усилие прижима?' },
	{ category: 'нож', question: 'Чем является нож?' },
	{ category: 'нож', question: 'Где установлен нож?' },
	{ category: 'нож', question: 'По чему движется нож?' },
	{ category: 'нож', question: 'Чем обеспечивается качественный рез?' },
	{ category: 'нож', question: 'Как работает нож?' },
	{ category: 'нож', question: 'Что снижает косой рез?' },
	{ category: 'нож', question: 'Что улучшает косой рез?' },
	{ category: 'привод', question: 'Каким может быть привод?' },
	{ category: 'привод', question: 'Что обеспечивает электрика?' },
	{ category: 'привод', question: 'За что отвечает гидравлика?' },
	{ category: 'привод', question: 'Что используют тяжёлые промышленные машины?' },
	{ category: 'привод', question: 'Что определяет стабильность привода?' },
	{ category: 'привод', question: 'Что должен давать одинаковый цикл?' },
	{ category: 'привод', question: 'Где должен сохраняться одинаковый результат?' },
	{ category: 'панель управления', question: 'Что имеет современный резак?' },
	{ category: 'панель управления', question: 'Что включает пользовательский интерфейс?' },
	{ category: 'панель управления', question: 'Что может сохранять оператор?' },
	{ category: 'панель управления', question: 'Что может задавать оператор?' },
	{ category: 'панель управления', question: 'Что может повторять оператор?' },
	{ category: 'панель управления', question: 'Что снижает программирование реза?' },
	{ category: 'панель управления', question: 'Для чего важна память программ?' },
	{ category: 'изображения', question: 'Где показана панель управления промышленного резака?' },
	{ category: 'рабочий цикл', question: 'Чем является рабочий цикл гильотинного резака?' },
	{ category: 'рабочий цикл', question: 'Что укладывает оператор?' },
	{ category: 'рабочий цикл', question: 'По чему оператор выравнивает стопу?' },
	{ category: 'рабочий цикл', question: 'Как задаётся размер реза?' },
	{ category: 'рабочий цикл', question: 'Куда подаётся стопа?' },
	{ category: 'рабочий цикл', question: 'Когда опускается прижим?' },
	{ category: 'рабочий цикл', question: 'Что выполняет нож?' },
	{ category: 'рабочий цикл', question: 'Через что проходит линия реза?' },
	{ category: 'рабочий цикл', question: 'Куда доходит нож?' },
	{ category: 'рабочий цикл', question: 'Когда возвращается нож?' },
	{ category: 'рабочий цикл', question: 'Когда поднимается прижим?' },
	{ category: 'рабочий цикл', question: 'Что убирает оператор?' },
	{ category: 'рабочий цикл', question: 'Чем достигается точность?' },
	{ category: 'рабочий цикл', question: 'За что ценится промышленный резак?' },
	{ category: 'безопасность', question: 'Что создаёт промышленная резка?' },
	{ category: 'безопасность', question: 'Что способен сделать нож?' },
	{ category: 'безопасность', question: 'Что способен сделать прижим?' },
	{ category: 'безопасность', question: 'Что имеют современные машины?' },
	{ category: 'безопасность', question: 'Что запускает двуручный пуск?' },
	{ category: 'безопасность', question: 'Что требует двуручный пуск?' },
	{ category: 'безопасность', question: 'Что исключает двуручный пуск?' },
	{ category: 'безопасность', question: 'Где расположен защитный экран?' },
	{ category: 'безопасность', question: 'Что обеспечивает аварийный стоп?' },
	{ category: 'безопасность', question: 'Что должен усвоить обучаемый?' },
	{ category: 'безопасность', question: 'Чем не является резак?' },
	{ category: 'безопасность', question: 'К чему приводит нарушение процедуры?' },
	{ category: 'изображения', question: 'Где показан двуручный пуск?' },
	{ category: 'материалы', question: 'На что рассчитан промышленный резак?' },
	{ category: 'материалы', question: 'Что режет промышленный резак?' },
	{ category: 'материалы', question: 'Что ухудшают слишком жёсткие материалы?' },
	{ category: 'материалы', question: 'Что могут оставлять самоклеящиеся материалы?' },
	{ category: 'материалы', question: 'Что ухудшает клей на ноже?' },
	{ category: 'материалы', question: 'Что даёт слишком высокая стопа?' },
	{ category: 'материалы', question: 'Что даёт неверное усилие прижима?' },
	{ category: 'материалы', question: 'Что даёт плохая поверхность?' },
	{ category: 'дефекты', question: 'Что помогают получить типичные проблемы?' },
	{ category: 'дефекты', question: 'Чем является косина?' },
	{ category: 'дефекты', question: 'Из-за чего возникает косина?' },
	{ category: 'дефекты', question: 'Из-за чего возникает волна листов?' },
	{ category: 'дефекты', question: 'Из-за чего возникает сдвиг листов?' },
	{ category: 'дефекты', question: 'Из-за чего возникает рваная кромка?' },
	{ category: 'дефекты', question: 'Из-за чего возникают замятия по краю?' },
	{ category: 'обучение', question: 'Чем является промышленный резак?' },
	{ category: 'обучение', question: 'Что должен выполнять оператор?' },
	{ category: 'обучение', question: 'Что не должен делать оператор?' },
	{ category: 'обучение', question: 'Каким кажется станок?' },
	{ category: 'обучение', question: 'Чем является простота станка?' },
	{ category: 'обучение', question: 'Что переоценивает новичок?' },
	{ category: 'обучение', question: 'Что недооценивает новичок?' },
	{ category: 'обучение', question: 'Что закрепляет обучение?' },
]

function createKnowledgeReport(overrides) {
	var api = getTestApi(overrides)
	var results = []
	var failures = []

	for (var i = 0; i < questionTests.length; i++) {
		var test = questionTests[i]
		var question = test.question
		var actual = api.getAnswer(question)
		var normalizedAnswer = normalizeTestAnswer(actual)
		var passed =
			normalizedAnswer !== '' &&
			normalizedAnswer !== 'ответ не найден.' &&
			normalizedAnswer !== 'введите вопрос.'
		var result = {
			number: i + 1,
			passed: passed,
			category: test.category,
			question: question,
			actual: actual,
		}

		results.push(result)

		if (!passed) {
			failures.push(result)
		}
	}

	return {
		total: results.length,
		passed: results.length - failures.length,
		failed: failures.length,
		results: results,
		failures: failures,
		generatedAt: new Date().toISOString(),
	}
}

function runKnowledgeTests() {
	var report = createKnowledgeReport()

	console.group('Knowledge tests')
	console.log('Всего:', report.total)
	console.log('Прошло:', report.passed)
	console.log('Не прошло:', report.failed)
	console.table(
		report.failures.map(function (failure) {
			return {
				number: failure.number,
				category: failure.category,
				question: failure.question,
				actual: failure.actual,
			}
		}),
	)
	console.groupEnd()

	return report
}

if (
	typeof require !== 'undefined' &&
	typeof module !== 'undefined' &&
	require.main === module
) {
	startNodeTestServer()
}

function startNodeTestServer() {
	var fs = require('fs')
	var http = require('http')
	var path = require('path')
	var vm = require('vm')
	var childProcess = require('child_process')

	var args = process.argv.slice(2)
	var portArg = args.find(function (arg) {
		return arg.indexOf('--port=') === 0
	})
	var startPort = Number(
		portArg ? portArg.replace('--port=', '') : process.env.TEST_PORT || 5600,
	)
	var shouldOpen = args.indexOf('--no-open') === -1
	var jsDir = __dirname
	var htmlPath = path.join(jsDir, 'test.html')
	var sandbox = {
		console: console,
		globalThis: null,
	}

	sandbox.globalThis = sandbox
	vm.createContext(sandbox)

	;['endings.js', 'knowledge.js', 'answer-engine.js'].forEach(function (fileName) {
		var filePath = path.join(jsDir, fileName)
		var source = fs.readFileSync(filePath, 'utf8')
		vm.runInContext(source, sandbox, { filename: filePath })
	})

	var report = createKnowledgeReport(sandbox)
	var reportJson = JSON.stringify(report)
	var server = http.createServer(function (request, response) {
		var pathname = new URL(request.url, 'http://127.0.0.1').pathname

		if (pathname === '/report.json') {
			send(response, 200, 'application/json; charset=utf-8', reportJson)
			return
		}

		if (pathname === '/' || pathname === '/index.html' || pathname === '/test.html') {
			send(
				response,
				200,
				'text/html; charset=utf-8',
				fs.readFileSync(htmlPath, 'utf8'),
			)
			return
		}

		send(response, 404, 'text/plain; charset=utf-8', 'Not found')
	})

	listenOnFreePort(server, startPort, function (port) {
		var url = 'http://127.0.0.1:' + port + '/test.html'
		console.log('Сервер тестов запущен: ' + url)
		console.log(
			'Всего: ' +
				report.total +
				', прошло: ' +
				report.passed +
				', не прошло: ' +
				report.failed,
		)
		console.log('JSON-отчёт: http://127.0.0.1:' + port + '/report.json')
		console.log('Остановить сервер: Ctrl+C')

		if (shouldOpen) {
			openUrl(url, childProcess)
		}
	})

	function send(response, status, contentType, body) {
		response.writeHead(status, {
			'Content-Type': contentType,
			'Cache-Control': 'no-store',
		})
		response.end(body)
	}

	function listenOnFreePort(serverInstance, port, onReady) {
		serverInstance.once('error', function (error) {
			if (error.code === 'EADDRINUSE') {
				listenOnFreePort(serverInstance, port + 1, onReady)
				return
			}

			throw error
		})

		serverInstance.listen(port, '127.0.0.1', function () {
			onReady(serverInstance.address().port)
		})
	}

	function openUrl(url, childProcessModule) {
		var command

		if (process.platform === 'win32') {
			command = 'start "" "' + url + '"'
		} else if (process.platform === 'darwin') {
			command = 'open "' + url + '"'
		} else {
			command = 'xdg-open "' + url + '"'
		}

		childProcessModule.exec(command, function () {})
	}
}
