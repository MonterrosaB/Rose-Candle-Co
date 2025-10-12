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

import toast from "react-hot-toast";

import { useTranslation } from "react-i18next"; // Soporte para múltiples idiomas

const RegisterProducts = ({ onClose, selectedProduct }) => {
  const methods = useForm({
    defaultValues: {
      ...selectedProduct,
      useForm: selectedProduct?.useForm || [],
      recipe: selectedProduct?.recipe || [],
      variant: selectedProduct?.variant || [],
      availability: selectedProduct?.availability, // para el dropdown
      idProductCategory: selectedProduct?.idProductCategory._id,
      idCollection: selectedProduct?.idCollection._id,
    },
  });

  const { t, i18n } = useTranslation("products"); // Traducciones del namespace "stock"

  const {
    opcionesCategorias,
    opcionesColecciones,
    opcionesMateria,
    opcionesEstado,
  } = useProductOptions();

  const {
    inputs,
    agregarVariante,
    agregarComponente,
    eliminarVariante,
    eliminarComponente,
    resetInputs,
  } = AddComponent();

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    reset,
    control,
    createProduct,
    handleUpdate,
    loading,
  } = useProducts(methods);

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
    if (
      selectedProduct &&
      opcionesCategorias.length &&
      opcionesColecciones.length &&
      opcionesMateria.length
    ) {
      // Normalizamos variantes y componentes
      const normalizedVariants =
        selectedProduct.variant?.map((v) => ({
          id: crypto.randomUUID(), // id único para el estado local
          ...v,
          components:
            v.components?.map((c) => ({
              id: crypto.randomUUID(),
              idComponent: String(c.idComponent?._id || c.idComponent),
              amount: c.amount || "",
            })) || [],
        })) || [];

      // Reset RHF
      reset({
        ...selectedProduct,
        idProductCategory: selectedProduct.idProductCategory?._id || "",
        idCollection: selectedProduct.idCollection?._id || "",
        unit: selectedProduct.unit || "",
        variant: normalizedVariants, // RHF también recibe las variantes normalizadas
      });

      // Reset estado local
      resetInputs();
      normalizedVariants.forEach((v) => agregarVariante(v));
      console.log(normalizedVariants);
    }
  }, [
    selectedProduct,
    opcionesCategorias,
    opcionesColecciones,
    opcionesMateria,
    reset,
  ]);

  const onSubmit = async (data) => {
    const allImages = [productImageFile, ...multipleFileFiles];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("availability", data.availability);
    formData.append("useForm", JSON.stringify(data.useForm));
    formData.append("variant", JSON.stringify(data.variant));
    formData.append("idProductCategory", data.idProductCategory);
    formData.append("idCollection", data.idCollection); // si lo necesitas
    formData.append("recipe", JSON.stringify(data.recipe));

    allImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const action = selectedProduct
        ? handleUpdate(selectedProduct._id, formData)
        : createProduct(formData);

      await toast.promise(action, {
        loading: selectedProduct ? "Actualizando..." : "Guardando...",
        success: selectedProduct ? (
          <b>¡Producto actualizado exitosamente!</b>
        ) : (
          <b>¡Producto guardado exitosamente!</b>
        ),
        error: selectedProduct ? (
          <b>No se pudo actualizar el producto.</b>
        ) : (
          <b>No se pudo guardar el producto.</b>
        ),
      });

      onClose(); // cerrar y limpiar solo si todo sale bien
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error("Ocurrió un error inesperado al guardar el producto.");
    }
  };

  return (
    <Form
      headerLabel={selectedProduct ? t("edit_product") : t("add_prodcut")}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <Input
          label={t("form.name")}
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
          label={t("form.description")}
          name={"description"}
          register={register}
          errors={errors}
        />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <Dropdown
            name={"idProductCategory"}
            options={opcionesCategorias}
            label={t("category_selector")}
            register={register}
            errors={errors}
            hideIcon={true}
          />
          <Dropdown
            name={"idCollection"}
            options={opcionesColecciones}
            label={t("collection_selector")}
            register={register}
            errors={errors}
            hideIcon={true}
          />
          <Dropdown
            name={"availability"}
            options={opcionesEstado}
            label={t("availability_selector")}
            register={register}
            errors={errors}
            hideIcon={true}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <TextAreaArray
            control={control}
            name="useForm"
            label={t("form.use_form")}
            placeholder={t("form.textarea")}
            error={errors.tags}
            valueKey="instruction"
          />
          <TextAreaArray
            control={control}
            name="recipe"
            label={t("form.recipe")}
            placeholder={t("form.textarea")}
            error={errors.tags}
            valueKey="step"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 w-full">
          <div className="flex flex-col items-center w-full gap-4">
            <Button
              buttonText={t("form.variants.add_variant")}
              showIcon={true}
              style={"gray"}
              onClick={() => agregarVariante()}
              type={"button"}
            />

            {inputs.variant.map((variante, vIndex) => (
              <div
                key={variante.id}
                className="border p-4 rounded-2xl flex flex-col gap-4 w-full shadow-md bg-white"
              >
                {/* Título de la variante */}
                <h3 className="text-lg font-semibold text-gray-700">
                  Variante {vIndex + 1}
                </h3>

                <DoubleInput
                  id={variante.id}
                  eliminarInput={() => {
                    unregister([
                      `variant.${vIndex}.variant`,
                      `variant.${vIndex}.variantPrice`,
                    ]);
                    eliminarVariante(variante.id);
                  }}
                  grupo="variant"
                  placeholder1={t("form.variants.variant_name")}
                  placeholder2={t("form.variants.varian_price")}
                  name1={`variant.${vIndex}.variant`}
                  name2={`variant.${vIndex}.variantPrice`}
                  register={register}
                  error1={errors?.variant?.[vIndex]?.variant?.message}
                  error2={errors?.variant?.[vIndex]?.variantPrice?.message}
                />

                {/* Componentes de esta variante */}
                <div className="flex flex-col items-center gap-4">
                  <Button
                    buttonText={t("form.variants.add_componet")}
                    showIcon={true}
                    style={"gray"}
                    onClick={() => agregarComponente(vIndex)}
                    type="button"
                  />
                  {variante.components.map((comp, cIndex) => (
                    <DoubleInputDropDown
                      key={comp.id}
                      id={comp.id}
                      eliminarInput={() => {
                        unregister([
                          `variant.${vIndex}.components.${cIndex}.idComponent`,
                          `variant.${vIndex}.components.${cIndex}.amount`,
                        ]);
                        eliminarComponente(vIndex, comp.id);
                      }}
                      name1={`variant.${vIndex}.components.${cIndex}.idComponent`}
                      name2={`variant.${vIndex}.components.${cIndex}.amount`}
                      placeholder1={t("form.variants.component")}
                      placeholder2={t("form.variants.amount")}
                      register={register}
                      options={opcionesMateria}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FormInputs>
      <FormButton>
        <Button
          buttonText={selectedProduct ? t("edit_product") : t("add_prodcut")}
          type={"submit"}
          disable={loading}
        />
      </FormButton>
    </Form>
  );
};

export default RegisterProducts;
