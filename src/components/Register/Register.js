import React from "react";
import FormAuth from "../FormAuth/FormAuth";
import useFormWithValidation from "../../utils/Validation";

function Register({handleRegister}){

    const { values, handleChange, errors, isValid } = useFormWithValidation();


    function handleSubmit(e){
        e.preventDefault()
        handleRegister(values.name, values.email, values.password)
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