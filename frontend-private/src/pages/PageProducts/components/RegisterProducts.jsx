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

  const { opcionesCategorias, opcionesColecciones, opcionesMateria } = useProductOptions();

  const { agregarInput, inputs, resetInputs } = AddComponent();


  useEffect(() => {
    if (selectedProduct) {
      resetInputs(); // opcional: limpia antes de volver a cargar
      agregarInput("variantes", selectedProduct.variant || []);
      agregarInput("componentes", selectedProduct.components || []);
    }
  }, [selectedProduct]);


  const { register, handleSubmit, errors, reset, control, createProduct, handleUpdate } = useProducts(methods);

  const {
    productImage,
    productImageFile,
    multipleFile,
    multipleFileFiles,
    uploadMultipleFiles,
    removeImage,
    onImageChange,
  } = changeImages();


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

    if (selectedProduct) {
      // 🔁 ACTUALIZAR producto existente
      await handleUpdate(selectedProduct._id, formData);

    } else {
      // 🆕 CREAR nuevo producto
      await createProduct(formData);
    }

    onClose(); // cerrar modal después de guardar
  };

  console.log("Opciones Colecciones:", opcionesColecciones);
  console.log("Opciones Materia Prima:", opcionesMateria);

  const estado = [
    { _id: true, label: "Activo" },
    { _id: false, label: "Inactivo" },
  ];


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

        <div className="flex items-center justify-center gap-4 rounded-md w-lg mb-3">
          <label
            htmlFor="principal-image-product"
            className="w-fit p-2.5 rounded-lg font-medium cursor-pointer flex items-center justify-center"
          >
            {productImage ? (
              <img
                src={productImage}
                alt="Vista previa"
                className="w-48 h-48 object-contain"
              />
            ) : (
              <div className="bg-[#D9D9D9] w-48 h-48 flex items-center text-center">
                Selecciona aquí la imagen principal
              </div>
            )}
            <input
              type="file"
              id="principal-image-product"
              className="hidden"
              {...register("filee", { onChange: onImageChange })}
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
              {...register("file", { onChange: uploadMultipleFiles })}
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
            options={estado}
            label={"Estado"}
            register={register}
            errors={errors}
            hideIcon={true}
          />
        </div>

        <div className="flex justify-center items-center gap-4 w-full">
          <TextAreaArray
            control={control}
            name="instrucctions"
            label="Pasos"
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

        <div className="flex justify-center items-center gap-4 w-full">
          <div className="flex flex-col items-center w-1/2 gap-4">
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
                placeholder1="Nombre Variante"
                placeholder2="Precio Variante"
                name1={`variantes.${index}.variant`}
                name2={`variantes.${index}.variantPrice`}
                register={register}
                error1={errors?.variantes?.[index]?.variants?.message}
                error2={errors?.variantes?.[index]?.price?.message}
              />
            ))}
          </div>
          <div className="flex flex-col items-center w-1/2 gap-4">
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
                placeholder1="Componente"
                placeholder2="Cantidad"
                name1={`componentes.${index}.idComponent`}
                name2={`componentes.${index}.amount`}
                register={register}
                error1={errors?.componentes?.[index]?.idComponent?.message}
                error2={errors?.componentes?.[index]?.amount?.message}
                options={opcionesMateria}
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
