---
slug: /serverless/observability/create-an-slo
title: Create an SLO
description: Learn how to define a service-level indicator (SLI), set an objective, and create a service-level objective (SLO).
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="create SLOs" />

To create an SLO, in your Observability project, go to **Observability** → **SLOs**:

* If you're creating your first SLO, you'll see an introductory page. Click the **Create SLO** button.
* If you've created SLOs before, click the **Create new SLO** button in the upper-right corner of the page.

From here, complete the following steps:

1. <DocLink slug="/serverless/observability/create-an-slo" section="define-your-sli">Define your service-level indicator (SLI)</DocLink>.
1. <DocLink slug="/serverless/observability/create-an-slo" section="set-your-objectives">Set your objectives</DocLink>.
1. <DocLink slug="/serverless/observability/create-an-slo" section="describe-your-slo">Describe your SLO</DocLink>.

<div id="define-sli"></div>

## Define your SLI

The type of SLI to use depends on the location of your data:

* <DocLink slug="/serverless/observability/create-an-slo" section="custom-kql">Custom KQL</DocLink>: Create an SLI based on raw logs coming from your services.
* <DocLink slug="/serverless/observability/create-an-slo" section="timeslice-metric">Timeslice metric</DocLink>: Create an SLI based on a custom equation that uses multiple aggregations.
* <DocLink slug="/serverless/observability/create-an-slo" section="custom-metric">Custom metric</DocLink>: Create an SLI to define custom equations from metric fields in your indices.
* <DocLink slug="/serverless/observability/create-an-slo" section="histogram-metric">Histogram metric</DocLink>: Create an SLI based on histogram metrics.
* <DocLink slug="/serverless/observability/create-an-slo" section="apm-latency-and-apm-availability">APM latency and APM availability</DocLink>: Create an SLI based on services using application performance monitoring (APM).

<div id="custom-kql"></div>

### Custom KQL

Create an indicator based on any of your PRODUCT_NAME indices or data views. You define two queries: one that yields the good events from your index, and one that yields the total events from your index.

**Example:** You can define a custom KQL indicator based on the `service-logs` index with the **good query** defined as `nested.field.response.latency <= 100 and nested.field.env : “production”` and the **total query** defined as `nested.field.env : “production”`.

When defining a custom KQL SLI, set the following fields:

* **Index:** The data view or index pattern you want to base the SLI on. For example, `service-logs`.
* **Timestamp field:** The timestamp field used by the index.
* **Query filter:** A KQL filter to specify relevant criteria by which to filter the index documents.
* **Good query:** The query yielding events that are considered good or successful. For example, `nested.field.response.latency <= 100 and nested.field.env : “production”`.
* **Total query:** The query yielding all events to take into account for computing the SLI. For example, `nested.field.env : “production”`.
* **Group by:** The field used to group the data based on the values of the specific field. For example, you could group by the `url.domain` field, which would create individual SLOs for each value of the selected field.

<div id="custom-metric"></div>

### Custom metric

Create an indicator to define custom equations from metric fields in your indices.

**Example:** You can define **Good events** as the sum of the field `processor.processed` with a filter of `"processor.outcome: \"success\""`, and the **Total events** as the sum of `processor.processed` with a filter of `"processor.outcome: *"`.

When defining a custom metric SLI, set the following fields:

* **Source**
    * **Index:** The data view or index pattern you want to base the SLI on. For example, `my-service-*`.
    * **Timestamp field:** The timestamp field used by the index.
    * **Query filter:** A KQL filter to specify relevant criteria by which to filter the index documents. For example, `'field.environment : "production" and service.name : "my-service"'`.
* **Good events**
    * **Metric [A-Z]:** The field that is aggregated using the `sum` aggregation for good events. For example, `processor.processed`.
    * **Filter [A-Z]:** The filter to apply to the metric for good events. For example, `"processor.outcome: \"success\""`.
    * **Equation:** The equation that calculates the good metric. For example, `A`.
