---
slug: /serverless/observability/synthetics-params-secrets
title: Work with params and secrets
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

<!--  lint disable params-->
<div id="synthetics-params-secrets"></div>

Params allow you to use dynamically defined values in your synthetic monitors.
For example, you may want to test a production website with a particular
demo account whose password is only known to the team managing the synthetic monitors.

For more information about security-sensitive use cases, refer to <DocLink slug="/serverless/observability/synthetics-params-secrets" section="synthetics-secrets-sensitive" />.

<div id="synthetics-params-secrets-define"></div>

## Define params

Param values can be declared by any of the following methods:

* In the _Global parameters_ tab of the <DocLink slug="/serverless/observability/synthetics-settings" section="global-parameters">Synthetics Settings page in an Observability project</DocLink>.
* Declaring a default value for the parameter in a <DocLink slug="/serverless/observability/synthetics-params-secrets" section="synthetics-project-config-file">configuration file</DocLink>.
* Passing the `--params` <DocLink slug="/serverless/observability/synthetics-params-secrets" section="cli-argument">CLI argument</DocLink>.

<DocCallOut title="Note">
If you are creating and managing synthetic monitors using a
<DocLink slug="/serverless/observability/synthetics-get-started-project">Synthetics project</DocLink>, you can also use regular environment
variables via the standard node `process.env` global object.
</DocCallOut>

The values in the configuration file are read in the following order:

1. **Global parameters in an Observability project**: The _Global parameters_ set using the
    Observability project's UI are read first.
1. **Configuration file**: Then the _Global parameters_ are merged with any parameters defined in a configuration file.
    If a parameter is defined in both the Observability project **and** a Synthetics project configuration file,
    the value in the configuration file will be used.
1. **CLI**: Then the parameters defined in the configuration are merged with any parameters passed to the CLI `--params` argument.
    If a parameter is defined in a Synthetics project configuration file **and** using the CLI argument,
    the value defined using the CLI will be used.
    When running a script using the CLI, _Global parameters_ defined in the Observability project have no impact
    on the test because it won't have access to the Observability project.

### Global parameters in your Observability project

From any page in the Observability project's **Synthetics** section:

1. Go to **Settings**.
1. Go to the **Global parameters** tab.
1. Define parameters.

![Global parameters tab on the Synthetics Settings page in an Observability project](../images/synthetics-params-secrets-kibana-define.png)

<div id="synthetics-dynamic-configs"></div>

### Synthetics project config file

Use a `synthetics.config.js` or `synthetics.config.ts` file to define variables required by your tests.
This file should be placed in the root of your Synthetics project.

```js
export default (env) => {
  let my_url = "http://localhost:8080";
  if (env === "production") {
    my_url = "https://elastic.github.io/synthetics-demo/"
  }
  return {
    params: {
      my_url,
    },
  };
};
```

The example above uses the `env` variable, which corresponds to the value of the `NODE_ENV` environment variable.

<div id="synthetics-cli-params"></div>

### CLI argument

To set parameters when running <DocLink slug="/serverless/observability/synthetics-command-reference">`npx @elastic/synthetics` on the command line</DocLink>,
use the `--params` or `-p` flag. The provided map is merged over any existing variables defined in the `synthetics.config.{js,ts}` file.

For example, to override the `my_url` parameter, you would run:

```sh
npx @elastic/synthetics . --params '{"my_url": "http://localhost:8080"}'
```

<div id="synthetics-params-secrets-use"></div>

## Use params

You can use params in both lightweight and browser monitors created in
either a Synthetics project or the Synthetics UI in your Observability project.

### In a Synthetics project

For lightweight monitors in a Synthetics project, wrap the name of the param in `${}` (for example, `${my_url}`).

```yaml
- type: http
  name: Todos Lightweight
  id: todos-lightweight
  urls: ["${my_url}"]
  schedule: '@every 1m'
```

In browser monitors, parameters can be referenced via the `params` property available within the
argument to a `journey`, `before`, `beforeAll`, `after`, or `afterAll` callback function.

Add `params.` before the name of the param (for example, `params.my_url`):

```
beforeAll(({params}) => {
  console.log(`Visiting ${params.my_url}`)
})

journey("My Journey", ({ page, params }) => {
  step('launch app', async () => {
    await page.goto(params.my_url)  \[\^\1]
  })
})
```
\[\^\1]: If you are using TypeScript, replace `params.my_url` with `params.my_url as string`.

<div id="synthetics-params-secrets-use-ui"></div>

### In the UI

To use a param in a lightweight monitor that is created in the Synthetics UI,
wrap the name of the param in `${}` (for example, `${my_url}`).

![Use a param in a lightweight monitor created in the Synthetics UI](../images/synthetics-params-secrets-kibana-use-lightweight.png)

To use a param in a browser monitor that is created in the Synthetics UI,
add `params.` before the name of the param (for example, `params.my_url`).

![Use a param in a browser monitor created in the Synthetics UI](../images/synthetics-params-secrets-kibana-use-browser.png)

<div id="synthetics-secrets-sensitive"></div>

## Working with secrets and sensitive values

Your synthetics scripts may require the use of passwords or other sensitive secrets that are not known until runtime.

<DocCallOut title="Warning" color="warning">

Params are viewable in plain-text by administrators and other users with `all` privileges for
the Synthetics app.
Also note that synthetics scripts have no limitations on accessing these values, and a malicious script author could write a
synthetics journey that exfiltrates `params` and other data at runtime.
Do **not** use truly sensitive passwords (for example, an admin password or a real credit card)
in **any** synthetics tools.
Instead, set up limited demo accounts, or fake credit cards with limited functionality.
If you want to limit access to parameters, ensure that users who are not supposed to access those values
do not have `all` privileges for the Synthetics app, and that any scripts that use those values
do not leak them in network requests or screenshots.

</DocCallOut>

If you are managing monitors with a Synthetics project, you can use environment variables
in your `synthetics.config.ts` or `synthetics.config.js` file.

The example below uses `process.env.MY_URL` to reference a variable named `MY_URL`
defined in the environment and assigns its value to a param. That param can then
be used in both lightweight and browser monitors that are managed in the Synthetics project:

```js
export default {
  params: {
    my_url: process.env.MY_URL
  }
};
```
