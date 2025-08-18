import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const useEmployees = () => {
    const ApiRegister = "https://rose-candle-co.onrender.com/api/registerEmployees";
    const ApiEmployees = "https://rose-candle-co.onrender.com/api/employees";

    const [activeTab, setActiveTab] = useState("list");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [surnames, setSurnames] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dui, setDui] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState("");
    const [errorEmployee, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    const cleanData = () => {
        setName("");
        setSurnames("");
        setEmail("");
        setPassword("");
        setPhone("");
        setUser("");
        setDui("");
        setRole("");
        setIsActive("");
        setId("");
    };

    // Función para guardar los datos del empleado
    const handleSubmit = async (e, overrides = {}) => {
        e.preventDefault();
        setError(null); // Limpiar error general
        setSuccess(null);
        setErrors({}); // Limpiar errores por campo
        setLoading(true);

        // Valores por defecto (first user)
        const finalRole = overrides.role || role;
        const finalIsActive = overrides.isActive ?? isActive;

        // Validación de campos vacíos
        if (!name || !surnames || !email || !password || !phone || !dui || !user) {
            const newErrors = {
                name: !name && "Campo requerido",
                surnames: !surnames && "Campo requerido",
                email: !email && "Campo requerido",
                password: !password && "Campo requerido",
                phone: !phone && "Campo requerido",
                dui: !dui && "Campo requerido",
                user: !user && "Campo requerido",
            };

            setErrors(newErrors);
            //toast.error("Todos los campos son obligatorios");
            setLoading(false);
            return false;
        }

        // Empleado
        const newEmployee = {
            name,
            surnames,
            email,
            password,
            phone,
            dui,
            role: finalRole,
            isActive: finalIsActive,
            user,
        };

        try {
            const response = await fetch(ApiRegister, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployee),
            });

            const data = await response.json();

            // Errores por validaciones del backend
            if (!response.ok) {
                const msg = data?.message || "Error desconocido";
                const backendErrors = {};

                // Si viene un objeto de errores (ValidationError)
                if (data.errors) {
                    Object.entries(data.errors).forEach(([field, info]) => {
                        backendErrors[field] = info.message;
                    });
                } else {
                    // Casos personalizados por string
                    if (msg.includes("Employee already exists")) {
                        backendErrors.email = "Este correo ya está registrado";
                    }

                    if (msg.includes("Too short")) {
                        if (name.length < 3) backendErrors.name = "Nombre muy corto";
                        if (surnames.length < 3)
                            backendErrors.surnames = "Apellido muy corto";
                        if (password.length < 8)
                            backendErrors.password = "Contraseña muy corta";
                        if (phone.length < 9) backendErrors.phone = "Teléfono muy corto";
                        if (dui.length < 10) backendErrors.dui = "DUI muy corto";
                    }

                    if (msg.includes("Too large")) {
                        if (name.length > 100)
                            backendErrors.name = "Nombre muy largo";
                        if (surnames.length > 100)
                            backendErrors.surnames = "Apellido muy largo";
                    }

                    if (msg.includes("Please complete all the fields")) {
                        toast.error("Todos los campos son obligatorios");
                    }
                }

                setErrors(backendErrors);
                toast.error(msg);
                return false;
            }

            // Todo bien
            toast.success("¡Cuenta creada con éxito!");
            setSuccess("¡Cuenta creada con éxito!");
            setEmployees(data);
            cleanData();
            fetchData();
            return true;
        } catch (error) {
            console.error("Error:", error);
            setError("Ocurrió un error al registrar el empleado");
            toast.error("Ocurrió un error al registrar el empleado");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener los datos de los empleados
    const fetchData = async () => {
        try {
            const response = await fetch(ApiEmployees);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            const response = await fetch(`${ApiEmployees}/${id}`, {

                method: "DELETE",
                body: JSON.stringify(deleteEmployee),
            });

            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }

            const result = await response.json();
            console.log("Deleted:", result);
            toast.success("Empleado eliminado");

            // Actualizar la lista después de borrar
            fetchData();
        } catch (error) {
            console.error("Error deleting employee sfs:", error);
        }
    };

    const updateEmployee = async (dataEmployee) => {
        setId(dataEmployee._id);
        setName(dataEmployee.name);
        setSurnames(dataEmployee.surnames);
        setEmail(dataEmployee.email);
        setPhone(dataEmployee.phone);
        setDui(dataEmployee.dui);
        setIsActive(dataEmployee.isActive);
        setUser(dataEmployee.user);
        setRole(dataEmployee.role);
        setError(null);
        setSuccess(null);
        setActiveTab("form");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedEmployee = {
                name,
                surnames,
                email,
                password,
                phone,
                dui,
                role,
                isActive,
                user,
            };

            const response = await fetch(`${ApiEmployees}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el empleado");
            }

            toast.success("Empleado actualizado");
            setSuccess("Empleado actualizado correctamente");
            cleanData();
            setId("");
            setActiveTab("list");
            fetchData();
        } catch (error) {
            setError(error.message);
            alert("Error al actualizar el empleado");
            console.error("Error:", errorEmpleado);
        } finally {
            setLoading(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        id,
        setId,
        name,
        setName,
        surnames,
        setSurnames,
        email,
        setEmail,
        password,
        setPassword,
        phone,
        setPhone,
        dui,
        setDui,
        user,
        setUser,
        isActive,
        setIsActive,
        role,
        setRole,
        errorEmployee,
        setError,
        success,
        setSuccess,
        loading,
        setLoading,
        employees,
        setEmployees,
        cleanData,
        handleSubmit,
        fetchData,
        deleteEmployee,
        updateEmployee,
        handleUpdate,
        errors,
        setErrors,
    };
};

export default useEmployees;