---
slug: /serverless/observability/apm-keep-data-secure
title: Keep APM data secure
description: Make sure APM data is sent to Elastic securely and sensitive data is protected.
tags: [ 'serverless', 'observability', 'overview' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="create and manage API keys" />

<!-- TODO: Find out whether Editor or Admin is required to create and manage API keys.-->

When setting up Elastic APM, it's essential to ensure that the data collected by
APM agents is sent to Elastic securely and that sensitive data is protected.

## Secure communication with APM agents

Communication between APM agents and the managed intake service is both encrypted and authenticated.
Requests without a valid API key will be denied.

### Create a new API key

To create a new API key:

1. In your Observability project, go to any **Applications** page.
1. Click **Settings**.
1. Select the **APM agent keys** tab.
1. Click **Create APM agent key**.
1. Name the key and assign privileges to it.
1. Click **Create APM agent key**.
1. Copy the key now. You will not be able to see it again. API keys do not expire.

### Delete an API key

To delete an API key:

1. From any of the **Application** pages, click **Settings**.
1. Select the **APM agent keys** tab.
1. Search for the API key you want to delete.
1. Click the trash can icon to delete the selected API key.

### View existing API keys

To view all API keys for your project:

1. Expand **Project settings**.
1. Select **Management**.
1. Select **API keys**.

## Data security

When setting up Elastic APM, it's essential to review all captured data carefully to ensure it doesn't contain sensitive information like passwords, credit card numbers, or health data.

Some APM agents offer a way to manipulate or drop APM events _before_ they leave your services.
Refer to the relevant agent's documentation for more information and examples:

### Java

**`include_process_args`**: Remove process arguments from transactions. This option is disabled by default. Read more in the [Java agent configuration docs](http://example.co)/config-reporter.html#config-include-process-args).

### .NET

**Filter API**: Drop APM events _before_ they are sent to Elastic. Read more in the [.NET agent Filter API docs](http://example.co)/public-api.html#filter-api).

### Node.js

* **`addFilter()`**: Drop APM events _before_ they are sent to Elastic. Read more in the [Node.js agent API docs](http://example.co)/agent-api.html#apm-add-filter).
* **`captureExceptions`**: Remove errors raised by the server-side process by disabling the `captureExceptions` configuration option. Read more in [the Node.js agent configuration docs](http://example.co)/configuration.html#capture-exceptions).

### Python

**Custom processors**: Drop APM events _before_ they are sent to Elastic. Read more in the [Python agent Custom processors docs](http://example.co)/sanitizing-data.html).

### Ruby

**`add_filter()`**: Drop APM events _before_ they are sent to Elastic. Read more in the [Ruby agent API docs](http://example.co)/api.html#api-agent-add-filter).
