// changeImages.js
import { useState, useEffect } from "react";

const changeImages = (selectedProduct) => {
    const [productImage, setProductImage] = useState(null);
    const [productImageFile, setProductImageFile] = useState(null);
    const [multipleFile, setMultipleFile] = useState([]);
    const [multipleFileFiles, setMultipleFileFiles] = useState([]);

    //  Detectar si ya hay imágenes en producto seleccionado
    useEffect(() => {
        if (selectedProduct) {
            if (selectedProduct.images && selectedProduct.images.length > 0) {
                setProductImage(selectedProduct.images[0]); // principal
                setMultipleFile(selectedProduct.images.slice(1)); // secundarias
            }
        }
    }, [selectedProduct]);

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(URL.createObjectURL(file));
        setProductImageFile(file);
    };

    const uploadMultipleFiles = (e) => {
        const files = Array.from(e.target.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setMultipleFile(fileURLs);
        setMultipleFileFiles(files);
    };

    const removeImage = (index) => {
        const newFileList = [...multipleFileFiles];
        const newURLList = [...multipleFile];
        newFileList.splice(index, 1);
        newURLList.splice(index, 1);
        setMultipleFileFiles(newFileList);
        setMultipleFile(newURLList);
    };

    return {
        productImage,
        productImageFile,
        multipleFile,
        multipleFileFiles,
        onImageChange,
        uploadMultipleFiles,
        removeImage,
    };
};

export default changeImages;
