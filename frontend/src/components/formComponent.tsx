import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface FormField {
    label: string
    type: string
    placeholder: string
    name: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface FormComponentProps {
    fields: FormField[]
    buttonText: string
    children?: React.ReactNode
    onSubmit: (formData: { [key: string]: string }) => void
    isEditing?: boolean
    showActions?: boolean
}

const FormComponent: React.FC<FormComponentProps> = ({
    fields,
    buttonText,
    onSubmit,
    isEditing = true,
    children,
    showActions = true,
}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form data being submitted:', formData)
        onSubmit(formData)
    }

    return (
        <form className="flex flex-col items-start space-y-3" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <>
                    <Label key={index} className="flex flex-col items-start">
                        {field.label}
                    </Label>
                    <Input
                        type={field.type}
                        placeholder={
                            !isEditing && field.type === 'password' ? '********' : field.placeholder
                        }
                        name={field.name}
                        value={field.value ?? (formData[field.name] || '')}
                        onChange={field.onChange || handleChange}
                        readOnly={!isEditing}
                        className={`${isEditing ? 'border-1' : 'border-hidden'} p-3 w-72 md:w-96 flex flex-1`}
                    />
                </>
            ))}
            <div>{children}</div>
            {showActions && isEditing && (
                <Button type="submit" className="w-full border rounded-md p-6">
                    {buttonText}
                </Button>
            )}
        </form>
    )
}

export default FormComponent
