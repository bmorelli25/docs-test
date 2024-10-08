---
slug: /serverless/observability/apm-agents-opentelemetry-opentelemetry-apisdk-with-elastic-apm-agents
title: OpenTelemetry API/SDK with Elastic APM agents
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="use the OpenTelemetry API/SDKs with Elastic APM agents" />

Use the OpenTelemetry API/SDKs with Elastic APM agents.
Supported Elastic APM agents translate OpenTelemetry API calls to Elastic APM API calls.
This allows you to reuse your existing instrumentation to create Elastic APM transactions and spans.

<DocCallOut title="Tip">
If you'd like to use OpenTelemetry to send data directly to Elastic instead,
see <DocLink slug="/serverless/observability/apm-agents-opentelemetry-opentelemetry-native-support">OpenTelemetry native support</DocLink>.
</DocCallOut>

See the relevant Elastic APM agent documentation to get started:

* [Java](http://example.co)/opentelemetry-bridge.html)
* [.NET](http://example.co)/opentelemetry-bridge.html)
* [Node.js](http://example.co)/opentelemetry-bridge.html)
* [Python](http://example.co)/opentelemetry-bridge.html)

<div id="open-telemetry-elastic-next"></div>

## Next steps

* <DocLink slug="/serverless/observability/apm-agents-opentelemetry-collect-metrics">Collect metrics</DocLink>
* Learn about the <DocLink slug="/serverless/observability/apm-agents-opentelemetry-limitations">limitations of this integration</DocLink>
