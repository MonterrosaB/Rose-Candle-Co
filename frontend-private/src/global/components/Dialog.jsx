import React, { useEffect, useRef } from "react";

const Dialog = ({ children, open, onClose }) => {
    const dialogRef = useRef(null);

    // Sincroniza prop `open` con el elemento nativo
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal(); // bloquea el foco
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // Detecta cierre con ESC o <form method="dialog">
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleClose = () => {
            onClose?.();
        };

        dialog.addEventListener("close", handleClose);
        return () => {
            dialog.removeEventListener("close", handleClose);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        // backdrop click: si el click fue fuera del contenido
        const dialog = dialogRef.current;
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!isInDialog) {
            onClose?.();
        }
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [open]);


    return (
        <dialog
            ref={dialogRef}
            className="shadow-xl rounded-xl p-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleBackdropClick}
        >
            {children}
        </dialog>
    );
};

export default Dialog;
