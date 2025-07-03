const express =require('express')
const cors=require('cors')
const http=require('http')
const {Server}=require('socket.io')
const handleSocketConnection=require('./socketHandler.js')
const LocationRoute = require('./routes/LocationRoute.js')

const app=express()
app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    credentials:true,
}));


const server = http.createServer(app);
const io=new Server(server,{
    cors:{
         origin:'*',
        methods:['GET','POST'],
        credentials:true,
    }
});

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello from the server!")
})

app.use('api/locations',LocationRoute)

io.on('connection',(socket)=>{
    console.log('A user connected:',socket?.id);

    handleSocketConnection(socket,io);

    socket.on('disconnect',()=>{
        console.log('User disconnected',socket.id);
    })
});

const PORT = process.env.PORT||4000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})