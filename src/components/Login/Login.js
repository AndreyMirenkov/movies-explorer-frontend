import React from "react";
import {useState} from 'react'
import FormAuth from "../FormAuth/FormAuth";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!email || !password){
            return;
        }
    }

    return(
        <div className= 'login'>
            <div className= 'login__content'>
                <div className = 'login__logo'></div>
                <h2 className = 'login__title'>Рады видеть!</h2>
                <FormAuth 
                loggedIn={true}
                onSubmit = {handleSubmit} 
                buttonText = 'Войти' 
                text = 'Ещё не зарегистрированы?' 
                linkText = 'Регистрация'
                link = '/signup' 
                email = {email} 
                password = {password} 
                handleEmailChange = {handleEmailChange} 
                handlePasswordChange = {handlePasswordChange} />
            </div>
        </div>
    )
}
export default Login;