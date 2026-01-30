import React from "react";
import './Nav.css';
import logo from '../../assets/Screenshot_2025-11-22_133747-removebg-preview.png';


const Nav = () => {
    return(
        <>
        <div className="nav">
           <div className="navleft">
            <img src={logo} alt="" />
            </div>
            <div className="navright">
                <button> Home</button>
                <button onClick={() => window.location.href = "/about"}>About</button>
                <button onClick={() => window.location.href = "/contact"}>Contact</button></div> 
        </div>
        </>
    )
}

export default Nav