import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchEmployees from "./useFetchEmployees";

const ApiEmployeesRegister = "http://localhost:4000/api/registerEmployees";
const ApiEmployees = "http://localhost:4000/api/employees";

const useDataEmployee = (methods) => {
  const { getEmployeeById, getEmployees } = useFetchEmployees();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [employeeErrors, setEmployeeErrors] = useState({});

  const cleanData = () => {
    reset();
    setEmployeeErrors({});
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name) errors.name = "Campo requerido";
    if (!data.surnames) errors.surnames = "Campo requerido";
    if (!data.email) errors.email = "Campo requerido";
    if (!data.password && !id) errors.password = "Campo requerido"; // Solo requerido en creación
    if (!data.phone) errors.phone = "Campo requerido";
    if (!data.dui) errors.dui = "Campo requerido";
    if (!data.user) errors.user = "Campo requerido";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (data.email && !emailPattern.test(data.email)) {
      errors.email = "Correo electrónico inválido";
    }

    const phonePattern = /^\d{4}-\d{4}$/;
    if (data.phone && !phonePattern.test(data.phone)) {
      errors.phone = "Número de teléfono inválido (1234-5678)";
    }

    const duiPattern = /^\d{8}-\d{1}$/;
    if (data.dui && !duiPattern.test(data.dui)) {
      errors.dui = "DUI inválido (12345678-9)";
    }

    if (data.password && data.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (data.name && data.name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (data.surnames && data.surnames.length < 3) {
      errors.surnames = "El apellido debe tener al menos 3 caracteres";
    }

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
      return;
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
        return;
      }

      finishOperation("Empleado creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al registrar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const editEmployee = async (employeeId, dataForm) => {
    const validationErrors = validateForm(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setEmployeeErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      console.log(dataForm);


      const response = await fetch(`${ApiEmployees}/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || "Error desconocido";
        toast.error(msg);
        return;
      }

      finishOperation("Empleado actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al actualizar el empleado");
    } finally {
      setLoading(false);
    }
  };


  return {
    register,
    handleSubmit,
    errors: { ...errors, ...employeeErrors },
    loading,
    handleUpdateEmployee: (id) => navigate(`/employees/${id}`),
    editEmployee,
    saveEmployeeForm,
  };
};

export default useDataEmployee;
