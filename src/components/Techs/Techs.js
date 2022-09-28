import React from 'react';

function Techs(){

const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'MongoDB']

    return(
        <section className = 'techs' id = 'techs'>
            <div className = 'techs__content'>
                <h2 className = 'techs__title'>Технологии</h2>
                <h3 className = 'techs__subtitle'>7 технологий</h3>
                <p className = 'techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className = 'techs__list'>
                    {techs.map((tech, index) => (
                        <li key = {index} className = 'techs__item'>{tech}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Techs;