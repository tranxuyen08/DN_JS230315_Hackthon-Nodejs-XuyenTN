const express = require('express')
const route = express.Router()
const path = require('path')
const fs = require('fs')

const postPath = path.join(__dirname, "../../data/posts.json")

route.get('/', (req, res) => {
  fs.readFile(postPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const convertPostData = JSON.parse(data)
    return res.status(200).json(convertPostData)
  })
})
// .post('/create' , (req,res) =>{
//   fs.readFile(postPath, (err,data) =>{
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     const convertPostData = JSON.parse(data)
//     const newPost = {
//       userId : req.body.userId,
//       id: convertPostData[convertPostData.length - 1].id + 1,
//       // body: req.body.body,
//       title: req.body.title
//     }
//     console.log(newPost);
//     // const checkPost = convertPostData.find((item) => item.id == newPost.id)
//     // if (!checkPost) {
//     //   convertPostData.push(newPost)
//     //   fs.writeFile(postPath, JSON.stringify(convertPostData), 'utf-8', (err) => {
//     //     if (err) {
//     //       console.error(err);
//     //       res.status(500).send('Internal Server Error');
//     //       return;
//     //     }
//     //     res.status(200).json({ message: "Create successfully" });
//     //     return
//     //   })
//     // }
//   })
// })

route
.route('/:id')
.get((req,res) =>{
  fs.readFile(postPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const convertPostData = JSON.parse(data)
    const post = convertPostData.find((item) => item.id == req.params.id)
    res.status(200).json(post)
  })
})
.delete((req,res) =>{
  fs.readFile(postPath,'utf-8',(err,data) =>{
    if(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    const convertPostData = JSON.parse(data)
    console.log(convertPostData);

    console.log(111111,req.params?.id);
    const newData = convertPostData.filter((item) => Number(item.id) != Number(req.params?.id))
    fs.writeFile(postPath, JSON.stringify(newData), 'utf-8', (err) => {
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