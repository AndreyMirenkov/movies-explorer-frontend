import React from "react";
import FormAuth from "../FormAuth/FormAuth";
import useFormWithValidation from "../../utils/Validation";
import { Link } from 'react-router-dom'

function Register({handleRegister, disabledInput}){

    const { values, handleChange, errors, isValid } = useFormWithValidation();


    function handleSubmit(e){
        e.preventDefault()
        handleRegister(values.name, values.email, values.password)
    }

    return(
        <div className= 'register'>
            <div className= 'register__content'>
                <Link to = '/' className="register__logo"></Link>
                <h2 className = 'register__title'>Добро пожаловать!</h2>
                <FormAuth
                loggedIn = {false}
                onSubmit = {handleSubmit} 
                buttonText = 'Зарегистрироваться' 
                text = 'Уже зарегистрированы?' 
                linkText = 'Войти'
                link = '/signin'
                disabledInput = {disabledInput}
                values = {values}
                handleChange = {handleChange}
                errors = {errors}
                isValid = {isValid}
                />
            </div>
        </div>
    )
}
export default Register;