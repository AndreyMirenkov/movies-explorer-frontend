import React from "react";
import noOk from '../../images/notOk.svg'


function InfoTooltip({isOpen, onClose, popupText}){

    const img = noOk;

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