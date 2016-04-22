DHAMUN Web-App
=========================

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Development](#development)
- [Build](#build--buildproduction)

## About

This is a prototype DHAMUN web app. This is only the client, however. It is part of a bigger, 3 component application, which will include the following

```
a) A web client (this repo)
b) A server (another repo)
c) A mobile app (coming soon)
```

This is going to be a portal for all MUN'ers at any point in the conference.
Look at the about repo for all the awesome upcoming features.

## Installation
```
$ npm install
```

## Development
```
$ npm start
```
Runs the project in development mode with hot-reloading of `src` folder.
Open your browser at [http://localhost:3000](http://localhost:3000).

## Contribution

Before push commit make sure that all modules are added in package.json

### Try
```
$ rm -rf node_modules
$ npm i
$ npm start
```

## Clean
```
$ npm run clean
```
Using rimraf clean the `dist` folder, which is the target of the `build`

## Build & build:production
```
$ npm run build
```
Builds the app into the 'dist' folder for deployment
```
$ npm run build:production
```
clean the `dist` folder and rebuilds the app for deployment
### Production
To run your server in production simply place the `index.html` and `dist` folder into
your `web root`.

In development mode the app uses `hashHistory` (e.g /#/home?_k=x928123) which
keeps track of your currently location on and the state of the page. It is adviced
for production to use `browserHistory` instead of `hashHistory`

To make this change edit `src/index.js`
```
// before change
...
import { Router, Redirect, hashHistory as history } from 'react-router';
...

// after change
...
import { Router, Redirect, browserHistory as history } from 'react-router';
...

```

the use of history push api requires that all your requests point to index.html
since react-router is keeping track of the navigation (e.g this can be done with `.htaccess` file at the web root or with `nginx` configuration)

## Run karma
```
$ npm test
```

