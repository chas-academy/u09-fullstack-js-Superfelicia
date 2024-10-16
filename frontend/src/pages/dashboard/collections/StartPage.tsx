import FlashcardCard from '@/components/FlashcardCards'
import { Button } from '@/components/ui/button'
import { Flashcard } from '@/interfaces/Flashcard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StartPage = () => {
    const { collectionId } = useParams<{ collectionId: string }>()
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [transitioning, setTransitioning] = useState(false)

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/collections/${collectionId}/flashcards`
                )
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

    const handleNextFlashcard = () => {
        if (currentIndex < flashcards.length - 1) {
            if (isFlipped) {
                setIsFlipped(false)
                setTransitioning(true)
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => prevIndex + 1)
                    setTransitioning(false)
                }, 500)
            } else {
                setTransitioning(true)
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => prevIndex + 1)
                    setTransitioning(false)
                }, 500)
            }
        }
    }

    const handlePreviousFlashcard = () => {
        if (isFlipped) {
            setIsFlipped(false)
            setTransitioning(true)
            setTimeout(() => {
                setCurrentIndex(
                    (prevIndex) => prevIndex - 1 + (flashcards.length % flashcards.length)
                )
                setTransitioning(false)
            }, 500)
        } else {
            setTransitioning(true)
            setTimeout(() => {
                setCurrentIndex(
                    (prevIndex) => prevIndex - 1 + (flashcards.length % flashcards.length)
                )
                setTransitioning(false)
            }, 500)
        }
    }

    const handleFlip = () => {
        setIsFlipped((prevFlip) => !prevFlip)
    }

    if (flashcards.length === 0) return <p>Loading flashcards...</p>

    return (
        <div>
            <FlashcardCard
                flashcard={flashcards[currentIndex]}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                transitioning={transitioning}
            />
            <div>
                <Button onClick={handlePreviousFlashcard} disabled={currentIndex === 0}>
                    Previous
                </Button>

                <Button onClick={handleNextFlashcard} disabled={transitioning}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default StartPage
