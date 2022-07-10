import React from 'react'
import mainp from './mainp.png'
import whiteboard from './whiteboard.png'
import code from './code.png'
import chat from './chat.png'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <>
    <section>
    <div className='container m-auto'>
        <div className='pt-10 md:py-16 grid md:grid-cols-[40%_60%] md:grid-rows-none grid-rows-[40%_60%]'>
        <div className='md:py-9'>
            <img className='h-[100%] m-[auto]' src={mainp} alt=""/>
        </div>
        <div className='p-6 md:py-14'>
         <h1 className='text-[2rem] font-bold text-[#155bd7]'>Code Collab</h1>
       <p className='pt-3 font-semibold'> CodeCollab is a realtime coding platform enables you to connect to your peers and work on coding problems</p>
       <p className='pt-3 font-semibold'>
        Explanation of the problem and its solution become easy with features provides in this platform. 
       </p>
       <div>
       <Link to='/join'> <button className='btn-secondary my-3'>Get Started</button></Link>
       </div>
        </div>
        </div>
     <hr />
     </div>
     </section>
     <section>
      <div className='py-3'>
        <div className='text-center font-bold text-[2rem] text-[#155bd7]'>Features</div>
      </div>
      <div className="container m-[auto] pb-10">
      <div className='grid md:grid-cols-3 md:gap-3 md:grid-rows-none grid-rows-3 gap-4 '  >
          <div className='rounded-md border-2 p-5'>
            <div className='h-[163px]'>
                <img className='h-[100%] m-[auto]' src={code} alt="" />
            </div>
            <div >
            <div className='text-[#ff9100] text-center py-4 text-[1.5rem] font-bold'>Versatile Code Editor
                        </div>  
                        <div className='text-center '>
                          <p className='font-bold text-lg'>{`-> Supports multiple Languages`}</p>
                          <p className='font-bold text-lg'>{`-> Various themes available for editor`}</p>
                          
                        </div>
            </div>
          </div>
          <div className='rounded-md border-2 p-5'>
            <div className='h-[163px] '>
              <img className='h-[100%] m-[auto]' src={chat} alt=""  />
            </div>
            <div >
            <div className='text-[#ff9100] text-center py-4 text-[1.5rem] font-bold'>Audio and text chat
                        </div>  
                        <div className='text-center font-bold'>
                          <p className='font-bold text-lg'>{`-> Seamless audio connectivity`} </p>
                          <p className='font-bold text-lg'>{`-> Text chat Enabled`}</p>
                        </div>
            </div>
          </div>
          <div className='rounded-md border-2 p-5'>
              <div className='h-[163px]'>
              <img className='h-[100%] m-[auto]' src={whiteboard} alt="" />
              </div>
              <div >
            <div className='text-[#ff9100] text-center py-4 text-[1.5rem] font-bold'>Interative Whiteboard
                        </div>  
                        <div className='text-center font-bold'>
                          <p className='font-bold text-lg'> {`-> Collabative whiteboard for explanation`}</p>
                          <p className='font-bold text-lg'> {`-> Supports various pen size and color`}</p>
                          
                        </div>
            </div>
          </div>
      </div>
      </div>
     </section>
     <footer className='h-[10vh] bg-black flex justify-center items-center text-white font-bold'>
        Code Collab : Developed by Sachin Sharma
     </footer>
    
    </>
  )
}

export default Home