import { Flashcard } from './Flashcard'

export interface Collection {
    _id: string
    name: string
    category: string
    flashcards: Flashcard[]
    progress: number
    status: 'not started' | 'in progress' | 'completed'
    infoText?: string
    deadline: string
}
