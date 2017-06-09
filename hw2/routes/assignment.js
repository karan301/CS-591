const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs591/hw2/')
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
router.get('/', function (req, res, next) {
  len.find({}, function (err, results) {
    res.json(results);
  })

})

//GET Fetch single user
router.get('/:_name', function (req, res, next) {
    let name = req.params._name
    len.findOne({name: name}, function (err, result) {
	console.log(result)
	if(result == null) {
	    const aString = new len ( {name: name, length : name.length})
	    aString.save(function(err) {
		if (err) {res.send(err)}
		else {res.send (aString)}
    })
	}
	else {res.json(result)}
  })
})

// POST Create a new user
router.post('/', function(req, res, next) {
  console.log(req.body)
    let name = req.body.name

    len.findOne({name: name}, function (err, result) {
	if(result == null) {
            const aString = new len ( {name: name, length : name.length})
            aString.save(function(err) {
                if (err) {res.send(err)}
                else {res.send (aString)}
    })
        }
        else {res.json(result)}
    })
})

//DELETE Delete the specified user
router.delete('/:_name', function (req, res, next) {
    len.findOneAndRemove(req.params._name, function (err, result) {
    if(result == null) {res.json({message: 'String not found.'});}
    else {res.json({message: 'Success'});}
  })
  });

module.exports = router;
