---
slug: /serverless/observability/infrastructure-monitoring
title: Infrastructure monitoring
description: Monitor metrics from your servers, Docker, Kubernetes, Prometheus, and other services and applications.
tags: [ 'serverless', 'observability', 'overview' ]
---

<p><DocBadge template="technical preview" /></p>

<div id="analyze-metrics"></div>

Elastic Observability allows you to visualize infrastructure metrics to help diagnose problematic spikes,
identify high resource utilization, automatically discover and track pods,
and unify your metrics with logs and APM data.

Using PRODUCT_NAME integrations, you can ingest and analyze metrics from servers,
Docker containers, Kubernetes orchestrations, explore and analyze application
telemetry, and more.

For more information, refer to the following links:

* <DocLink slug="/serverless/observability/get-started-with-metrics" />:
Learn how to onboard your system metrics data quickly.
* <DocLink slug="/serverless/observability/view-infrastructure-metrics" />:
Use the **Inventory page** to get a metrics-driven view of your infrastructure grouped by resource type.
* <DocLink slug="/serverless/observability/analyze-hosts" />:
Use the **Hosts** page to get a metrics-driven view of your infrastructure backed by an easy-to-use interface called Lens.
* <DocLink slug="/serverless/observability/detect-metric-anomalies" />: Detect and inspect memory usage and network traffic anomalies for hosts and Kubernetes pods.
* <DocLink slug="/serverless/observability/configure-intra-settings" />: Learn how to configure infrastructure UI settings.
* <DocLink slug="/serverless/observability/metrics-reference" />: Learn about key metrics used for infrastructure monitoring.
* <DocLink slug="/serverless/observability/infrastructure-monitoring-required-fields" />: Learn about the fields required to display data in the Infrastructure UI.

By default, the Infrastructure UI displays metrics from PRODUCT_NAME indices that
match the `metrics-*` and `metricbeat-*` index patterns. To learn how to change
this behavior, refer to <DocLink slug="/serverless/observability/configure-intra-settings">Configure settings</DocLink>.
