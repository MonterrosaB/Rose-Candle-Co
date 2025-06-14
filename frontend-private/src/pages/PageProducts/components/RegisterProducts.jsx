import { useState } from "react";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";

import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown"
import Textarea from "../../../global/components/TextArea";
import TextAreaArray from "../../../global/components/TextAreaArray";
import DoubleInput from "../../../global/components/DoubleInput";

import AddComponent from "../logic/addComponents";
import { useForm } from "react-hook-form"
import useProducts from "../hooks/useProducts";


const RegisterProducts = ({ onClose }) => {

    const methods = useForm();
    const { register, handleSubmit, errors, reset, control } = useProducts(methods);

    const [productImage, setProductImage] = useState(null);
    const [productImageFile, setProductPrincipal] = useState(null);

    const [multipleFile, setMultipleFile] = useState([]); // URLs para mostrar
    const [multipleFileFiles, setMultipleFileFiles] = useState([]); // Archivos reales

    const uploadMultipleFiles = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));

        setMultipleFile(prev => [...prev, ...urls]);
        setMultipleFileFiles(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setMultipleFile(prev => prev.filter((_, i) => i !== index));
        setMultipleFileFiles(prev => prev.filter((_, i) => i !== index));
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProductPrincipal(file); // 👈 este es el que se usa para subir


            // Opcional: mostrar vista previa
            const reader = new FileReader();
            reader.onload = (e) => {
                setProductImage(e.target.result);
                console.log(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const opcionesMateria = [
        { _id: 'M', label: 'Cera' },
        { _id: 'F', label: 'Mechas' }
    ];

    const { agregarInput, inputs } = AddComponent();

    const onSubmit = (data) => {
        console.log(data);
        alert("Verificar datos en la consola")
    };

    const uploadFiles = () => {
        console.log(productImageFile); // Imagen principal (File)
        console.log(multipleFileFiles); // Array de archivos (Files) secundarios
    };

    return (
        <Form headerLabel={"Agregar Nuevo Producto"} onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
            <FormInputs>
                <Input
                    label={"Nombre"}
                    type="text"
                    name={"name"}
                    register={register}
                    errors={errors}
                />

                <div className="flex items-center justify-center gap-4 rounded-md w-lg mb-3">
                    <label
                        htmlFor="principal-image-product"
                        className="w-fit p-2.5 rounded-lg font-medium cursor-pointer flex items-center justify-center"
                    >
                        {productImage ? (
                            <img src={productImage} alt="Vista previa" className="w-48 h-48 object-contain" />
                        ) : (
                            <div className="bg-[#D9D9D9] w-48 h-48 flex items-center text-center">
                                Selecciona aquí la imagen principal
                            </div>
                        )}
                        <input
                            type="file"
                            id="principal-image-product"
                            className="hidden"
                            onChange={onImageChange}
                        />
                    </label>
                    <label htmlFor="secondary-images-product" className="cursor-pointer">
                        {multipleFile.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {multipleFile.map((url, index) => (
                                    <div key={url} className="relative">
                                        <img
                                            src={url}
                                            alt={`Secundaria-${index}`}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#D9D9D9] w-48 h-48 flex items-center justify-center text-center">
                                Selecciona aquí las imágenes secundarias
                            </div>
                        )}
                        <input
                            type="file"
                            id="secondary-images-product"
                            className="hidden"
                            onChange={uploadMultipleFiles}
                            multiple
                        />
                    </label>
                </div>

                <Textarea
                    label={"Descripción"}
                    name={"description"}
                    register={register}
                    errors={errors}
                />
                <div className="flex justify-center items-center gap-4 w-full">
                    <Dropdown
                        name={"categoria"}
                        options={opcionesMateria}
                        label={"Categoría"}
                        register={register}
                        errors={errors}
                        hideIcon={true} />
                    <Dropdown
                        name={"materiaPrima"}
                        options={opcionesMateria}
                        label={"Colección"}
                        register={register}
                        errors={errors}
                        hideIcon={true} />
                    <Dropdown
                        name={"estado"}
                        options={opcionesMateria}
                        label={"Estado"}
                        register={register}
                        errors={errors}
                        hideIcon={true} />
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                    <TextAreaArray
                        control={control}
                        name="Pasos"
                        label="Pasos"
                        placeholder="Escribe y presiona coma o enter"
                        error={errors.tags} />
                    <TextAreaArray
                        control={control}
                        name="Recetas"
                        label="Recetas"
                        placeholder="Escribe y presiona coma o enter"
                        error={errors.tags} />
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                    <div className="flex flex-col items-center w-1/2 gap-4">
                        <Button buttonText={"Agregar Variante"} showIcon={true} style={"gray"} onClick={() => agregarInput("variantes")} type={"button"} />
                        {inputs.variantes.map((input, index) => (
                            <DoubleInput
                                key={input.id}
                                placeholder1="Nombre Variante"
                                placeholder2="Precio Variante"
                                name1={`variantes.${index}.variante`}
                                name2={`variantes.${index}.precio`}
                                register={register}
                                errors={errors}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col  items-center w-1/2 gap-4">
                        <Button buttonText={"Agregar Componente"} showIcon={true} style={"gray"} onClick={() => agregarInput("componentes")} type={"button"} />
                        {inputs.componentes.map((input, index) => (
                            <DoubleInput
                                key={input.id}
                                placeholder1="Componente"
                                placeholder2="Cantidad"
                                name1={`componentes.${index}.componente`}
                                name2={`componentes.${index}.cantidad`}
                                register={register}
                                errors={errors}
                            />
                        ))}
                    </div>
                </div>

            </FormInputs>
            <FormButton>
                <Button buttonText={"Agregar Producto"} type={"submit"} />
            </FormButton>
        </Form>
    )
}
export default RegisterProducts;