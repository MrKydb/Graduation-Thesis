import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import "./Login.css";
import { useStateValue } from "./StateProvider";

function Login() {
   const [{ user }] = useStateValue();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [userCred, setUserCred] = useState();
   const navigate = useNavigate();

   const login = (e) => {
      e.preventDefault();
      auth
         .signInWithEmailAndPassword(email, password)
         .then((auth) => {
            navigate("/");
         })
         .catch((error) => {
            alert(error.message);
         });
   };

   const signUp = (e) => {
      e.preventDefault();
      auth
         .createUserWithEmailAndPassword(email, password)
         .then((auth) => {
            if (auth) {
               setUserCred(auth);
               navigate("/");
            }
         })
         .catch((error) => alert(error.message));
   };

   useState(() => {
      if (user) {
         db.collection("users")
            .doc(auth.user.uid)
            .collection("cart")
            .doc("1")
            .set({
               cart: [],
            });
      }
   }, [userCred]);

   return (
      <div id="login-container">
         <Link to="/" id="logo-link">
            <img
               src="https://i.imgur.com/Iab9kHp.png"
               alt="Company Logo"
               id="company-logo-image"
            />
         </Link>
         <div id="login-items">
            <label>E mail</label>
            <br />
            <input
               type="text"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <br />
            <button type="submit" onClick={login}>
               Login
            </button>
            <br />
            <br />
            <p>Don't have an account?</p>
            <button onClick={signUp}>Sign up</button>
         </div>
      </div>
   );
}

export default Login;
