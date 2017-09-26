require('lookup-multicast-dns/global')
var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')
var toPort = require('hash-to-port')
var register = require('register-multicast-dns')

var me = process.argv[2]
var peers = process.argv.slice(3)

var swarm = topology(toAddress(me), peers.map(toAddress))
var connections = streamSet()
var received = {}

register(me)

swarm.on('connection', function (socket, id) {
  console.log('info> direct connection to', id)

  socket = jsonStream(socket)
  socket.on('data', function (data) {
    if (data.seq <= received[data.from]) return // already received this one
    received[data.from] = data.seq
    console.log(data.username + '> ' + data.message)
    connections.forEach(function (socket) {
      socket.write(data)
    })
  })

  connections.add(socket)
})

var seq = 0
var id = Math.random()

process.stdin.on('data', function (data) {
  var message = data.toString().trim()
  var output = {from: id, seq: seq++, username: me, message: message}
  received[id] = seq // update my own so i dont retransmit
  
  connections.forEach(function (socket) {
    socket.write(output)
  })
})

function toAddress (name) {
  return name + '.local:' + toPort(name)
}
