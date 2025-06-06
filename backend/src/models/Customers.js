/* 
    Colección para clientes

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
        required: true,
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'],
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    surnames: {
        type: String,
        required: true,
        match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'],
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Debe ser un correo electrónico válido',
        ],
        trim: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo'
        ],
        trim: true
    },
    user: {
        type: String,
        require: true,
        match: [
            /^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos'
        ],
        trim: true
    },
    phone: {
        type: String,
        require: true,
        match: [
            /^\d{4}-\d{4}$/,,
            'Número de teléfono inválido'
        ],
        minLength: 9,
        trim: true
    },
}, {
    timestamps: true,
    strict: false
})

// Exporto
export default model("Customers", customerSchema)