import React from 'react'
// import {Link} from 'react-router-dom'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client'
import {BsFillChatLeftDotsFill,BsHeadset,BsShareFill,BsFileEarmarkArrowDown ,BsPlayFill,BsSaveFill} from 'react-icons/bs'
import {BiChalkboard} from 'react-icons/bi'
function Editornav({source,chat,setChat,compiler,room,handlesendcode,whiteBoard,setWhiteBoard,download,notify,contri,setContri}) {
    
    const handlevisibile=()=>{
      var ele=document.getElementById('voicee');
     
      ele.classList.toggle('voicev')
      if(ele.classList.contains('voicev')){
        ele.classList.remove("voice1")
      }
      else{
        ele.classList.add("voice1");
      }
    }
    const handleclick=()=>{
     if(window.innerWidth<=767)
        setContri(!contri)
   
    }
  return (
    <div>
         <nav>
           <div className='w-[100vw] h-12 flex justify-between items-center bg-black'>
            <div className='w-[100vw] flex items-center'>
             <div onClick={handleclick} className='p-3 font-bold text-white'>
              {room}
              </div>
            <ul className='w-[88vw] sm:grid sm:grid-cols-4 flex items-center justify-center space-x-4 sm:space-x-3'>
              <div>

              </div>
              <div className="flex space-x-3">
             <li onMouseOver={()=>{document.getElementById('run').style.display="block"}} onMouseLeave={()=>{document.getElementById('run').style.display="none"}}>
                 <div>
                 <button onClick={()=>{source?compiler():notify('no code written')}} className='text-white text-xl sm:px-3'><BsPlayFill/></button>

                 </div>
                 <div id='run' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                  Run
                 </div>
                  
                  
                </li>
             <li  onMouseOver={()=>{document.getElementById('save').style.display="block"}} onMouseLeave={()=>{document.getElementById('save').style.display="none"}}>
                 <div>
                 <button   onClick={handlesendcode} className='text-white text-lg sm:px-3'><BsSaveFill/></button>

                 </div>
                 <div id='save' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                  Update
                 </div>
                  
                </li>
                </div>
                <div className='flex space-x-3'>
                <li onMouseOver={()=>{document.getElementById('download').style.display="block"}} onMouseLeave={()=>{document.getElementById('download').style.display="none"}}>
                  <div>
                  <button onClick={()=>{download()}} className='text-white text-lg sm:px-3'> <BsFileEarmarkArrowDown/></button>

                  </div>
                  <div id='download' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                  download
                 </div>
                </li>
                <li onMouseOver={()=>{document.getElementById('whiteboard').style.display="block"}} onMouseLeave={()=>{document.getElementById('whiteboard').style.display="none"}}>
                <div>
                  <button onClick={()=>{setWhiteBoard(!whiteBoard)}}  className='text-white text-lg sm:px-3'><BiChalkboard/></button>

                </div>
                <div id='whiteboard' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                  Whiteboard
                 </div>
                </li>
                
                <li onMouseOver={()=>{document.getElementById('share').style.display="block"}} onMouseLeave={()=>{document.getElementById('share').style.display="none"}}>
                  <div>
                <button onClick={()=>{window.navigator.clipboard.writeText(`http://localhost:3000/room?room=${room}&sessionId=${localStorage.getItem('sessionId')}&token=${localStorage.getItem('token')}`);notify("link copied")}} className='text-white text-lg sm:px-3'><BsShareFill/></button>

                  </div>
                  <div id='share' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                Copylink
                 </div>
                </li>
                </div>
               

                <div className='flex  space-x-3'>
                <li >
                  <div>
                <button onClick={()=>{handlevisibile()}} className='text-white text-lg sm:px-3'><BsHeadset/></button>

                  </div>
                  <div id='voicee' className='voice1 absolute top-[7rem] z-20'>
                  
  <OTSession apiKey="47536461" sessionId={localStorage.getItem('sessionId')} token={localStorage.getItem('token')}>
<div className="sm:grid sm:grid-cols-2">
        <OTPublisher properties={{ width: 50, height: 50 ,publishVideo:false}}/>
        <OTStreams>
         
        
          <OTSubscriber properties={{ width: 50, height: 50 ,subscribeToVideo:false}}/>
          
        </OTStreams>
        </div>
      </OTSession>
      
                  </div>
                </li>
                <li  onMouseOver={()=>{document.getElementById('chat').style.display="block"}} onMouseLeave={()=>{document.getElementById('chat').style.display="none"}}>
                  <div>

                <button className='text-white text-lg sm:px-3' onClick={()=>{setChat(!chat);}}><BsFillChatLeftDotsFill/></button>
                  </div>
                <div id='chat' className='hidden text-white bg-black p-2 rounded-md absolute top-[7rem]'>
                 Chat
                 </div>
                </li>
                </div>
               
               
               </ul>
            </div>
              
           </div>
        </nav>
    </div>
  )
}

export default Editornav