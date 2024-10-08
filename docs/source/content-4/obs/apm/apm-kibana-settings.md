---
slug: /serverless/observability/apm-kibana-settings
title: Settings
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="modify settings" />

You can adjust Application settings to fine-tune your experience in the Applications UI.

## General settings

To change APM settings, select **Settings** from any **Applications** page.
The following settings are available.

`observability:apmAgentExplorerView`

: <DocBadge template="beta" /> Enables the Agent explorer view.

`observability:apmAWSLambdaPriceFactor`

: Set the price per Gb-second for your AWS Lambda functions.

`observability:apmAWSLambdaRequestCostPerMillion`

: Set the AWS Lambda cost per million requests.

`observability:apmEnableContinuousRollups`

: <DocBadge template="beta" /> When continuous rollups are enabled, the UI will select metrics with the appropriate resolution.
On larger time ranges, lower resolution metrics will be used, which will improve loading times.

`observability:apmEnableServiceMetrics`

: <DocBadge template="beta" /> Enables the usage of service transaction metrics, which are low cardinality metrics that can be used by certain views like the service inventory for faster loading times.

`observability:apmLabsButton`

: Enable or disable the APM Labs button &mdash; a quick way to enable and disable technical preview features in APM.

<!--  [[observability-apm-critical-path]]`observability:apmEnableCriticalPath`
When enabled, displays the critical path of a trace.-->

<!--  [[observability-enable-progressive-loading]]`observability:apmProgressiveLoading`
preview:[] When enabled, uses progressive loading of some APM views.
Data may be requested with a lower sampling rate first, with lower accuracy but faster response times,
while the unsampled data loads in the background.-->

`observability:apmServiceGroupMaxNumberOfServices`

: Limit the number of services in a given service group.

<!--  [[observability-apm-optimized-sort]]`observability:apmServiceInventoryOptimizedSorting`
preview:[] Sorts services without anomaly detection rules on the APM Service inventory page by service name.-->

`observability:apmDefaultServiceEnvironment`

: Set the default environment for APM. When left empty, data from all environments will be displayed by default.

`observability:apmEnableProfilingIntegration`

: Enable the Universal Profiling integration in APM.

<!--  [[observability-enable-aws-lambda-metrics]]`observability:enableAwsLambdaMetrics`
preview:[] Display Amazon Lambda metrics in the service metrics tab.-->

`observability:enableComparisonByDefault`

: Enable the comparison feature by default.

`observability:enableInspectEsQueries`

: When enabled, allows you to inspect Elasticsearch queries in API responses.

<!--  [[observability-apm-trace-explorer-tab]]`observability:apmTraceExplorerTab`
preview:[] Enable the APM Trace Explorer feature, that allows you to search and inspect traces with KQL or EQL.-->

## APM Labs

**APM Labs** allows you to easily try out new features that are technical preview.

To enable APM labs, go to **Applications** → **Settings** → **General settings** and toggle **Enable labs button in APM**.
Select **Save changes** and refresh the page.

After enabling **APM Labs** select **Labs** in the toolbar to see the technical preview features available to try out.
