// CONFIGURACION
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')

// SOCKET (interacion con el modelo movie)
const socket = require('socket.io')  
const Movie = require('./models/movie.model')

// requerir archivo de configuracion
require('./config/mongoose.config')


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// middleware que agregar cookies a la solicitud
app.use(cookieParser())

//CORS 
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))


// IMPORTAR LAS RUTAS DE NUESTRO SERVIDOR BACK-END
const Rutas = require('./routes/movie.routes')
Rutas(app)
const rutasUsuarios = require('./routes/user.routes')
rutasUsuarios(app)


const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// configuracion cabecera socket
const io = socket(server, {
    cors:{
        origin:'*',
        methods:['GET', 'POST']
    }
})


io.on('connection', (socket)=>{
    console.log(" usuario conectado",socket.id)
    socket.on("deleteMovie", (payload)=>{
        console.log("payload", payload)
        Movie.deleteOne({_id:payload})
        .then((res)=>{
            io.emit('movieDeleted', payload)
        }).catch((err)=>{
            console.log(err, "error al borrar movie")
        })
    })

    socket.on('desconectar', (socket)=>{
        console.log(`el usuario con id ${socket.id} acaba de desconectarse`)
    })
 

})