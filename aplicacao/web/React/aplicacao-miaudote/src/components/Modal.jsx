import React from "react";
import "../css/Modal.css";

const Modal = ({ onClose = () => {}, props}) => {

    // const clickForaModal = (e) => {
    //     if (e.target.id === "modal") {
    //         onClose();
    //     }
    // }

    return(
        <div className="modal" >
            <p>Meu modal!</p>
            <button onClick={onClose}>Fecha essa merda</button>
        </div>
    )
}

export default Modal;