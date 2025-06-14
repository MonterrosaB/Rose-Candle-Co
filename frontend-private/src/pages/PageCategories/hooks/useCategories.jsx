const useCategories = (methods) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    return {
        register, handleSubmit, errors, reset
    }
}
export default useCategories;