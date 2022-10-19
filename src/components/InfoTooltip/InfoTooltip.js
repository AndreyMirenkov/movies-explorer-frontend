import React from "react";
import noOk from '../../images/notOk.svg';
import ok from '../../images/ok.svg';


function InfoTooltip({isOpen, onClose, popupText, successful}){

    const img = successful ? ok : noOk;

    return(
        <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
        <div className="popup__content">
            <button className="popup__close" type="button" onClick={onClose}></button>
            <img src = {img} alt = "картинка" className = "popup__icon"/>
            <p className="popup__text">{popupText}</p>
        </div>
    </div>
    )
}

export default InfoTooltip;