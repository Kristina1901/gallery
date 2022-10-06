import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
const modalRoot = document.querySelector('#modalRoot');

export default function Modal({ onClose, pic }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    };
    const handleClickAway = e => {
      if (e.target.className.includes('overlay')) {
        return onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickAway);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickAway);
    };
  });

  return createPortal(
    <div className='overlay'>
      <div className='modal'>
        <img src={pic} alt="" width='1000px'/>
      </div>
    </div>,
    modalRoot
  );
}

