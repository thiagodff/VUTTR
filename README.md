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

<div align="center">
  <img src=".github/vuttr_web.gif" alt="vuttr web" height="425">
</div>

<hr />

## Features

This app features all the latest tools and practices in development!

- ⚛️ **React Js** — A JavaScript library for building user interfaces
- 💹 **Node Js** — A web framework for Node Js
- 📄 **TypeScript** — Typed superset of JavaScript that compiles to plain JavaScript.

## Getting started

1. Clone this repo using `git clone https://github.com/thiagodff/VUTTR`
2. Move yourself to the appropriate directory: `cd VUTTR`<br />

### Getting started with the [backend server](https://vuttr-api-bossabox.herokuapp.com/)

1. Move yourself to the backend folder: `cd backend`<br />
2. Copy the .env.example `cp .env.example .env`<br>
3. Setup database settings inside `ormconfig.json` if you prefer<br>
4. Run `docker-compose up` to setup all your database and start services(be sure to have docker and docker-compose installed)<br>

### Routes

#### Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20VUTTR&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fthiagodff%2FVUTTR%2Fmaster%2F.github%2Fvuttr_insomnia.json)

#### API Blueprint

Detailed documentation see [api.apib](https://github.com/thiagodff/VUTTR/blob/master/.github/api.apib) file.

To see a user friendly version use [html](https://htmlpreview.github.io/?https://github.com/thiagodff/VUTTR/blob/master/.github/api.html) version

### Getting started with the [frontend app](https://vuttr-bossabox.netlify.app/)

1. Move yourself to the frontend folder: `cd frontend`<br />
2. Run `yarn` to install dependencies<br />
3. Run `json-server -p 3333 db.json` to run fake REST API
4. Run `yarn start` to run the application

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

---

<p align="center">Made with ❤️ by <strong>Thiago</strong> :wave: <a href="https://www.linkedin.com/in/thiago-fernandes-dornelles">See my linkedin!</a></p>
