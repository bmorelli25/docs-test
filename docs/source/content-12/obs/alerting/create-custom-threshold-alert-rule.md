---
slug: /serverless/observability/create-custom-threshold-alert-rule
title: Create a custom threshold rule
description: Get alerts when an Observability data type reach a given value.
tags: [ 'serverless', 'observability', 'how-to', 'alerting' ]
---

<p><DocBadge template="technical preview" /></p>

import Connectors from './alerting-connectors.mdx'

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="create a custom threshold rule" />

Create a custom threshold rule to trigger an alert when an Observability data type reaches or exceeds a given value.

1. To access this page, from your project go to **Alerts**.
1. Click **Manage Rules** -> **Create rule**.
1. Under **Select rule type**, select **Custom threshold**.

![Rule details (custom threshold)](../images/custom-threshold-rule.png)

<div id="custom-threshold-scope"></div>

## Define rule data

Specify the following settings to define the data the rule applies to:

* **Select a data view:** Click the data view field to search for and select a data view that points to the indices or data streams that you're creating a rule for. You can also create a _new_ data view by clicking **Create a data view**. Refer to [Create a data view](http://example.co)/data-views.html) for more on creating data views.
* **Define query filter (optional):** Use a query filter to narrow down the data that the rule applies to. For example, set a query filter to a specific host name using the query filter `host.name:host-1` to only apply the rule to that host.

<div id="custom-threshold-rule-conditions"></div>

## Set rule conditions

Set the conditions for the rule to detect using aggregations, an equation, and a threshold.

<div id="custom-threshold-aggregation"></div>

### Set aggregations

Aggregations summarize your data to make it easier to analyze.
Set any of the following aggregation types to gather data to create your rule:
`Average`, `Max`, `Min`, `Cardinality`, `Count`, `Sum,` `Percentile`, or `Rate`.
For more information about these options, refer to <DocLink slug="/serverless/observability/aggregationOptions" />.

For example, to gather the total number of log documents with a log level of `warn`:

1. Set the **Aggregation** to **Count**, and set the **KQL Filter** to `log.level: "warn"`.
1. Set the threshold to `IS ABOVE 100` to trigger an alert when the number of log documents with a log level of `warn` reaches 100.

<div id="custom-threshold-equation"></div>

### Set the equation and threshold

Set an equation using your aggregations. Based on the results of your equation, set a threshold to define when to trigger an alert. The equations use basic math or boolean logic. Refer to the following examples for possible use cases.

<div id="custom-threshold-math-equation"></div>

### Basic math equation

Add, subtract, multiply, or divide your aggregations to define conditions for alerting.

**Example:**
Set an equation and threshold to trigger an alert when a metric is above a threshold. For this example, we'll use average CPU usage—the percentage of CPU time spent in states other than `idle` or `IOWait` normalized by the number of CPU cores—and trigger an alert when CPU usage is above a specific percentage. To do this, set the following aggregations, equation, and threshold:

1. Set the following aggregations:
    * **Aggregation A:** Average `system.cpu.user.pct`
    * **Aggregation B:** Average `system.cpu.system.pct`
    * **Aggregation C:** Max `system.cpu.cores`.
1. Set the equation to `(A + B) / C * 100`
1. Set the threshold to `IS ABOVE 95` to alert when CPU usage is above 95%.

<div id="custom-threshold-boolean-equation"></div>

### Boolean logic

Use conditional operators and comparison operators with you aggregations to define conditions for alerting.

**Example:**
Set an equation and threshold to trigger an alert when the number of stateful pods differs from the number of desired pods. For this example, we'll use `kubernetes.statefulset.ready` and `kubernetes.statefulset.desired`, and trigger an alert when their values differ. To do this, set the following aggregations, equation, and threshold:

1. Set the following aggregations:
    * **Aggregation A:** Sum `kubernetes.statefulset.ready`
    * **Aggregation B:** Sum `kubernetes.statefulset.desired`
1. Set the equation to `A == B ? 1 : 0`. If A and B are equal, the result is `1`. If they're not equal, the result is `0`.
1. Set the threshold to `IS BELOW 1` to trigger an alert when the result is `0` and the field values do not match.

<div id="custom-threshold-chart-preview"></div>

## Preview chart

The preview chart provides a visualization of how many entries match your configuration.
The shaded area shows the threshold you've set.

<div id="custom-threshold-group-by"></div>

## Group alerts by (optional)

Set one or more **group alerts by** fields for custom threshold rules to perform a composite aggregation against the selected fields.
When any of these groups match the selected rule conditions, an alert is triggered _per group_.

When you select multiple groupings, the group name is separated by commas.

