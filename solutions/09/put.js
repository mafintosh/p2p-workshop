var level = require('level')
var db = level('test.db')

db.put('hello', 'world')
