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



 