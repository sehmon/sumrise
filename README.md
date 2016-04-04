# Sumrise
---
Link summarizer and indexer - CapitalOne Tech Summit 2016
---
So I come across a lot of articles that interest me on a daily basis. I really don't have a way of saving/indexing them, so I created this application to solve that problem. This app is a link sumamrizer and indexer: When you find an article you like you can save it to your own private journal, along with a summarized version of the articles contents for easy viewing later on.

I was really interested in learning Node.js and Express/React/Angular, so I decided to create the backend API with Javascript. All the API headers are working.

This is full application, with user authenticaiton and http requests to a server I created to handle the needs of someone using this app. There were plans for an Chrome Extension Android Client to view your summaries, but because of finals I don't know if that'll happen haha.

###Technologies:
1. Server - Node.js and Express <br>
2. Chrome Extension - HTML, CSS, and JS <br>
3. Android Client - Java <br>

The only part that is working right now is sumrise-api. Here's how to run it: 
(The API is live, you can access it at: 45.55.186.89:3000


1. Install <a href="https://www.mongodb.org/downloads#production">MongoDB</a>
2. Install <a href="https://nodejs.org/en/download/">Node.js</a>
3. Run Mongo using "mongod" and use the command: "node sumrise-api/server.js" to run the server.
4. Make all API calls to localhost:8080 (Or the port setup in your environment)
<hr>

###API Endpoints:

*/signup : "POST" ![signup] (https://github.com/yawkity/sumrise/blob/master/img/login.png)

*/login : "POST"

*/api/user : "GET"

*/api/users : "GET"

*/api/article/:article_id : "GET", "DELETE"

*/api/articles : "GET", "POST"

API Headers starting with: "/api/" require an access token in the header of the request in the following form: <br>
{ x-access-token: "access-token-generated-from-/login"} 

You can get a JWT access token from the /login endpoint. 

*TODOS
1. Notify User if JWT is expired
2. Fix all API responses to include a "success" parameter
3. Build a client to actually use it lol
