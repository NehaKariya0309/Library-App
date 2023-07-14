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
        <div className="heading1">Welcome to the BookStacker 📚</div>
        <div className="heading2">
        Take control of your library's records like never before with our state-of-the-art app tailored for modern librarians.
        </div>
        <h2 className="heading2"> Let's Start</h2>
        <div class="login-box">
          <div class="container-front">
            <div class="wrapper">
              <div class="title">
                <span>SignIn/SignUp</span>
              </div>
              <form action="#">
                <div class="row">
                  <i class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                    </svg>
                  </i>

                  <input
                    type="text"
                    placeholder="Email"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <div class="row">
                  <i class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </i>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                  />
                </div>

                <div class="row button">
                  <input
                    type="submit"
                    value="Signin"
                    onClick={() => firebase.signIn(email, pwd)}
                  />
                </div>
                <div class="row button">
                  <input
                    type="submit"
                    value="Signup"
                    onClick={() =>
                      firebase.signupUserWithEmailAndPassword(email, pwd)
                    }
                  />
                </div>
                <div class="row button">
                  <input
                    type="submit"
                    value="Signin Using Google"
                    onClick={() => firebase.signInWithGoogle()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="footer">
          Created with ❤ by Neha Kariya. Visit the{" "}
          <a href="https://github.com/NehaKariya0309/Library-App" target="_blank">
            Github repository
          </a>{" "}
          here.
        </div>
      </div>
    </>
  );
};

export default Login;
