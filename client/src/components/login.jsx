import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    onLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className='content'>
      <form onSubmit={submitForm}>        
        <div className="form-group">
            <h2>Login</h2>
            <div className="input">
                <label>Email: </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    className="form-control" 
                    placeholder="Enter your email"
                    onChange={(event)=>setEmail(event.target.value)}
                    value={email}
                    required
                />
            </div>
            <div className="input">
                <label>Password: </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    className="form-control" 
                    placeholder="Enter your password"
                    onChange={(event)=>setPassword(event.target.value)}
                    value={password}
                    required
                />
            </div>
        </div>
        <br></br>
        <button className='btn btn-dark'>Login</button>
      </form>
    </div>
  );
};


export default Login;
