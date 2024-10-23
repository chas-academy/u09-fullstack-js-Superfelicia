import { useEffect, useState } from 'react'
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
    onCancel?: () => void
    isEditing?: boolean
    showActions?: boolean
    disableSubmit?: boolean
    hideCancelButton?: boolean
}

const FormComponent: React.FC<FormComponentProps> = ({
    fields,
    buttonText,
    onSubmit,
    onCancel,
    isEditing = true,
    children,
    showActions = true,
    disableSubmit = false,
    hideCancelButton = false,
}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const initialData = fields.reduce(
            (acc, field) => ({ ...acc, [field.name]: field.value || '' }),
            {}
        )
        setFormData(initialData)
    }, [fields])

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        } else {
            setFormData(
                fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || '' }), {})
            )
        }
    }

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
                <div key={field.name || index} className="flex flex-col space-y-2">
                    <Label className="flex flex-col items-start">{field.label}</Label>
                    <Input
                        type={field.type}
                        placeholder={
                            !isEditing && field.type === 'password' ? '********' : field.placeholder
                        }
                        name={field.name}
                        value={formData[field.name] ?? ''}
                        onChange={field.onChange || handleChange}
                        readOnly={!isEditing}
                        className={`${isEditing ? 'border' : 'border-transparent'} p-2 w-72 md:w-96 flex flex-1 dark:text-foreground`}
                    />
                </div>
            ))}
            <div className="w-full">{children}</div>
            {showActions && isEditing && (
                <div className="flex space-x-2 items-end place-self-end space-y-0">
                    <Button
                        type="submit"
                        disabled={disableSubmit}
                        className="w-full"
                    >
                        {buttonText}
                    </Button>
                    {!hideCancelButton && (
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            )}
        </form>
    )
}

export default FormComponent
