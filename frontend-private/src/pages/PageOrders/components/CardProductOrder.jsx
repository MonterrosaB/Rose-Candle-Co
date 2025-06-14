import Card from "../../../assets/calmness.jpg";


const CardProductOrder = ({ }) => {

    return (
        <>
            <div className="w-full h-fit bg-[#F0ECE6] border-t border-b p-2 flex items-center justify-around font-serif text-sm">
                <div className="flex justify-center items-center gap-2">
                    <img src={Card} alt="" className="w-10 h-14 object-contain" />
                    <h2>Calmness</h2>
                </div>
                <p>
                    $9.00
                </p>
                <p>
                    10
                </p>
                <p>
                    4oz
                </p>
                <p>
                    $90.00
                </p>
            </div>
        </>
    )
}
export default CardProductOrder;