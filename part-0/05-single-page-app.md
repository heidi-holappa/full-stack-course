# 0.5 SPA sequence diagram

**TASK:** Make a diagram of the situation where the user goes to the address https://studies.cs.helsinki.fi/exampleapp/spa with a browser, i.e. the Single Page App version of the notes.  

```mermaid
sequenceDiagram
actor user
participant browser
participant server
user ->> browser: goes to address https://studies.cs.helsinki.fi/exampleapp/spa
browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server -->> browser: HTML code
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server -->> browser: main.css
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server -->> browser: spa.js
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server -->> server: fetch notes as JSON-data from database
deactivate server
server -->> browser: data.json
activate browser
browser -->> browser: a handler is called to render notes
deactivate browser
browser -->> user: a handler is executed to render the content on the screen. 
```