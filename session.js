const sessions=[];
const addsession=(sessionId,room,token)=>{
    const ispresent=sessions.find((session)=>session.room===room);
   if(ispresent){
    if(diff_hours(ispresent.date,new Date())>21){
        removesession(ispresent.room);
        
     }
   else{
        return {ispresent:true}
    }
    }
    const session={room:room,sessionId:sessionId,token:token,date:new Date()};
    sessions.push(session);
  
    return {sessioninfo:session}
}
const removesession=(room)=>{
    const ind=sessions.findIndex((session)=>{return session.room===room});

    if(ind!==-1){
         sessions.splice(ind,1)[0];
    }
    
}
function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60*60);
  return Math.abs(Math.round(diff));
  
 }

const getSessionid=(room)=>{
const session=sessions.find((session)=>session.room===room);

return {sessionId:session.sessionId,token:session.token};
}
module.exports={getSessionid,addsession,removesession}