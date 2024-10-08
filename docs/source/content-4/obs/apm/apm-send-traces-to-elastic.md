---
slug: /serverless/observability/apm-send-data-to-elastic
title: Send APM data to Elastic
# description: Description to be written
tags: [ 'serverless', 'observability', 'overview' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="send APM data to Elastic" />

<DocCallOut>
<DocIcon type="documentation" title="documentation icon" /> Want to get started quickly? See <DocLink slug="/serverless/observability/apm-get-started">Get started with traces and APM</DocLink>.
</DocCallOut>

Send APM data to Elastic with:

* **<DocLink slug="/serverless/observability/apm-agents-elastic-apm-agents" text="Elastic APM agents"/>:** Elastic APM agents are lightweight libraries you install in your applications and services. They automatically instrument supported technologies, and offer APIs for custom code instrumentation.
* **<DocLink slug="/serverless/observability/apm-agents-opentelemetry" text="OpenTelemetry"/>:** OpenTelemetry is a set of APIs, SDKs, tooling, and integrations that enable the capture and management of telemetry data from your services and applications.

Elastic also supports instrumentation of <DocLink slug="/serverless/observability/apm-agents-aws-lambda-functions" text="AWS Lambda functions"/>.

<!--  To do: We should put a diagram here showing how high-level arch-->
