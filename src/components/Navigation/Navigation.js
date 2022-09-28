import React from 'react';
import { Link } from 'react-router-dom'

function Navigation({ isOpen, onClose, link }){

    return(
        <section className = {`navigation ${isOpen ? 'navigation_opened' : ''}`}>
            <div className='navigation__overlay' onClick={onClose}></div>
            <div className = 'navigation__content'>
            <button className = 'navigation__button-close' onClick={onClose} ></button>
                <ul className = 'navigation__list'>
                    <li className='navigation__item' >
                        <Link to = '/' onClick={onClose} className = {`navigation__link ${link === 'main' ? 'navigation__link_border' : ''}`}>Главная</Link>
                    </li>
                    <li className='navigation__item'>
                        <Link to = '/movies' onClick={onClose} className = {`navigation__link ${link === 'movies' ? 'navigation__link_border' : ''}`}>Фильмы</Link>
                    </li>
                    <li className='navigation__item'>
                        <Link to = '/saved-movies' onClick={onClose} className = {`navigation__link ${link === 'saved-movies' ? 'navigation__link_border' : ''}`}>Сохранённые фильмы</Link>
                    </li>
                </ul>
                    <Link to = '/profile' onClick={onClose} className = 'navigation__link navigation__link_profile'>Аккаунт</Link>
            </div>
        </section>
    )
}

export default Navigation;