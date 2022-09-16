import React from 'react';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';

function SavedMovies(){

    const [loading, setLoading] = useState(false);

    return(
        <section className='savedmovies'>
            <SearchForm/>
            <Preloader open = {loading} />
            <MoviesCardList/>
            <ButtonMore/>
        </section>
    )
}

export default SavedMovies;