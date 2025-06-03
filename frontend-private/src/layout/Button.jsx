import {Plus} from "lucide-react"
const Button = ({buttonText ,showIcon, onClick, type}) => {

    return(
        <>
            <button className="bg-[#7D9775] text-[#FFF] rounded-lg w-fit px-4 py-1 cursor-pointer" type={type} onClick={onClick}>
                <div className="flex justify-center items-center gap-2">
                    <span className="">{buttonText}</span>
                    {showIcon && (
            <Plus size={18} />
        )}
                </div>
            </button>
        </>
    )
} 
export default Button;