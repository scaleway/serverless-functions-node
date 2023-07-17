# Serverless Functions Node

[![build-and-test](https://github.com/scaleway/serverless-functions-node/actions/workflows/npmtest.yml/badge.svg)](https://github.com/scaleway/serverless-functions-node/actions/workflows/npmtest.yml)
![node](https://img.shields.io/badge/node-16_|_18-blue.svg)

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

Update `package.json` to include:

```json
...
  "type": "module",
...
```

Add the following in `index.js`:

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

- [Using promises](examples/with_promise)
- [Using callbacks](examples/with_callback)
- [Interacting with HTTP services](examples/with_http_services)

## 🏡 Local testing

What this package does:

- **Formats Input**: Serverless Functions have a specific input format encapsulating the body received by functions to add some useful data. The local testing package lets you interact with the formatted data.
- **Advanced debugging**: To improve developer experience you can run your handler locally and debug it by running your code step-by-step or reading output directly before deploying it.

What this package does not do:

- **Simulate performance**: Scaleway FaaS lets you choose different options for CPU/RAM that can have an impact on your development. This package does not provide specific limits for your function on local testing but you can profile your application or you can use our metrics available in [Scaleway Console](https://console.scaleway.com/)
  to monitor your application.
- **Deploy functions**: When your function is uploaded we build it in an environment that can be different from yours. Our build pipelines support several dependencies but sometimes require specific system dependencies that we don't support If you have compatibility issues, please see the help section.

## ❓ FAQ

**Why do I need an additional package to call my function?**

Your Function Handler can be served by a simple HTTP server but Serverless Ecosystem involves a lot of different layers that will change changes the headers, input and output of your function. This package aims to simulate everything your request will go through to help you debug your application properly. This library is not mandatory to use Scaleway Serverless Functions.

**How my function will be deployed**

To deploy your function please refer to our official documentation.

**Do I need to deploy my function differently?**

No. This framework does not affect deployment nor performance.

## 🛟 Help & support

- Scaleway support is available on Scaleway Console.
- Additionally, you can join our [Slack Community](https://www.scaleway.com/en/docs/tutorials/scaleway-slack-community/)

## 🎓 Contributing

We love to share things with the community. Feel free to raise issues and pull requests on this repo according to the [contributing guidelines](./.github/CONTRIBUTING.md).

## 📭 Reach Us

If you want to get in touch with use, you can:

- Open a [Github issue](https://github.com/scaleway/serverless-functions-node/issues/new)
- Send us a message on the [Scaleway Slack community](https://slack.scaleway.com/), in the
  [#serverless-functions](https://scaleway-community.slack.com/app_redirect?channel=serverless-functions) channel.
