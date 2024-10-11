import DialogComponent from '@/components/DialogComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { Flashcard, NewFlashcard } from '@/interfaces/Flashcard'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FlashcardFormProps {
    collection: Collection
    onSubmit: () => void
}

const FlashcardForm = ({ collection, onSubmit }: FlashcardFormProps) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({ question: '', answer: ' ' })
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        if (collection) {
            console.log('Collection flashcards:', collection)
            setFlashcards(collection.flashcards || [])
        } else {
            setFlashcards([])
        }
    }, [collection])

    // Lägg till flashcards lokalt utan att spara de i databasen ännu
    const handleNewFlashcardChange = (field: string, value: string) => {
        setNewFlashcard((prev) => ({ ...prev, [field]: value }))
    }

    const handleFlashcardChange = (index: number, field: string, value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value }
        setFlashcards(updatedFlashcards)
    }

    const addFlashcardLocally = () => {
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
                `http://localhost:3000/api/flashcards/${collection._id}/flashcards/${flashcardId}`,
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

    const handleCreateFlashcard = async (flashcard: NewFlashcard) => {
        try {
            const url = `http://localhost:3000/api/flashcards/${collection._id}/flashcards`
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flashcard),
            })

            if (!response.ok) {
                console.log('Error creating flashcard:', await response.json())
            } else {
                console.log('Flashcard created successfully')
            }
        } catch (error) {
            console.error('Error creating flashcard:', error)
        }
    }

    const handleUpdateFlashcard = async (flashcard: Flashcard) => {
        try {
            const url = `http://localhost:3000/api/flashcards/${collection._id}/flashcards/${flashcard._id}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: flashcard.question,
                    answer: flashcard.answer,
                    mastered: flashcard.mastered,
                    failedAttempts: flashcard.failedAttempts,
                }),
            })

            if (!response.ok) {
                console.log('Error updating flashcard:', await response.json())
            } else {
                console.log('Flashcard updated successfully')
            }
        } catch (error) {
            console.error('Error updating flashcard:', error)
        }
    }

    const handleSaveFlashcards = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            for (const flashcard of flashcards) {
                if (flashcard._id) {
                    await handleUpdateFlashcard(flashcard as Flashcard)
                } else {
                    await handleCreateFlashcard(flashcard)
                }
            }

            setEditMode({})
            onSubmit()
        } catch (error) {
            console.error('Error saving flashcards:', error)
        }
    }

    const toggleEditFlashcard = (flashcardId: string) => {
        setEditMode((prev) => ({
            ...prev,
            [flashcardId]: !prev[flashcardId],
        }))
    }

    return (
        <form onSubmit={handleSaveFlashcards} className='min-w-full'>
            <h3>Flashcards in {collection.name}</h3>
            <div className='w-full flex justify-end'>
            <DialogComponent
                title="Add new flashcard"
                triggerText={<Plus size={16}/>}
                onConfirm={addFlashcardLocally}
                confirmText="Save"
                cancelText="Cancel"
            >
                <div className="flex flex-col items-start justify-center space-y-4">
                    <h3>Add new flashcard</h3>
                    <div>
                        <label>Question:</label>
                        <input
                            type="text"
                            value={newFlashcard.question}
                            onChange={(e) => handleNewFlashcardChange('question', e.target.value)}
                            required={newFlashcard.question !== ''}
                            className="border"
                        />
                    </div>
                    <div>
                        <label>Answer:</label>
                        <input
                            type="text"
                            value={newFlashcard.answer}
                            onChange={(e) => handleNewFlashcardChange('answer', e.target.value)}
                            required={newFlashcard.answer !== ''}
                            className="border"
                        />
                        <Button type="button" onClick={addFlashcard}>
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>
            </DialogComponent>
            </div>

            {flashcards.map((flashcard, index) => (
                <div
                    key={flashcard._id || index}
                    className="w-96 flex flex-col items-start justify-center space-y-4"
                >
                    {editMode[flashcard._id] ? (
                        <div className="w-full flex justify-center items-end space-x-2">
                            <div className="flex flex-col items-start">
                                <label>Question:</label>
                                <input
                                    type="text"
                                    value={flashcard.question}
                                    onChange={(e) =>
                                        handleFlashcardChange(index, 'question', e.target.value)
                                    }
                                    required
                                    className="border rounded-md h-8"
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <label>Answer:</label>
                                <input
                                    type="text"
                                    value={flashcard.answer}
                                    onChange={(e) =>
                                        handleFlashcardChange(index, 'answer', e.target.value)
                                    }
                                    required
                                    className="border rounded-md h-8"
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => toggleEditFlashcard(flashcard._id)}
                            >
                                Save
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between border space-x-2">
                            <div className='w-full flex flex-col justify-center items-start'>
                                <label>Question: </label>
                                <p>{flashcard.question}</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-start'>
                                <label>Answer: </label>
                                <p>{flashcard.answer}</p>
                            </div>
                            <div>
                            <Button
                                type="button"
                                onClick={() => toggleEditFlashcard(flashcard._id)}
                            >
                                <Edit2 size={16} />
                            </Button>
                            <Button
                                type="button"
                                onClick={() => removeFlashcard((flashcard as Flashcard)._id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <Button type="submit">Save flashcards</Button>
        </form>
    )
}

export default FlashcardForm
