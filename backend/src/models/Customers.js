/*
    Campos:
        name
        surnames
        email
        password
        user
        phone
*/

import { Schema, model } from "mongoose"

const customerSchema = new Schema({
    name: {
        type: String,
        require: true,
        match: [/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios']
    },
    surnames: {
        type: String,
        require: true,
        match: [/^[a-zA-Z\s]+$/, 'El apellido solo puede contener letras y espacios']
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
        match: [
            /^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos'
        ]
    },
    phone: {
        type: String,
        require: true,
        match: [
            /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
            'Número de teléfono inválido (ej: 809-555-5555 o (809) 555-5555)'
        ]
    },
}, {
    timestamps: true,
    strict: false
})

// Exporto
export default model("Customers", customerSchema)