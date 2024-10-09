import { Button } from '@/components/ui/button'
import { Flashcard, NewFlashcard } from '@/interfaces/Flashcard'
import { useState, useEffect } from 'react'

interface CollectionFormProps {
    collection?: any
    onSubmit: () => void
}

const CollectionForm = ({ collection, onSubmit }: CollectionFormProps) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [flashcards, setFlashcards] = useState<NewFlashcard[]>([{ question: '', answer: '' }])
    const [collectionId, setCollectionId] = useState<string | null>(null)

    useEffect(() => {
        if (collection) {
            setName(collection.name)
            setCategory(collection.category)
            setCollectionId(collection._id) // Sätt collectionId om det är en redigering
            console.log(collectionId)

            setFlashcards(
                collection.flashcards.length > 0
                    ? collection.flashcards
                    : [{ question: '', answer: '' }]
            )
        } else {
            setName('')
            setCategory('')
            setCollectionId(null)
            setFlashcards([
                {
                    question: '',
                    answer: '',
                },
            ])
        }
    }, [collection])

    const handleFlashcardChange = (index: number, field: string, value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value }
        setFlashcards(updatedFlashcards)
    }

    const addFlashcard = () => {
        setFlashcards([...flashcards, { question: '', answer: '' }])
    }

    const handleSubmitCollection = async (e: React.FormEvent) => {
        e.preventDefault()

        const validFlashcards = flashcards.filter(
            (flashcard) => flashcard.question.trim() !== '' && flashcard.answer.trim() !== ''
        )

        const newCollection = { name, category, flashcards: validFlashcards }

        try {
            let response
            if (collectionId) {
                // PUT request (redigera samling)
                response = await fetch(`http://localhost:3000/api/collections/${collectionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
            } else {
                // POST request (skapa ny samling)
                response = await fetch('http://localhost:3000/api/collections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
                const createdCollection = await response.json()
                setCollectionId(createdCollection._id) // Nu har vi ID för den nya samlingen
            }

            onSubmit() // Uppdatera samlingslistan efter skapande/redigering
        } catch (error) {
            console.error('Error saving collection:', error)
        }
    }

    const handleSubmitFlashcards = async () => {
        if (!collectionId) {
            console.error('Collection ID is required to add flashcards')
            return
        }

        const validFlashcards = flashcards.filter(
            (flashcard) => flashcard.question.trim() !== '' && flashcard.answer.trim() !== ''
        )

        try {
            const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`)
            const existingCollection = await response.json()

            for (const flashcard of validFlashcards) {
                const duplicate = existingCollection.flashcards.some(
                    (existingFlashcard: Flashcard) =>
                        existingFlashcard.question === flashcard.question &&
                        ('_id' in flashcard ? existingFlashcard._id !== flashcard._id : true)
                )

                if (!duplicate) {
                    await fetch(
                        `http://localhost:3000/api/collections/${collectionId}/flashcards`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(flashcard),
                        }
                    )
                } else {
                    console.warn(
                        `Flashcard with question "${flashcard.question}" already exists in the collection.`
                    )
                }
            }
            onSubmit() // Uppdatera efter att flashcards har lagts till
        } catch (error) {
            console.error('Error adding flashcards:', error)
        }
    }

    return (
        <form
            className="flex flex-col items-start justify-center"
            onSubmit={handleSubmitCollection}
        >
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border"
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border"
                />
            </div>
            <Button type="submit">{collection ? 'Update collection' : 'Create collection'}</Button>

            {collectionId && (
                <div>
                    <h3>Add Flashcards:</h3>
                    {flashcards.map((flashcard, index) => (
                        <div key={index}>
                            <div>
                                <label>Question:</label>
                                <input
                                    type="text"
                                    value={flashcard.question}
                                    onChange={(e) =>
                                        handleFlashcardChange(index, 'question', e.target.value)
                                    }
                                    required
                                    className="border"
                                />
                            </div>
                            <div>
                                <label>Answer:</label>
                                <input
                                    type="text"
                                    value={flashcard.answer}
                                    onChange={(e) =>
                                        handleFlashcardChange(index, 'answer', e.target.value)
                                    }
                                    required
                                    className="border"
                                />
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={addFlashcard}>
                        Add flashcard
                    </Button>
                    <Button type="button" onClick={handleSubmitFlashcards}>
                        Save Flashcards to collection
                    </Button>
                </div>
            )}
        </form>
    )
}

export default CollectionForm
