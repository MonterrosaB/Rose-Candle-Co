/*
    Campos:
        name
        surnames
        phone
        dui
        email
        password
        user
*/

import { Schema, model } from "mongoose"

const employeeSchema = new Schema({
    name: {
        type: String,
        require: true,
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios']
    },
    surnames: {
        type: String,
        require: true,
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios']
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Debe ser un correo electrónico válido',
        ],
    },
    phone: {
        type: String,
        require: true,
        match: [
            /^\d{4}-\d{4}$/,
            'Número de teléfono inválido (1234-5678)'
        ]
    },
    dui: {
        type: String,
        require: true,
        unique: true,
        match: [/^[0-9]{8}-[0-9]$/, 'El DUI debe tener 8 números, un guion y un dígito']
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo'
        ]
    },
    user: {
        type: String,
        require: true,
        unique: true,
        match: [/^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos']
    },
    isActive: {
        type: Boolean,
        require: true
    },
}, {
    timestamps: true,
    strict: false
});

// Exporto
export default model("Employees", employeeSchema)