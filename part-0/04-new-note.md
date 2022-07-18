# 0.4 New Note

**Task:** Create a sequence diagram that describes what happens in a situation where the user creates a new note while on the page https://studies.cs.helsinki.fi/exampleapp/notes, i.e. writes something in the text field and presses the save button.

```mermaid
sequenceDiagram
actor user
participant browser
participant server
user ->> browser: writes a note and submits
browser ->> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
server -->> server: note is handled and stored to database
deactivate server
server -->> browser: 302 (redirect) to https://studies.cs.helsinki.fi/exampleapp/notes
browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server -->> browser: HTML code
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server -->> browser: main.css
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server -->> browser: main.js
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server -->> server: fetch notes as JSON-data from database
deactivate server
server -->> browser: data.json
activate browser
browser -->> browser: a handler is called to render notes
deactivate browser
browser -->> user: view is refreshed, user sees their note posted
```


EmmalJunga
Kannattaako säästöt ottaa pois rahastosta, jos säästöille on käyttötarvetta lähivuosina? Tämän kevään aikana säästöistä on sulanut n. 5-10 % pois ja opintovapaa, jota varten säästelen lähestyy. Mietin että jatkuukohan säästöjen sulaminen todennäköisesti lähikuukausina.


On luonnollista, että osakekurssit välillä nousevat ja välillä laskevat. Kevät on ollut haastava, koska myös korkosijoitusten arvot ovat laskeneet samanaikaisesti osakesijoitusten kanssa. Tulevaa kehitystä on vaikea ennakoida, mutta toki on hyvä puntaroida, mitä tarkoitusta varten säästöjä on kerrytetty. Ajallinen hajauttaminen voi olla hyvä idea niin ostojen kuin myyntien kannalta.