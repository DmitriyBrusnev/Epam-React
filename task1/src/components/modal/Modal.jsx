import React from 'react';
import ReactDom from 'react-dom';

import './modal.scss';

export default function Modal({ open, title, children, onClose, okHandler }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div className="gray-back"></div>
            <div className="modal-inner">
                <div className="title">{ title }</div>
                <span className="icon-close" onClick={ onClose }>&#10006;</span>
                <span className="icon-ok" onClick={ okHandler }>Ok</span>
                { children }
            </div>
        </>,
        document.getElementById('modal')
    )
}