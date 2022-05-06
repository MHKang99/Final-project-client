import React from "react";
import { useEffect } from 'react';
import { Session, User } from '../requests'
import {NavLink} from 'react-router-dom';
import logo from './assets/img/2048.png'


const NavBar = ({currentUser, onSignOut}) => {

    const handleSignOut = () => {
        Session.destroy().then(() => {
            onSignOut()
        })
    }

    useEffect(() => {
        console.log("hello")
    }, [currentUser])
    return(
        <header>
        <nav>
            <a href="/"><img className="Logo" src={logo} alt="Logo" /></a>
            <ul className="nav_links">
                <li className="nav-item">
                    <NavLink to='/'>Play Game</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/index'>LeaderBoard</NavLink>
                </li>
                <li className="nav-item">
                    {
                        currentUser ? (
                            <NavLink to={`/profile_page/${currentUser.id}`}>Profile</NavLink>
                        ) : (
                            <NavLink to='/sign_in'>Profile</NavLink>
                        )
                    }
                </li>
            </ul>
        </nav>
        {
            currentUser ? (
                <>
                    <h3> Logged In As: {currentUser.first_name} {currentUser.last_name}</h3>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                    <>
                        <button>
                        <NavLink to='/sign_in'>Sign In</NavLink>
                        </button>
                        <button>
                        <NavLink to='/sign_up'>Sign Up</NavLink>
                        </button>
                    </>
                )
            }
        </header>
    )
}

export default NavBar;