import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(){

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <section className='searchform'>
            <div className='searchform__content'>
                <form className='searchform__form' onSubmit={handleSubmit} name = 'searchform'>
                    <div className='searchform__icon'></div>
                    <input className='searchform__input' placeholder='Фильм'></input>
                    <button className='searchform__button' type='submit'></button>
                </form>
                <FilterCheckbox/>
            </div>
        </section>        
    )
}

export default SearchForm;