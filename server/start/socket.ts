import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('start', { status: 'ascult' })

  socket.on('message', (data) => {
    console.log(data)
  //  socket.emit('message',data)
  })
})