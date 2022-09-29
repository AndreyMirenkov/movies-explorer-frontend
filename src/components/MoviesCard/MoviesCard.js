import React from 'react';
import { Switch, Route } from 'react-router-dom';

function MoviesCard({movie, ...props}){

    const isLiked = props.myMovies.some(i => i.movieId === movie.id)

    const moviesLikeButtonClassName = `moviescard__button moviescard__button-save ${isLiked ? 'moviescard__button_active' : ''}`;

    let movieDurationHours = ''

    if (Math.floor(movie.duration / 60)){
        movieDurationHours = `${Math.floor(movie.duration / 60)}ч`
    }
    const movieDurationMinutes = `${movie.duration % 60}м`

    let imageUrl = ''

    if (movie.image.url){
        imageUrl = `https://api.nomoreparties.co${movie.image.url}`
        
    } else{
        imageUrl = movie.image
    }


    function handleDeleteClick(){
        props.handleDeleteMovie(movie);
    }

    return(
        <div className='moviescard'>
            <div className='moviescard__info'>
                <div className='moviescard__text'>
                    <h2 className='moviescard__title'>{movie.nameRU}</h2>
                    <p className='moviescard__time'>{movieDurationHours+' '+movieDurationMinutes}</p>
                </div>
                <Switch>
                    <Route path = '/movies'>
                        <button className = {moviesLikeButtonClassName} type = 'button' onClick={() => props.handleLikeClick(movie)} ></button>
                    </Route>
                    <Route path = '/saved-movies'>
                        <button className = 'moviescard__button moviescard__button-delete' type = 'button' onClick={() => handleDeleteClick(movie)} ></button>
                    </Route>
                </Switch>
            </div>
            <a  href={movie.trailerLink} target = '_blank' rel="noreferrer"><img className='moviescard__img' src = {imageUrl} alt = 'Картинка к фильму' /></a>
        </div>
    )
}

export default MoviesCard;