import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchEmployees from "./useFetchEmployees"; // Usamos el hook de fetch para obtener los empleados

const ApiEmployees = "http://localhost:4000/api/registerEmployees"; // API endpoint para empleados

const useDataEmployee = (methods) => {
  const { getEmployeeById, getEmployees } = useFetchEmployees(); // Usamos el hook de fetch para obtener los empleados
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [employeeErrors, setEmployeeErrors] = useState({}); // Errores específicos para el empleado

  // Limpiar los datos del formulario
  const cleanData = () => {
    reset();
    setEmployeeErrors({});
  };

  // Validaciones del formulario antes de hacer el submit
  const validateForm = (data) => {
    const errors = {};

    // Validaciones de campos requeridos
    if (!data.name) errors.name = "Campo requerido";
    if (!data.surnames) errors.surnames = "Campo requerido";
    if (!data.email) errors.email = "Campo requerido";
    if (!data.password) errors.password = "Campo requerido";
    if (!data.phone) errors.phone = "Campo requerido";
    if (!data.dui) errors.dui = "Campo requerido";
    if (!data.user) errors.user = "Campo requerido";

    // Validaciones de formato
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

  // Guardar un nuevo empleado
  const saveEmployeeForm = async (dataForm) => {
    const validationErrors = validateForm(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setEmployeeErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      console.log(dataForm);

      const response = await fetch(ApiEmployees, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || "Error desconocido";
        toast.error(msg);
        return;
      }

      toast.success("Empleado creado exitosamente");
      cleanData();
      getEmployees(); // Refrescar lista de empleados
      navigate("/employees"); // Redirigir a la página de empleados
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al registrar el empleado");
    } finally {
      setLoading(false);
    }
  };

  // Editar un empleado existente
  const editEmployee = async (dataForm) => {
    const validationErrors = validateForm(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setEmployeeErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${ApiEmployees}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || "Error desconocido";
        toast.error(msg);
        return;
      }

      toast.success("Empleado actualizado exitosamente");
      cleanData();
      getEmployees(); // Refrescar lista de empleados
      navigate("/employees"); // Redirigir a la página de empleados
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al actualizar el empleado");
    } finally {
      setLoading(false);
    }
  };

  // Decidir si guardar o editar un empleado
  const handleEmployeeAction = (dataForm) => {
    if (id) {
      editEmployee(dataForm);
    } else {
      saveEmployeeForm(dataForm);
    }
  };

  // Cargar datos del empleado cuando se edita
  const loadEmployee = async () => {
    if (id) {
      const employee = await getEmployeeById(id);
      if (employee) {
        reset({
          name: employee?.name,
          surnames: employee?.surnames,
          email: employee?.email,
          phone: employee?.phone,
          dui: employee?.dui,
          password: employee?.password,
          user: employee?.user,
          role: employee?.role,
          isActive: employee?.isActive,
        });
      }
    }
  };

  // useEffect para cargar los datos cuando cambia el id
  useEffect(() => {
    loadEmployee();
  }, [id]);

  return {
    register,
    handleSubmit: handleSubmit(handleEmployeeAction),
    errors: { ...errors, ...employeeErrors },
    loading,
    handleUpdateEmployee: (id) => navigate(`/employees/${id}`),
    loadEmployee,
  };
};

export default useDataEmployee;