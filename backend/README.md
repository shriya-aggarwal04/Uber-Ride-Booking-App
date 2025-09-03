# Backend API Documentation

## `/users/register` Endpoint .

---

###  HTTP Method
`POST`

**EndPoint** `/users/register`

---

## **Description**

Registers a new user. The endpoint validates the incoming request data and returns a JWT token along with the created user information upon successful registration.

---



### Request Body (JSON)

- **fullname.firstname** (string, required):  
  Minimum length of 3 characters.

- **fullname.lastname** (string, optional):  
  Minimum length of 3 characters if provided.

- **email** (string, required):  
  Must be a valid email address.

- **password** (string, required):  
  Minimum length of 6 characters.


### Example Response
-`user` (object):
    -`fullname` (object):
        -`firstname` (string):Minimum length of 3 characters.
        -`lastname` (string):Minimum length of 3 characters.
    -`email` (string):Must be a valid email address.
    -`password` (string): Minimum length of 6 characters.
-`token` (string): JWT Token

---

## `/users/login` Endpoint

---


 ### HTTP Method
`POST`

**Endpoint**
`/users/login`

## **Description**


Authenticates an existing user. On successful authentication, the endpoint returns a JWT token and the user details.

---

## Request Body (JSON)
-**email** (string, required):
Must be a valid email address.

-**password** (string, required):
Minimum length of 6 characters.

## Example Request:
{
  "email": "john.doe@example.com",
  "password": "secret123"
}

---

## Responses
**200 OK**
-`Successful login. The response returns a JWT token and the user object.`

{
  "token": "jwt_token",
  "user": {
    // user details (excluding sensitive data like password)
  }
}

**400 Bad Request**
`Returned when the request data fails validation (e.g., invalid email format or password too short).`
{
  "errors": [
    // Array of error objects detailing the validation issues
  ]
}

**401 Unauthorized**
Returned when authentication fails due to invalid email or password.
{
  "message": "Invalid email or password"
}





 