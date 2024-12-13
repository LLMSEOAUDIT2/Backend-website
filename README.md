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
    "message": "Registration successful"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "Email already exists"
  }
  
