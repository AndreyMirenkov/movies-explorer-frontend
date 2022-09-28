import React from 'react';

function AboutProject(){

    return(
        <section className = 'aboutproject' id = 'aboutproject'>
            <div className = 'aboutproject__content'>
                <h2 className = 'aboutproject__title'>О проекте</h2>
                <ul className = 'aboutproject__list'>
                    <li className = 'aboutproject__item'>
                        <h3 className = 'aboutproject__subtitle'>Дипломный проект включал 5 этапов</h3>
                        <p className = 'aboutproject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className = 'aboutproject__item'>
                        <h3 className = 'aboutproject__subtitle'>На выполнение диплома ушло 5 недель</h3>
                        <p className = 'aboutproject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className='aboutproject__numbers'>
                    <div className='aboutproject__indicators'>
                        <p className='aboutproject__index aboutproject__index_backend'>1 неделя</p>
                        <p className='aboutproject__index aboutproject__index_frontend'>4 недели</p>
                    </div>
                    <div className='aboutproject__indicators'>
                    <p className='aboutproject__description aboutproject__description_backend'>Back-end</p>
                        <p className='aboutproject__description aboutproject__description_frontend'>Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;