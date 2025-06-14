const useProducts = (methods) => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = methods;

    return {
        register, handleSubmit, errors, control, reset
    }
}
export default useProducts;