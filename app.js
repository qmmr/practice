const http = require('http')

const server = http.createServer((req, res) => {
	const method = req.method
	const url = req.url

	if (url === '/' && method === 'GET') {
		// handle requests to http://localhost:3000
		res.setHeader('Content-Type', 'text/html')
		res.write(`<html>
		<head>
		<title>Learning node.js</title>
		</head>
		<body>
		<h1>Welcome to node.js learning experience!</h1>
		<form method="POST" action="/create-user">
		<input type="text" name="user" />
		<button type="submit">Create user</button>
		</form>
		</body>
		</html>`)
		return res.end()
	} else if (url === '/users' && method === 'GET') {
		res.setHeader('Content-Type', 'text/html')
		res.write(`<html>
		<head>
		<title>Learning node.js</title>
		</head>
		<body>
		<ul>
		<li>User 1</li>
		<li>User 2</li>
		<li>User 3</li>
		</ul>
		</body>
		</html>`)
		return res.end()
	} else if (url === '/create-user' && method === 'POST') {
		// create user and redirect to "home"
		const content = []

		req.on('data', chunk => {
			content.push(chunk)
		})

		req.on('end', () => {
			const parsedBody = Buffer.concat(content).toString()
			const [ , username ] = parsedBody.split('=')
			console.log('username: ', username, ' have been created!')
			res.statusCode = 302
			res.setHeader('Location', '/')
			return res.end()
		})
	}
})

server.listen(3000, () => {
	console.log('server is listening on port 3000...')
})
