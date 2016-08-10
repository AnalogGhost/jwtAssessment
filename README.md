# JWT Assessment
---
This is a simple exercise to show you are comfortable using JWTs.

This basic site has a login route and a protected route.
The login route will return a JWT to the user, while the protected route
will only allow access if the request has the JWT in the header.

In other words, you should be able to hit the login route, get the token
then use that token in a request to the protected route.

Most of the site is complete you just have a few tasks - which have been
designated with TODOs in the source.

## server.js
- The thing to do under the login route.  Create the token and return it in the body of the response.
- App level middleware to protect the routes declared afterwards.  Verify the token and allow the user to proceed.

## public/js/app.js
  - Implement the jwtInterceptor function and attach the token to every request.
  - In the login function - once you have gotten a successful response, store the token in localstorage.
