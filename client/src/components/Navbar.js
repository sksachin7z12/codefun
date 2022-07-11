import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {signinwithgoogle}from '../firebase-config'
import { useNavigate } from 'react-router-dom';

function Navbar({notify}) {
  // const [message, setMessage] = useState("");
    const [active, setActive] = useState(false);
    let navigate=useNavigate();
  return (
    <div>
    
        <nav>
           <div className='w-[100vw] h-16 flex justify-between items-center bg-blue-800'>
            <div className='flex'>
              <Link to="/"> <div className='p-3 font-bold text-white'>
                  Code Collab
              </div></Link>
            <ul className='flex  space-x-2'>
            <Link to="/"> <li>
                 <div className='hidden  lg:block font-bold text-white hover:bg-[#7171d5] rounded-md p-1 m-2 cursor-pointer'>
                  Home
                  </div>
                  
                </li></Link>
             
               </ul>
            </div>
               <div className="hidden  lg:block px-7 space-x-3 ">

               <Link to="/join"> <button className='btn-primary'>Create/Join</button></Link>
            
               {!localStorage.getItem('token1')?<button onClick={()=>{signinwithgoogle()}} className='btn-primary '>Signin</button>
             
             :<button onClick={()=>{
               localStorage.removeItem("token1");
               localStorage.removeItem("email"); 
               localStorage.removeItem("dp"); 
               navigate('/');
               notify("signout succesfully")
             }} className='btn-primary'>Signout</button>}
               </div>
               <div className="sm:block  lg:hidden px-7 space-x-3 ">
                
                <button className='btn-primary ' onClick={()=>{setActive(!active)}}>|||</button>
               </div>
           </div>{active&&<div className=' w-[100vw] bg-blue-800  '>
          <ul className='px-3'>
                <li>
                  <div className=' font-bold text-white hover:bg-[#7171d5] rounded-md p-1 mx-2 cursor-pointer'>
                  Home
                  </div>
                  
                </li>
              
               </ul>
             <div className="  p-5  space-x-3 ">
               <Link to="/join"> <button  className='btn-primary'>Create/Join</button></Link>
              
                {!localStorage.getItem('token1')?<button onClick={()=>{signinwithgoogle()}} className='btn-primary '>Signin</button>
             
                :<button onClick={()=>{
                  localStorage.removeItem("token1");
                  localStorage.removeItem("email"); 
                  localStorage.removeItem("dp"); 
                  
                  navigate('/');
                  notify("signout succesfully")
                }} className='btn-primary'>Signout</button>}
               </div> 
           </div>}
        </nav>
    </div>
  )
}

export default Navbar