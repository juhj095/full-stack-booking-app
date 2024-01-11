const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message, confirmMessage }) => {
    return (
        <div className={`confirmation-modal ${isOpen ? "open" : ""}`}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-button-container">
                    <button onClick={onConfirm}>{confirmMessage}</button>
                    <button onClick={onCancel}>Takaisin</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;