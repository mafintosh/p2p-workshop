var level = require('level')
var db = level('test.db')

db.get('hello', function (err, value) {
  if (err) throw err
  console.log(value)
})
