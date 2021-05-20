import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modals = ({ children }) => {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement('div');
  }
  useEffect(() => {
    modalRoot.appendChild(elementRef.current);
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  return ReactDOM.createPortal(<div>{children}</div>, elementRef.current);
};

export default Modals;
