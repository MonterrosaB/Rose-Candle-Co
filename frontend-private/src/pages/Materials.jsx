import RegisterMaterial from "../modules/materials/RegisterMaterial";
const Materials = () =>{
    return(
        <>
        <div className="p-4 flex flex-col gap-4">
            {<RegisterMaterial/>}
        </div>
        </>
    )
}
export default Materials;