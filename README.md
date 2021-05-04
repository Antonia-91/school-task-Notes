# Frontend

OBS
npm install tinymce

### HuvudFiler:

index.html & main.js

## Logga in

Användarnaman: Kalle
Lösenord: Kalle123
alternativt : Molly , Molly123

## Om Appliationen

Det här är en Headless Application. Allt Frontend hittar du i Mappen FrontEnd och allt Backend hittar du i Mappen Backend.

# Backend

## Databas

Kör en npm insall!
Info om lösenord till db ser du i /BACKEND/app.js
Starta servern med: npm run devStart

## Varför jag valt att strukturera som jag gjort

Headless eftersom jag tycker det blir "renare"
Böjade med att skapa en databas, en backend med npx express generator, kopplade ihop det med mitt angivna lösen och användarnamn.
Min Databas har två Tables. "konto" & "document".
Primary Key för document : "doc_author"
Foreign Key för document till konto : "doc_id"
Primary Key för konto : "person_id"
doc_id och person_id är alltså kopplingen mellan mina tables.

Använde Popsql som jag kopplade till min db. Det är en enkelt verktyg som gör den enklet att köra sql querys. Jag kan skapa alla mina Tables där
