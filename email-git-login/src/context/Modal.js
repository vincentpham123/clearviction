import React, { useEffect, useRef, useState, useContext } from "react"
import ReactDOM from 'react-dom';
import './modal.css'
const ModalContext = React.createContext();

export const ModalProvider = ( {children}) => {
    const modalRef = useRef();

    const [value, setValue] = useState();


    useEffect(()=>{
        setValue(modalRef.current);
    },[])
    
    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div className='modal-container' ref={modalRef} />
        </>
    )
}


export const Modal = ({onClose, children}) => {
    const modalNode = useContext(ModalContext);

    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id='modal-content'>
                {children}
            </div>
        </div>,
        modalNode

    );
}

