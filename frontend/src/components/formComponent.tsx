import { useState } from 'react'
import { Button } from './ui/button'

interface FormField {
    label: string
    type: string
    placeholder: string
    name: string
}

interface FormComponentProps {
    fields: FormField[]
    buttonText: string
    children?: React.ReactNode
    onSubmit: (formData: { [key: string]: string }) => void
}

const FormComponent: React.FC<FormComponentProps> = ({
    fields,
    buttonText,
    onSubmit,
    children,
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
                <label key={index} className="flex flex-col items-start">
                    {field.label}
                    <input
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.name}
                        onChange={handleChange}
                        className="border-2 rounded-md p-2 w-96 flex flex-1"
                    />
                </label>
            ))}
            <div>{children}</div>
            <Button type="submit" className="w-2/4 self-end border rounded p-2">
                {buttonText}
            </Button>
        </form>
    )
}

export default FormComponent
