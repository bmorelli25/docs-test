---
slug: /serverless/observability/apm
title: Application performance monitoring (APM)
# description: Description to be written
tags: [ 'serverless', 'observability', 'overview' ]
---

```{toctree}
:maxdepth: 2
:caption: Contents:
:hidden:

apm-troubleshooting.md
apm-distributed-tracing.md
apm-ui-metrics.md
apm-stacktrace-collection.md
apm-create-custom-links.md
apm-data-types.md
apm-ui-overview.md
apm-reference.md
apm-get-started.md
apm-kibana-settings.md
apm-ui-logs.md
apm-transaction-sampling.md
apm-observe-lambda-functions.md
apm-ui-service-overview.md
apm-ui-transactions.md
apm-track-deployments-with-annotations.md
apm-ui-traces.md
new-experience-services.md
apm-query-your-data.md

apm-ui-errors.md
apm-filter-your-data.md
apm-reduce-your-data-usage.md
apm-view-and-analyze-traces.md
apm-ui-service-map.md
apm-ui-services.md
apm-integrate-with-machine-learning.md
apm-troubleshooting/common-problems.md
apm-troubleshooting/common-response-codes.md
apm-send-traces-to-elastic.md
apm-transaction-sampling/configure-head-based-sampling.md
apm-compress-spans.md
apm-find-transaction-latency-and-failure-correlations.md
apm-ui-dependencies.md
apm-ui-trace-sample-timeline.md
apm-server-api.md
apm-ui-infrastructure.md
apm-keep-data-secure.md
```

Elastic APM is an application performance monitoring system.
It allows you to monitor software services and applications in real time, by
collecting detailed performance information on response time for incoming requests,
database queries, calls to caches, external HTTP requests, and more.
This makes it easy to pinpoint and fix performance problems quickly.

Elastic APM also automatically collects unhandled errors and exceptions.
Errors are grouped based primarily on the stack trace,
so you can identify new errors as they appear and keep an eye on how many times specific errors happen.

Metrics are another vital source of information when debugging production systems.
Elastic APM agents automatically pick up basic host-level metrics and agent-specific metrics,
like JVM metrics in the Java Agent, and Go runtime metrics in the Go Agent.

## Give Elastic APM a try

Ready to give Elastic APM a try? See <DocLink slug="/serverless/observability/apm-get-started">Get started with traces and APM</DocLink>.
