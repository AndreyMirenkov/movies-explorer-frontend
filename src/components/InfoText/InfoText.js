import React from 'react';

function InfoText({notFoundMovies, infoSearchText}){
    const infoTextClassName = `infotext ${notFoundMovies ? 'infotext_visible': ''}`

    return(
        <section className = {infoTextClassName}>
            { 
                infoSearchText 
                ? 
                <h2 className = 'infotext__title'>{infoSearchText}</h2>
                :
                <h2 className = 'infotext__title'>Во время запроса произошла ошибка. 
                Возможно, проблема с соединением или сервер недоступен. 
                Подождите немного и попробуйте ещё раз</h2>        
            }
        </section>
    )
}

export default InfoText;