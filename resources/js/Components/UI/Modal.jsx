// JS/Components/UI/Modal.jsx

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css'; // Optional: Import styles

/**
 * Modal Component
 * 
 * A reusable modal dialog component with accessibility features
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Callback when modal should close
 * @param {string} props.title - Modal title
 * @param {ReactNode} props.children - Modal content
 * @param {string} props.size - Modal size: 'sm', 'md', 'lg', 'xl'
 * @param {boolean} props.closeOnOverlayClick - Close when clicking overlay
 * @param {boolean} props.closeOnEscape - Close on ESC key press
 * @param {string} props.className - Additional CSS classes
 * @param {ReactNode} props.actions - Footer actions (buttons)
 * @param {boolean} props.showCloseButton - Show close button in header
 * @param {string} props.ariaLabel - ARIA label for accessibility
 * @param {string} props.ariaDescribedBy - ARIA describedby for accessibility
 */
const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  actions = null,
  showCloseButton = true,
  ariaLabel = 'Modal dialog',
  ariaDescribedBy = '',
  ...rest
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Size mapping
  const sizeClasses = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg',
    xl: 'modal-xl',
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEscape && event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Trap focus inside modal
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore focus when modal closes
      if (isOpen && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'modal-open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        className={`modal-container ${sizeClasses[size]} ${className}`}
        tabIndex={-1}
        role="document"
        {...rest}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <button
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {actions && <div className="modal-footer">{actions}</div>}
      </div>
    </div>
  );
};

// PropTypes for type checking
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  className: PropTypes.string,
  actions: PropTypes.node,
  showCloseButton: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
};

// Default props
Modal.defaultProps = {
  title: '',
  size: 'md',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  className: '',
  actions: null,
  showCloseButton: true,
  ariaLabel: 'Modal dialog',
  ariaDescribedBy: '',
};

export default Modal;