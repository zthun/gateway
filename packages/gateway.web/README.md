# Description

This is the application for the gateway client.

[![Build Status](https://travis-ci.com/zthun/gateway.svg?branch=master)](https://travis-ci.com/zthun/gateway)

## Usage

The client is meant to be ran in a docker container.

```sh
docker run -p 4200:80 zthun/gateway.web
```

You can run it locally, but you will need to set up the appropriate server yourself. It's possible to use nginx, IIS, Apache, or any other server that can host static web files. There is no official way to run it outside of a docker container since the actual production run of the zthunworks client runs in a docker container that lives in a k8s cluster.

```sh
# Installs the website to the global npm package repository.
npm install -g @zthun/gateway.client
```

If you do choose to run it locally, the client assumes that the api server is housed on the same domain as the server and can be accessed through the same base url with /api appended to it.
