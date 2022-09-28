import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, ...props}){

    return(
        <section className='moviescardlist'>
            {movies.map((movie, index) => (
                <MoviesCard key = {index} movie = {movie} handleLikeClick = {props.handleLikeClick} handleDeleteMovie = {props.handleDeleteMovie} myMovies = {props.myMovies}/>
            ))
            }
        </section>
    )
}

export default MoviesCardList;