import React, { useState } from "react";
import "./Profile.css";
import { useStateValue } from "./StateProvider";
import { updateEmail, updatePassword } from "firebase";
import { auth } from "./firebase";
import Orders from "./Orders";
// import { updateEmail, updatePassword } from "firebase";

function UserInformations() {
   const [{ user }, dispatch] = useStateValue();
   const [email, setEmail] = useState(user?.email);
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [emailSuccess, setEmailSuccess] = useState(false);
   const [passwordSuccess, setPasswordSuccess] = useState(false);
   const [error, setError] = useState(null);

   const handleChangeEmail = (e) => {
      // const auth = getAuth();
      // if (user) {
      //    user
      //       .updateEmail(email)
      //       .then(() => {
      //          setEmailSuccess(true);
      //       })
      //       .catch((error) => {
      //          setError(error.message);
      //          return false;
      //       });
      // }
      auth()
         .signInWithEmailAndPassword(user.email, oldPassword)
         .then(function (userCredential) {
            userCredential.user.updateEmail(email).catch((error) => {
               console.log(error);
            });
         });
   };
   const handleChangePassword = () => {
      // const auth = getAuth();
      if (user) {
         // auth
         //    .updatePassword(user, password)
         //    .then(() => {
         //       setPasswordSuccess(true);
         //    })
         //    .catch((error) => alert(error.message));
      }
   };
   return (
      <div id="user-informations">
         <div>
            <form id="user-informations-form">
               <div id="profile-labels-div">
                  <label>Old Password</label>
                  <br />
                  <label>E mail</label>
                  <br />
                  <label>New Password</label>
               </div>
               <div id="profile-form-elements-div">
                  <input
                     type="text"
                     value={oldPassword}
                     onChange={(e) => setOldPassword(e.target.value)}
                     placeholder="password"
                  />
                  <br />
                  <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleChangeEmail}>Change Email</button>
                  {emailSuccess ? "Success email!" : null}
                  <br />
                  <input
                     type="text"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     placeholder="password"
                  />
                  <button onClick={handleChangePassword}>
                     Change Password
                  </button>
                  {passwordSuccess ? "Success password!" : null}
                  {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                  <p>{error}</p>
                  {console.log(error)}
                  {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
               </div>
            </form>
         </div>
      </div>
   );
}

function Profile() {
   const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
   const [isOrdersOpen, setIsOrdersOpen] = useState(false);
   const handleNavClick = (e) => {
      // console.log(e.target.value);
      if (e.target.value === "userInfo") {
         setIsUserInfoOpen(true);
         setIsOrdersOpen(false);
      } else if (e.target.value === "orders") {
         setIsUserInfoOpen(false);
         setIsOrdersOpen(true);
      }
   };

   return (
      <div id="profile-container">
         <div id="profile-comp-center">
            <div id="profile-nav">
               <div className="profile-nav-link">
                  <button value="userInfo" onClick={handleNavClick}>
                     My User Informations
                  </button>
               </div>
               <div className="profile-nav-link">
                  <button value="orders" onClick={handleNavClick}>
                     My Orders
                  </button>
               </div>
            </div>
            <div id="profile-details">
               {isUserInfoOpen && <UserInformations />}
               {isOrdersOpen && (
                  <div id="orders-div">
                     <Orders />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Profile;
