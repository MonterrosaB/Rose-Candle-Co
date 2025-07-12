import { useState } from "react";

const useRegisterCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const registerCustomer = async (customerData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:4000/api/registerCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
                credentials: "include", // para enviar y recibir cookies (token)
            });

            const data = await response.json();

            if (!response.ok) {
                // Error devuelto por el backend
                throw new Error(data.message || "Failed to register customer");
            }

            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { registerCustomer, loading, error, success };
}

export default useRegisterCustomer;
