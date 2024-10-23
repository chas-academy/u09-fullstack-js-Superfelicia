import { useEffect, useState } from 'react'
import FormComponent from '../../../components/formComponent'

interface CollectionFormProps {
    collection?: any
    onSubmit: (collection: any) => void
    onCancel?: () => void
}

const CollectionForm = ({ collection, onSubmit, onCancel }: CollectionFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        infoText: '',
        deadline: '',
    })

    useEffect(() => {
        if (collection) {
            setFormData({
                name: collection.name || '',
                category: collection.category || '',
                infoText: collection.infoText || '',
                deadline: collection.deadline
                    ? new Date(collection.deadline).toISOString().substring(0, 10)
                    : '',
            })
        } else {
            setFormData({
                name: '',
                category: '',
                infoText: '',
                deadline: '',
            })
        }
    }, [collection])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const fields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter collection name',
            name: 'name',
            value: formData.name,
            onChange: handleInputChange,
        },
        {
            label: 'Category',
            type: 'text',
            placeholder: 'Enter collection category',
            name: 'category',
            value: formData.category,
            onChange: handleInputChange,
        },
        {
            label: 'Info Text',
            type: 'text',
            placeholder: 'Enter info text',
            name: 'infoText',
            value: formData.infoText,
            onChange: handleInputChange,
        },
        {
            label: 'Deadline',
            type: 'date',
            placeholder: '',
            name: 'deadline',
            value: formData.deadline,
            onChange: handleInputChange,
        },
    ]

    const handleSubmit = () => {
        if (!formData.name || !formData.category) {
            alert('Name and category are required fields.')
            return 
        }

        onSubmit(formData)
    }

    return (
        <FormComponent
            fields={fields}
            buttonText={collection ? 'Update collection' : 'Create collection'}
            onSubmit={handleSubmit}
            onCancel={onCancel}
        />
    )
}

export default CollectionForm
