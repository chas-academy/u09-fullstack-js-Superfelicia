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
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
    const [hasFlipped, setHasFlipped] = useState(false)
    const [completedCards, setCompletedCards] = useState<Flashcard[]>([])
    const [notCompletedCards, setNotCompletedCards] = useState<Flashcard[]>([])
    const [isRoundComplete, setIsRoundComplete] = useState(false)

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
        if (currentIndex < flashcards.length - 1 && !transitioning) {
            setTransitioning(true)
            setIsFlipped(false)

            setTimeout(() => {
                setCurrentIndex((prevIndex) => prevIndex + 1)
                setTransitioning(false)
                setHasFlipped(false)
                setSwipeDirection(null)
            }, 300)
        } else if (currentIndex === flashcards.length - 1) {
            // setCurrentIndex((prevIndex) => prevIndex + 1)
            setIsRoundComplete(true)
        }
    }

    const handleSwipe = (direction: 'left' | 'right', choice: 'gotIt' | 'studyAgain') => {
        const currentCard = flashcards[currentIndex]
        if (hasFlipped) {
            if (choice === 'gotIt') {
                setCompletedCards((prev) => [...prev, currentCard])
            } else if (choice === 'studyAgain') {
                setNotCompletedCards((prev) => [...prev, currentCard])
            }
            setSwipeDirection(direction)
            handleNextFlashcard()
        }
    }

    const handleFlip = () => {
        if (!transitioning) {
            setIsFlipped((prevFlip) => !prevFlip)
            setTimeout(() => {
                setHasFlipped(true)
            }, 300)
        }
    }

    if (isRoundComplete) {
        return (
            <div>
                <h2>Round Complete!</h2>
                <p>You completed {completedCards.length} out of {flashcards.length} cards.</p>
                <p>Failed cards: {notCompletedCards.length}</p>
                <p>Succeeded cards: {completedCards.length}</p>
            </div>
        )
    }

    if (flashcards.length === 0) return <p>Loading flashcards...</p>

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
                {flashcards.slice(currentIndex, currentIndex + 2).map((flashcard, index) => (
                    <FlashcardCard
                        key={flashcard._id}
                        flashcard={flashcard}
                        isFlipped={index === 0 && isFlipped}
                        onFlip={handleFlip}
                        swipeDirection={index === 0 ? swipeDirection : null}
                        transitioning={transitioning}
                        isTopCard={index === 0}
                        hideContent={index === 1 && !swipeDirection}
                    />
                ))}
            </div>
            <div>
                <Button onClick={() => handleSwipe('left', 'studyAgain')} disabled={transitioning}>
                    Study again
                </Button>

                <Button onClick={() => handleSwipe('right', 'gotIt')} disabled={transitioning}>
                    Got it
                </Button>
            </div>
        </div>
    )
}

export default StartPage