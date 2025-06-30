import { useState } from "react";


const changeImages = () => {

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
            setProductPrincipal(file); // este es el que se usa para subir

            // Opcional: mostrar vista previa
            const reader = new FileReader();
            reader.onload = (e) => {
                setProductImage(e.target.result);
                console.log(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        productImage,
        productImageFile,
        multipleFile,
        multipleFileFiles,
        uploadMultipleFiles,
        removeImage,
        onImageChange,
    }
}
export default changeImages;