---
slug: /serverless/observability/triage-threshold-breaches
title: Triage threshold breaches
description: Triage threshold breaches on the alert details page.
tags: [ 'serverless', 'observability', 'how-to', 'alerting' ]
---

Threshold breaches occur when an Observability data type reaches or exceeds the threshold set in your <DocLink slug="/serverless/observability/create-custom-threshold-alert-rule" text="custom threshold rule" />.
For example, you might have a custom threshold rule that triggers an alert when the total number of log documents with a log level of `error` reaches 100.

To triage issues quickly, go to the alert details page:

1. In your Observability project, go to **Alerts**.
2. From the Alerts table, click the <DocIcon type="boxesHorizontal" size="m" title="More actions" />
icon next to the alert and select **View alert details**.

The alert details page shows information about the alert, including when the alert was triggered,
the duration of the alert, and the last status update.
If there is a "group by" field specified in the rule, the page also includes the source.
You can follow the links to navigate to the rule definition.

Explore charts on the page to learn more about the threshold breach:

![Alert details for log threshold breach](../images/log-threshold-breach.png)


* The page includes a chart for each condition specified in the rule.
These charts help you understand when the breach occurred and its severity.
* If your rule is intended to detect log threshold breaches
(that is, it has a single condition that uses a count aggregation),
you can run a log rate analysis, assuming you have the required license.
Running a log rate analysis is useful for detecting significant dips or spikes in the number of logs.
Notice that you can adjust the baseline and deviation, and then run the analysis again.
For more information about using the log rate analysis feature,
refer to the [AIOps Labs](http://example.co)/xpack-ml-aiops.html#log-rate-analysis) documentation.
* The page may also include an alerts history chart that shows the number of triggered alerts per day for the last 30 days.
This chart is currently only available for rules that specify a single condition.
* Timelines on the page are annotated to show when the threshold was breached.
You can hover over an alert icon to see the timestamp of the alert.

Analyze these charts to better understand when the breach started, it's current
state, and how the issue is trending.

After investigating the alert, you may want to:

* Click **Snooze the rule** to snooze notifications for a specific time period or indefinitely.
* Click the <DocIcon type="boxesVertical" size="m" title="Actions" /> icon and select **Add to case** to add the alert to a new or existing case. To learn more, refer to <DocLink slug="/serverless/observability/cases"/>.
* Click the <DocIcon type="boxesVertical" size="m" title="Actions" /> icon and select **Mark as untracked**.
When an alert is marked as untracked, actions are no longer generated.
You can choose to move active alerts to this state when you disable or delete rules.
