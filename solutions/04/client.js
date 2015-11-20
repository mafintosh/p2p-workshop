require('lookup-multicast-dns/global')
var net = require('net')
var jsonStream = require('duplex-json-stream')

var username = process.argv[2] || 'guest'
var hostname = (process.argv[3] || 'anon') + '.local'

var socket = jsonStream(net.connect(10000, hostname))

process.stdin.on('data', function (data) {
  var message = data.toString().trim()
  socket.write({username: username, message: message})
})

socket.on('data', function (data) {
  console.log(data.username + '> ' + data.message)
})
