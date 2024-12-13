# API Documentation

## Authentication Endpoints

### Login
**Endpoint:**
`POST /auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "Login successful"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "user not found"
  }
  ```

### Register
**Endpoint:**
`POST /auth/signup`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "signup successful"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "username already exists"
  }
  
