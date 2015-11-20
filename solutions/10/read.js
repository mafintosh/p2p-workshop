var scuttleup = require('scuttleup')
var level = require('level')

var db = level('db')
var logs = scuttleup(db)

logs.createReadStream()
  .on('data', function (data) {
    console.log(data.peer + ' #' + data.seq + ': ' + data.entry)
  })
