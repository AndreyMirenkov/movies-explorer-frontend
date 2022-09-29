import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';
import InfoText from '../InfoText/InfoText';

function Movies({buttonSearch, moviesOnPage, buttonMoreClick, movies, visibleButton, preloader, notFoundMovies, infoSearchText, handleLikeClick, handleDeleteMovie, myMovies}){

    return(
        <section className='movies'>
            <SearchForm handleSearch = {buttonSearch} moviesOnPage = {moviesOnPage}/>
            <Preloader open = {preloader}/>
            <InfoText notFoundMovies = {notFoundMovies} infoSearchText = {infoSearchText} />
            <MoviesCardList movies = {movies} handleLikeClick = {handleLikeClick} handleDeleteMovie = {handleDeleteMovie} myMovies = {myMovies}/>
            <ButtonMore handleClick={buttonMoreClick} visible = {visibleButton}/>
        </section>
    )
}

export default Movies;