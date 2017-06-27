// Used to talk to the mongoDB using Mongoose

var express = require('express');
var router = express.Router();

//Helper for authorization
const authorized = require('./authCheck')

// Initiate mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs591/')
const db = mongoose.connection
db.once('open', function () {
  console.log('Connection successful.')
})

// Define schema as celeb
const Schema = mongoose.Schema
const celebSchema = new Schema({
    name: String
})
const celeb = mongoose.model('celeb', celebSchema)


// GET -- Fetch all celebrities
router.get('/', function (req, res, next) {
	celeb.find({}, function (err, results) {
	  	let names = []
	  	for (i = 0; i < results.length; i++) {
	  		names[i] = results[i].name
	    }
	    res.json(names);
	})
})

// POST -- Add new celebrity
router.post('/', function(req, res, next) {
    let name = req.body.name

    celeb.findOne({name: name}, function (err, result) {
		if(result == null) {
			const newCeleb = new celeb ({name: name});
			newCeleb.save(function(err) {
				if (err) {res.send(err)}
				else {res.send (newCeleb)}
		    });
		}
		else {res.json(result)}
    })
})

// DELETE -- Remove all celebrities (needs auth)
router.delete('/', authorized, function(req, res, next) {
    celeb.remove({}, function(err) { 
   		console.log('Collection removed.')
   		res.send('Collection removed.') 
	})
})

module.exports = router;