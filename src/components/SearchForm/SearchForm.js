import React from 'react';
import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({handleSearch, moviesOnPage, noSearchText, disabledInput}){ 

    const [searchText, setSearchText] = useState('');
    const [oldSearchText, setOldSearchText] = useState('');
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('searchTextMovies') && window.location.pathname === '/movies' ){
            setSearchText(localStorage.getItem('searchTextMovies'));
        }
        if (localStorage.getItem('searchTextSaveMovies') && window.location.pathname === '/saved-movies'){
            setSearchText(localStorage.getItem('searchTextSaveMovies'));
        }
    },[])

    useEffect(() => {
        if (localStorage.getItem('oldSearchTextMovies') && window.location.pathname === '/movies' ){
            setOldSearchText(localStorage.getItem('oldSearchTextMovies'));
        }
        if (localStorage.getItem('oldSearchTextSaveMovies') && window.location.pathname === '/saved-movies'){
            setOldSearchText(localStorage.getItem('oldSearchTextSaveMovies'));
        }
    },[])

    useEffect(() => {
        if (localStorage.getItem('checkboxMovies') && window.location.pathname === '/movies' ){
            setChecked(JSON.parse(localStorage.getItem('checkboxMovies')));
        }
        if (localStorage.getItem('checkboxSaveMovies') && window.location.pathname === '/saved-movies'){
            setChecked(JSON.parse(localStorage.getItem('checkboxSaveMovies')));
        }
    },[])

    function checkedCheckbox(){
        setChecked(!checked)
        if (window.location.pathname === '/movies'){
            localStorage.setItem('checkboxMovies', !checked)
        } else {
            localStorage.setItem('checkboxSaveMovies', !checked);
        }
    }


    function handleSearchChange(e){
        setSearchText(e.target.value)
        if (window.location.pathname === '/movies'){
        localStorage.setItem('searchTextMovies', e.target.value)
        } else {
            localStorage.setItem('searchTextSaveMovies', e.target.value);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if (searchText){
            setOldSearchText(searchText);
            if (window.location.pathname === '/movies'){
                localStorage.setItem('oldSearchTextMovies', searchText)
            } else {
                localStorage.setItem('oldSearchTextSaveMovies', searchText);
            }
            handleSearch(searchText, !checked);
        } else {
            noSearchText();
        } 
    }

    function handlechecked(e){
        if (moviesOnPage){
        handleSearch(oldSearchText, checked);
        }
    }

    return(
        <section className='searchform'>
            <div className='searchform__content'>
                <form className='searchform__form' onSubmit={handleSubmit} name = 'searchform' noValidate>
                    <div className='searchform__icon'></div>
                    <input className='searchform__input' onChange={handleSearchChange} name = 'movie' type = 'text' value = {searchText} placeholder='Фильм' required disabled = {disabledInput}></input>
                    <button className='searchform__button' type='submit'></button>
                </form>
                <FilterCheckbox checked = {checked} checkedCheckbox = {checkedCheckbox} handleClick = {handlechecked}/>
            </div>
        </section>        
    )
}

export default SearchForm;