const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {addUser,getuserinroom,removeUser,getUser,isEmpty} =require('./users');
const {addcode,removecode,getcode}=require("./code");
const {getSessionid,addsession,removesession} =require('./session')
const opentok=require("opentok");
const axios=require('axios')
require('dotenv').config();

const cors=require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const OT=new opentok(process.env.API_KEY,process.env.SECRET);

const port=process.env.PORT||5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        // origin: "http://localhost:3000",
        'Access-Control-Allow-Origin':'*',
        origin:"*",
        methods: ["GET", "POST"]
      }
 });
 app.use(express.static(__dirname+ '/public'))

io.on("connection", (socket) => {
  socket.on("join",({name,room,dp},callback)=>{
   
    const {error,user}=addUser({id:socket.id,name,room,dp});
    if(error)
    return callback(error)

    socket.join(user.room);//useris in room
    io.to(user.room).emit('roomData',{
      users:getuserinroom(user.room)
    })
   const {erro,codee}=getcode(user.room);
   if(erro){
    console.log(erro);
   }
   else if(codee){
    
   io.to(user.room).emit('code',{source:codee.source,
  inp:codee.inp,
out:codee.out})
   }
 
    
    callback();
  });
  socket.on('joinwhite',({room})=>{
socket.join(room);

  })
  //whiteboard
  socket.on('canvas-data', (data,room)=> {
    
    io.to(room).emit('canvas-data', data);
      
  })


  // messages
  socket.on('sendMessage',({message},callback)=>{
    const user=getUser(socket.id);

    io.to(user.room).emit('message',{
      user:user.name,text:message});
      callback();
    });
   
  
  // code
socket.on("sendCode",({source,inp,out})=>{
  const user=getUser(socket.id);
if(user!==undefined){
   removecode(user.room);

   addcode(user.room,source,inp,out);

 
  io.to(user.room).emit('code',{
    source:source,
    inp:inp,
    out:out
  });
}
});

  //disconnect
  socket.on("disconnect",()=>{
    const user=removeUser(socket.id);
    if(user){
    const check=isEmpty(user.room);
    
    
      io.to(user.room).emit('roomData',{
        
        users:getuserinroom(user.room)
      })
    
    if(check){
      removecode(user.room);
      removesession(user.room);
    }
  }
  })
});
// app.get('*', (req, res) => {  // have to add in header const path=require('path)
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// });
app.get('/api/temp',(req,res)=>{
  res.send("welcome to codecollab backend");
})
const h='https://codecollab7z2.onrender.com'
setInterval(async()=>{
  const res=await axios.get(`${h}/api/temp`)
  console.log(res.data)
},660000)

app.get('/join',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
})
app.get('/room',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
})
app.post('/token',async(req,res)=>{
  const {room}=req.body;
  OT.createSession((err,session)=>{
    const token1=OT.generateToken(session.sessionId,{role:'publisher',expireTime:new Date().getTime() / 1000 + 1 * 24 * 60 * 60}) //1day
   const {ispresent,sessioninfo}=addsession(session.sessionId,room,token1);

   
    const {sessionId,token}= getSessionid(room);
    res.json({
       apikey:process.env.API_KEY,
       sessionId:sessionId,
       token:token
    })


 })
})

httpServer.listen(port,()=>{
    console.log("server is running")
});
// module.exports=httpServer;