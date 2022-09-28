import React from 'react';
import avatar from '../../images/aboutme-avatar.jpg'

function AboutMe(){

        return(
            <section className = 'aboutme' id = 'aboutme'>
                <h2 className = 'aboutme__title'>Студент</h2>
                <div className = 'aboutme__content'>
                    <img className = 'aboutme__avatar' src = {avatar} alt = 'аватар' />
                    <div className = 'aboutme__description'>
                        <h3 className = 'aboutme__name'>Виталий</h3>
                        <h4 className = 'aboutme__work'>Фронтенд-разработчик, 30 лет</h4>
                        <p className='aboutme__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <ul className = 'aboutme__links'>
                            <li className='aboutme__item'>
                                <a className='aboutme__link' href = 'https://facebook.com' target = 'blank'>Facebook</a>
                            </li>
                            <li className='aboutme__item'>
                                <a className='aboutme__link' href = 'https://github.com' target= 'blank'>Github</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        )
}

export default AboutMe;
