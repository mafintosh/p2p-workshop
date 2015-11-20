var topology = require('fully-connected-topology')
var me = process.argv[2]
var peers = process.argv.slice(3)

var swarm = topology(me, peers)

swarm.on('connection', function (socket, id) {
  console.log('new connection from', id)
})
