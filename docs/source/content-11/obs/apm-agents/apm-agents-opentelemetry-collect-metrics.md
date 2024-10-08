---
slug: /serverless/observability/apm-agents-opentelemetry-collect-metrics
title: Collect metrics
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>


<DocCallOut title="Important" color="warning">
When collecting metrics, please note that the [`DoubleValueRecorder`](https://www.javadoc.io/doc/io.opentelemetry/opentelemetry-api/latest/io/opentelemetry/api/metrics/DoubleValueRecorder.html)
and [`LongValueRecorder`](https://www.javadoc.io/doc/io.opentelemetry/opentelemetry-api/latest/io/opentelemetry/api/metrics/LongValueObserver.html) metrics are not yet supported.
</DocCallOut>

Here's an example of how to capture business metrics from a Java application.

```java
// initialize metric
Meter meter = GlobalMetricsProvider.getMeter("my-frontend");
DoubleCounter orderValueCounter = meter.doubleCounterBuilder("order_value").build();

public void createOrder(HttpServletRequest request) {

   // create order in the database
   ...
   // increment business metrics for monitoring
   orderValueCounter.add(orderPrice);
}
```

See the [Open Telemetry Metrics API](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md)
for more information.

<div id="open-telemetry-verify-metrics"></div>

## Verify OpenTelemetry metrics data

Use **Discover** to validate that metrics are successfully reported to your project.

1. Open your Observability project.
1. In your Observability project, go to **Discover**, and select the **Logs Explorer** tab.
1. Click **All logs** → **Data Views** then select **APM**.
1. Filter the data to only show documents with metrics: `processor.name :"metric"`
1. Narrow your search with a known OpenTelemetry field. For example, if you have an `order_value` field, add `order_value: *` to your search to return
    only OpenTelemetry metrics documents.

<div id="open-telemetry-visualize"></div>

## Visualize

Use **Lens** to create visualizations for OpenTelemetry metrics. Lens enables you to build visualizations by dragging and dropping data fields. It makes smart visualization suggestions for your data, allowing you to switch between visualization types.

To get started with a new Lens visualization:

1. In your Observability project, go to **Visualizations**.
1. Click **Create new visualization**.
1. Select **Lens**.

For more information on using Lens, refer to the [Lens documentation](http://example.co)/lens.html).
