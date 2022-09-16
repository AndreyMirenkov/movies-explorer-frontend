import React from 'react';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

function MoviesCard({movie}){

    const [likes, setLikes] = useState(false)

    const moviesLikeButtonClassName = `moviescard__button moviescard__button-save ${likes ? 'moviescard__button_active' : ''}`;

    function handleClick(){
        setLikes(!likes)
    }

    return(
        <div className='moviescard'>
            <div className='moviescard__info'>
                <div className='moviescard__text'>
                    <h2 className='moviescard__title'>{movie.title}</h2>
                    <p className='moviescard__time'>{movie.time}</p>
                </div>
                <Switch>
                    <Route path = '/movies'>
                        <button className = {moviesLikeButtonClassName} type = 'button' onClick={handleClick} ></button>
                    </Route>
                    <Route path = '/saved-movies'>
                        <button className = 'moviescard__button moviescard__button-delete' type = 'button' onClick={handleClick} ></button>
                    </Route>
                </Switch>
            </div>
            <img className='moviescard__img' src = {movie.img} alt = 'Картинка к фильму'/>
        </div>
    )
}

export default MoviesCard;