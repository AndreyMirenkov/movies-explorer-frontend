import React from 'react';
import {  useContext, useEffect } from 'react'
import currentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/Validation';

function Profile({ onUpdateUser, signOut, disabledInput }){

    const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();
    const currentUser = useContext(currentUserContext);
    const edit = currentUser.name !== values.name || currentUser.email !== values.email;

    useEffect(() => {
        setValues({name: currentUser.name, email: currentUser.email})
    },[currentUser, setValues])

    const onClose = () => {
        signOut();
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(
            values.name, 
            values.email
        );
      }

    return(
        <section className = 'profile'>
            <h2 className = 'profile__title'>Привет, {currentUser.name}!</h2>
            <form className = 'profile__form' onSubmit={handleSubmit}>
                <ul className='profile__list'>
                    <li className = 'profile__item'>
                        <div className='profile__input-block'>
                            <p className = 'profile__subtitle'>Имя</p>
                            <input className = {`profile__input profile__input_type-name ${errors.name ? 'profile__input_error' : ''}`} type = 'text' name = 'name' onChange={handleChange} defaultValue = {values.name} minLength = '2' maxLength = '30' required disabled = {disabledInput}></input>
                        </div>
                        <span className="profile__error" id = 'error-name'>{errors.name}</span>
                    </li>
                    <li className = 'profile__item'>
                        <div className='profile__input-block'>
                            <p className = 'profile__subtitle'>E-mail</p>
                            <input className = {`profile__input profile__input_type-email ${errors.email ? 'profile__input_error' : ''}`} type = 'email' name = 'email' onChange={handleChange} defaultValue = {values.email} minLength = '5' maxLength = '40' required disabled = {disabledInput}></input>
                        </div>
                        <span className="profile__error" id = 'error-name'>{errors.email}</span>
                    </li>
                </ul>
                <button className = {`profile__button profile__button_edit ${edit ? '' : 'profile__button_disabled'}`} type = 'submit' disabled ={!isValid || !edit}>Редактировать</button>
            </form>
            <button className='profile__button profile__button_signout' type = 'click' onClick={onClose} >Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;