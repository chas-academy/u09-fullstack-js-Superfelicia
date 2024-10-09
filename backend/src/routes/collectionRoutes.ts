import { Router } from 'express';
import { 
    createNewFlashcardCollection, 
    getAllFlashcardCollections, 
    getFlashcardCollection, 
    updateCollection, 
    deleteCollection 
} from '../controllers/CollectionController';

const router = Router();

// Collection routes
router.post('/collections', createNewFlashcardCollection);
router.get('/collections', getAllFlashcardCollections);
router.get('/collections/:id', getFlashcardCollection);
router.put('/collections/:id', updateCollection);
router.delete('/collections/:id', deleteCollection);

export default router;
