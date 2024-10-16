import { Flashcard } from '@/interfaces/Flashcard'
import { useEffect, useState } from 'react'

interface FlashcardCardProps {
    flashcard: Flashcard
    isFlipped: boolean
    onFlip: () => void
    transitioning: boolean
}

const FlashcardCard = ({ flashcard, isFlipped, onFlip, transitioning }: FlashcardCardProps) => {
    const [showFront, setShowFront] = useState(true)

    useEffect(() => {
        if (transitioning) {
            setShowFront(true)
        }
    }, [transitioning])

    const handleFlip = () => {
        setShowFront(!showFront)
        onFlip()
    }

    return (
        <div className="flex justify-center items-center">
            <div
                className={`relative w-96 h-64 cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={handleFlip}
            >
                {/* Front side */}
                {!isFlipped && (
                    <div
                        className={`absolute inset-0 w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg p-6 backface-hidden transform-style-3d`}
                    >
                        <p>{flashcard.question}</p>
                    </div>
                )}

                {/* Back side */}
                {isFlipped && (
                    <div
                        className={`absolute inset-0 w-full h-full bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg p-6 backface-hidden transform-style-3d transform rotate-y-180`}
                    >
                        <p>{flashcard.answer}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FlashcardCard
