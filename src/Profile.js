import React, { useState } from "react";
import "./Profile.css";
import { useStateValue } from "./StateProvider";
import Orders from "./Orders";

function UserInformations() {
   const [{ user }] = useStateValue();
   const [email, setEmail] = useState(user?.email);
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [emailSuccess, setEmailSuccess] = useState(false);
   const [passwordSuccess, setPasswordSuccess] = useState(false);
   const [error, setError] = useState(null);

   // changeEmail and changePassword functionality has not been added yet

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
                  <button>Change Email</button>
                  {emailSuccess ? "Success email!" : null}
                  <br />
                  <input
                     type="text"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     placeholder="password"
                  />
                  <button>Change Password</button>
                  {passwordSuccess ? "Success password!" : null}
                  <p>{error}</p>
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
