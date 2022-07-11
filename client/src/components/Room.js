import React,{useState,useEffect} from 'react'
import Avatar from 'react-avatar';
import { useLocation ,useNavigate} from 'react-router-dom';
import axios from "axios";
import {BsFillDoorOpenFill} from 'react-icons/bs'
// import {OTWhiteBoard} from 'opentok-react-whiteboard'
import AceEditor from "react-ace";
import io from "socket.io-client"
import queryString from 'query-string'
import Message from './Message';

import Spinner from './Spinner';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import   "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-typescript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";




import "ace-builds/src-noconflict/ext-language_tools";
import Editornav from './Editornav';
import Container from './whiteboard/container/Container'


let socket;


function Room({notify}) {
const [loading, setLoading] = useState(false)
  
  let navigate=useNavigate();
  let location=useLocation();
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const [source, setSource] = useState("");
  const [inp, setInp] = useState("");
  const [langid, setLangid] = useState(63);
  const [stdoutt, setStdo] = useState("");
  const [contri, setContri] = useState(false)

// const ENDPOINT="http://localhost:5000";
const ENDPOINT="https://codecollab7z2.herokuapp.com/";


useEffect(() => {
  
    if(!localStorage.getItem('token1')){
      navigate('/');
      notify('Not Authorised: please Signin')
    }
   
  

 const {name,room} =queryString.parse(location.search);
 
 socket=io(ENDPOINT);
  setName(name);
  setRoom(room);
  
  socket.emit('join',{name,room,dp:localStorage.getItem('dp'),name1:localStorage.getItem('email').split("@")[0]},(error)=>{
    if(error){
    
      navigate('/join');
     notify("Username is taken")
    }
  });


return ()=>{
  socket.disconnect();
// socket.off();
localStorage.removeItem('tokencode');
localStorage.removeItem('token');
localStorage.removeItem('sessionId');

}
}, [ENDPOINT,location.search,navigate,notify]);
// useEffect(() => {
//   socket.on("inicode",({source,inp,out})=>{
//     setSource(source);
//     setInp(inp);
//     setStdo(out);
//   })
    
//   }, [])
useEffect(() => {
 
socket.on('message',(message)=>{
  setMessages([...messages,message]);
})
socket.on('roomData',({users})=>{
  setUsers(users);
})
}, [messages]);
useEffect(() => {
 
  socket.on('code',({source,inp,out})=>{
     setSource(source);
     setInp(inp);
     setStdo(out);
  })
 }, [source,inp,stdoutt])

const handlesendcode=()=>{
 
    socket.emit('sendCode',{
     source:source,
     inp:inp,
     out:stdoutt
    });
}

  function onChange(newValue) {
  
setSource(newValue);

  }
  function onChange1(newValue) {
    
   setInp(newValue);
  }
  const handlelang=(mode,name)=>{
      setMode(mode);
      if(mode==="javascript"){
        setLangid(63);
      }
     else if(mode==="c_cpp" && name==='c'){
        setLangid(50);
      }
      else if(mode==="c_cpp"){
        setLangid(54);
      }
     else if(mode==="java"){
        setLangid(62);
      }
     else if(mode==="csharp"){
        setLangid(51);
      }
     else if(mode==="python"){
        setLangid(71);
      }
     else if(mode==="php"){
        setLangid(68);
      }
     else if(mode==="ruby"){
        setLangid(72);
      }
     else if(mode==="typescript"){
        setLangid(74);
      }
     else if(mode==="golang"){
        setLangid(60);
      }
  }
 const download=()=>{
  const url=window.URL.createObjectURL(new Blob([source],{type:"text/plain"}));
  const link=document.createElement("a");
  link.href=url;
  link.setAttribute("download","sessioncode.txt");
  document.body.appendChild(link);
  link.click();
 }
  
    const [chat, setChat] = useState(false);
    const [whiteBoard, setWhiteBoard] = useState(false);
    const [mode, setMode] = useState("javascript");
    const [theme, setTheme] = useState("monokai");
    // const [complete, setcomplete] = useState(false);
    
    const handlesend=()=>{
     
        if(message){
          socket.emit('sendMessage',{message},()=>setMessage(''))
        }
    }

    
    const compile=()=>{
     setLoading(true);
      axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${localStorage.getItem("tokencode")}`,{  
        headers: {
            
          'X-RapidAPI-Key': 'fdf905e00amsh129dca5d5ef50b9p1bf6b5jsnec112dfb068c',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
      })
     .then(function (response) {
     if(response.data.stdout){
        setStdo(response.data.stdout);
        setLoading(false);
     }
        else{
        setStdo("Compilation Error")
        setLoading(false);
        }
      }).catch(function (error) {
        setLoading(false);
        console.error(error);
      });
      
    }
const compiler=async()=>{
  setLoading(true);
 let pro=await axios.post(`https://judge0-ce.p.rapidapi.com/submissions`,{"language_id":langid,"source_code":`${source}`,"stdin":`${inp}`},{  
    headers: {
        'Content-Type':'application/json', //not neccesary but its ok
      'X-RapidAPI-Key': 'fdf905e00amsh129dca5d5ef50b9p1bf6b5jsnec112dfb068c',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    }
  )
  try {
    const json= pro.data;
const token=json.token;
localStorage.setItem("tokencode",token);
setLoading(false);
  } catch (error) {
    setStdo("Compilation Error")
    setLoading(false);
    console.log(error)
  }
 setLoading(false);

    compile();
    
}




  return (
    <>
     {loading && <Spinner/>}
    <Editornav source={source} contri={contri} setContri={setContri} notify={notify} download={download} whiteBoard={whiteBoard} setWhiteBoard={setWhiteBoard}  room={room} handlesendcode={handlesendcode} compiler={compiler} chat={chat} setChat={setChat}/>
     
   {chat&& <div className="absolute right-0 w-[300px] border-2 h-[80vh] z-10">
    <div className='h-[73vh] bg-yellow-200 overflow-y-scroll'>
      {
        messages.map((message,i)=>{
         return <div key={i}><Message name={name?name:localStorage.getItem('email').split('@')[0]} message={message}/></div>
        })
      }
    </div>
    <div className='flex'>
      <input value={message} className='w-[300px]' type="text" name="input" id="input" onChange={(e)=>{
        setMessage(e.target.value);
      }} />
      <button onClick={handlesend} className='btn-primary'>Send</button>
    </div>
   </div>
   


}
{whiteBoard && <div onClick={()=>{setWhiteBoard(!whiteBoard)}} className='  fixed right-14 bottom-10 cursor-pointer font-bold text-lg'>
  <BsFillDoorOpenFill/>  Room
</div>}
{whiteBoard ? <Container/>

:
<div>
<div className="absolute right-2 z-20">

</div>

  <div className="  md:grid md:grid-cols-[1fr_4fr] ">


  <div className='hidden md:block p-4 bg-slate-200 overflow-y-scroll'>
<p className='text-center p-2 text-blue-600 text-xl font-bold'>Contributors</p>
<div>
  {users?
  <div>
   
    {users.map(({name,dp,name1})=>{
     return <div className='grid grid-cols-[60px_1fr] mb-3 items-center' key={name?name:name1}>
        <div>
         { dp?<img src={`${dp}`} alt='' width="50"/>
        :<Avatar name={name} size={50}/>}
          
        </div>
        <div>
          {name?name:name1}
        </div>
     </div>
    })}
    </div>:null
  }
</div>
</div>
{ contri&& <div className='z-20 h-[100vh] absolute left-0 p-4 bg-slate-200 overflow-y-scroll'>
<p className='text-center p-2 text-blue-600 text-xl font-bold'>Contributors</p>
<div>
  {users?
  <div>
   
    {users.map(({name,dp,name1})=>{
     return <div className='grid grid-cols-[60px_1fr] mb-3 items-center' key={name}>
        <div>
          <img src={`${dp}`} alt="dp" width="50"/>
        </div>
        <div>
          {name?name:name1}
        </div>
     </div>
    })}
    </div>:null
  }
</div>
</div>}
<div>
<div >
    <div className='bg-black flex justify-between '>
        <div className='px-4 py-1 '>
        <div className="field "><label className='text-white'>Mode:</label><p className="control"><span className="select"><select onChange={(e)=>{handlelang(e.target.value,e.target.name)}}  name='mode' className="w-1/8 bg-offBlack border border-offBlack justify-start"><option value="javascript">Javascript</option><option value="java">java</option><option value='python'>python</option><option value='c_cpp' name="c">c</option><option name="cpp" value='c_cpp'>cpp</option><option value='ruby'>ruby</option><option value='php'>php</option><option value='golang'>Go</option><option value='csharp'>csharp</option><option value='typescript'>typescript</option></select></span></p></div>
        </div>
        <div>
        <div className="field px-11"><label className='text-white'>Theme:</label><p className="control"><span className="select"><select name="Theme" onChange={(e)=>{setTheme(e.target.value)}}><option value="monokai">monokai</option><option value="github">github</option><option value="tomorrow">tomorrow</option><option value="kuroir">kuroir</option><option value="twilight">twilight</option><option value="xcode">xcode</option><option value="textmate">textmate</option><option value="solarized_dark">solarized_dark</option><option value="solarized_light">solarized_light</option><option value="terminal">terminal</option></select></span></p></div>
        </div>
        <div>
        {/* <div onClick={()=>{setcomplete(!complete)}} className="field"><p className="control"><label className="checkbox"><input  type="checkbox"/>Enable Live Autocomplete</label></p></div> */}
        </div>
    </div>
<AceEditor

  mode={mode}
  theme={theme}
  name="example"
  width='auto'
  value={source}
  onChange={onChange}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{ $blockScrolling: true }}
  setOptions={{
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: false,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
  }}/>
</div>
<div className='sm:grid sm:grid-cols-2 '>
<div className=' border-2'>
<p className='text-center'>input</p>

<AceEditor
placeholder='input'
    mode={mode}
    theme={theme}
    value={inp}
    onChange={onChange1}
    width="auto"
    height='150px'
    fontSize={18}
    name="input"
    editorProps={{ $blockScrolling: true }}
  />
</div>
<div className=' border-2'>
    <p className='text-center'>output</p>
<AceEditor
placeholder='output'
    mode={mode}
    theme={theme}
    value={stdoutt}
    width="auto"
    height='150px'
    fontSize={18}
    name="output"
    editorProps={{ $blockScrolling: true }}
  />
</div>
</div>
</div>
  </div>

  </div>}
    </>
  )
}

export default Room