* **Total events**
    * **Metric [A-Z]:** The field that is aggregated using the `sum` aggregation for total events. For example, `processor.processed`.
    * **Filter [A-Z]:** The filter to apply to the metric for total events. For example, `"processor.outcome: *"`.
    * **Equation:** The equation that calculates the total metric. For example, `A`.
* **Group by:** The field used to group the data based on the values of the specific field. For example, you could group by the `url.domain` field, which would create individual SLOs for each value of the selected field.

<div id="timeslice-metric"></div>

### Timeslice metric

Create an indicator based on a custom equation that uses statistical aggregations and a threshold to determine whether a slice is good or bad.
Supported aggregations include `Average`, `Max`, `Min`, `Sum`, `Cardinality`, `Last value`, `Std. deviation`, `Doc count`, and `Percentile`.
The equation supports basic math and logic.

<DocCallOut title="Note">
    This indicator requires you to use the `Timeslices` budgeting method.
</DocCallOut>

**Example:** You can define an indicator to determine whether a Kubernetes StatefulSet is healthy.
First you set the query filter to `orchestrator.cluster.name: "elastic-k8s" AND kubernetes.namespace: "my-ns" AND data_stream.dataset: "kubernetes.state_statefulset"`.
Then you define an equation that compares the number of ready (healthy) replicas to the number of observed replicas:
`A == B ? 1 : 0`, where `A` retrieves the last value of `kubernetes.statefulset.replicas.ready` and `B` retrieves the last value of `kubernetes.statefulset.replicas.observed`.
The equation returns `1` if the condition `A == B` is true (indicating the same number of replicas) or `0` if it's false. If the value is less than 1, you can determine that the Kubernetes StatefulSet is unhealthy.

When defining a timeslice metric SLI, set the following fields:

* **Source**
    * **Index:** The data view or index pattern you want to base the SLI on. For example, `metrics-*:metrics-*`.
    * **Timestamp field:** The timestamp field used by the index.
    * **Query filter:** A KQL filter to specify relevant criteria by which to filter the index documents. For example, `orchestrator.cluster.name: "elastic-k8s" AND kubernetes.namespace: "my-ns" AND data_stream.dataset: "kubernetes.state_statefulset"`.
* **Metric definition**
    * **Aggregation [A-Z]:** The type of aggregation to use.
    * **Field [A-Z]:** The field to use in the aggregation. For example, `kubernetes.statefulset.replicas.ready`.
    * **Filter [A-Z]:** The filter to apply to the metric.
    * **Equation:** The equation that calculates the total metric. For example, `A == B ? 1 : 0`.
    * **Comparator:** The type of comparison to perform.
    * **Threshold:** The value to use along with the comparator to determine if the slice is good or bad.

<div id="histogram-metric"></div>

### Histogram metric

Histograms record data in a compressed format and can record latency and delay metrics. You can create an SLI based on histogram metrics using a `range` aggregation or a `value_count` aggregation for both the good and total events. Filtering with KQL queries is supported on both event types.

When using a `range` aggregation, both the `from` and `to` thresholds are required for the range and the events are the total number of events within that range. The range includes the `from` value and excludes the `to` value.

**Example:** You can define your **Good events** using the `processor.latency` field with a filter of `"processor.outcome: \"success\""`, and your **Total events** using the `processor.latency` field with a filter of `"processor.outcome: *"`.

When defining a histogram metric SLI, set the following fields:

* **Source**
    * **Index:** The data view or index pattern you want to base the SLI on. For example, `my-service-*`.
    * **Timestamp field:** The timestamp field used by the index.
    * **Query filter:** A KQL filter to specify relevant criteria by which to filter the index documents. For example, `field.environment : "production" and service.name : "my-service"`.
* **Good events**
    * **Aggregation:** The type of aggregation to use for good events, either **Value count** or **Range**.
    * **Field:** The field used to aggregate events considered good or successful. For example, `processor.latency`.
    * **From:** (`range` aggregation only) The starting value of the range for good events. For example, `0`.
    * **To:** (`range` aggregation only) The ending value of the range for good events. For example, `100`.
    * **KQL filter:** The filter for good events. For example, `"processor.outcome: \"success\""`.
