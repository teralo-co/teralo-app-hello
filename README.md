# Hello: a Teralo app

The smallest complete [Teralo](https://teralo.co) app, and the one to copy to start your own. It
shows the project's name, keeps a count of visits in its own database, saves the visits as a CSV,
has a second screen that lives in Teralo's URL, and offers a project dashboard card.

It asks for two scopes: `project:read` (the project's name) and `database` (its own data on each
project). It cannot reach the internet and cannot change anything in Teralo.

Built with [`@teralo-co/apps`](https://github.com/teralo-co/teralo-app-sdk), which documents the whole
API.

```
teralo-app.json         manifest: id, version, scopes, card
server/index.js         GET /summary, POST /visits, GET /visits
ui/index.html, app.js   the page and the card (app.js imports the SDK's client)
migrations/0001_visits.sql
```

## Run it against a local Teralo

```sh
npm install
TERALO_PUBLISH_SECRET=<local key> npm run dev   # publishes a dev build to http://localhost:5173
```

The first time, install it as an organisation administrator in **Tool Settings > Apps** and
switch it on for a project; it is under **Apps** in that project. After that, `npm run dev`
moves the install to each new build: reload to see it.

## Publish a version

Change `version` in `teralo-app.json`, then `npx teralo-app publish`. Administrators update in
Tool Settings > Apps.

## Licence

MIT
