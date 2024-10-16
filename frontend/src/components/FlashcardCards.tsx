import { Flashcard } from '@/interfaces/Flashcard'

interface FlashcardCardProps {
    flashcard: Flashcard
    isFlipped: boolean
    onFlip: () => void
    swipeDirection: 'left' | 'right' | null
    transitioning: boolean
    isTopCard: boolean
    hideContent: boolean
}

const FlashcardCard = ({
    flashcard,
    isFlipped,
    onFlip,
    swipeDirection,
    transitioning,
    isTopCard,
    hideContent,
}: FlashcardCardProps) => {
    const handleFlip = () => {
        if (!transitioning && isTopCard) {
            onFlip()
        }
    }

    return (
        <div
            className={`absolute w-full flex justify-center items-center transition-transform duration-500 
        ${swipeDirection === 'left' ? 'translate-x-[-100%]' : ''} 
        ${swipeDirection === 'right' ? 'translate-x-[100%]' : ''} 
        ${isTopCard ? 'z-10' : 'z-0'}`}
        >
            <div
                className={`relative w-96 h-64 cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={handleFlip}
            >
                {/* Front side */}
                <div
                    className={`absolute inset-0 w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg p-6 backface-hidden transform-style-3d`}
                >
                    <p>{!hideContent ? flashcard.question : ''}</p>
                </div>

                {/* Back side */}
                <div
                    className={`absolute inset-0 w-full h-full bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg p-6 backface-hidden transform-style-3d transform rotate-y-180`}
                >
                    <p>{flashcard.answer}</p>
                </div>
            </div>
        </div>
    )
}

export default FlashcardCard
