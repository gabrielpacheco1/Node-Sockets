const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket= io() //este es el que mantiene el estado de conexion con el servidor

socket.on('connect', () => { //conexion del lado del cliente
    console.log('Conectado')
    lblOffline.style.display= 'none'
    lblOnline.style.display= ''
})

socket.on('disconnect', () => { //desconexion del lado del cliente
    console.log('Desconectado del server')
    lblOnline.style.display= 'none'
    lblOffline.style.display= ''
})

socket.on('enviar-mensaje', (payload) => { //escucha evento
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje= txtMensaje.value
    
    payload= {
        mensaje,
        id: 'abc123',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id)
    }) //envia el mensaje al servidor
})
