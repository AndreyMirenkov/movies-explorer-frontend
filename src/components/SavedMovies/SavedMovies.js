import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import InfoText from '../InfoText/InfoText';

function SavedMovies({buttonSearch, moviesOnPage, movies, preloader, notFoundMovies, infoSearchText, handleDeleteMovie, myMovies, noSearchText, disabledInput}){

    return(
        <section className='savedmovies'>
            <SearchForm handleSearch = {buttonSearch} moviesOnPage = {moviesOnPage} noSearchText = {noSearchText} disabledInput = {disabledInput}/>
            <Preloader open = {preloader} />
            <InfoText notFoundMovies = {notFoundMovies} infoSearchText = {infoSearchText}/>
            <MoviesCardList movies = {movies} handleDeleteMovie = {handleDeleteMovie} myMovies = {myMovies}/>
        </section>
    )
}

export default SavedMovies;