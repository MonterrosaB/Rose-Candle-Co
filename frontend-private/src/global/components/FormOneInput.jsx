import Form from "./Form"
import FormInputs from "./FormInputs"
import FormButton from "./FormButton"

import Input from "./Input"
import Button from "./Button"

const FormOneInput = ({ headerLabel, onClose, onSubmit, name, label, register, error, btnTxt }) => {

    return (
        <>
            <Form headerLabel={headerLabel} onClose={onClose} onSubmit={onSubmit}>
                <FormInputs>
                    <Input
                        name={name}
                        label={label}
                        type="text"
                        register={register}
                        error={error}
                    />
                </FormInputs>
                <FormButton>
                    <Button
                        buttonText={btnTxt}
                        type={"submit"} />
                </FormButton>
            </Form>
        </>
    )
}
export default FormOneInput;