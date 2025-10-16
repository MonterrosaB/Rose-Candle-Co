import React from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ProductImagesUploader = ({
  register,
  productImage,
  multipleFile = [],
  onImageChange,
  uploadMultipleFiles,
  removeImage,
}) => {
  const { t } = useTranslation("products");

  const maxPrimary = 1;
  const maxSecondary = 7;
  const maxTotal = 8;

  const totalImages = (productImage ? 1 : 0) + multipleFile.length;

  // --- Imagen principal ---
  const handleSingleImageChange = (e) => {
    if (productImage) {
      toast.error("Solo puedes tener 1 imagen principal");
      Swal.fire({
        title: t("Error"),
        text: t("Solo puedes tener una imagen principal."),
        icon: "error",
        timer: 2000,
      });
      return;
    }

    if (totalImages >= maxTotal) {
      toast.error(`Solo se permiten ${maxTotal} imágenes en total`);
      Swal.fire({
        title: t("Error"),
        text: t(`Solo se permiten ${maxTotal} imágenes en total`),
        icon: "error",
        timer: 2000,
      });
      return;
    }

    onImageChange(e);
  };

  // --- Imágenes secundarias ---
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (multipleFile.length + files.length > maxSecondary) {
      toast.error(`Solo puedes subir ${maxSecondary} imágenes secundarias`);
      Swal.fire({
        title: t("Error"),
        text: t(`Solo puedes subir ${maxSecondary} imágenes secundarias`),
        icon: "error",
        timer: 2000,
      });
      return;
    }

    if (totalImages + files.length > maxTotal) {
      toast.error(`Solo puedes subir ${maxTotal - totalImages} imágenes más`);
      Swal.fire({
        title: t("Error"),
        text: t(`Solo puedes subir ${maxTotal - totalImages} imágenes más`),
        icon: "error",
        timer: 2000,
      });
      return;
    }

    uploadMultipleFiles(e);
  };

  return (
    <div className="flex flex-col items-center mb-3">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 rounded-md w-full">
        {/* Imagen principal */}
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
            <div className="bg-[#D9D9D9] w-48 h-48 flex items-center justify-center text-center">
              {t("form.images.primary")}
            </div>
          )}
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="principal-image-product"
            className="hidden"
            {...register("filee", { onChange: handleSingleImageChange })}
          />
        </label>

        {/* Imágenes secundarias */}
        <label
          htmlFor="secondary-images-product"
          className="cursor-pointer flex flex-col items-center"
        >
          {multipleFile.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 place-items-center">
              {multipleFile.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Secundaria - ${index}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-sm border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Recuadro para agregar más imágenes */}
              {multipleFile.length < 7 && (
                <label
                  htmlFor="secondary-images-product"
                  className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                >
                  <span className="text-3xl text-gray-500 font-bold">+</span>
                </label>
              )}
            </div>
          ) : (
            <div className="bg-[#D9D9D9] w-48 h-48 flex items-center justify-center text-center">
              {t("form.images.secondary")}
            </div>
          )}
          <input
            type="file"
            id="secondary-images-product"
            accept=".png, .jpg, .jpeg"
            className="hidden"
            multiple
            {...register("file", { onChange: handleMultipleImagesChange })}
          />
        </label>
      </div>

      {/* Contador total */}
      <div className="w-full text-center mt-2 text-sm text-gray-600">
        Imágenes: {totalImages} / {maxTotal}{" "}
        <span className="text-xs text-gray-500">
          (1 principal, hasta 7 secundarias)
        </span>
      </div>
    </div>
  );
};

export default ProductImagesUploader;
