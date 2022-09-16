import React from "react";
import {useState} from 'react'
import FormAuth from "../FormAuth/FormAuth";

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!name || !email || !password){
            return;
        }
    }

    return(
        <div className= 'register'>
            <div className= 'register__content'>
                <div className = 'register__logo'></div>
                <h2 className = 'register__title'>Добро пожаловать!</h2>
                <FormAuth 
                loggedIn = {false}
                onSubmit = {handleSubmit} 
                buttonText = 'Зарегистрироваться' 
                text = 'Уже зарегистрированы?' 
                linkText = 'Войти'
                link = '/signin' 
                name = {name} 
                email = {email} 
                password = {password} 
                handleNameChange = {handleNameChange} 
                handleEmailChange = {handleEmailChange} 
                handlePasswordChange = {handlePasswordChange} />
            </div>
        </div>
    )
}
export default Register;