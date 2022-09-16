import React from 'react';

function Notfound(){

    function buttonClick(){
        window.history.back();
    }

    return(
        <section className = 'notfound'>
            <h1 className = 'notfound__number-error'>404</h1>
            <h2 className = 'notfound__text'>Страница не найдена</h2>
            <button onClick={buttonClick}  className='notfound__button'>Назад</button>
        </section>
    )
}

export default Notfound