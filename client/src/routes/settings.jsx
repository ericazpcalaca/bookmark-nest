import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Settings = ({ onUpdate = f => f }) => {
  // Retrieve userID from localStorage
    const userID = localStorage.getItem('userID');
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    const fetchData = async () => {
        const url = `http://localhost:5000/profile/${userID}`;

        try {
            const response = await axios.get(url);
            const { name, email, password } = response.data;

            setName(name);
            setEmail(email);
            setPassword(password);
        } catch (err) {
            console.error(`Error in fetching data: ${err}`);
            console.error(`URL used: ${url}`);
        }
    };

        fetchData();
    }, [userID]);

    const submitForm = (event) => {
        event.preventDefault();
        onUpdate(userID, name,email,password);
        setName("");
        setEmail("");
        setPassword("");
    }  

    return (
    <div className="content">
        <form onSubmit={submitForm}>        
            <div className="form-group">
                <h2>Settings</h2>
                <div className="input">
                    <label>Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        className="form-control" 
                        placeholder="Enter your name"
                        onChange={(event)=>setName(event.target.value)}
                        value={name}
                        required
                    />
                </div>
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
            <button className='btn btn-dark'>Update</button>
        </form>
    </div>
    );
};

export default Settings;
