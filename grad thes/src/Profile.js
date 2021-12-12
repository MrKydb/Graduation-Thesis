import React, { useState } from "react";
import "./Profile.css";
import { useStateValue } from "./StateProvider";
import { updateEmail, updatePassword, getAuth } from "firebase";
// import { auth } from "./firebase";
// import { updateEmail, updatePassword } from "firebase";

function UserInformations() {
   const [{ user }, dispatch] = useStateValue();
   const [email, setEmail] = useState(user?.email);
   const [password, setPassword] = useState("");
   const [emailSuccess, setEmailSuccess] = useState(false);
   const [passwordSuccess, setPasswordSuccess] = useState(false);

   const handleChangeEmail = () => {
      const auth = getAuth();
      if (user) {
      }
      auth.currentUser
         .updateEmail(email)
         .then(() => {
            setEmailSuccess(true);
         })
         .catch((error) => alert(error.message));
   };
   const handleChangePassword = () => {
      const auth = getAuth();
      if (user) {
         updatePassword(auth.currentUser, password)
            .then(() => {
               setPasswordSuccess(true);
            })
            .catch((error) => alert(error.message));
      }
   };
   return (
      <div id="user-informations">
         <div>
            <form>
               <label>E mail</label>
               <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <button onClick={handleChangeEmail}>Change Email</button>
               {emailSuccess ? "Success email!" : null}
               <br />
               <label>Password</label>
               <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
               />
               <button onClick={handleChangePassword}>Change Password</button>
               {passwordSuccess ? "Success password!" : null}
            </form>
         </div>
      </div>
   );
}

function Profile() {
   return (
      <div id="profile-container">
         <div id="profile-comp-center">
            <div id="profile-nav">
               <div className="profile-nav-link">
                  <button>My User Informations</button>
               </div>
               <div className="profile-nav-link">
                  <button>My Orders</button>
               </div>
            </div>
            <div id="profile-details">
               <UserInformations />
            </div>
         </div>
      </div>
   );
}

export default Profile;
