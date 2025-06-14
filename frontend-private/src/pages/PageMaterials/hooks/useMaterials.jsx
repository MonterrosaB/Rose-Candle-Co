const useOrders = (methods) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    return {
        register, handleSubmit, errors
    }
}
export default useOrders;