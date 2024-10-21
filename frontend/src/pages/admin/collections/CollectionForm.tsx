import { useEffect, useState } from 'react'
import FormComponent from '../../../components/formComponent'
import { API_URL } from '@/config'

interface CollectionFormProps {
    collection?: any
    onSubmit: (collection: any) => void
}

const CollectionForm = ({ collection, onSubmit }: CollectionFormProps) => {
    const [collectionId, setCollectionId] = useState<string | null>(null)
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

    const handleSubmitCollection = async () => {
        if (!formData.name || !formData.category) {
            alert('Name and categort are required fields.')
            return
        }

        const newCollection = {
            ...formData,
            infoText: formData.infoText || '',
            deadline: formData.deadline || '',
        }
        try {
            let response
            if (collectionId) {
                response = await fetch(`${API_URL}/collections/${collectionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
            } else {
                response = await fetch(`${API_URL}/collections`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
            }
            const savedCollection = await response.json()

            if (!response.ok) {
                throw new Error(savedCollection.message || 'Failed to save collection')
            }

            onSubmit(savedCollection)
        } catch (error) {
            console.error('Error saving collection:', error)
        }
    }

    return (
        <FormComponent
            fields={fields}
            buttonText={collection ? 'Update collection' : 'Create collection'}
            onSubmit={handleSubmitCollection}
        />
    )
}

export default CollectionForm
