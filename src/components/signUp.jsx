import React, { useState } from 'react';
import { AiOutlineMail}  from 'react-icons/ai';
import { BsPerson}  from 'react-icons/bs';
import { RiLockPasswordLine}  from 'react-icons/ri';
import {GiBookmarklet} from 'react-icons/gi'; 

function SignUp() {
  

  return (
    <div className="container">
        <div className="header">
            <div className="text">.sign up<GiBookmarklet/></div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <div className="input-icon"><BsPerson /></div>                
                <input type="text" placeholder='Enter your name...'/>
            </div>
            <div className="input">
                <div className="input-icon"><AiOutlineMail /></div>                
                <input type="email" placeholder='Enter your email...'/>
            </div>
            <div className="input">
                <div className="input-icon"><RiLockPasswordLine /></div>
                <input type="password" placeholder='Enter your password...'/>
            </div>
        </div>
        <div className="already-member">
            Already a member? <span>Click here</span>
        </div>
        <div className="submit-container">
            <button className='btn' id='btnModel'>Sign Up</button>
        </div>
    </div>
  );
}

export default SignUp;