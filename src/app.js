const express = require("express")
const app = express()
const port = 8000
const bodyParser = require('body-parser')

const userData = require('./routes/user.route')
const postData = require('./routes/post.route')


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use('/', userData)
app.use('/api/v1/user', userData)

app.use('/api/v1/posts',postData)
// app.use('/api/v1/user',postData)

app.listen(port, () => {
  console.log(`Sever đang được chạy ở http://localhost:${port}`)
})