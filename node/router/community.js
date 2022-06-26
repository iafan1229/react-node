const express = require('express');
//라우터 불러오기
const router = express.Router();
const { Post } = require('../model/postSchema')

router.post('/write', (req, res)=> {
  const save = new Post({
      title: req.body.title,
      comment: req.body.comment
    })
    
    save.save()
    .then(()=>{
      res.status(200).json({success:true})
    })
    .catch((err)=>{
      res.status(400).json({success:false})
    })
})

router.post('/read', (req, res)=>{
  Post.find().exec().then(doc=>{
    res.status(200).json({success:true, list: doc})
  })
})

router.post('/edit', (req, res)=>{
  
  Post.updateOne({title: req.body.title}, {$set: {
    title: req.body.title,
    dataNum : req.body.dataNum
  }})
  .then((result)=>{
    res.status(200).json({success: true})
  })
  .catch((err)=>{
    res.status(400).json({success:false})
  })
})

router.post('/update', (req, res)=>{
  const temp = {
    title: req.body.title,
    comment: req.body.comment
  }
  Post.updateOne({dataNum: Number(req.body.dataNum)}, {$set: temp})
  .then(()=>{
    res.status(200).json({success:true})
  })
})

router.post('/delete', (req,res)=>{
  Post.deleteOne({dataNum: Number(req.body.dataNum)})
  .exec().then(()=>{
    res.status(200).json({success:true})
  })
})
module.exports = router;