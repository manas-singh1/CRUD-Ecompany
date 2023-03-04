import React from "react";
import { Navigate, Outlet } from "react-router-dom"

const PrivateComponent = () => {
    const auth = localStorage.getItem("user"); //agar hume browrser k local storage m kuch mile to outlet dike nhi to navigate krdo signup page pr
    return auth ? <Outlet></Outlet> : <Navigate to={"/signup"}></Navigate>
}

export default PrivateComponent;