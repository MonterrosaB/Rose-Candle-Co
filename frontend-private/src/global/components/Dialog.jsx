const Dialog = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};


export default Dialog;
