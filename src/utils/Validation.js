import React from 'react';
import {useState, useCallback} from 'react'

const validationEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      let validate = target.closest("form").checkValidity()
  
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });

      if (name === 'email'){
        validate = validationEmail(value);
        if(!validate){
          setErrors({...errors, email: 'Неверный формат почты.'})
        }
      }

      setIsValid(validate);
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, errors, isValid, resetForm, setValues };
  }

  export default useFormWithValidation;
