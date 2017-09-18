# Kalimat AI

## Introduction

This project is intended as a test project for 
applying to [kata.ai](http://kata.ai). If you are not authorized to
view this project, you must delete this project from your machine.

## Running

You can run the project by simply installing the required
packages using `npm install` (add `--only=production` if you 
want production dependencies only) and running
`node app/index.js` (make sure you are active on the project
root directory). Make sure you have `node``
installed. **NOTE: ONLY TESTED ON v.6.10.0**.

### Running via Docker

If you have docker installed, you can build the docker file
by running `docker build -t kalimatai .` and once its
done building you can run
` docker run -it --rm -p 8080:8080 kalimatai`. The interactive
`-it` flag is needed because the server will be able
to send message to clients from the CLI and it can only
be done if you are having the tty and std_input open.

## Recompiling Frontend Assets

The frontend is compiled using Laravel Mix as a wrapper of the 
WebPack configuration. If you need to recompile the assets,
run `npm run <production|dev|watch>` and make sure you have
the `devDependencies` of the project installed.

## Credits

Aditya Purwa [<adityapurwa@windowslive.com>](mailto:adityapurwa@windowslive.com)