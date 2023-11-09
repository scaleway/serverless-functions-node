# Serverless Functions Node

![Tests](https://github.com/scaleway/serverless-functions-node/actions/workflows/tests.yml/badge.svg)
![Examples](https://github.com/scaleway/serverless-functions-node/actions/workflows/examples.yml/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/@scaleway/serverless-functions.svg)](https://www.npmjs.com/package/@scaleway/serverless-functions)
![Node](https://img.shields.io/badge/node-16_|_18-blue.svg)

Scaleway Serverless Functions Node is a framework which simplifies working with [Scaleway Serverless Functions](https://www.scaleway.com/en/serverless-functions/).

It lets you debug your function locally, emulating the input and output format of a deployed Serverless Function.

Note that this library does not deploy functions for you. For that you can see the available [deployment methods](https://www.scaleway.com/en/docs/serverless/functions/reference-content/deploy-function/).

Some useful links when working with Scaleway Functions:

- [Serverless Functions Quick-start](https://www.scaleway.com/en/docs/serverless/functions/quickstart/)
- [Serverless Framework plugin](https://github.com/scaleway/serverless-scaleway-functions)
- [Serverless Examples](https://github.com/scaleway/serverless-examples)

Testing frameworks for Scaleway Serverless Functions in other languages can be found here:

- [Go](https://github.com/scaleway/serverless-functions-go)
- [Python](https://github.com/scaleway/serverless-functions-python)

## ⚙️ Quickstart

Install this package:

```console
npm i @scaleway/serverless-functions
```

Add the following in the file where your handle is defined:

### For ES Modules

```js
import { pathToFileURL } from "url";

function handle(event, context, callback) {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello World!",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

// This will execute when testing locally, but not when the function is launched
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
```

### For Common JS

```js
const url = require("url");

module.exports.handle = (event, context, callback) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello World!",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

// This will execute when testing locally, but not when the function is launched
if ("file://" + __filename === url.pathToFileURL(process.argv[1]).href) {
  import("@scaleway/serverless-functions").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(exports.handle, 8080);
  });
}
```

### Usage

This file will expose your handler on a local web server, letting you invoke your function code directly.

You can do this as follows:

```console
$ node index.js
$ curl -X GET http://localhost:8080
> Hello World!
```

By running a function locally like this, we can be sure it will work when deployed to Serverless Functions.

## 📚 Examples

You can find a number of examples in the [`examples` folder](examples/). These include:

- [Accessing the event context](examples/print_event_context)
- [Making HTTP GET requests](examples/with_http_services)
- [Making HTTP POST requests](examples/with_http_services)
- [Uploading files](examples/upload_file_multipart)
- [Using promises](examples/with_promise)
- [Using callbacks](examples/with_callback)

## 🏡 Local testing

What this package does:

- **Formats input**: Serverless Functions have a specific input format, wrapping the body of the request with some extra metadata. This package lets you interact with that formatted data.
- **Debugging**: It is not possible to remotely debug deployed Serverless Functions. With this package, you can run your functions locally, and debug issues in the emulated environment.

What this package does not do:

- **Simulate performance**: Scaleway Functions let you choose different options for CPU/RAM that can have an impact on your function's performance. This package does not emulate these limits. To profile your deployed functions, you can use your [Scaleway Cockpit](https://www.scaleway.com/en/cockpit/).
- **Deploy functions**: Scaleway Functions builds your code before running it. Although this package emulates the runtime environment, it does not emulate the build environment. Therefore it is possible that you may still encounter build issues even if the function passes local tests.

## ❓ FAQ

**Why do I need an additional package to call my function?**

The Serverless Functions execution environment wraps your code in an HTTP server, and runs the resulting executable in a Kubernetes cluster behind a load balancer. This introduces a number of layers of abstraction, and additional metadata around the request body. This library attempts to emulate this environment as closely as possible, allowing you to debug your code locally, rather than discovering bugs after deployment.

**How my function will be deployed**

To deploy your function please refer to the different [deployment methods](https://www.scaleway.com/en/docs/serverless/functions/reference-content/deploy-function/).

**Does this package change the runtime behaviour of my function?**

No. This package is just for local testing, and will not impact runtime behaviour or performance.

## 🛟 Help & support

- Scaleway support is available via the [Scaleway Console](https://console.scaleway.com).
- Additionally, you can join our [Slack Community](https://www.scaleway.com/en/docs/tutorials/scaleway-slack-community/)

## 🎓 Contributing

We love to share things with the community. Feel free to raise issues and pull requests on this repo according to the [contributing guidelines](./.github/CONTRIBUTING.md).

## 📭 Reach Us

If you want to get in touch with use, you can:

- Open a [Github issue](https://github.com/scaleway/serverless-functions-node/issues/new)
- Send us a message on the [Scaleway Slack community](https://slack.scaleway.com/), in the
  [#serverless-functions](https://scaleway-community.slack.com/app_redirect?channel=serverless-functions) channel.
