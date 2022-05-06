import './App.css';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import GamePage from './components/GamePage';
import ErrorPage from './components/ErrorPage';
import { User } from "./requests";
import GameIndexPage from "./components/GameIndexPage";
import GameShowPage from './components/GameShowPage';
import ProfilePage from "./components/ProfilePage";

export default function App() {
  const [user, setUser] = useState(null);
  // fix use effect loop and make better animations
  useEffect(() => {
    getCurrentUser();
  }, [])

  const getCurrentUser = () => {
    return User.current().then(user => {
      if (user?.id) {
        setUser(user)
      }
    })
  }

  const onSignOut = () => { setUser(null) }

  return (
    <BrowserRouter>
      <NavBar currentUser={user} onSignOut={onSignOut} />
      <Routes>
        <Route path='/profile_page/:id' element={<ProfilePage/>}/>
        <Route path='/index/:id' element={<GameShowPage/>}/>
        <Route path='/index' element={<GameIndexPage/>}/>
        <Route path='/Sign_Up' element={<SignUpPage/>}/>
        <Route path='/Sign_In' element={<SignInPage/>} onSignIn={()=>getCurrentUser}/>
        <Route path='/' element={<GamePage currentUser={user}/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
