---
slug: /serverless/observability/apm-metrics
title: Metrics
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>

The **Metrics** overview provides APM agent-specific metrics,
which lets you perform more in-depth root cause analysis investigations within the Applications UI.

If you're experiencing a problem with your service, you can use this page to attempt to find the underlying cause.
For example, you might be able to correlate a high number of errors with a long transaction duration, high CPU usage, or a memory leak.

![Example view of the Metrics overview in the Applications UI](images/metrics/apm-metrics.png)

If you're using the Java APM agent, you can view metrics for each JVM.

![Example view of the Metrics overview for the Java Agent](images/metrics/jvm-metrics-overview.png)

Breaking down metrics by JVM makes it much easier to analyze the provided metrics:
CPU usage, memory usage, heap or non-heap memory,
thread count, garbage collection rate, and garbage collection time spent per minute.

![Example view of the Metrics overview for the Java Agent](images/metrics/jvm-metrics.png)
