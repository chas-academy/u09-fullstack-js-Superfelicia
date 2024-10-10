import { Flashcard } from './Flashcard'

export interface Collection {
    _id: string
    name: string
    category: string
    flashcards: Flashcard[]
}
