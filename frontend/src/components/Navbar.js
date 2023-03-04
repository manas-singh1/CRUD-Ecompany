import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
    const auth = localStorage.getItem("user");
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear(); // logout pr local storage clear krdo orr redirect to signup page
        Navigate("/signup");
    }
    return (

        <div>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                {/* <li><Link to="/update">Update Products</Link></li> */}
                <li><Link to="/profile">profile</Link></li>
                <li><Link to="/signup" onClick={logout}>Logout({JSON.parse(auth).name})</Link></li>
            </ul>
                :

                <ul className="nav-ul">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

            }
        </div>

        // <div>
        //     <ul className="nav-ul">
        //         <li><Link to="/">Products</Link></li>
        //         <li><Link to="/add">Add Products</Link></li>
        //         <li><Link to="/update">Update Products</Link></li>

        //         <li><Link to="/profile">profile</Link></li>
        //         {auth ? <li><Link to="/signup" onClick={logout}>Logout</Link></li>:
        //          fragmentation
        //          <> 
        //         <li><Link to="/signup">Sign Up</Link></li>
        //         <li><Link to="/login">Login</Link></li>
        //         </>}

        //     </ul>
        // </div>
    )
}
export default Nav;