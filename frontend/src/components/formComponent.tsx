import React, { useState } from 'react'

interface FormField {
    label: string
    type: string
    placeholder: string
    name: string
}

interface FormComponentProps {
    fields: FormField[]
    buttonText: string
    onSubmit: (formData: { [key: string]: string }) => void
}

const FormComponent: React.FC<FormComponentProps> = ({ fields, buttonText, onSubmit }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        console.log('Updated formData:', formData)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form data being submitted:', formData)
        onSubmit(formData)
    }

    return (
        <>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <label key={index}>
                        {field.label}
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleChange}
                        />
                    </label>
                ))}
                <button type="submit" className="border rounded">
                    {buttonText}
                </button>
            </form>
        </>
    )
}

export default FormComponent
