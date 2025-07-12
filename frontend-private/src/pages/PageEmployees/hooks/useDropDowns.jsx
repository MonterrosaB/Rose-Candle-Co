const useDropDown = () => {


    const opcionesEstado = [
        { _id: "true", label: "Activo" },
        { _id: "false", label: "Inactivo" },
    ];

    const opcionesRol = [
        { _id: "admin", label: "Admin" },
        { _id: "employee", label: "Empleado" },
    ];

    return {
        opcionesEstado, opcionesRol
    }
}
export default useDropDown;