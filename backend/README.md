<h1 align="center">
<br>
VUTTR
</h1>

<p align="center">Very Useful Tools to Remember - BossaBox challenge</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

## Features

This app features all the latest tools and practices development!

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/docker-community)
- [Docker Compose](https://docs.docker.com/compose)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [ESLint](https://eslint.org/)
- [JEST](https://jestjs.io/)
- [API Blueprint](https://apiblueprint.org/)

## Getting started

1. Clone this repo using `git clone https://github.com/thiagodff/VUTTR`
2. Move yourself to the appropriate directory: `cd VUTTR/backend`<br>
3. Copy the .env.example `cp .env.example .env`<br>
4. Setup database settings inside `ormconfig.json` if you prefer<br>
5. Run `docker-compose up` to setup all your database and start services(be sure to have docker and docker-compose installed)<br>

## Routes

### Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20VUTTR&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fthiagodff%2FVUTTR%2Fmaster%2F.github%2Fvuttr_insomnia.json)

### API Blueprint

Detailed documentation see [api.apib](https://github.com/thiagodff/VUTTR/blob/master/.github/api.apib) file.

To see a user friendly version use [html](https://htmlpreview.github.io/?https://github.com/thiagodff/VUTTR/blob/master/.github/api.html) version

## Status Codes

VUTTR returns the following status codes in its API:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 401         | `UNAUTHORIZED`          |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

---

Made with ♥ by Thiago :wave: [See my linkedin!](https://www.linkedin.com/in/thiago-fernandes-dornelles/)
