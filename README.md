# Chat App Client

Chat App server  - https://github.com/vyshakg/ChatApp-server

live demo - https://chat-app-graphql.netlify.com

## Technologies used to Build a Client
- React js
- graphql
- apollo cache as state of app
- sematic-ui react for styling

### Demo of the real time supscriptions using web sockets:

![chatapp demo v2](https://user-images.githubusercontent.com/17231224/51193726-8babb280-190f-11e9-9cde-dfe4961410ab.gif)
<p align="center">Diagram.2 real-time subscriptions </p>

### State management:
- I didn't use any stated manage library like redux, Just passed the props from one state another(like what they say `Props drilling`:stuck_out_tongue_closed_eyes:)
- but used apollo-graphql-cache which stores the graphql query data in cache

![chatapp del con v1](https://user-images.githubusercontent.com/17231224/51193990-25735f80-1910-11e9-9867-c822359b511a.gif)

<p align="center">Diagram.2 updating the cache after deleting the convrersation after sending request to backend </p>

### security and Authenication 
- Authenication is done by the JWT token which is stored in local Storage whcih will be sent on each request done by the client to the server
- if the User signout from the chatapp the JWT will be removed cache will be cleared and redirected to the landing page

![chatapp signout v1](https://user-images.githubusercontent.com/17231224/51194478-2789ee00-1911-11e9-92ed-f2f9c9599751.gif)
<p align="center">Diagram.2 sign out </p>

### deployment 
- Deployed to the `netlify` 
To run the application in develpoment mode run
```sh
yarn start
```
To build the application for the production run
```sh
yarn build
```
 To deploy a app to netlify create a account in netlify and run and login to netlify using below command
 ```sh
 npm i -g netlify
 npm deploy
 ```
 To automate the building processa and deploying in the netlify i have created a deploy.sh file
 ```sh
 #! /bin/bash
yarn build
netlify deploy --prod --dir ./build
```

### created with :heart: by vyshak.G
