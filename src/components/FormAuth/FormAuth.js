import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

function FormAuth({ loggedIn, onSubmit, buttonText, text, linkText, link, ...props }){

    const buttonClassLogin = `form__button ${loggedIn ? 'form__button_login' : ''}`


    return(
        <form className='form' onSubmit={onSubmit}>
            <Switch>
                <Route path = '/signup'>
                    <p className = 'form__field-name'>Имя</p>
                    <input className = 'form__input form__input_type_name' onChange = {props.handleNameChange} type = 'text' name = 'name' value = {props.name} minLength = '2' maxLength = '30' required></input>
                    <span className="form__error" id = 'error-name'></span>
                </Route>
            </Switch>
            <p className = 'form__field-name'>E-mail</p>
            <input className = 'form__input form__input_type_email' onChange = {props.handleEmailChange} type = 'email' name = 'emial' value = {props.email} minLength = '5' maxLength = '40' required></input>
            <span className="form__error" id = 'error-email'></span>
            <p className = 'form__field-name'>Пароль</p>
            <input className = 'form__input form__input_type_password' onChange = {props.handlePasswordChange} type = 'password' name = 'password' value = {props.password} minLength = '4' required></input>
            <span className="form__error" id = 'error-password'></span>
            <button className = {buttonClassLogin} type = 'submit'>{buttonText}</button>
            <p className="form__text">{text}<Link to = {link} className="form__link">{linkText}</Link></p>
        </form>
    )
}

export default FormAuth;