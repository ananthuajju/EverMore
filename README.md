# Bookmark saver
## Inspired by raindrop.io

This is a RESTful API Built using MERN stack.
This performs CRUD operations along with Authorizaion.


## Features
- Checks whether user is authorized to access the routes.
- Return a JWT token and user ID when user logs in.
- Add a new Bookmark to MongoDB.
- Get all the Bookmarks.
- Delete a Bookmark.
- Update a Bookmark.

## Installation

This API requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm install
npm start
```
By default the App will run on Port 8000.

## Routes

Default Base Url - localhost:8000

All the routes will returns an error message if something went wrong

`/bookmark` routes authorizes the request first and denies if the user is not logged In

`/` -  Returns a message that the App is running successfull

 > Checks whether the app is running
 
 `/user/signup` - Returns a message that user creation was successful or an error message when
 there is problem.
 
 > Sign Up (POST Request)
 Request Body - Name,email,password

 `/user/login` - Returns a JWT token and the User ID when login attempt is suucessful.
 
  > Log In (POST Request) 
  Request Body - email, password
  
  `/bookmark/` - Extracts metadeta(title,description) of the URL if available and stores it in the database.
 
   > Create a Bookmark (POST Request) 
   Request Body - JWT Token, User Id, Url of the websiter
   
`/bookmark/` - Returns all the bookmarks stored or all the bookmarks matching the given title if provided.
 
   > Get all the Bookmarks (Get Request) 
   Requets Body - JWT Token, User Id
   Request query - title (Optional)
   
 `/bookmark/id` - Returns the Bookmark that matches the given id.
 
   > Get bookmark with ID (Get Request) 
   Requets Body - JWT Token, User Id
   Request Parameter - Bookmark Id
   
   `/bookmark/id` - Updates the Bookmark with given id.
 
   > Update a Bookmark (PUT Request) 
   Request Body - JWT Token, User Id,Object named bookmark with any of the data that needed to be updated. bookmark object data - title,description,url.
   
   `/bookmark/` - Deletes all the bookmarks that belongs to the user
 
   > Delete all the Bookmark (DELETE Request) 
   Request Body - JWT Token, User Id
   
`/bookmark/id` - Deletes the bookmark that matches the bookmark id.
 
   > Delete a Bookmark (DELETE Request) 
   Request Body - JWT Token, User Id
