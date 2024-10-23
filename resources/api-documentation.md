***Auth routes***
| Method  | Route              | Middleware                                 | Controller                      | Permission  |
|---------|--------------------|--------------------------------------------|----------------------------------|-------------|
| POST    | /login             | N/A                                        | login                           | Unprotected |
| POST    | /user              | N/A                                        | registerUserController           | Unprotected |
| GET     | /dashboard         | authMiddleware                             | N/A                             | Protected   |
| GET     | /admin-dashboard   | authMiddleware, roleMiddleware("admin")     | N/A                             | Admin       |



***User routes***
| Method | Route                                           | Middleware                                         | Controller                           | Permission  |
|--------|-------------------------------------------------|----------------------------------------------------|--------------------------------------|-------------|
| GET    | /users                                          | authMiddleware, roleMiddleware("admin")             | getUsersController                   | Admin       |
| PUT    | /user/:id                                       | authMiddleware                                      | updateUserController                 | Protected   |
| DELETE | /user/:id                                       | authMiddleware                                      | deleteUserController                 | Protected   |
| POST   | /users/:userId/collections/:collectionId        | authMiddleware, roleMiddleware("admin")             | addCollectionToUserController        | Admin       |
| GET    | /users/:userId/collections                      | authMiddleware, roleMiddleware("user")              | getUserCollectionsController         | User        |
| GET    | /users/:userId/collections/:collectionId        | authMiddleware, roleMiddleware("user")              | getUserCollectionController          | User        |
| PUT    | /user/:id/update-password                       | authMiddleware                                      | updateUserPasswordController         | Protected   |
| PUT    | /user/:id/reset-password                        | authMiddleware                                      | resetUserPasswordController          | Protected   |
| POST   | /user/request-reset-password                    | N/A                                                | requestPasswordResetController       | Unprotected |
| PUT    | /user/reset-password/:token                     | N/A                                                | resetPasswordController              | Unprotected |


***Collections routes***
| Method  | Route                                        | Middleware                                         | Controller                             | Permission  |
|---------|----------------------------------------------|----------------------------------------------------|----------------------------------------|-------------|
| POST    | /                                             | authMiddleware, roleMiddleware('admin')             | createNewCollectionController          | Admin       |
| GET     | /                                             | authMiddleware                                      | getAllCollectionsController            | Protected   |
| GET     | /:id                                          | authMiddleware                                      | getCollectionController                | Protected   |
| GET     | /:collectionId/flashcards                     | authMiddleware                                      | getFlashcardsByCollectionController    | Protected   |
| PUT     | /:id                                          | authMiddleware, roleMiddleware('admin')             | updateCollectionController             | Admin       |
| DELETE  | /:id                                          | authMiddleware, roleMiddleware('admin')             | deleteCollectionController             | Admin       |



***Flashcard routes***
| Method  | Route                                        | Middleware                                         | Controller                             | Permission  |
|---------|----------------------------------------------|----------------------------------------------------|----------------------------------------|-------------|
| POST    | /:collectionId/flashcards                    | authMiddleware, roleMiddleware('admin')             | addFlashcardController                 | Admin       |
| PUT     | /:collectionId/flashcards/:flashcardId       | authMiddleware, roleMiddleware('admin')             | updateFlashcardController              | Admin       |
| DELETE  | /:collectionId/flashcards/:flashcardId       | authMiddleware, roleMiddleware('admin')             | deleteFlashcardController              | Admin       |

