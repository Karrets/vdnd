# vDungeons

A basic tool for running dungeons and dragons campaigns online.

## Dev

With any luck, setup should be as simple as:

1. `npm install`
2. `npm run dev`

Which should install all needed dependencies and start the frontend and backend servers. From there on out, start
editing as you see fit!

## Deployment

The most basic setup is as follows:

1. `npm install`
2. `npm run build`
3. `npm run start`

This will start the server on port 8080, or at whatever value is found in the `PORT` environment variable.
Additionally, you should set the absolute path to the folder containing `dist/` via the `ROOT_DIR` environment variable.
Finally, you should set up https through a reverse proxy of your choice.

You should NOT run this program as root / administrator, or on ports 80 or 443.
See [this page](https://expressjs.com/en/guide/behind-proxies.html) as to why.

## Info

The general structure of this app follows this very useful guide:

[Making a Full-Stack App with Vue, Vite and Express that supports Hot Reload](https://blog.codeminer42.com/making-a-full-stack-app-with-vue-vite-and-express-that-supports-hot-reload/)

The primary difference is that vite, and all other client resources exist under the `client/` subdirectory
(And all server resources reside in `server/`)

## Reference

All configuration is done through environment variables, check the table below:

| Environment Variable | Values                        | Effect                                                                                      |
|----------------------|-------------------------------|---------------------------------------------------------------------------------------------|
| PORT                 | Numeric                       | Changes port to set variable, defaults to 8080                                              |
| NODE_ENV             | "development" or "production" | If unset, defaults to development. Changes operating mode.                                  |
| ROOT_DIR             | Path                          | Changes root directory of served files. Should be set to the folder which contains `dist/`. |
| SUPPRESS_SANITY      | Set / Unset                   | Suppresses a notice encouraging production environments to be put behind a reverse proxy.   |
