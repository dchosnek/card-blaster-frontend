import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons';

// Wrap ToastManager with forwardRef
const ToastManager = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]); // Store active toasts

  // Expose methods to parent through the ref
  useImperativeHandle(ref, () => ({
    addToast,
  }));

  // Add a toast to the state
  function addToast(message, success) {
    const variant = success ? "success" : "danger";
    const title = success ? "Success" : "Error";
    const newToast = { id: Date.now(), message, variant, title };
    setToasts([...toasts, newToast]);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => removeToast(newToast.id), 5000);
  }

  // Remove a toast by its ID
  function removeToast(id) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContainer className="p-5 position-fixed top-0 end-0">
      {toasts.map((toast) => (
        <Toast className={`bg-${toast.variant} text-white`} key={toast.id} onClose={() => removeToast(toast.id)}>
          <Toast.Header closeButton={true}>
          <CheckCircleFill hidden={toast.variant !== 'success'} className='me-2' />
          <ExclamationCircleFill hidden={toast.variant !== 'danger'} className='me-2' />
            <strong className="me-auto">{toast.title}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="bg-light text-black">{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
});

export default ToastManager;