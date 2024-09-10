import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const ModalContent = ({ isOpen, children, onClose }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    //Event handler to close the modal when clicked on backdrop
    const handleDialogClose = (e) => {
        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            className="rounded-md"
            ref={dialogRef}
            onClick={handleDialogClose}
        >
            <div className="min-w-[55vw] min-h-[40vh]">{children}</div>
        </dialog>
    );
};

const Modal = (props) => {
    return createPortal(
        <ModalContent {...props} />,
        document.getElementById("modal")
    );
};

export default Modal;
