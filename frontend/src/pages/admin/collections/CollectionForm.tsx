import { useEffect, useState } from 'react'
import FormComponent from '../../../components/formComponent'

interface CollectionFormProps {
    collection?: any
    onSubmit: (collection: any) => void
}

const CollectionForm = ({ collection, onSubmit }: CollectionFormProps) => {
    const [collectionId, setCollectionId] = useState<string | null>(null)

    useEffect(() => {
        if (collection) {
            setCollectionId(collection._id)
        } else {
            setCollectionId(null)
        }
    }, [collection])

    const fields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter collection name',
            name: 'name',
            value: collection?.name || '', // Default value from collection
        },
        {
            label: 'Category',
            type: 'text',
            placeholder: 'Enter collection category',
            name: 'category',
            value: collection?.category || '',
        },
        {
            label: 'Info Text',
            type: 'text',
            placeholder: 'Enter info text',
            name: 'infoText',
            value: collection?.infoText || '',
        },
        {
            label: 'Deadline',
            type: 'date',
            placeholder: '',
            name: 'deadline',
            value: collection?.deadline
                ? new Date(collection.deadline).toISOString().substring(0, 10)
                : '',
        },
    ]

    const handleSubmitCollection = async (formData: { [key: string]: string }) => {
        const newCollection = { ...formData }
        let response
        let savedCollection

        try {
            if (collectionId) {
                response = await fetch(`http://localhost:3000/api/collections/${collectionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
                savedCollection = await response.json()
            } else {
                response = await fetch('http://localhost:3000/api/collections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
                savedCollection = await response.json()
                setCollectionId(savedCollection._id)
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
