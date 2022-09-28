import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

function FormAuth({ loggedIn, onSubmit, buttonText, text, linkText, link, ...props }){

    const buttonClassLogin = `form__button ${loggedIn ? 'form__button_login' : ''} ${props.isValid ? '' : 'form__button_disabled'}`

    return(
        <form className='form' onSubmit={onSubmit}>
            <Switch>
                <Route path = '/signup'>
                    <p className = 'form__field-name'>Имя</p>
                    <input className = {`form__input form__input_type_name ${props.errors.name ? 'form__input_error' : ''}`} onChange = {props.handleChange} type = 'text' name = 'name' defaultValue={props.values.name} minLength = '2' maxLength = '30' required></input>
                    <span className="form__error" id = 'error-name'>{props.errors.name}</span>
                </Route>
            </Switch>
            <p className = 'form__field-name'>E-mail</p>
            <input className = {`form__input form__input_type_email ${props.errors.email ? 'form__input_error' : ''}`} onChange = {props.handleChange} type = 'email' name = 'email' defaultValue = {props.values.email} minLength = '5' maxLength = '40' required></input>
            <span className="form__error" id = 'error-email'>{props.errors.email}</span>
            <p className = 'form__field-name'>Пароль</p>
            <input className = {`form__input form__input_type_password ${props.errors.password ? 'form__input_error' : ''}`} onChange = {props.handleChange} type = 'password' name = 'password' defaultValue = {props.values.password} minLength = '4' required></input>
            <span className="form__error" id = 'error-password'>{props.errors.password}</span>
            <button className = {buttonClassLogin} type = 'submit' disabled={!props.isValid}>{buttonText}</button>
            <p className="form__text">{text}<Link to = {link} className="form__link">{linkText}</Link></p>
        </form>
    )
}

export default FormAuth;