# React Inbox

### Description

Gmail clone that stores data in-memory using an [API](https://g-api.herokuapp.com) provided by Galvanize. I was given the basic HTML structure but otherwise built everything on my own.

### Usage

To run this locally you'll need to overwrite the `API_URL` to use the deployed API on heroku because the repo for the API is private:

```shell
$ echo "REACT_APP_API_URL=https://g-api.herokuapp.com/api" > .env.development
```

This was built using [Create React App](https://github.com/facebook/create-react-app) and can be run using:

```shell
$ yarn install
$ yarn start
$ open http://localhost:3000
```
