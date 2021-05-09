# Frontend

OBS
npm install tinymce i rooten

### HuvudFiler:

index.html & main.js

## Logga in

Användarnaman: Kalle
Lösenord: Kalle123
alternativt : Molly , Molly123

## Om Appliationen

Det här är en Headless Application. Allt Frontend hittar du i Mappen FrontEnd och allt Backend hittar du i Mappen Backend.

# Backend

OBS
npm install.

## Databas

Info om lösenord till db ser du i /BACKEND/app.js
Starta servern med: npm run devStart

## Varför jag valt att strukturera som jag gjort

Headless eftersom jag tycker det blir "renare" att hålla isär min Backend och Frontend.
Började med att skapa en databas, en backend med npx express generator, kopplade ihop det med mitt angivna lösen och användarnamn.
Min Databas har två Tables. "konto" & "document".

Foreign Key för document till konto : "doc_author".
Primary Key för konto : "person_id"
doc_author och person_id är alltså kopplingen mellan mina tables.

Använde Popsql som jag kopplade till min db. Det är en enkelt verktyg som gör den enklet att köra sql querys. Jag kan skapa alla mina Tables där.

I min FrontEnd valde jag att dela upp mina js filer i moduler, då varje js fil har sina egna endpontcalls och DOM-tamlpaltes.
Exempelvis: all-doc.js innehåller 2st functioner. En funciton ("getAllDocs") endpontcall som hämtar alla doument från databasen och en function ("printList") som gör något med datan som jag får tillbaka.

Jag har även användt mig av LocalStorage för att komma åt den hämtade datan i mina olika fuktioner och vyer.
Exempelvis när jag i min Logga-in-function hämtar användare från databasen och tar emot det i min frontEnd så sätter jag den samtidigt i LS.
Då kan jag i min nästa endpoint först hämta id av användaren som just nu finns i LS och skicka med i min fetch. i Backend tar jag emot id i req.params.id , och i min CRUD välja att "hämta från rätt ställe"...

Jag har valt att anropa alla funktioner i min main.js. Alla modulfiler importeras hit. i main.js har jag alla Eventlistenerts under en "global"-eventlistener eftersom flödet är dynamiskt och efter SPA principerna. Vaje vy kräver sina egna tamplates och evantuella endpointcalls och är därför uppdelade i enskilda filer.
Min css valde jag även att dela upp i egna filer och använde min därför av sass. Så vajre js fil har sin egna scss fil...
