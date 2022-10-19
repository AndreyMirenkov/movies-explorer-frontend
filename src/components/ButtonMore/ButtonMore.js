import React from 'react';

function ButtonMore({handleClick, visible}){

    const buttonMoreClassnName = `buttonmore__button ${visible ? 'buttonmore__button_visible':''}`

    return(
        <div className='buttonmore'>
            <button className = {buttonMoreClassnName} type='button' onClick={handleClick}>Ещё</button>
        </div>
    )
}

export default ButtonMore;