const users=[];

const addUser=({id,name,room,dp})=>{
  
name=name.trim().toLowerCase();

room=room.trim().toLowerCase();


const existinguser=users.find(user=>user.room===room && user.name===name);
// const existinguser1=users.find(user=>user.room===room && user.name1===name1);
if(existinguser ){
    return {error:"username is taken"};
}
const user={id,name,room,dp};
users.push(user);
return {user};

}
const getuserinroom=(room)=>{
return users.filter((user)=>
    user.room===room
)
}
const removeUser=(id)=>{
const index=users.findIndex((user)=>{
   return user.id===id;
})
if(index!==-1){
    return users.splice(index,1)[0];
}
}
const isEmpty=(room)=>{
    const user=users.find((user)=>user.room===room)
    if(!user){
        return true;
    }
    else
    return false;
}
const getUser=(id)=>{
return users.find((user)=>user.id===id);
}
module.exports={addUser,getuserinroom,removeUser,getUser,isEmpty};