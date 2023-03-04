import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {// agar application storage m details h to user signup page pr naa jaa paye
        const auth = localStorage.getItem("user");
        if (auth) {
            Navigate("/")
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);

    }
    return (
        <div className="su">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="inputBox" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="button" onClick={collectData} className="subutton">Sign Up</button>
        </div>
    )
}
export default SignUp;