import { X } from "lucide-react";
const FormDiv = ({ children, headerLabel, onClose, onSubmit }) => {

    return (
        <div className="shadow-2xl rounded-b-xl w-3xl">
            <div className="flex justify-between item bg-[#C2A878] text-2xl p-4 font-bold rounded-t-xl">
                {headerLabel}
                {<X className="cursor-pointer"
                    onClick={onClose}
                    strokeWidth={3} />}
            </div>
            <form onSubmit={onSubmit} className="p-6">
                {children}
            </form>
        </div>

    )
}
export default FormDiv;