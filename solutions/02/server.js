var net = require('net')
var streamSet = require('stream-set')

var clients = streamSet()
var server = net.createServer(function (socket) {
  console.log('new connection')
  clients.forEach(function (client) {
    socket.on('data', function (data) {
      client.write(data)
    })
    client.on('data', function (data) {
      socket.write(data)
    })
  })
  clients.add(socket)
})

server.listen(10000)
