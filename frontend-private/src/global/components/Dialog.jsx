const Dialog = ({ children, open, onClose }) => {

    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.(); // Evita cerrar si haces clic dentro del diálogo
        }
    };

    return (
        <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto pt-10 pb-10" onClick={handleBackdropClick}>
            <div className="bg-[#faf7f2] shadow-xl rounded-xl">
                {children}
            </div>
        </div>
    )
}
export default Dialog;