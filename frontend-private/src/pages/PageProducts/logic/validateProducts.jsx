function validateProductData(data, allImages) {
    const errors = [];

    //  Validar nombre
    if (!data.name?.trim()) errors.push("El nombre es obligatorio");
    else {
        if (data.name.length < 3 || data.name.length > 100)
            errors.push("El nombre debe tener entre 3 y 100 caracteres");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name))
            errors.push("El nombre solo puede contener letras y espacios");
    }

    //  Validar descripción
    if (!data.description?.trim()) errors.push("La descripción es obligatoria");
    else {
        if (data.description.length < 3 || data.description.length > 1000)
            errors.push("La descripción debe tener entre 3 y 1000 caracteres");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;!?'"()-]+$/.test(data.description))
            errors.push("La descripción contiene caracteres no permitidos");
    }

    //  Imágenes
    if (!allImages?.length) errors.push("Debes subir al menos una imagen");
    if (allImages?.length > 8) errors.push("Máximo 8 imágenes permitidas");


    // 4️⃣ Normalizar y validar disponibilidad
    if (typeof data.availability === "string") {
        data.availability = data.availability === "true"; // convierte "true"/"false" a boolean
    }

    // ahora validar siempre
    if (typeof data.availability !== "boolean") {
        errors.push("Debes indicar la disponibilidad del producto");
    }

    //  Categoría y colección
    if (!data.idProductCategory) errors.push("Debes seleccionar una categoría");
    if (!data.idCollection) errors.push("Debes seleccionar una colección");

    //  Receta
    if (!Array.isArray(data.recipe) || data.recipe.length < 1)
        errors.push("Debes incluir al menos un paso de receta");
    else if (data.recipe.length > 100)
        errors.push("Máximo 100 pasos de receta permitidos");
    else {
        data.recipe.forEach((r, i) => {
            if (!r.step?.trim())
                errors.push(`El paso ${i + 1} de la receta está vacío`);
            if (r.step?.length < 3 || r.step?.length > 200)
                errors.push(`El paso ${i + 1} debe tener entre 3 y 200 caracteres`);
        });
    }

    //  Variantes
    if (!Array.isArray(data.variant) || data.variant.length < 1)
        errors.push("Debes incluir al menos una variante");
    else if (data.variant.length > 10)
        errors.push("Máximo 10 variantes permitidas");
    else {
        data.variant.forEach((v, i) => {
            if (!v.variant?.trim())
                errors.push(`La variante ${i + 1} debe tener un nombre`);
            if (v.variant?.length < 1 || v.variant?.length > 200)
                errors.push(
                    `La variante ${i + 1} debe tener entre 1 y 200 caracteres`
                );
            if (
                typeof v.variantPrice !== "number" ||
                v.variantPrice < 1 ||
                v.variantPrice > 100
            )
                errors.push(
                    `El precio de la variante ${i + 1} debe ser entre 1 y 100`
                );
            if (!Array.isArray(v.components) || v.components.length < 1)
                errors.push(`La variante ${i + 1} debe tener al menos un componente`);
            else {
                v.components.forEach((c, j) => {
                    if (!c.idComponent)
                        errors.push(
                            `Componente ${j + 1} en variante ${i + 1} no tiene ID`
                        );
                    if (typeof c.amount !== "number" || c.amount < 1 || c.amount > 500)
                        errors.push(
                            `Cantidad inválida en componente ${j + 1} de variante ${i + 1} (1–500)`
                        );
                });
            }
        });
    }

    //  Instrucciones de uso
    if (!Array.isArray(data.useForm) || data.useForm.length < 1)
        errors.push("Debes incluir al menos una instrucción de uso");
    else if (data.useForm.length > 100)
        errors.push("Máximo 100 instrucciones de uso permitidas");
    else {
        data.useForm.forEach((u, i) => {
            if (!u.instruction?.trim())
                errors.push(`Instrucción ${i + 1} está vacía`);
            if (u.instruction?.length < 3 || u.instruction?.length > 200)
                errors.push(
                    `Instrucción ${i + 1} debe tener entre 3 y 200 caracteres`
                );
        });
    }

    return errors; // array vacío = sin errores
}

export default validateProductData;
