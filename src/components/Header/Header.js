import React from "react";
import { Link, NavLink } from 'react-router-dom';

function Header({ loggedIn, onNavigation }){


    return(
        <header className = 'header'>
            <div className = 'header__content'>
                <Link to = '/' className="header__logo"></Link>
                    {loggedIn ?
                      <div className = 'header__navbar'>
                      <div className= 'header__links'>
                          <NavLink to = '/movies' className="header__link header__link_movies" activeClassName="header__link_active">Фильмы</NavLink>
                          <NavLink to = '/saved-movies' className="header__link header__link_saved-movies" activeClassName="header__link_active">Сохранённые фильмы</NavLink>
                       </div>   
                      <button className="header__menu" onClick={onNavigation} />
                      <Link to = '/profile' className="header__link header__link_profile">Аккаунт</Link>
                    </div>
                    :
                    <div className="header__links">
                        <Link to = '/signup' className="header__link header__link_sign-up">Регистрация</Link>
                        <Link to = '/signin' className="header__link header__link_sign-in">Войти</Link>
                    </div>
                    }
            </div>
        </header>
    )

}

export default Header;