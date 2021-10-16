import React from "react";
import "../css/Modal.css";

const Modal = ({ onClose = () => {}, props}) => {

    return(
        <div className="modal" >
            <p>Meu modal!</p>
            <button onClick={onClose}>Fecha essa merda</button>
        </div>
    )
}

export default Modal;