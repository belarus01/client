import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm"

export const AddEventOrderFrom: React.FC = () => {

    const onFinish = (values:any) =>{

    }

    return (
        <>
            <BaseButtonsForm
                layout="vertical"
                onFinish={onFinish}
                isFieldsChanged={false}
            >
                
            </BaseButtonsForm>
        </>
    )
}