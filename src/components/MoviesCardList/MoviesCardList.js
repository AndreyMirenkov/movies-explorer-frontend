import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import img1 from '../../images/img1.svg'
import img2 from '../../images/img2.svg'
import img3 from '../../images/img3.svg'
import img4 from '../../images/img4.svg'
import img5 from '../../images/img5.svg'
import img6 from '../../images/img6.svg'
import img7 from '../../images/img7.svg'
import img8 from '../../images/img8.svg'

function MoviesCardList(){

    const movies = [
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img1,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img2,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img3,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img4,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img5,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img6,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img7,
        },
        {
            title: '33 слова о дизайне',
            time: '1ч 47м',
            img: img8,
        }
    ]

    return(
        <section className='moviescardlist'>
            {movies.map((movie, index) => (
                <MoviesCard key = {index} movie = {movie}/>
            ))
            }
        </section>
    )
}

export default MoviesCardList;