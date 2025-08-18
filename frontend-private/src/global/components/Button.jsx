import { Plus } from "lucide-react"
const Button = ({ buttonText, showIcon, type, onClick, style, disable = false }) => {

    //mapa de estilos para elegir
    const styleMap = {
        green: "bg-[#7D9775] text-[#FFF] rounded-lg w-fit px-4 py-1 cursor-pointer",
        gray: "bg-[#9E9E9E] text-[#FFF] rounded-lg w-fit px-4 py-1 cursor-pointer"
    };
    const styleBtn = `${styleMap[style] || styleMap["green"]} ${disable ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <>
            <button className={styleBtn}
                type={type}
                onClick={onClick}
                disabled={disable}
            >
                <div className="flex justify-center items-center gap-2">
                    {showIcon && (
                        <Plus size={18} />
                    )}
                    <span>
                        {buttonText}
                    </span>

                </div>
            </button>
        </>
    )
}
export default Button;