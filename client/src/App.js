import './custom.css'
import {


  BrowserRouter as Router,
  Route,
  Routes,
  
} from 'react-router-dom'

import Join from './components/Join';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Room from './components/Room';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import queryString from 'query-string'
function App() {
  
  const {sessionId,token} =queryString.parse(window.location.search);
  if(sessionId && token)
 {
  localStorage.setItem('token',token)
  localStorage.setItem('sessionId',sessionId);
 }
  const notify=(message)=>toast(message);
  return (
    <Router>
    <Navbar notify={notify} />
<ToastContainer/>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/join' element={<Join notify={notify} /> }/>
      <Route exact path='/room' element={<Room notify={notify} />}/>
      
     
     </Routes>
    
    </Router>
  );
}

export default App;
