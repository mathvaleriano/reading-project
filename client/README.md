# Client

To install and start the client app, run the following commands in this directory:

* `yarn` or `npm install`
* `yarn start` or `npm start`

To verify lint errors/warnings, run the following command

* `yarn lint` or `npm run lint`

## Structure

This project uses current directory structure provided by Create React App... and another folders in src that will be listed above:


```
src
|
|-- api # requests
|
|-- components
|   |-- App
|   |-- Comment # Item of comment list
|   |-- CommentAdd # Form to add new comments
|   |-- CommentList # List of comments
|   |-- Form # Generic form
|   |-- MetaSubmit # Generic submit button (used on Post and Comment)
|   |-- Post # Item of post list
|   |-- PostModarl # Modal to show currentPost and its comment list
|
|-- hooks # Commom hooks
|
|-- store # application store
|   |-- categories # Category module
|   |-- comments # Comment module
|   |-- order # Order/Sort module
|   |-- posts # Post module
|   |-- index.js
|   |-- rootReducer.js 
|
|-- types # Common PropTypes
```