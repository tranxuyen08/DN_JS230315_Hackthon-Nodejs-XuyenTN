const express = require('express')
const route = express.Router()
const path = require('path');
const fs = require('fs')

const addUser = path.join(__dirname, "../../public/index.html")
// const addDataPath = path.join(__dirname,"../../public/index.js")
const dbJSON = path.join(__dirname, '../../data/data-player.json')
route
// .get('/', (req, res) => {
//   fs.readFile(addUser, 'utf-8', (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     const convertData = JSON.parse(data)
//     res.status(200).json(convertData);
//   })
// })
route.post('/', (req, res) => {
  fs.readFile(dbJSON, (err, data) => {
    convertData = JSON.parse(data)
    if (convertData = []) {
      const game = [

        {
          id: req.body.id,
          players: [
            {
              player1: req.body.player1,
              point: 0
            },
            {
              player2: req.body.player2,
              point: 0
            },
            {
              player3: req.body.player3,
              point: 0
            },
            {
              player4: req.body.player4,
              point: 0
            }
          ],
          rounds: []
        }
      ]

      fs.writeFile(dbJSON, JSON.stringify(game), 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
        res.status(200).json(game);
      })
    }

  })

})

module.exports = route