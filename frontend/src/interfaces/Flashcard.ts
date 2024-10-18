export interface NewFlashcard {
    question: string;
    answer: string;
}

export interface Flashcard extends NewFlashcard {
    _id: string;
    mastered: boolean;
    failedAttempts: number;
}