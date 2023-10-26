import React, { useState } from 'react';
import { AiOutlineMail}  from 'react-icons/ai';
import { BsPerson}  from 'react-icons/bs';
import { RiLockPasswordLine}  from 'react-icons/ri';
import {GiBookmarklet} from 'react-icons/gi'; 

function LogSinScreen({typeAction=""}) {

    const [action,setAction] = useState(typeAction);
    const userSignIn = "sign up";
    const userLogin = "login";
  

    return (
    <div className="container">
        <div className="header">
            <div className="text">.{action}<GiBookmarklet/></div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {/* Hide the input field */}
            {action===userLogin?<div></div>:<div className="input">
                <div className="input-icon"><BsPerson /></div>                
                <input type="text" placeholder='Enter your name...'/>
            </div>}
            
            <div className="input">
                <div className="input-icon"><AiOutlineMail /></div>                
                <input type="email" placeholder='Enter your email...'/>
            </div>
            <div className="input">
                <div className="input-icon"><RiLockPasswordLine /></div>
                <input type="password" placeholder='Enter your password...'/>
            </div>
        </div>
        {/* Hide the forgot password option */}
        {action===userSignIn?<div></div>:<div className="forgot-password">
            Lost password? <span>Click here</span>
        </div>}
        
        <div className="submit-container">
            <div className={action===userLogin?"submit gray":"submit"} onClick={()=>{setAction(userSignIn)}}>Sign Up</div>
            <div className={action===userSignIn?"submit gray":"submit"} onClick={()=>{setAction(userLogin)}}>Login</div>
        </div>
    </div>
  );
}

export default LogSinScreen;