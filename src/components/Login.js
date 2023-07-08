import "../style/Login.css";
import { useState } from "react";
import { useFirebase } from "../firebase-config";

const Login = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <>
    <div className="login-body">
      <div class="login-box">
        <h2>SignIn/Sign Up</h2>
        <form>
          <div class="user-box">
            <input
              type="email"
              name=""
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
            <label>Password</label>
          </div>
          <a href="#" onClick={()=>firebase.signIn(email, pwd)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            
              Sign In{" "}
          </a>

          <a href="#" onClick={()=>firebase.signupUserWithEmailAndPassword(email, pwd)}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            
              Sign Up{" "}
          </a>

          <a href="#" onClick={()=>firebase.signInWithGoogle()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            
              Sign In with Google{" "}
          </a>

      


        </form>
      </div>
      </div>
    </>
  );
};


export default Login;