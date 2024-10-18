import { API_URL } from '@/config';
import { useState, useEffect } from 'react';

interface Flashcard {
  question: string;
  answer: string;
}

interface Collection {
  _id: string;
  name: string;
  category: string;
}

const CreateFlashcardForm = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Hämta samlingar från backend
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${API_URL}/collections/flashcards`);
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        setError('Error fetching collections');
      }
    };

    fetchCollections();
  }, []);

  const handleAddFlashcard = () => {
    if (!question || !answer) {
      setError('Fråga och svar måste fyllas i');
      return;
    }
    const newFlashcard = { question, answer };
    setFlashcards([...flashcards, newFlashcard]);
    setQuestion('');
    setAnswer('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCollection) {
      setError('Välj en samling att lägga till flashcards i');
      return;
    }

    // Skicka flashcards till backend under specifik collection
    try {
      const response = await fetch(`${API_URL}/collections/${selectedCollection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flashcards),
      });

      if (response.ok) {
        setSuccess('Flashcards tillagda i samlingen!');
        setFlashcards([]);
      } else {
        setError('Något gick fel. Försök igen.');
      }
    } catch (error) {
      setError('Serverfel. Försök igen senare.');
    }
  };

  return (
    <div>
      <h2>Skapa Flashcards</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Dropdown för att välja samling */}
      <div>
        <label>Välj en samling:</label>
        <select 
          value={selectedCollection} 
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value="">--Välj en samling--</option>
          {collections.map(collection => (
            <option key={collection._id} value={collection._id}>
              {collection.name} ({collection.category})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fråga:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Svar:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddFlashcard}>
          Lägg till flashcard
        </button>
        <button type="submit">Skicka alla flashcards</button>
      </form>

      {flashcards.length > 0 && (
        <div>
          <h3>Flashcards som ska läggas till:</h3>
          <ul>
            {flashcards.map((fc, index) => (
              <li key={index}>
                <strong>Fråga:</strong> {fc.question} <br />
                <strong>Svar:</strong> {fc.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateFlashcardForm;
