import React from 'react';
import {  useContext, useState, useEffect } from 'react'
import currentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, signOut }){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const currentUser = useContext(currentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    },[currentUser])

    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    const onClose = () => {
        signOut();
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name, 
            email
        });
      }

    return(
        <section className = 'profile'>
            <h2 className = 'profile__title'>Привет, {name}!</h2>
            <form className = 'profile__form' onSubmit={handleSubmit}>
                <ul className='profile__list'>
                    <li className = 'profile__item'>
                        <p className = 'profile__subtitle'>Имя</p>
                        <input className = 'profile__input profile__input_type-name' type = 'text' name = 'name' onChange={handleNameChange} value = {name} minLength = '2' maxLength = '30' required></input>
                    </li>
                    <li className = 'profile__item'>
                        <p className = 'profile__subtitle'>E-mail</p>
                        <input className = 'profile__input profile__input_type-email' type = 'email' name = 'email' onChange={handleEmailChange} value = {email} minLength = '5' maxLength = '40' required></input>
                    </li>
                </ul>
                <button className='profile__button profile__button_edit' type = 'submit'>Редактировать</button>
            </form>
            <button className='profile__button profile__button_signout' type = 'click' onClick={onClose} >Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;