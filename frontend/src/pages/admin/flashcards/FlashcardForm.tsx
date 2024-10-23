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
        if (collection) {
            setFlashcards(collection.flashcards || [])
        }
    }, [collection])

    const handleFlashcardChange = (index: number, field: string, value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index] = { ...updatedFlashcards[index], [field]: value }
        setFlashcards(updatedFlashcards)
        setHasChanges(true)
    }

    const addFlashcardLocally = () => {
        if (newFlashcard.question.trim() && newFlashcard.answer.trim()) {
            setFlashcards((prevFlashcards) => [
                ...prevFlashcards,
                {
                    _id: '',
                    question: newFlashcard.question,
                    answer: newFlashcard.answer,
                    mastered: false,
                    failedAttempts: 0,
                } as Flashcard,
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
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
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
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(flashcard),
            })

            if (response.ok) {
                const createdFlashcard = await response.json()

                return {
                    _id: createdFlashcard._id,
                    question: createdFlashcard.question,
                    answer: createdFlashcard.answer,
                    mastered: createdFlashcard.mastered,
                    failedAttempts: createdFlashcard.failedAttempts,
                } as Flashcard
            } else {
                const errorData = await response.json()
                console.log('Error creating flashcard:', errorData)
            }
        } catch (error) {
            console.error('Error creating flashcard:', error)
        }
        return null
    }

    const handleUpdateFlashcard = async (flashcard: Flashcard) => {
        try {
            const url = `${API_URL}/flashcards/${collection._id}/flashcards/${flashcard._id}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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

        if (!hasChanges) {
            console.log('No changes detected. Skipping save.')
            return
        }

        try {
            const newFlashcards = flashcards.filter((flashcard) => !flashcard._id)
            const existingFlashcards = flashcards.filter((flashcard) => flashcard._id)

            const createdFlashcards: Flashcard[] = []

            for (const flashcard of newFlashcards) {
                const newCardData: NewFlashcard = {
                    question: flashcard.question,
                    answer: flashcard.answer,
                }

                const createdFlashcard = await handleCreateFlashcard(newCardData)

                if (createdFlashcard) {
                    createdFlashcards.push(createdFlashcard)
                }
            }

            if (createdFlashcards.length > 0) {
                setFlashcards((prevFlashcards) => {
                    const updatedFlashcards = [
                        ...prevFlashcards.filter((flashcard) => flashcard._id),
                        ...createdFlashcards,
                    ]
                    console.log('New flashcards:', createdFlashcards)
                    return updatedFlashcards
                })
            }

            for (const flashcard of existingFlashcards) {
                await handleUpdateFlashcard(flashcard)
            }

            setEditMode({})
            setHasChanges(false)

            console.log('Flashcards saved successfully.')
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

    const handleCancelEdit = (flashcardId: string, closeDialog?: () => void) => {
        setEditMode((prev) => ({
            ...prev,
            [flashcardId]: false,
        }))
        if (closeDialog) {
            closeDialog()
        }
        console.log('Editing cancelled, changes discarded')
    }

    return (
        <div className="w-full flex flex-col space-y-4">
            <>
                <h3>Flashcards in {collection.name}</h3>
                <div className="min-w-96 flex justify-end">
                    <DialogComponent
                        title="Add new flashcard"
                        triggerText={<Plus size={16} />}
                        onConfirm={addFlashcardLocally}
                        showActions={false}
                    >
                        {({ closeDialog }) => (
                            <FormComponent
                                fields={[
                                    {
                                        label: 'Question',
                                        type: 'text',
                                        placeholder: 'Enter question',
                                        name: 'question',
                                        value: newFlashcard.question,
                                        onChange: (e) =>
                                            setNewFlashcard({
                                                ...newFlashcard,
                                                question: e.target.value,
                                            }),
                                    },
                                    {
                                        label: 'Answer',
                                        type: 'text',
                                        placeholder: 'Enter answer',
                                        name: 'answer',
                                        value: newFlashcard.answer,
                                        onChange: (e) =>
                                            setNewFlashcard({
                                                ...newFlashcard,
                                                answer: e.target.value,
                                            }),
                                    },
                                ]}
                                buttonText="Add flashcard"
                                onSubmit={() => {
                                    addFlashcardLocally()
                                    closeDialog()
                                }}
                                // disableSubmit={!hasChanges}
                                onCancel={closeDialog}
                            />
                        )}
                    </DialogComponent>
                </div>

                <div className="min-h-80 max-h-96 overflow-y-auto space-y-2">
                    {flashcards.map((flashcard, index) => (
                        <div
                            key={flashcard._id || index}
                            className="flex flex-col items-start justify-center border rounded-sm p-2"
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
                                                handleFlashcardChange(
                                                    index,
                                                    'question',
                                                    e.target.value
                                                ),
                                        },
                                        {
                                            label: 'Answer',
                                            type: 'text',
                                            placeholder: 'Enter answer',
                                            name: 'answer',
                                            value: flashcard.answer,
                                            onChange: (e) =>
                                                handleFlashcardChange(
                                                    index,
                                                    'answer',
                                                    e.target.value
                                                ),
                                        },
                                    ]}
                                    buttonText="Save"
                                    onSubmit={() => toggleEditFlashcard(flashcard._id)}
                                    disableSubmit={!hasChanges}
                                    onCancel={() => handleCancelEdit(flashcard._id)}
                                />
                            ) : (
                                <div
                                    key={flashcard._id || index}
                                    className="min-w-96 flex items-center justify-between"
                                >
                                    <div className="flex flex-col justify-center items-start space-y-2">
                                        <>
                                            <Label>Question:</Label>
                                            <p>{flashcard.question}</p>
                                        </>
                                        <>
                                            <Label>Answer:</Label>
                                            <p>{flashcard.answer}</p>
                                        </>
                                    </div>
                                    <div>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="button"
                                                onClick={() => toggleEditFlashcard(flashcard._id)}
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <DialogComponent
                                                title="Delete flashcard"
                                                description="Are you sure you want to delete this flashcard?"
                                                triggerText={<Trash2 size={16} />}
                                                onConfirm={() => removeFlashcard(flashcard._id)}
                                                confirmText="Delete"
                                                cancelText="Cancel"
                                                isDeleteConfirmation
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </>
            <>
                <Button type="button" onClick={handleSaveFlashcards} className='w-2/3'>
                    Save flashcards
                </Button>
            </>
        </div>
    )
}

export default FlashcardForm
