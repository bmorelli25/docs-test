---
slug: /serverless/observability/apm-agents-opentelemetry
title: OpenTelemetry
# description: Description to be written
tags: [ 'serverless', 'observability', 'overview' ]
---

<p><DocBadge template="technical preview" /></p>

import DiagramsApmOtelArchitecture from '../transclusion/apm/guide/diagrams/apm-otel-architecture.mdx'

[OpenTelemetry](https://opentelemetry.io/docs/concepts/what-is-opentelemetry/)
is a set of APIs, SDKs, tooling, and integrations that enable the capture and management of
telemetry data from your services and applications. For more information about the
OpenTelemetry project, see the [spec](https://github.com/open-telemetry/opentelemetry-specification/blob/master/README.md).

## OpenTelemetry and Elastic

<!-- TODO: Fix diagram-->
<DiagramsApmOtelArchitecture />

Elastic integrates with OpenTelemetry, allowing you to reuse your existing instrumentation
to easily send observability data to Elastic.
There are several ways to integrate OpenTelemetry with Elastic:

**OpenTelemetry API/SDK with Elastic APM agents**

To unlock the full power of Elastic, use the OpenTelemetry API/SDKs with Elastic APM agents,
currently supported by the Java, Python, .NET, and Node.js agents.
These Elastic APM agents translate OpenTelemetry API calls to Elastic APM API calls.
This allows you to reuse your existing instrumentation to create Elastic APM transactions and spans—avoiding vendor lock-in and having to redo manual instrumentation.

<DocLink slug="/serverless/observability/apm-agents-opentelemetry-opentelemetry-apisdk-with-elastic-apm-agents">Get started →</DocLink>

**OpenTelemetry agent**

Elastic natively supports the OpenTelemetry protocol (OTLP).
This means trace data and metrics collected from your applications and infrastructure by an
OpenTelemetry agent can be sent directly to Elastic.

<DocLink slug="/serverless/observability/apm-agents-opentelemetry-opentelemetry-native-support" section="send-data-from-an-opentelemetry-agent">Get started →</DocLink>

**OpenTelemetry collector**

Elastic natively supports the OpenTelemetry protocol (OTLP).
This means trace data and metrics collected from your applications and infrastructure by an
OpenTelemetry collector can be sent directly to Elastic.

<DocLink slug="/serverless/observability/apm-agents-opentelemetry-opentelemetry-native-support" section="send-data-from-an-opentelemetry-collector">Get started →</DocLink>

**Lambda collector exporter**

AWS Lambda functions can be instrumented with OpenTelemetry and monitored with Elastic Observability.

<DocLink slug="/serverless/observability/opentelemetry-aws-lambda-support">Get started →</DocLink>
