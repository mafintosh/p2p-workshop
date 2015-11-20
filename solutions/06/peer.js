var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')

var username = process.argv[2]
var me = process.argv[3]
var peers = process.argv.slice(4)

var swarm = topology(me, peers)
var connections = streamSet()

swarm.on('connection', function (socket, id) {
  console.log('info> new connection from', id)

  socket = jsonStream(socket)
  socket.on('data', function (data) {
    console.log(data.username + '> ' + data.message)
  })

  connections.add(socket)
})

process.stdin.on('data', function (data) {
  connections.forEach(function (socket) {
    var message = data.toString().trim()
    socket.write({username: username, message: message})
  })
})
