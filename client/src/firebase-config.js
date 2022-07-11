import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABXiv7_CjHVMXeE8yUHp_LS6PTyLQ_IUQ",
  authDomain: "codecollab-71ba8.firebaseapp.com",
  projectId: "codecollab-71ba8",
  storageBucket: "codecollab-71ba8.appspot.com",
  messagingSenderId: "693063341505",
  appId: "1:693063341505:web:4798321a8870cb9de24b40",
  measurementId: "G-HKY7GWFB9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export let auth = getAuth(app);
export const provider=new GoogleAuthProvider();

export const signinwithgoogle=()=>{


signInWithPopup(auth,provider).then((result)=>{
  const email=result.user.email;
  const profilepic=result.user.photoURL;
  const token=result.user.uid;
  
  localStorage.setItem('token1',token);
  localStorage.setItem('dp',profilepic);
  localStorage.setItem('email',email);
 
  window.location.reload();
}).catch((error)=>{
  alert(error)
})



}
