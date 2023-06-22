const express = require('express')
const route = express.Router()
const path = require('path');
const fs = require('fs')

const playGame = path.join(__dirname, "../../public/playGame.html")
const database = path.join(__dirname,"../../data/data-player.json")

route.get('/',(req, res)=>{
  res.status(200).sendFile(playGame)
})
route
.route('/:id')
.get((req,res) =>{
  fs.readFile(playGame, (err,data) =>{
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const convertData = JSON.parse(data)
    console.log(convertData);
    res.status(200).sendFile(convertData)
  })
})


module.exports = route