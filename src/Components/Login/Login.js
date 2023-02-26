
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

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  const handleSignIn= () => {
    signInWithPopup(auth, provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser);
      console.log(displayName,email,photoURL);
    })
  }
  
const handleSignOut = () => {
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

const handleFbSignIn = () => {
  const auth = getAuth();
  signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.

    console.log('hello');


    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.

    // The AuthCredential type that was used.
    console.log(errorCode,errorMessage);
    // ...
  });
};


  return (
    <div style={{textAlign:'center'}}>
      {
         user.isSignedIn ?   <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }

      <br/>

      <button onClick={handleFbSignIn}>Sign Up With Facebook</button>
     
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
