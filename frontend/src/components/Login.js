import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {// agar application storage m details h to user login page pr naa jaa paye
        const auth = localStorage.getItem("user");
        if (auth) {
            Navigate("/")
        }
    })
    const handlelogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            Navigate("/")
        }
        else {
            alert("plese enter correct credentials")
        }
    }

    return (
        <div className="su">
            <h1>Login</h1>

            <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="inputBox" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="button" className="subutton" onClick={handlelogin}>Login</button>
        </div>
    )
}

export default Login;