For example, if you group alerts by the `host.name` and `host.architecture` fields, and there are two hosts (`Host A` and `Host B`) and two architectures (`Architecture A` and `Architecture B`), the composite aggregation forms multiple groups.

If the `Host A, Architecture A` group matches the rule conditions, but the `Host B, Architecture B` group doesn't, one alert is triggered for `Host A, Architecture A`.

If you select one field—for example, `host.name`—and `Host A` matches the conditions but `Host B` doesn't, one alert is triggered for `Host A`.
If both groups match the conditions, alerts are triggered for both groups.

When you select **Alert me if a group stops reporting data**, the rule is triggered if a group that previously reported metrics does not report them again over the expected time period.

## Add actions

You can extend your rules with actions that interact with third-party systems, write to logs or indices, or send user notifications. You can add an action to a rule at any time. You can create rules without adding actions, and you can also define multiple actions for a single rule.

To add actions to rules, you must first create a connector for that service (for example, an email or external incident management system), which you can then use for different rules, each with their own action frequency.

<DocAccordion buttonContent="Connector types">
Connectors provide a central place to store connection information for services and integrations with third party systems.
The following connectors are available when defining actions for alerting rules:

<Connectors />

For more information on creating connectors, refer to <DocLink slug="/serverless/action-connectors">Connectors</DocLink>.

</DocAccordion>

<DocAccordion buttonContent="Action frequency">
After you select a connector, you must set the action frequency.
You can choose to create a summary of alerts on each check interval or on a custom interval.
Alternatively, you can set the action frequency such that you choose how often the action runs (for example,
at each check interval, only when the alert status changes, or at a custom action interval).
In this case, you must also select the specific threshold condition that affects when actions run: `Alert`, `No Data`, or `Recovered`.

![Configure when a rule is triggered](../images/custom-threshold-run-when.png)

You can also further refine the conditions under which actions run by specifying that actions only run when they match a KQL query or when an alert occurs within a specific time frame:

- **If alert matches query**: Enter a KQL query that defines field-value pairs or query conditions that must be met for notifications to send. The query only searches alert documents in the indices specified for the rule.
- **If alert is generated during timeframe**: Set timeframe details. Notifications are only sent if alerts are generated within the timeframe you define.

![Configure a conditional alert](../images/logs-threshold-conditional-alert.png)

</DocAccordion>

<DocAccordion buttonContent="Action variables">
Use the default notification message or customize it.
You can add more context to the message by clicking the Add variable icon <DocIcon type="indexOpen" title="Add variable" /> and selecting from a list of available variables.

![Action variables list](../images/action-variables-popup.png)

The following variables are specific to this rule type.
You can also specify [variables common to all rules](http://example.co)/rule-action-variables.html).

<DocDefList>
    <DocDefTerm>`context.alertDetailsUrl`</DocDefTerm>
    <DocDefDescription>
        Link to the alert troubleshooting view for further context and details. This will be an empty string if the `server.publicBaseUrl` is not configured.
    </DocDefDescription>
    <DocDefTerm>`context.cloud`</DocDefTerm>
    <DocDefDescription>
        The cloud object defined by ECS if available in the source.
    </DocDefDescription>
    <DocDefTerm>`context.container`</DocDefTerm>
    <DocDefDescription>
        The container object defined by ECS if available in the source.
    </DocDefDescription>
    <DocDefTerm>`context.group`</DocDefTerm>
    <DocDefDescription>
        The object containing groups that are reporting data.
    </DocDefDescription>
    <DocDefTerm>`context.host`</DocDefTerm>
    <DocDefDescription>
        The host object defined by ECS if available in the source.
    </DocDefDescription>
    <DocDefTerm>`context.labels`</DocDefTerm>
    <DocDefDescription>
        List of labels associated with the entity where this alert triggered.
    </DocDefDescription>
    <DocDefTerm>`context.orchestrator`</DocDefTerm>
    <DocDefDescription>
        The orchestrator object defined by ECS if available in the source.
    </DocDefDescription>
    <DocDefTerm>`context.reason`</DocDefTerm>
    <DocDefDescription>
        A concise description of the reason for the alert.
    </DocDefDescription>
    <DocDefTerm>`context.tags`</DocDefTerm>
    <DocDefDescription>
        List of tags associated with the entity where this alert triggered.
    </DocDefDescription>
    <DocDefTerm>`context.timestamp`</DocDefTerm>
    <DocDefDescription>
        A timestamp of when the alert was detected.
    </DocDefDescription>
    <DocDefTerm>`context.value`</DocDefTerm>
    <DocDefDescription>
        List of the condition values.
    </DocDefDescription>
    <DocDefTerm>`context.viewInAppUrl`</DocDefTerm>
    <DocDefDescription>
        Link to the alert source.
    </DocDefDescription>
</DocDefList>

</DocAccordion>
