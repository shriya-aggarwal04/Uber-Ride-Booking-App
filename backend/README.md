# Backend API Documentation

## `/users/register` Endpoint

---

### HTTP Method  
`POST`

### Endpoint  
`/users/register`

### Description  
Registers a new user. The endpoint validates the incoming request data and returns a JWT token along with the created user information upon successful registration.

### Request Body (JSON)
- **fullname.firstname** (string, required):  
  Minimum length of 3 characters.
- **fullname.lastname** (string, optional):  
  Minimum length of 3 characters if provided.
- **email** (string, required):  
  Must be a valid email address.
- **password** (string, required):  
  Minimum length of 6 characters.

### Example Request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Example Response
- `captain` (object):  
  - `fullname` (object):  
    - `firstname` (string): User's first name (min 3 characters).  
    - `lastname` (string): User's last name (min 3 characters).  
  - `email` (string): User's email (must be a valid email).  
  - `password` (string): User's password (min 6 characters).  
  - `Token` (string): jwt token


---



## `/users/login` Endpoint

---

### HTTP Method  
`POST`

### Endpoint  
`/users/login`

### Description  
Authenticates an existing user. On successful authentication, returns a JWT token and the user details.

### Request Body (JSON)
- `user` (object):  
  - `email` (string, required): Must be a valid email address.  
  - `password` (string, required): Minimum length of 6 characters.  


### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Responses
- **200 OK**  
  Successful login returns a JWT token and the user object.
  ```json
  {
    "token": "jwt_token",
    "user": {
      // user details (excluding sensitive data like password)
    }
  }
  ```
- **400 Bad Request**  
  Validation errors.
  ```json
  {
    "errors": [
      // Validation error details
    ]
  }
  ```
- **401 Unauthorized**  
  Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## `/users/profile` Endpoint

---

### HTTP Method  
`GET`

### Endpoint  
`/users/profile`

### Description  
Retrieves the profile of the authenticated user. This endpoint is protected and requires a valid JWT token provided via cookies or the `Authorization` header.

### Request Headers
- **Authorization:**  
  `Bearer <jwt_token>`

### Responses
- **200 OK**  
    Returns the authenticated user's profile.  
  - `user` (object):  
  - `fullname` (object):  
    - `firstname` (string): Minimum length of 3 characters.  
    - `lastname` (string): Minimum length of 3 characters.  
  - `email` (string): Must be a valid email address.  
 

.  


- **401 Unauthorized**  
  If the token is missing, invalid, or blacklisted.
  ```json
  {
    "message": "Unauthorized"
  }
  ```
  or
  ```json
  {
    "message": "Unauthorized user"
  }
  ```

---

## `/users/logout` Endpoint

---

### HTTP Method  
`GET`

### Endpoint  
`/users/logout`

### Description  
Logs out the authenticated user by clearing the JWT token cookie and adding the token to a blacklist to prevent future use.

### Request Headers
- **Authorization:**  
  `Bearer <jwt_token>`

### Responses
- **200 OK**  
  Successfully logs out the user.
  ```json
  {
    "message": "Logged Out "
  }
  ```
- **401 Unauthorized**  
  If the token is missing or invalid.
  ```json
  {
    "message": "Unauthorized"
  }
  ```
  or
  ```json
  {
    "message": "blacklisted token"
  }
  ```

---

## `/captains/register` Endpoint

---

### HTTP Method  
`POST`

### Endpoint  
`/captains/register`

### Description  
Registers a new captain. The endpoint validates the incoming request data and returns a JWT token along with the created captain information upon successful registration.

### Request Body (JSON)
- `fullname` (object):  
  - `firstname` (string, required): Minimum length of 3 characters.  
  - `lastname` (string, optional): Minimum length of 3 characters if provided.  
- `email` (string, required): Must be a valid email address.  
- `password` (string, required): Minimum length of 6 characters.  
- `vehicle` (object):  
  - `color` (string, required): Minimum length of 3 characters.  
  - `plate` (string, required): Minimum length of 3 characters.  
  - `capacity` (number, required): Must be an integer with a minimum value of 1.  
  - `vehicleType` (string, required): Must be one of the following values: `car`, `motorcycle`, or `auto`.  


### Example Response: 
- `captain` (object):  
  - `fullname` (object):  
    - `firstname` (string): User's first name (min 3 characters).  
    - `lastname` (string): User's last name (min 3 characters).  
  - `email` (string): User's email (must be a valid email).  
  - `password` (string): User's password (min 6 characters).  
  - `vehicle` (object):  
    - `color` (string): Vehicle color (min 3 characters).  
    - `capacity` (number): Vehicle capacity.  
    - `vehicleType` (string): Car, motorcycle, auto.  
    - `plate` (string): Vehicle number plate.  
 
 









