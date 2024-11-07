## AUTH Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (Authorization: Bearer <token>)

## USER Endpoints

- GET /api/users/{id}
- PATCH /api/user/profile (Authorization: Bearer <token>)
- PATCH /api/user/change-password (Authorization: Bearer <token>)
- PATCH /api/user/upload-avatar (Authorization: Bearer <token>)

## POST Endpoints

- GET /api/posts
- GET /api/posts/{id}
- GET /api/posts/category/{slug}
- POST /api/posts (Authorization: Bearer <token>)
- PATCH /api/posts/{id} (Authorization: Bearer <token>)
- DELETE /api/posts/{id} (Authorization: Bearer <token>)

## COMMENT Endpoints

- GET /api/posts/{id}/comments
- POST /api/posts/{id}/comments (Authorization: Bearer <token>)
- PATCH /api/comments/{id} (Authorization: Bearer <token>)
- DELETE /api/comments/{id} (Authorization: Bearer <token>)

## LIKE Endpoints

- POST /api/posts/{id}/like (Authorization: Bearer <token>) // like or unlike a post

## CATEGORY Endpoints

- GET /api/categories/{slug}

## READING LIST Endpoints

- GET /api/reading-lists
- GET /api/reading-lists/{id}
- POST /api/reading-lists (Authorization: Bearer <token>)
- PATCH /api/reading-lists/{id} (Authorization: Bearer <token>)
- DELETE /api/reading-lists/{id} (Authorization: Bearer <token>)
- POST /api/reading-lists/{id}/posts (Authorization: Bearer <token>)
- DELETE /api/reading-lists/{id}/posts/{postId} (Authorization: Bearer <token>)