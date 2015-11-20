var scuttleup = require('scuttleup')
var level = require('level')

var db = level('db')
var logs = scuttleup(db)

logs.append('hello')
logs.append('world')
