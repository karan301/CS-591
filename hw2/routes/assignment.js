const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sample/food/')
const db = mongoose.connection
db.once('open', function () {
  console.log('Connection successful.')
})

const Schema = mongoose.Schema
const stringSchema = new Schema({
    name: String,
    length: String
})
const len = mongoose.model('len', stringSchema)


//GET Fetch all users
router.get('/db', function (req, res, next) {
  len.find({}, function (err, results) {
    res.json(results);
  })

})

// GET Method
router.get('/:name', function (req, res, next) {
    let theGet = req.params.name
    res.json({string: theGet, length: theGet.length})
});

// POST Method
router.post('/', function (req, res, next) {
    let thePost = req.body.testing
    res.json({string: thePost, length: thePost.length})
});

module.exports = router;