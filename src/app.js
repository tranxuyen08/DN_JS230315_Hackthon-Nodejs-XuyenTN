const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const port = 8000;
const bodyParser = require("body-parser")
const addPlayerPath = require('./routes/index.route');
const playingGame = require('./routes/playGame.route')
// const htmlPlayingGame = require('../public/playGame.html')
const playingGamePath = path.join(__dirname, "../public/playGame.html")

app.use(bodyParser.json())
app.use(express.urlencoded());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/playing-game/:id', (req,res) =>{
  res.status(200).sendFile(playingGamePath)
})

app.use('/playing-game', playingGame)
app.use('/add-player',addPlayerPath)



app.listen(port, () =>{
  console.log(`Sever đang được chạy ở http://localhost:${port}`)
})