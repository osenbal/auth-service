
# Auth Service

Service for authentication single user without role and permissions




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`ACCESS_TOKEN_KEY`
`REFRESH_TOKEN_KEY`
`ACCESS_TOKEN_EXPIRE_TIME`
`REFRESH_TOKEN_EXPIRE_TIME`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev:serve
```


## API Reference

#### Register New User

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your Password (8 character) |
| `firstName` | `string` | **Required**.  |
| `surname` | `string` | **Required**.  |

###### put to request body

#### Login

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required** |

###### put to request body

#### Refresh Token

```http
  POST /auth/refresh
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`      | `string` | **Required** refresh token|

###### put to request header bearer token


## Authors

- [@osenbal](https://www.github.com/osenbal)

