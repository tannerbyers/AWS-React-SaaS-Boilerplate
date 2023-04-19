const app = require('./expressServer')
const port = 3000

app.listen(port)
console.info(`listening on http://localhost:${port}`)