import { Flashcard } from "@/interfaces/Flashcard"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const StartPage = () => {
    const { collectionId } = useParams<{ collectionId: string }>()
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/collections/${collectionId}/flashcards`)
                if (!response.ok) {
                    throw new Error('Failed to fetch flashcards')
                }

                const data = await response.json()
                setFlashcards(data)
            } catch (error) {
                console.error('Error fetching flashcards:', error)
            }
        }

        fetchFlashcards()
    }, [collectionId])

    if (flashcards.length === 0) return <p>Loading flashcards...</p>


    return (
        <div>
            <h1>Flashcards for collection {collectionId}</h1>
            {flashcards.map((flashcard) => (
                <div key={flashcard._id}>
                    <p>Question: {flashcard.question}</p>
                    <p>Answer: {flashcard.answer}</p>
                </div>
            ))}
        </div>
    )
}

export default StartPage