import React from "react";
import FormAuth from "../FormAuth/FormAuth";
import useFormWithValidation from "../../utils/Validation";

function Login({handleLogin}){

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e){
        e.preventDefault()
        handleLogin(values.email, values.password)
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
                values = {values}
                handleChange = {handleChange}
                errors = {errors}
                isValid = {isValid} />
            </div>
        </div>
    )
}
export default Login;