## NIMCHAT (Backend)
<br>

### Documentation
[Api documentation](https://frown00.github.io/nimchat-docs/server/)<br>
[Components documentation](https://frown00.github.io/nimchat-docs/client/)

<br>
[Apidoc](http://apidocjs.com/) used for generate api documentation<br>
[React Styleguidist](https://react-styleguidist.js.org/) used for generate components documentation

### Build new version
Server
#### apidoc -e "(node_modules|public)" -o ../nimchat-docs/server
Client
#### npx styleguidist build


## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the server in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run dev`

Runs the server and client concurrently if client is exists outside server directory



