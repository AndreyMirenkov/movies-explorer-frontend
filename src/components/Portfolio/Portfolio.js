import React from 'react';

function Portfolio(){

    return(
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__links'>
                <li className='portfolio__item'>
                    <a className='portfolio__link' href = 'https://github.com/AndreyMirenkov/how-to-learn' target='blank'>Статичный сайт<span className='portfolio__icon'>↗</span></a>
                </li>
                <li className='portfolio__item'>
                    <a className='portfolio__link' href = 'https://github.com/AndreyMirenkov/russian-travel' target='blank'>Адаптивный сайт<span className='portfolio__icon'>↗</span></a>
                </li>
                <li className='portfolio__item'>
                    <a className='portfolio__link' href = 'https://github.com/AndreyMirenkov/mesto' target='blank'>Одностраничное приложение<span className='portfolio__icon'>↗</span></a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;