const express = require('express')
const route = express.Router()
const path = require('path')
const fs = require('fs')

const userPath = path.join(__dirname, '../../data/users.json')

route.get('/', (req, res) => {
  fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const convertData = JSON.parse(data)
    res.status(200).json(convertData)
  })
})
route.post('/create', (req, res) => {
  fs.readFile(userPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const convertData = JSON.parse(data)

    const newUser = {
      id: convertData[convertData.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      address: {
        street: req.body.address.street,
        suite: req.body.address.suite,
        city: req.body.address.city,
        zipcode: req.body.address.zipcode,
        geo: {
          lat: req.body.address.geo.lat,
          lng: req.body.address.geo.lng
        }
      },
      phone: req.body.phone,
      website: req.body.website,
      company: {
        name: req.body.company.name,
        catchPhrase: req.body.company.catchPhrase,
        bs: req.body.company.bs,
      }
    }
    const user = convertData.find((item) => item.id == newUser.id)
    if (!user) {
      convertData.push(newUser)
      fs.writeFile(userPath, JSON.stringify(convertData), 'utf-8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json({ message: "Create successfully" });
        return
      })
    }
    res.status(400).json({ message: "Todo already exists" });
  })
})

route
  .route('/:id')
  .get((req, res) => {
    fs.readFile(userPath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const convertData = JSON.parse(data)
      const user = convertData.find((item) => item.id == req.params.id)
      res.status(200).json(user)
    })
  })
  .put((req, res) => {
    fs.readFile(userPath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const convertData = JSON.parse(data)
      const indexUser = convertData.findIndex((item) => item.id == req.params.id)
      if (convertData == -1) {
        res.status(404).send('User not found');
        return;
      }
      convertData[indexUser] = { ...convertData[indexUser], ...req.body }
      console.log(' convertData[indexUser]', convertData[indexUser]);
      fs.writeFile(userPath, JSON.stringify(convertData), "utf-8", (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(convertData);
      })
    })
  })
  .delete((req,res) =>{
    fs.readFile(userPath,'utf-8',(err,data) =>{
      if(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
      const convertData = JSON.parse(data)
      const newData = convertData.filter((item) => item.id != req.params.id)
      fs.writeFile(userPath, JSON.stringify(newData), 'utf-8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(newData)
      })
    })
  })

module.exports = route