# Auth Design

## User Model

User

* _id
* name
* email
* password
* createdAt
* updatedAt

Notes:

* No roles
* No phone
* No profile picture
* No address
* No bio

Interviewer and Candidate are determined by interview ownership, not user roles.

---

## Auth Flow

Register

↓

Login

↓

Server generates JWT

↓

Server sets HTTP-only cookie

↓

Browser stores cookie

↓

Browser automatically sends cookie

↓

Access Protected Routes

---

## Registration Rules

Name

* Minimum 3 characters

Email

* Must be a valid email

Password

* Minimum 8 characters

---

## Login Rules

* Email required
* Password required

---

## API Endpoints

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

---

## Register Request

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

---

## Register Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login Request

```json
{
  "email": "rahul@gmail.com",
  "password": "password123"
}
```

---

## Login Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "Rahul",
    "email": "rahul@gmail.com"
  }
}
```

Note:

JWT is stored in an HTTP-only cookie and is not returned in the response body.

---

## Logout Response

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Protected Route

GET /api/auth/me

Purpose:

Return current logged-in user.

Used by:

* Dashboard
* Reports
* Interviews
* Rooms
* Profile

---

## JWT Strategy

User logs in

↓

Server generates JWT

↓

Server stores JWT in HTTP-only cookie

↓

Browser automatically sends cookie

↓

Backend verifies JWT

↓

User accesses protected routes

---

## Token Storage

Use HTTP-only cookies.

No localStorage.

No refresh tokens.

No Redis.

---

## Auth Folder Structure

auth/

* auth.controller.js
* auth.service.js
* auth.routes.js
* auth.model.js
* auth.validation.js

---

## File Responsibilities

auth.model.js

* User Schema

auth.service.js

* Business Logic
* Register User
* Login User
* Logout User

auth.controller.js

* Handle Request
* Handle Response

auth.routes.js

* Register Routes

auth.validation.js

* Validate Request Data

---

## Error Response Format

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## Success Response Format

```json
{
  "success": true,
  "message": "Operation successful"
}
```

---

## Request Flow

Frontend

↓

Route

↓

Controller

↓

Service

↓

Database

↓

Service

↓

Controller

↓

Frontend
