const express = require('express')
const app = express()
const port = 3000

require('./routes/card.routes')(app);

app.get('/', (req, res) => {
  res.send('Hello cards!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
