import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Notfound from '../NotFound/Notfound';
import Navigation from '../Navigation/Navigation';
import currentUserContext from '../../contexts/CurrentUserContext'

function App() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [isNavigationOpen, setNavigationPopup] = useState(false)
    const [currentUser, setCurrentUser] = useState({name: 'Андрей', email: 'andreymirenkov@yandex.ru'});
    const history = useHistory();

    function handleUpdateUser(){

    }

    const signOut = () => {
        setLoggedIn(false);
        history.push('/');
    }

    function handleMenuClick(){
        setNavigationPopup(true);
    }

    function closeMenu(){
        setNavigationPopup(false)
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className = 'App'>
                <Switch>
                <Route exact path = '/signin'>
                    <Login/>
                </Route>
                <Route exact path = '/signup'>
                    <Register/>
                </Route>
                <Route exact path = '/profile'>
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Profile onUpadateUser={handleUpdateUser} signOut = {signOut}/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu}/>
                </Route>
                <Route exact path = '/movies'>
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Movies/>
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'movies'}/>
                </Route>
                <Route exact path = '/saved-movies'>
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <SavedMovies/>
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'saved-movies'} />
                </Route>
                <Route exact path = '/'>
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Main/>
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'main'} />
                </Route>
                <Route path = '/*'>
                    <Notfound/>
                </Route>
                </Switch>
            </div>
        </currentUserContext.Provider>
  );
}

export default App;
