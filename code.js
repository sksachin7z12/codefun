const codes=[];

function removecode(room){
    const ind=codes.findIndex((code)=>{return code.room===room});

    if(ind!==-1){
         codes.splice(ind,1)[0];
    }
    

}

function addcode(room,source,inp,out){
    room=room.trim().toLowerCase();
    const code={room,source,inp,out};
    codes.push(code);
   
}
const getcode=(room)=>{
    if(codes.length===0)
    return {erro:"empty"};

   const codee= codes.find((code)=>code.room===room);
   
   return {codee};
}
module.exports={removecode,addcode,getcode};