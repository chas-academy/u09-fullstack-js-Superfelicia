import DialogComponent from '@/components/DialogComponent'
import FormComponent from '@/components/formComponent'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { API_URL } from '@/config'
import { Collection } from '@/interfaces/Collection'
import { Flashcard, NewFlashcard } from '@/interfaces/Flashcard'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FlashcardFormProps {
    collection: Collection
    onSubmit: (stayOnCollection?: boolean) => void
}

const FlashcardForm = ({ collection, onSubmit }: FlashcardFormProps) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({ question: '', answer: ' ' })
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (collection && !hasChanges) {
            console.log('Collection flashcards:', collection)
            setFlashcards(collection.flashcards || [])
        }
    }, [collection, hasChanges])

    // Lägg till flashcards lokalt utan att spara de i databasen ännu
    const handleNewFlashcardChange = (formData: { [key: string]: string }) => {
        setNewFlashcard({
            question: formData.question,
            answer: formData.answer,
        })
        setHasChanges(true)
    }

    const handleFlashcardChange = (index: number, field: string, value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value }
        setFlashcards(updatedFlashcards)
        setHasChanges(true)
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
            setHasChanges(true)
        }
    }

    const removeFlashcard = async (flashcardId: string) => {
        try {
            const response = await fetch(
                `${API_URL}/flashcards/${collection._id}/flashcards/${flashcardId}`,
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
            const url = `${API_URL}/flashcards/${collection._id}/flashcards`
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
            const url = `${API_URL}/flashcards/${collection._id}/flashcards/${flashcard._id}`
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
            setHasChanges(false)

            onSubmit(true)
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

    const handleCancelEdit = (flashcardId: string) => {
        setEditMode((prev) => ({
            ...prev,
            [flashcardId]: false,
        }))
        setHasChanges(false)
        console.log('Editing cancelled, changes discarded')
    }

    return (
        <div className="min-w-full">
            <h3>Flashcards in {collection.name}</h3>
            <div className="w-full flex justify-end">
                <DialogComponent
                    title="Add new flashcard"
                    triggerText={<Plus size={16} />}
                    onConfirm={addFlashcardLocally}
                    confirmText="Save"
                    cancelText="Cancel"
                >
                    <FormComponent
                        fields={[
                            {
                                label: 'Question',
                                type: 'text',
                                placeholder: 'Enter question',
                                name: 'question',
                                value: newFlashcard.question,
                            },
                            {
                                label: 'Answer',
                                type: 'text',
                                placeholder: 'Enter answer',
                                name: 'answer',
                                value: newFlashcard.answer,
                            },
                        ]}
                        buttonText="Add flashcard"
                        onSubmit={handleNewFlashcardChange}
                    />
                </DialogComponent>
            </div>

            {flashcards.map((flashcard, index) => (
                <div
                    key={flashcard._id || index}
                    className="w-96 flex flex-col items-start justify-center space-y-4"
                >
                    {editMode[flashcard._id] ? (
                        <FormComponent
                            fields={[
                                {
                                    label: 'Question',
                                    type: 'text',
                                    placeholder: 'Enter question',
                                    name: 'question',
                                    value: flashcard.question,
                                    onChange: (e) =>
                                        handleFlashcardChange(index, 'question', e.target.value),
                                },
                                {
                                    label: 'Answer',
                                    type: 'text',
                                    placeholder: 'Enter answer',
                                    name: 'answer',
                                    value: flashcard.answer,
                                    onChange: (e) =>
                                        handleFlashcardChange(index, 'answer', e.target.value),
                                },
                            ]}
                            buttonText="Save"
                            onSubmit={() => toggleEditFlashcard(flashcard._id)}
                            disableSubmit={!hasChanges}
                            onCancel={() => handleCancelEdit(flashcard._id)}
                        />
                    ) : (
                        <div className="w-full flex items-center justify-between border space-x-2">
                            <div className="w-full flex justify-center items-start">
                                <Label>Question:
                                <p>{flashcard.question}</p>
                                </Label>
                            </div>
                            <div className="w-full flex justify-center items-start">
                                <Label>Answer: 
                                <p>{flashcard.answer}</p>
                                </Label>
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
            <Button type="button" onClick={handleSaveFlashcards}>Save flashcards</Button>
        </div>
    )
}

export default FlashcardForm
