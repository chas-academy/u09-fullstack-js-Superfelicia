import { Button } from '@/components/ui/button'
import { Flashcard, NewFlashcard } from '@/interfaces/Flashcard'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FlashcardFormProps {
    collection: any
    onSubmit: () => void
}

const FlashcardForm = ({ collection, onSubmit }: FlashcardFormProps) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({ question: '', answer: ' ' })
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        if (collection) {
            setFlashcards(collection.flashcards || [])
        } else {
            setFlashcards([])
        }
    }, [collection])

    const handleFlashcardChange = (index: number, field: string, value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value }
        setFlashcards(updatedFlashcards)
    }

    const handleNewFlashcardChange = (field: string, value: string) => {
        setNewFlashcard((prev) => ({ ...prev, [field]: value }))
    }

    const addFlashcard = () => {
        if (newFlashcard.question.trim() && newFlashcard.answer.trim()) {
            setFlashcards([
                ...flashcards,
                {
                    _id: '',
                    question: newFlashcard.question,
                    answer: newFlashcard.answer,
                    mastered: false,
                    failedAttempts: 0,
                },
            ])
            setNewFlashcard({ question: '', answer: '' })
        }
    }

    const removeFlashcard = async (flashcardId: string) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/collections/${collection._id}/flashcards/${flashcardId}`,
                {
                    method: 'DELETE',
                }
            )
            if (response.ok) {
                setFlashcards((prevFlashcards) =>
                    prevFlashcards.filter((flashcard) =>
                        '_id' in flashcard ? flashcard._id !== flashcardId : true
                    )
                )
                console.log('Flashcard was removed')
            } else {
                console.error('Error removing flashcard from collection:', response.statusText)
            }
        } catch (error) {
            console.error('Error removing flashcard:', error)
        }
    }

    const handleSaveFlashcards = async () => {
        try {
            for (const flashcard of flashcards) {
                if (!flashcard._id) {
                    await fetch(
                        `http://localhost:3000/api/collections/${collection._id}/flashcards`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(flashcard),
                        }
                    )
                }
            }
            onSubmit()
        } catch (error) {
            console.error('Error adding flashcards:', error)
        }
    }

    const toggleEditFlashcard = (flashcardId: string) => {
        setEditMode((prev) => ({
            ...prev,
            [flashcardId]: !prev[flashcardId],
        }))
    }

    return (
        <form onSubmit={handleSaveFlashcards}>
            <h3>Flashcards in {collection.name}</h3>
            {flashcards.map((flashcard, index) => (
                <div
                    key={flashcard._id || index}
                    className="flex flex-col items-start justify-center space-y-4"
                >
                    {editMode[flashcard._id] ? (
                        <>
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
                            <Button
                                type="button"
                                onClick={() => toggleEditFlashcard(flashcard._id)}
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center border space-x-2">
                            <p>Question: {flashcard.question}</p>
                            <p>Answer: {flashcard.answer}</p>
                            <Button
                                type="button"
                                onClick={() => toggleEditFlashcard(flashcard._id)}
                            >
                                <Edit2 size={16} />
                            </Button>
                        </div>
                    )}
                    <Button
                        type="button"
                        onClick={() => removeFlashcard((flashcard as Flashcard)._id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ))}

            <div className="flex flex-col items-start justify-center space-y-4">
                <h3>Add new flashcard</h3>
                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        value={newFlashcard.question}
                        onChange={(e) => handleNewFlashcardChange('question', e.target.value)}
                        required
                        className="border"
                    />
                </div>
                <div>
                    <label>Answer:</label>
                    <input
                        type="text"
                        value={newFlashcard.answer}
                        onChange={(e) => handleNewFlashcardChange('answer', e.target.value)}
                        required
                        className="border"
                    />
                    <Button type="button" onClick={addFlashcard}>
                        <Plus size={16} />
                    </Button>
                </div>

                <Button type="submit">Save flashcards</Button>
            </div>
        </form>
    )
}

export default FlashcardForm
