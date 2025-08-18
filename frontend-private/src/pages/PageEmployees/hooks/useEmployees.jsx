import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchEmployees from "./useFetchEmployees";

const ApiEmployeesRegister = "https://rose-candle-co.onrender.com/api/registerEmployees";
const ApiEmployees = "https://rose-candle-co.onrender.com/api/employees";

const useEmployees = (methods) => {
  const { getEmployeeById, getEmployees } = useFetchEmployees();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // Agrega estados para cada campo que uses en formulario
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dui, setDui] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [employeeErrors, setEmployeeErrors] = useState({});

  const cleanData = () => {
    reset();
    setEmployeeErrors({});
    setName("");
    setSurnames("");
    setEmail("");
    setPhone("");
    setDui("");
    setPassword("");
    setUser("");
  };

  // Validación personalizada si quieres seguir usándola
  const validateForm = (data) => {
    const errors = {};

    if (!data.name) errors.name = "Campo requerido";
    if (!data.surnames) errors.surnames = "Campo requerido";
    if (!data.email) errors.email = "Campo requerido";
    if (!data.password && !id) errors.password = "Campo requerido"; // Solo requerido en creación
    if (!data.phone) errors.phone = "Campo requerido";
    if (!data.dui) errors.dui = "Campo requerido";
    if (!data.user) errors.user = "Campo requerido";

    // ... el resto de validaciones

    return errors;
  };

  const finishOperation = (message) => {
    toast.success(message);
    cleanData();
    getEmployees();
    navigate("/employees");
  };

  const saveEmployeeForm = async (dataForm) => {
    const validationErrors = validateForm(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setEmployeeErrors(validationErrors);
      return false;
    }

    try {
      setLoading(true);

      const response = await fetch(ApiEmployeesRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || "Error desconocido";
        toast.error(msg);
        return false;
      }

      finishOperation("Empleado creado exitosamente");
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al registrar el empleado");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editEmployee = async (employeeId, dataForm) => {
    const validationErrors = validateForm(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setEmployeeErrors(validationErrors);
      return false;
    }

    try {
      setLoading(true);

      const response = await fetch(`${ApiEmployees}/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || "Error desconocido";
        toast.error(msg);
        return false;
      }

      finishOperation("Empleado actualizado exitosamente");
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al actualizar el empleado");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    surnames,
    setSurnames,
    email,
    setEmail,
    phone,
    setPhone,
    dui,
    setDui,
    password,
    setPassword,
    user,
    setUser,
    register,
    handleSubmit,
    errors: { ...errors, ...employeeErrors },
    loading,
    editEmployee,
    saveEmployeeForm,
  };
};

export default useEmployees;
