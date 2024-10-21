import { API_URL } from '@/config'
import { useState, useEffect } from 'react'
import { Label } from './ui/label'
import FormComponent from './formComponent'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface Flashcard {
    question: string
    answer: string
}

interface Collection {
    _id: string
    name: string
    category: string
}

const CreateFlashcardForm = () => {
    const [collections, setCollections] = useState<Collection[]>([])
    const [selectedCollection, setSelectedCollection] = useState<string>('')
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        // Hämta samlingar från backend
        const fetchCollections = async () => {
            try {
                const response = await fetch(`${API_URL}/collections/flashcards`)
                const data = await response.json()
                setCollections(data)
            } catch (error) {
                setError('Error fetching collections')
            }
        }

        fetchCollections()
    }, [])

    const handleAddFlashcard = (formData: { [key: string]: string }) => {
        const { question, answer } = formData

        if (!question || !answer) {
            setError('Fråga och svar måste fyllas i')
            return
        }
        const newFlashcard = { question, answer }
        setFlashcards([...flashcards, newFlashcard])
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedCollection) {
            setError('Välj en samling att lägga till flashcards i')
            return
        }

        // Skicka flashcards till backend under specifik collection
        try {
            const response = await fetch(`${API_URL}/collections/${selectedCollection}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flashcards),
            })

            if (response.ok) {
                setSuccess('Flashcards tillagda i samlingen!')
                setFlashcards([])
            } else {
                setError('Något gick fel. Försök igen.')
            }
        } catch (error) {
            setError('Serverfel. Försök igen senare.')
        }
    }

    const flashcardFields = [
        {
            label: 'Fråga',
            type: 'text',
            placeholder: 'Skriv in frågan',
            name: 'question',
            value: '',
        },
        {
            label: 'Svar',
            type: 'text',
            placeholder: 'Skriv in svaret',
            name: 'answer',
            value: '',
        },
    ]

    return (
        <div>
            <h2>Skapa Flashcards</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <Label>Välj en samling:</Label>
                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                    <SelectTrigger>
                        <SelectValue placeholder="--välj en samling--" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                    {collections.map((collection) => (
                        <SelectItem key={collection._id} value={collection._id}>
                            {collection.name} ({collection.category})
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <FormComponent
                fields={flashcardFields}
                buttonText="Lägg till flashcard"
                onSubmit={handleAddFlashcard}
            />

            <form onSubmit={handleSubmit}>
                <button type="submit">Skicka alla flashcards</button>
            </form>

            {flashcards.length > 0 && (
                <div>
                    <h3>Flashcards som ska läggas till:</h3>
                    <ul>
                        {flashcards.map((fc, index) => (
                            <li key={index}>
                                <strong>Fråga:</strong> {fc.question} <br />
                                <strong>Svar:</strong> {fc.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CreateFlashcardForm
