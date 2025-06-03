const Dropdown = (data) => {

  return (
    <>
      <div className="flex flex-col rounded-xl px-2.5 pb-3 pt-1.5 w-lg border border-[#9E9E9E] focus-within:border-[#333] transition duration-300 ease-in-out">
        <label for="suppliers" className="text-sm font-medium">Proveedores</label>
        <select id="suppliers" name="suppliers">
          <option selected disabled hidden  >Selecciona el proveedor</option>
          <option value="volvo">Volvo</option>
        </select>
      </div>

    </>
  )
}
export default Dropdown;