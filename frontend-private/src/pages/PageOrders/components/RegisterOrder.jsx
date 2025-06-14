import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";

import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown"
import Button from "../../../global/components/Button";
import SearchBar from "../../../global/components/SearchBar";
import CardProductOrder from "./CardProductOrder";
import CardProduct from "./CardProduct";

import Card from "../../../assets/calmness.jpg"

import { useForm } from "react-hook-form";
import useOrders from "../../PageMaterials/hooks/useMaterials";

const RegisterOrder = () => {

    const methods = useForm();
    const { register, handleSubmit, errors } = useOrders(methods);

    const metodosPago = [
        { _id: 'CE', label: 'Contra Entrega' },
        { _id: 'T', label: 'Transferencia' }
    ];

    const productos = [
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '681bcf851e73503c6d06bfb9',
            availability: false,
            components: ['Cera de abeja', 'Aceite esencial de lavanda', 'Mecha de algodón'],
            currentPrice: 10.5,
            description: 'Vela natural con fragancia floral suave',
            idProductCategory: '680bbcb9248b6ebb26f03cc9',
            images: [Card, 'vela_lavanda2.jpg'],
            name: 'Vela de Lavanda Artesanal',
            recipe: ['Fundir cera', 'Agregar aceite esencial', 'Verter en molde', 'Colocar mecha'],
            useForm: ['Decoración', 'Relajación'],
            idcollection: '681aaeb6fe90a36d810fe974',
            discount: 15
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },
        {
            _id: '680bfc741e73503c6d06afa8',
            availability: true,
            components: ['Componente 1', 'Componente 2', 'Componente 3', 'Componente 4'],
            currentPrice: 12.99,
            description: 'Una vela aromática para relajarse',
            idProductCategory: '680bbcb9248b6ebb26f03bb4',
            images: [Card, 'imagen2.jpg'],
            name: 'Vela Aromatica de soja',
            recipe: ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6', 'Paso 7'],
            useForm: ['Uso 1', 'Uso 2'],
            idcollection: '681aaeb6fe90a36d810fe973',
            discount: 0
        },

    ];

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form headerLabel={"Agregar Nueva Orden"} onSubmit={handleSubmit(onSubmit)} >
            <FormInputs>
                <div className="flex justify-center items-center gap-4 w-full">
                    <Input
                        name={"name"}
                        label={"Nombre"}
                        type="text"
                        register={register}
                        errors={errors}
                    />
                    <Dropdown
                        name={"paymentMethod"}
                        label={"Método de pago"}
                        options={metodosPago}
                        register={register}
                    />
                    <Input
                        name={"phoneNumber"}
                        label={"Teléfono"}
                        register={register}
                        type="number"
                    />
                </div>
                <CardProduct productos={productos} />


                <div className="flex justify-center items-center gap-4 w-full">
                    <Input
                        name={"address"}
                        label={"Dirección"}
                        type="text"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        name={"discount"}
                        label={"Descuento"}
                        register={register}
                        type="number"
                    />
                </div>
                <h2 className="font-bold text-2xl">Total: 00.0</h2>
            </FormInputs>
            <FormButton>
                <Button
                    buttonText={"Agregar Orden"}
                    showIcon={true}
                    type={"sumbit"}
                />
            </FormButton>
        </Form>

    )
}
export default RegisterOrder;