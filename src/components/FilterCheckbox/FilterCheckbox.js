import React from 'react';

function FilterCheckbox({checked, checkedCheckbox, handleClick}){


    return(
        <section className='filtercheckbox'>
            <input className='filtercheckbox__switch-button' checked = {!checked} type = 'checkbox' onChange={checkedCheckbox} onClick={handleClick}></input>
            <h2 className='filtercheckbox__title'>Короткометражки</h2>
        </section>
    )
}

export default FilterCheckbox;