* **Total events**
    * **Aggregation:** The type of aggregation to use for total events, either **Value count** or **Range**.
    * **Field:** The field used to aggregate total events. For example, `processor.latency`.
    * **From:** (`range` aggregation only) The starting value of the range for total events. For example, `0`.
    * **To:** (`range` aggregation only) The ending value of the range for total events. For example, `100`.
    * **KQL filter:** The filter for total events. For example, `"processor.outcome : *"`.
* **Group by:** The field used to group the data based on the values of the specific field. For example, you could group by the `url.domain` field, which would create individual SLOs for each value of the selected field.

<div id="apm-latency-and-availability"></div>

### APM latency and APM availability

There are two types of SLI you can create based on services using application performance monitoring (APM): APM latency and APM availability.

Use **APM latency** to create an indicator based on latency data received from your instrumented services and a latency threshold.

**Example:** You can define an indicator on an APM service named `banking-service` for the `production` environment, and the transaction name `POST /deposit` with a latency threshold value of 300ms.

Use **APM availability** to create an indicator based on the availability of your instrumented services.
Availability is determined by calculating the percentage of successful transactions (`event.outcome : "success"`) out of the total number of successful and failed transactions—unknown outcomes are excluded.

**Example:** You can define an indicator on an APM service named `search-service` for the `production` environment, and the transaction name `POST /search`.

When defining either an APM latency or APM availability SLI, set the following fields:

* **Service name:** The APM service name.
* **Service environment:** Either `all` or the specific environment.
* **Transaction type:** Either `all` or the specific transaction type.
* **Transaction name:** Either `all` or the specific transaction name.
* **Threshold (APM latency only):** The latency threshold in milliseconds (ms) to consider the request as good.
* **Query filter:** An optional query filter on the APM data.

<div id="set-slo"></div>

## Set your objectives

After defining your SLI, you need to set your objectives. To set your objectives, complete the following:

1. <DocLink slug="/serverless/observability/create-an-slo" section="select-your-budgeting-method">Select your budgeting method</DocLink>
1. <DocLink slug="/serverless/observability/create-an-slo" section="set-your-time-window-and-duration">Set your time window</DocLink>
1. <DocLink slug="/serverless/observability/create-an-slo" section="set-your-targetslo-percent">Set your target/SLO percentage</DocLink>

<div id="slo-time-window"></div>

### Set your time window and duration

Select the durations over which you want to compute your SLO. You can select either a **rolling** or **calendar aligned** time window:

|  |  |
|---|---|
| **Rolling** | Uses data from a specified duration that depends on when the SLO was created, for example the last 30 days. |
| **Calendar aligned** | Uses data from a specified duration that aligns with calendar, for example weekly or monthly. |

<div id="slo-budgeting-method"></div>

### Select your budgeting method

You can select either an **occurrences** or a **timeslices** budgeting method:

|  |  |
|---|---|
| **Occurrences** | Uses the number of good events and the number of total events to compute the SLI. |
| **Timeslices** | Breaks the overall time window into smaller slices of a defined duration, and uses the number of good slices over the number of total slices to compute the SLI. |

<div id="slo-target"></div>

### Set your target/SLO (%)

The SLO target objective as a percentage.

<div id="slo-describe"></div>

## Describe your SLO

After setting your objectives, give your SLO a name, a short description, and add any relevant tags.

<div id="slo-alert-checkbox"></div>

## SLO burn rate alert rule

When you use the UI to create an SLO, a default SLO burn rate alert rule is created automatically.
The burn rate rule will use the default configuration and no connector.
You must configure a connector if you want to receive alerts for SLO breaches.

For more information about configuring the rule, see <DocLink slug="/serverless/observability/create-slo-burn-rate-alert-rule">Create an SLO burn rate rule</DocLink>.
