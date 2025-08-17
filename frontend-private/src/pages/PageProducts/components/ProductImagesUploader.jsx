import React from "react";

const ProductImagesUploader = ({
    register,
    productImage,
    multipleFile = [],
    onImageChange,
    uploadMultipleFiles,
    removeImage,
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 rounded-md w-full mb-3">
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

            {/* Imágenes secundarias */}
            <label
                htmlFor="secondary-images-product"
                className="cursor-pointer flex flex-col items-center"
            >
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
    );
};

export default ProductImagesUploader;
