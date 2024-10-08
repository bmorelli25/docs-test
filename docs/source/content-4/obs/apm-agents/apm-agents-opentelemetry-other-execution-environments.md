---
slug: /serverless/observability/opentelemetry-aws-lambda-support
title: AWS Lambda support
# description: Description to be written
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

AWS Lambda functions can be instrumented with OpenTelemetry and monitored with Elastic Observability.

To get started, follow the official AWS Distro for OpenTelemetry Lambda [getting started documentation](https://aws-otel.github.io/docs/getting-started/lambda) and configure the OpenTelemetry Collector to output traces and metrics to your Elastic cluster.

<div id="open-telemetry-aws-lambda-java"></div>

## Next steps

* <DocLink slug="/serverless/observability/apm-agents-opentelemetry-collect-metrics">Collect metrics</DocLink>
* Add <DocLink slug="/serverless/observability/apm-agents-opentelemetry-resource-attributes">Resource attributes</DocLink>
* Learn about the <DocLink slug="/serverless/observability/apm-agents-opentelemetry-limitations">limitations of this integration</DocLink>
