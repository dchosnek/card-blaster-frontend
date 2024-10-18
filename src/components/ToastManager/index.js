import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Wrap ToastManager with forwardRef
const ToastManager = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]); // Store active toasts

  // Expose methods to parent through the ref
  useImperativeHandle(ref, () => ({
    addToast,
  }));

  // Add a toast to the state
  function addToast(operation, message, variant = 'secondary') {
    const newToast = { id: Date.now(), operation, message, variant };
    setToasts([...toasts, newToast]);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => removeToast(newToast.id), 5000);
  }

  // Remove a toast by its ID
  function removeToast(id) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast className={`bg-${toast.variant} text-white`} key={toast.id} onClose={() => removeToast(toast.id)}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{toast.operation}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
});

export default ToastManager;