import React from 'react'

function Card() {
  return (
    <div><div className='container m-auto'>
    <div className='py-16 grid md:grid-cols-[40%_60%] md:grid-rows-none grid-rows-[40%_60%]'>
    <div className='md:py-9'>
        <img className='h-[100%] m-[auto]' src={mainp} alt=""/>
    </div>
    <div className='p-6 md:py-14'>
     <h1 className='text-[2rem] font-bold'>Code Collab</h1>
   <p className='pt-3 font-semibold'> CodeCollab is a realtime coding platform enables you to connect to your peers and work on coding problems</p>
   <p className='pt-3 font-semibold'>
    Explanation of the problem and its solution become easy with features provides in this platform. 
   </p>
   <div>
    <button className='btn-secondary my-3'>Get Started</button>
   </div>
    </div>
    </div>
 
</div></div>
  )
}

export default Card