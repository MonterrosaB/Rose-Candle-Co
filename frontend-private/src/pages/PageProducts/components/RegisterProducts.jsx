import { useState, useEffect } from "react";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";

import Input from "../../../global/components/Input";
import Button from "../../../global/components/Button";
import Dropdown from "../../../global/components/Dropdown";
import Textarea from "../../../global/components/TextArea";
import TextAreaArray from "../../../global/components/TextAreaArray";
import DoubleInput from "../../../global/components/DoubleInput";
import DoubleInputDropDown from "../../../global/components/DobleInputDropdown";
import ProductImagesUploader from "./ProductImagesUploader";

import AddComponent from "../logic/addComponents";
import changeImages from "../logic/changeImages";
import { useForm } from "react-hook-form";
import useProducts from "../hooks/useProducts";
import useProductOptions from "../hooks/useProductOptions";


const RegisterProducts = ({ onClose, selectedProduct }) => {

  const methods = useForm({
    defaultValues: {
      ...selectedProduct,
      instrucctions: selectedProduct?.useForm || [],
      receta: selectedProduct?.recipe || [],
      variantes: selectedProduct?.variant || [],
      componentes: selectedProduct?.components || [],
      estado: selectedProduct?.availability, // para el dropdown
      idProductCategory: selectedProduct?.idProductCategory._id,
      collection: selectedProduct?.idCollection._id
    },
  });

  const { opcionesCategorias, opcionesColecciones, opcionesMateria, opcionesEstado } = useProductOptions();

  const { agregarInput, inputs, resetInputs, eliminarInput } = AddComponent();

  const { register, unregister, handleSubmit, errors, reset, control, createProduct, handleUpdate } = useProducts(methods);

  const {
    productImage,
    productImageFile,
    multipleFile,
    multipleFileFiles,
    uploadMultipleFiles,
    removeImage,
    onImageChange,
  } = changeImages(selectedProduct);


  useEffect(() => {
    if (selectedProduct) {
      resetInputs(); // opcional: limpia antes de volver a cargar
      agregarInput("variantes", selectedProduct.variant || []);
      agregarInput("componentes", selectedProduct.components || []);
    }
  }, [selectedProduct]);


  const onSubmit = async (data) => {

    const allImages = [productImageFile, ...multipleFileFiles];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("availability", data.estado);
    formData.append("useForm", JSON.stringify(data.instrucctions));
    formData.append("variant", JSON.stringify(data.variantes));
    formData.append("idProductCategory", data.idProductCategory);
    formData.append("idCollection", data.collection); // si lo necesitas

    allImages.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("components", JSON.stringify(data.componentes));
    formData.append("recipe", JSON.stringify(data.receta));

    try {
      if (selectedProduct) {
        // ACTUALIZAR producto existente si recibe datos
        await handleUpdate(selectedProduct._id, formData);

      } else {
        // CREAR nuevo producto sino recibe datos
        await createProduct(formData);
      }

      onClose(); // cerrar y limpiar solo si todo sale bien
    } catch (error) {
      console.error("Error al guardar el empleado:", error);
      // Aquí podrías usar toast.error o similar
    }
  };

  const handleEliminarVariante = (grupo, id, index) => {
    unregister([`variantes.${index}.variant`, `variantes.${index}.variantPrice`]);
    eliminarInput(grupo, id);
  };

  const handleEliminarComponente = (grupo, id, index) => {
    unregister([`componentes.${index}.idComponent`, `componentes.${index}.amount`]);
    eliminarInput(grupo, id);
  };

  return (
    <Form
      headerLabel={selectedProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <Input
          label={"Nombre"}
          type="text"
          name={"name"}
          register={register}
          errors={errors}
        />

        <ProductImagesUploader
          register={register}
          productImage={productImage}
          multipleFile={multipleFile}
          onImageChange={onImageChange}
          uploadMultipleFiles={uploadMultipleFiles}
          removeImage={removeImage}
        />

        <Textarea
          label={"Descripción"}
          name={"description"}
          register={register}
          errors={errors}
        />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <Dropdown
            name={"idProductCategory"}
            options={opcionesCategorias}
            label={"Categoría"}
            register={register}
            errors={errors}
            hideIcon={true}
          />
          <Dropdown
            name={"collection"}
            options={opcionesColecciones}
            label={"Colección"}
            register={register}
            errors={errors}
            hideIcon={true}
          />
          <Dropdown
            name={"estado"}
            options={opcionesEstado}
            label={"Estado"}
            register={register}
            errors={errors}
            hideIcon={true}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <TextAreaArray
            control={control}
            name="instrucctions"
            label="Recomendaciones"
            placeholder="Escribe y presiona coma o enter"
            error={errors.tags}
            valueKey="instruction"
          />
          <TextAreaArray
            control={control}
            name="receta"
            label="Recetas"
            placeholder="Escribe y presiona coma o enter"
            error={errors.tags}
            valueKey="step"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 w-full">
          <div className="flex flex-col items-center w-full lg:w-1/2 gap-4">
            <Button
              buttonText={"Agregar Variante"}
              showIcon={true}
              style={"gray"}
              onClick={() => agregarInput("variantes")}
              type={"button"}
            />
            {inputs.variantes.map((input, index) => (
              <DoubleInput
                key={input.id}
                id={input.id}
                eliminarInput={() => handleEliminarVariante("variantes", input.id, index)}
                grupo="variantes"
                placeholder1="Nombre Variante"
                placeholder2="Precio Variante"
                name1={`variantes.${index}.variant`}
                name2={`variantes.${index}.variantPrice`}
                register={register}
                error1={errors?.variantes?.[index]?.variant?.message}
                error2={errors?.variantes?.[index]?.variantPrice?.message}
                options1={{
                  required: "El nombre de la variante es requerido"
                }}
                options2={{
                  required: "El precio de la variante es requerido",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "El precio debe ser un número válido",
                  },
                }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center w-full lg:w-1/2 gap-4">
            <Button
              buttonText={"Agregar Componente"}
              showIcon={true}
              style={"gray"}
              onClick={() => agregarInput("componentes")}
              type={"button"}
            />
            {inputs.componentes.map((input, index) => (
              <DoubleInputDropDown
                key={input.id}
                id={input.id}
                eliminarInput={() => handleEliminarComponente("componentes", input.id, index)}
                name1={`componentes.${index}.idComponent`}
                name2={`componentes.${index}.amount`}
                placeholder1="Componente"
                placeholder2="Cantidad"
                register={register}
                error1={errors?.componentes?.[index]?.idComponent?.message}
                error2={errors?.componentes?.[index]?.amount?.message}
                options={opcionesMateria} // por ejemplo: [{ _id: 'cpu', label: 'CPU' }]
                options2={{
                  required: "La cantidad es requerida",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ser un número válido",
                  },
                }}
              />

            ))}
          </div>
        </div>
      </FormInputs>
      <FormButton>
        <Button buttonText={selectedProduct ? "Editar Producto" : "Agregar Producto"} type={"submit"} />
      </FormButton>
    </Form>
  );
};

export default RegisterProducts;
