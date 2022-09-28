import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Footer(){

    return(
        <footer className = 'footer'>
            <div className='footer__content'>
                <h2 className = 'footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className = 'footer__info'>
                    <ul className = 'footer__links'>
                        <li className='footer__item'>
                            <a className='footer__link' href = 'https://practicum.yandex.ru' target = 'blank'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__link' href = 'https://github.com' target= 'blank'>Github</a>
                        </li>
                        <Switch>
                            <Route path = '/movies'>
                                <li className='footer__item'>
                                    <a className='footer__link' href = 'https://facebook.com' target= 'blank'>Facebook</a>
                                </li>
                            </Route>
                            <Route path = '/saved-movies'>
                                <li className='footer__item'>
                                    <a className='footer__link' href = 'https://facebook.com' target= 'blank'>Facebook</a>
                                </li>
                            </Route>
                        </Switch>
                    </ul>
                    <p className = 'footer__year'>&copy;2022</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
