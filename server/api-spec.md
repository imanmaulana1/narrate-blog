## AUTH Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (Authorization: Bearer <token>)

## USER Endpoints

- GET /api/users/{id}
- PATCH /api/users/profile (Authorization: Bearer <token>)
- PATCH /api/users/change-password (Authorization: Bearer <token>)
- PATCH /api/users/upload-avatar (Authorization: Bearer <token>)

## POST Endpoints

- GET /api/posts // List of all posts
- GET /api/posts/{slug} // Get a single post
- POST /api/posts (Authorization: Bearer <token>) // Create a new post
- PATCH /api/posts/{id} (Authorization: Bearer <token>) // Update a post
- DELETE /api/posts/{id} (Authorization: Bearer <token>) // Delete a post

## CATEGORY Endpoints

- GET /api/category // List of all categories
- GET /api/category/{slug} // List of posts in a category

## COMMENT Endpoints

- GET /api/posts/{id}/comments
- POST /api/posts/{id}/comments (Authorization: Bearer <token>)
- PATCH /api/comments/{id} (Authorization: Bearer <token>)
- DELETE /api/comments/{id} (Authorization: Bearer <token>)

## LIKE Endpoints

- POST /api/posts/{id}/like (Authorization: Bearer <token>) // like or unlike a post

## READING LIST Endpoints

- GET /api/reading-lists
- GET /api/reading-lists/{id}
- POST /api/reading-lists (Authorization: Bearer <token>)
- PATCH /api/reading-lists/{id} (Authorization: Bearer <token>)
- DELETE /api/reading-lists/{id} (Authorization: Bearer <token>)
- POST /api/reading-lists/{id}/posts (Authorization: Bearer <token>)
- DELETE /api/reading-lists/{id}/posts/{postId} (Authorization: Bearer <token>)
