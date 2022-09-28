import React from 'react';
import { useState } from 'react';

function FilterCheckbox(){

    const [checked, setChecked] = useState(true)

    
    function checkedCheckbox(){
        setChecked(!checked)
    }

    return(
        <section className='filtercheckbox'>
            <input className='filtercheckbox__switch-button' checked = {!checked} type = 'checkbox' onChange={checkedCheckbox}></input>
            <h2 className='filtercheckbox__title'>Короткометражки</h2>
        </section>
    )
}

export default FilterCheckbox;