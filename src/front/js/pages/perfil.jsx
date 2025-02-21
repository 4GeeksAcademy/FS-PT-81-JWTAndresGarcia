import React, { useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Perfil = () => {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!localStorage.getItem('token')) navigate('/')
            actions.getUserData()
    },[])
    
    const handleLogout = () => {
        actions.logout()
        navigate('/')
    }
  
    return (
        <div>
            <h2>User profile</h2>
            <p>Correo: {store.user?.email}</p>


            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )

    
}