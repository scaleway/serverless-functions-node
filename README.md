# Serverless Functions Node

[![build-and-test](https://github.com/scaleway/serverless-functions-node/actions/workflows/npmtest.yml/badge.svg)](https://github.com/scaleway/serverless-functions-node/actions/workflows/npmtest.yml)
![node](https://img.shields.io/badge/node-16_|_18-blue.svg)

Scaleway Serverless Functions Node is a framework which simplify Scaleway [Serverless Functions](https://www.scaleway.com/fr/serverless-functions/) local development.
It brings features to debug your function locally and provides input/output data format of Scaleway Serverless Functions.

This library helps you to write functions but for deployment refer to the documentation.

Get started with Scaleway Functions:

- [Scaleway Serverless Functions Documentation](https://www.scaleway.com/en/docs/serverless/functions/quickstart/)
- [Scaleway Serverless Framework plugin](https://github.com/scaleway/serverless-scaleway-functions)
- [Scaleway Serverless Examples](https://github.com/scaleway/serverless-examples)
- [Scaleway Cloud Provider](https://scaleway.com)

Testing frameworks for Scaleway Serverless Functions in other languages can be found here:

- [Go](https://github.com/scaleway/serverless-functions-go)
- [Python](https://github.com/scaleway/serverless-functions-python)

## ⚙️ Quickstart

To get this package:

```console
npm i serverless-functions-node
```

Add in `index.js` the following code:

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

// Module was not imported but called directly, so we can test locally.
// This will not be executed on Scaleway Functions
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("scaleway-functions-node").then(scw_fnc_node => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
```

This file will expose your handler on a local web server allowing you to test your function.
You can then run your function locally with:

```console
$ node index.js
$ curl -X GET http://localhost:8080
> Hello World!
```

If the test runs successfully, you can then deploy your function as it is.

## 🚀 Features

This repository aims to provide a better experience on: **local testing, utils, documentation**

### 🏡 Local testing

What this package does:

- **Format Input**: Serverless Functions have a specific input format encapsulating the body received by functions to add some useful data.
  The local testing package lets you interact with the formatted data.
- **Advanced debugging**: To improve developer experience you can run your handler locally and debug it by running your code step-by-step or reading output directly before deploying it.

What this package does not:

- **Simulate performance**: Scaleway FaaS lets you choose different options for CPU/RAM that can have an impact
  on your development. This package does not provide specific limits for your function on local testing but you can
  profile your application or you can use our metrics available in [Scaleway Console](https://console.scaleway.com/)
  to monitor your application.
- **Deploy functions**: When your function is uploaded we build it in an environment that can be different from yours. Our build pipelines support
  several dependencies but sometimes require specific system dependencies that we don't support If you have compatibility issues, please see the help section.

## ❓ FAQ

**Why do I need an additional package to call my function?**

Your Function Handler can be served by a simple HTTP server but Serverless Ecosystem involves a lot of different layers that will change changes the headers, input and output of your function. This package aims to simulate everything your request will go through to help you debug your application properly.
This library is not mandatory to use Scaleway Serverless Functions.

**How my function will be deployed**

To deploy your function please refer to our official documentation.

**Do I need to deploy my function differently?**

No. This framework does not affect deployment nor performance.

## 🛟 Help & support

- Scaleway support is available on Scaleway Console.
- Additionally, you can join our [Slack Community](https://www.scaleway.com/en/docs/tutorials/scaleway-slack-community/)

## 🎓 Contributing

Additionally, we love to share things with the community and we want to expose receipts to the public. That's why
we make our framework publicly available to help the community!

Do not hesitate to raise issues and pull requests we will have a look at them.

If you are looking for a way to contribute please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md).

## 📭 Reach Us

We love feedback. Feel free to:

- Open a [Github issue](https://github.com/scaleway/serverless-functions-node/issues/new)
- Send us a message on the [Scaleway Slack community](https://slack.scaleway.com/), in the
  [#serverless-functions](https://scaleway-community.slack.com/app_redirect?channel=serverless-functions) channel.
