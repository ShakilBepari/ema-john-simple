import * as firebase from 'firebase/app';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:''
  });
  const [logedInUser, setLogedInUser,xxx,setXxx] = useContext(userContext);
  const navigate = useNavigate();
  const calls = xxx;

  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  const googleSignIn= () => {
    signInWithPopup(auth, googleProvider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser);
      setLogedInUser(signedInUser);
      navigate(`/${xxx}`);
      console.log(displayName,email,photoURL);
    })
  }
  
const signOut = () => {
  signOut(auth)
  .then( res => {
    const signedOutUser = {
      isSignedIn: false,
      name:'',
      email:'',
      photo:'',
      errors:'',
      success:''
    }
    setUser(signedOutUser);
  })
  
  
}

const handleBlur = (e) => {

  let isFildValid = true;

  if(e.target.name === 'email'){
    const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
    isFildValid = isEmailValid;
  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length >= 6;
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFildValid = isPasswordValid && passwordHasNumber;
  }
  if(isFildValid){
    const userInfo = {...user};
    userInfo[e.target.name] = e.target.value;
    setUser(userInfo);
  }
}

const handleSubmit = (e) => {

  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.success=true;
      newUserInfo.errors=false;
      setUser(newUserInfo);
      updateUserName(user.name);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const newUserInfo = {...user};
      newUserInfo.errors = errorMessage;
      newUserInfo.success= false;
      setUser(newUserInfo);console.log(errorCode,errorMessage);
    });
  }
  
  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      // Signed in 
      const newUserInfo = {...user};
      newUserInfo.success=true;
      newUserInfo.errors=false;
      setUser(newUserInfo);
      setLogedInUser(newUserInfo);
      console.log(res.user);
      navigate(`/${xxx}`);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const newUserInfo = {...user};
      newUserInfo.errors = errorMessage;
      newUserInfo.success= false;
      setUser(newUserInfo);
    });
  }
  e.preventDefault();
}

const updateUserName = (user) => {
  updateProfile(auth.currentUser, {
    displayName: user
  }).then((res) => {
    console.log('update successfull username');
  }).catch((error) => {
    console.log(error.message);
  });
} 

const fbSignIn = () => {
  const auth = getAuth();
  signInWithPopup(auth, fbProvider)
  .then((result) => {
    const user = result.user;
    console.log('hello');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });
};


  return (
    <div style={{textAlign:'center'}}>
      {
         user.isSignedIn ?   <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In With Gogle</button>
      }

      <br/>

      <button onClick={fbSignIn}>Sign in With Facebook</button>
     
      {
        user.isSignedIn && <div>
            <h2> WellCome: {user.name}</h2>
            <p> Email: {user.email}</p>
            <img src={user.photo} alt='' />
          </div>
      }
      <h1>My Own Authintication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
      {
       newUser && <input onBlur={handleBlur} type='text' name='name' placeholder='Your Name'/>
      }
      <br />
      <input onBlur={handleBlur} type="text" name='email' required placeholder='Your Email'/>
      <br/>
      <input onBlur={handleBlur} type="password" name="password" id="" required placeholder='Your Password'/>
      <br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      
      {user.errors && <p style={{color:'red'}}>Your email {newUser ? 'all ready register another': 'not register of'} account?</p>}
      {user.success && <p style={{color:'green'}}>Your {newUser ? 'account register' : 'are loging'} Succesfully</p>}
    </div>
  );
}

export default Login;
