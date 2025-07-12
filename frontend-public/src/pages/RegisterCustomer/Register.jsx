import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Star from "../../assets/star.svg?react";
import AnimatedLine from "../../global/components/AnimatedLine.jsx";
import FormInput from "./components/FormInput.jsx";
import Button from "./components/Button.jsx";
import Logo from "../../assets/Isotipo.svg?react";
import useRegisterCustomer from "./hooks/useCustomers.jsx"; // Hook de registro

const Register = () => {
    const navigate = useNavigate();
    const { registerCustomer, loading, error, success } = useRegisterCustomer();

    const [name, setName] = useState("");
    const [surnames, setSurnames] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dui, setDui] = useState("");
    const [errors, setErrors] = useState({});

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if ((password ?? "").trim() !== (confirmPassword ?? "").trim()) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const addresses = [
            {
                address: "Dirección predeterminada",
                isDefault: true,
                type: "casa",
            },
        ];

        const customerData = {
            name,
            surnames,
            email,
            password,
            user,
            phone,
            addresses,
        };

        const result = await registerCustomer(customerData);

        if (result) {
            toast.success("¡Registro exitoso!");
            setTimeout(() => navigate("/loginCustomer"), 2000);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(value)) setName(value);
    };

    const handleSurnamesChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(value)) setSurnames(value);
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) {
            value = value.slice(0, 4) + "-" + value.slice(4);
        }
        setPhone(value);
    };


    const handleUserChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9_]*$/;
        if (regex.test(value)) setUser(value);
    };

    return (
        <div className="relative overflow-hidden flex items-center justify-center h-screen bg-[#F0ECE6]">
            {/* Fondo */}
            <div
                style={{
                    width: "150%",
                    height: "120%",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle,rgba(223, 204, 172, 0.63) 0%, rgba(223, 204, 172, 0) 40%)",
                    position: "fixed",
                    top: "-50%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            ></div>

            <AnimatedLine />

            {/* Círculo superior derecho */}
            <div className="absolute -top-90 -right-50 w-[500px] h-[500px] rotate-[20deg] z-[10]">
                <Star />
            </div>

            {/* Círculo inferior izquierdo */}
            <div className="absolute -bottom-10 -left-60 w-[500px] h-[500px] rotate-[-5deg]">
                <Star />
            </div>

            {/* Formulario */}
            <form
                onSubmit={handleFormSubmit}
                className="z-10 p-8 rounded-xl shadow-md w-full max-w-4xl bg-[#F7F5EE]"
            >
                {/* Encabezado */}
                <div className="flex items-center justify-center mb-6">
                    <Logo color="#7D7954" size={120} />
                    <div className="ml-4">
                        <h1 className="text-3xl font-serif font-bold text-gray-800">
                            Bienvenido/a a Rosé Candle Co.
                        </h1>
                        <p className="text-xl text-gray-600">
                            Crea una cuenta para comenzar esta aventura.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        id="name"
                        label="Nombre"
                        placeholder="Nombre"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        error={errors.name}
                    />
                    <FormInput
                        id="surnames"
                        label="Apellido"
                        placeholder="Apellido"
                        type="text"
                        value={surnames}
                        onChange={handleSurnamesChange}
                        error={errors.surnames}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        id="phone"
                        label="Teléfono"
                        placeholder="1234-5678"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        error={errors.phone}
                    />
                    <FormInput
                        id="user"
                        label="Usuario"
                        placeholder="Nombre de usuario"
                        type="text"
                        value={user}
                        onChange={handleUserChange}
                        error={errors.user}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <FormInput
                        id="email"
                        label="Correo Electrónico"
                        placeholder="correo@rose.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        id="password"
                        label="Contraseña"
                        placeholder="********"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                    />
                    <FormInput
                        id="confirmPassword"
                        label="Confirmar Contraseña"
                        placeholder="********"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={
                            (password ?? "").trim() !== (confirmPassword ?? "").trim()
                                ? "Las contraseñas no coinciden"
                                : null
                        }
                    />
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">Registro exitoso</p>}

                <Button title={loading ? "Registrando..." : "Iniciar"} type="submit" disabled={loading} />
            </form>
        </div>
    );
};

export default Register;
