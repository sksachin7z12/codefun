import React,{useState,useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
function Join({notify}) {
  const host="https://codecollab7z2.herokuapp.com";
  // const host="http://localhost:5000";
  const [loading, setLoading] = useState(false)
  let navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token1')){

      navigate('/');
      notify('Not Authorised: please Signin')
    }
    // eslint-disable-next-line
  }, [])
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
 
  const handlesubmit=async()=>{
    if((!name || !room))
    {
      notify('Both name and Room required');
      return;
    }
    setLoading(true);
const response=await fetch(`${host}/token`,{
  method:'POST',
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body:JSON.stringify({room:room})
});
const data=await response.json();
setLoading(false)

  localStorage.setItem('sessionId',data.sessionId);
  localStorage.setItem('token',data.token);
  //can use context api but for now localstorage or directly to app.js
 
  
  navigate(`/room?name=${name}&room=${room}`);
  }
  const handlecreate=async()=>{
    var room=localStorage.getItem('email');
    room=room.split('@')[0];
    var name=localStorage.getItem('email');
    name=name.split('@')[0];
      setLoading(true)
    const response=await fetch(`${host}/token`,{
  method:'POST',
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body:JSON.stringify({room:room})
});
const data=await response.json();
setLoading(false);

  localStorage.setItem('sessionId',data.sessionId);
  localStorage.setItem('token',data.token);
  //can use context api but for now localstorage or directly to app.js
  
  navigate(`/room?name=${name}&room=${room}`);

   
  }
  return (
    <>
    {loading && <Spinner/>}
    <div className='h-[90vh] w-[100vw] flex justify-center items-center'>
        <div>
          <h1 className='text-center p-5 font-bold text-xl'>Create / Join</h1>
          
           <div className='pb-1'> <input className='border-2 rounded-md  p-1 border-blue-700' type="text" placeholder='username' name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
            <div><input className='border-2 rounded-md p-1 border-blue-700' type="text"  placeholder='room' name="room" id="room" value={room} onChange={(e)=>{setRoom(e.target.value)}}/></div>
            <div className='space-x-3 text-center pt-2'>
              <button onClick={handlesubmit} className={`btn-primary ${(!name || !room)?"opacity-50  cursor-not-allowed":""}`}>Join</button>
              <button onClick={handlecreate} className='btn-secondary'>Create Room</button>
            </div>
         
          
        </div>
    </div>
    </>
  )
}

export default Join