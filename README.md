# SOCIAL MEDIA CLONE

This is a text-based social media written with NodeJS. We focused our time and energy in creating a simple and fun app where users will be able to post text. We hope it could help you express your thought.

## The Team

1. **Abdullah Saba** [Github](https://github.com/ayom04) / [LinkedIn](https://www.linkedin.com/in/abdullah-saba-72845a256/) / [X](https://twitter.com/AbdullahSaba9)

## Documentation

This is the documenation of the code, to know the endpoints to call with their respeective http method. All other necesaary details will be shared below

```
https://documenter.getpostman.com/view/27463356/2s9Y5cuLNv
```

## Deployment

The API has been deployed and the production link can be found below

```
https://social-media-clone-ii7s.onrender.com
```

## Database Model

The databse model is availbale via the link below

```
https://dbdiagram.io/d/64c790a102bd1c4a5ef9c0e8
```

## Installation Guide

- To clone this project on your machine:

```
https://github.com/Ayom04/social-media-clone.git
```

- Enter the directory on your terminal using this command:

```
cd social-media-clone
```

- To install the dependencies as specified in the package.json file use:
  We'll be using [yarn](https://yarnpkg.com/getting-started)

```
yarn install
```

- Create a `.env` that contains your environment variables. Check the [.env.example file](./.env.example) to know the variables to be added.
- update the file `config.json` with your database credentials.
- To migrate the models to your database:

```
yarn migrate
```

- To seed some data into your database for testing

```
yarn seed
```

Incase, you want to login with the data you seeded:
The password is **password123**

- To start the server, type this command on your terminal while you're inside the app directory:

```
yarn dev
```

## Sample GET Request

- To get a welcome message from the API, send a get request to the API. The PORT must be the value PORT in your `.env`

```
curl http://localhost:{PORT}/
```

- You will get a status response
  `{"status":false,"message":"Welcome to my API"}`

## To test the reminaing endpoints with their respective http method

- While the server is up, Go to the browser and paste in this URL

```
http://localhost:{PORT}/api-docs
```

Don't forget to update the port to the value in your `.env`

# Thanks For reading this documentation and testing it out . I hope you enjoyed the ride!

<br><br>
You can reach out to me via [email](mailto:abdullaahyomide04@gmail.com)
