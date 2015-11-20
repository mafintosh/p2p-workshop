var net = require('net')

var server = net.createServer(function (socket) {
  console.log('new connection')
  socket.on('data', function (data) {
    socket.write(data)
  })
})

server.listen(10000)
