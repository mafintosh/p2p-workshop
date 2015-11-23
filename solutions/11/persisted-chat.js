require('lookup-multicast-dns/global')
var topology = require('fully-connected-topology')
var register = require('register-multicast-dns')
var toPort = require('hash-to-port')
var level = require('level')
var scuttleup = require('scuttleup')

var me = process.argv[2]
var peers = process.argv.slice(3)

var db = level(me + '.db')
var username = me
var logs = scuttleup(db, {valueEncoding: 'json'})
var swarm = topology(toAddress(username), peers.map(toAddress))

register(me)

swarm.on('connection', function (socket, id) {
  console.log('info> direct connection to', id)
  socket.pipe(logs.createReplicationStream({live: true})).pipe(socket)
})

logs.createReadStream({live: true})
  .on('data', function (data) {
    console.log(data.entry.username + '> ' + data.entry.message)
  })

process.stdin.on('data', function (data) {
  logs.append({username: me, message: data.toString().trim()})
})

function toAddress (name) {
  return name + '.local:' + toPort(name)
}
