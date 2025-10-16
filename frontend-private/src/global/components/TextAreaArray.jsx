import { useState } from "react";
import { Controller } from "react-hook-form";

const TextAreaArray = ({ control, name, label, error, placeholder = "", valueKey = null }) => {
    const [inputValue, setInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    return (
        <div className="mb-3 w-full min-w-auto max-w-xs">
            <div className="relative w-full">
                <label className="absolute text-sm text-neutral-800 font-medium duration-300 transform 
                    -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-white px-2 
                    peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-100
                    peer-focus:-translate-y-4 start-1 capitalize"
                >
                    {label}
                </label>

                <Controller
                    control={control}
                    name={name}
                    defaultValue={[]}
                    rules={{ required: "Campo requerido" }}
                    render={({ field: { value, onChange } }) => {
                        const tags = value || [];

                        // Esta función ahora acepta un valor de texto explícito o usa inputValue
                        const processInput = (textToProcess) => {
                            const input = textToProcess || inputValue;
                            
                            // 1. Dividir el valor por saltos de línea (\n)
                            const newValues = input
                                .split('\n')
                                .map(v => v.trim())
                                .filter(v => v.length > 0);

                            if (newValues.length === 0) return;

                            let uniqueNewTags = [];

                            newValues.forEach(newValue => {
                                // 2. Verificar duplicados
                                const exists = valueKey
                                    ? tags.some((t) => t[valueKey] === newValue)
                                    : tags.includes(newValue);

                                if (!exists) {
                                    uniqueNewTags.push(valueKey ? { [valueKey]: newValue } : newValue);
                                }
                            });

                            // 3. Agregar nuevos tags únicos
                            if (uniqueNewTags.length > 0) {
                                onChange([...tags, ...uniqueNewTags]);
                            }

                            // 4. Limpiar el input
                            setInputValue("");
                        };

                        const handleKeyDown = (e) => {
                            // Dispara la acción al presionar Enter.
                            if (e.key === "Enter") {
                                e.preventDefault();
                                processInput();
                            }
                            // Si se presiona Enter y el campo está vacío, no hace nada (para no crear un tag vacío).
                            if (e.key === "Enter" && !inputValue.trim()) {
                                e.preventDefault();
                            }
                        };
                        
                        const handlePaste = (e) => {
                            e.preventDefault(); // Previene que el texto se pegue en el textarea
                            
                            // Obtiene el texto del portapapeles
                            const pasteText = e.clipboardData.getData('text');
                            
                            // Procesa el texto inmediatamente
                            processInput(pasteText);
                        };

                        const removeTag = (index) => {
                            onChange(tags.filter((_, i) => i !== index));
                            setEditingIndex(null);
                        };

                        const updateTag = (index, newValue) => {
                            const newTags = [...tags];
                            newTags[index] = valueKey ? { [valueKey]: newValue } : newValue;
                            onChange(newTags);
                        };

                        return (
                            <div
                                className={`flex flex-wrap gap-2 p-2 rounded-lg border min-h-[60px] mt-6
                                    ${error ? "border-red-500" : "border-gray-300 focus-within:border-black"} 
                                    bg-white transition-colors duration-200 max-w-xs`}
                            >
                                {tags.map((tag, index) => {
                                    const displayText = valueKey ? tag[valueKey] : tag;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 bg-[#333] text-white p-1 rounded-xl text-sm mt-2  break-all"
                                        >
                                            {editingIndex === index ? (
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={displayText}
                                                    onChange={(e) => updateTag(index, e.target.value)}
                                                    onBlur={() => setEditingIndex(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === "Escape") {
                                                            e.preventDefault();
                                                            setEditingIndex(null);
                                                        }
                                                    }}
                                                    className="bg-transparent text-white outline-none border-b border-white text-xs"
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => setEditingIndex(index)}
                                                    className="cursor-pointer"
                                                >
                                                    {displayText}
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="text-xs text-white hover:text-red-300"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    );
                                })}

                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onPaste={handlePaste} //  NUEVO: Maneja la acción de pegar
                                    placeholder={placeholder}
                                    rows={1} 
                                    className="flex-1 min-w-[100px] p-1 bg-transparent text-sm text-[#333] outline-none resize-none overflow-hidden h-6"
                                />
                            </div>
                        );
                    }}
                />
            </div>

            <div className="h-5 mt-1">
                {error && <p className="text-sm text-red-500">{error.message}</p>}
            </div>
        </div>
    );
};

export default TextAreaArray;