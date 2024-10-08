---
slug: /serverless/observability/create-latency-threshold-alert-rule
title: Create a latency threshold rule
description: Get alerts when the latency of a specific transaction type in a service exceeds a defined threshold.
tags: [ 'serverless', 'observability', 'how-to', 'alerting' ]
---

<p><DocBadge template="technical preview" /></p>

import Connectors from './alerting-connectors.mdx'

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="create latency threshold rules" />

You can create a latency threshold rule to alert you when the latency of a specific transaction type in a service exceeds a defined threshold. Threshold rules can be set at different levels: environment, service, transaction type, and/or transaction name. Add actions to raise alerts via services or third-party integrations e.g. mail, Slack, Jira.

![Create rule for APM latency threshold alert](../images/alerts-create-rule-apm-latency-threshold.png)

<DocCallOut title="Tip">
These steps show how to use the **Alerts** UI.
You can also create a latency threshold rule directly from any page within **Applications**. Click the **Alerts and rules** button, and select **Create threshold rule** and then **Latency**. When you create a rule this way, the **Name** and **Tags** fields will be prepopulated but you can still change these.
</DocCallOut>

To create your latency threshold rule::

1. In your Observability project, go to **Alerts**.
1. Select **Manage Rules** from the **Alerts** page, and select **Create rule**.
1. Enter a **Name** for your rule, and any optional **Tags** for more granular reporting (leave blank if unsure).
1. Select the **Latency threshold** rule type from the APM use case.
1. Select the appropriate **Service**, **Type**, **Environment** and **Name** (or leave **ALL** to include all options). Alternatively, you can select **Use KQL Filter** and enter a KQL expression to limit the scope of your rule.
1. Define the threshold and period:
    * **When**: Choose between `Average`, `95th percentile`, or `99th percentile`.
    * **Is Above**: Enter a time in milliseconds (defaults to 1500ms).
    * **For the last**: Define the period to be assessed in (defaults to last 5 minutes).
1. Choose how to **Group alerts by**. Every unique value will create an alert.
1. Define the interval to check the rule (for example, check every 1 minute).
1. (Optional) Set up **Actions**.
1. **Save** your rule.

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
After you select a connector, you must set the action frequency. You can choose to create a **Summary of alerts** on each check interval or on a custom interval. For example, you can send email notifications that summarize the new, ongoing, and recovered alerts every twelve hours.

Alternatively, you can set the action frequency to **For each alert** and specify the conditions each alert must meet for the action to run. For example, you can send an email only when the alert status changes to critical.

![Configure when a rule is triggered](../images/alert-action-frequency.png)

With the **Run when** menu you can choose if an action runs when the threshold for an alert is reached, or when the alert is recovered. For example, you can add a corresponding action for each state to ensure you are alerted when the rule is triggered and also when it recovers.

![Choose between threshold met or recovered](../images/alert-apm-action-frequency-recovered.png)

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
    <DocDefTerm>`context.environment`</DocDefTerm>
    <DocDefDescription>
        The transaction type the alert is created for.
    </DocDefDescription>
    <DocDefTerm>`context.interval`</DocDefTerm>
    <DocDefDescription>
        The length and unit of time period where the alert conditions were met.
    </DocDefDescription>
    <DocDefTerm>`context.reason`</DocDefTerm>
    <DocDefDescription>
        A concise description of the reason for the alert.
    </DocDefDescription>
    <DocDefTerm>`context.serviceName`</DocDefTerm>
    <DocDefDescription>
        The service the alert is created for.
    </DocDefDescription>
    <DocDefTerm>`context.threshold`</DocDefTerm>
    <DocDefDescription>
        Any trigger value above this value will cause the alert to fire.
    </DocDefDescription>
    <DocDefTerm>`context.transactionName`</DocDefTerm>
    <DocDefDescription>
        The transaction name the alert is created for.
    </DocDefDescription>
    <DocDefTerm>`context.transactionType`</DocDefTerm>
    <DocDefDescription>
        The transaction type the alert is created for.
    </DocDefDescription>
    <DocDefTerm>`context.triggerValue`</DocDefTerm>
    <DocDefDescription>
        The value that breached the threshold and triggered the alert.
    </DocDefDescription>
    <DocDefTerm>`context.viewInAppUrl`</DocDefTerm>
    <DocDefDescription>
        Link to the alert source.
    </DocDefDescription>
</DocDefList>

</DocAccordion>

<div id="create-failed-transaction-rate-threshold-example"></div>
## Example

The latency threshold alert triggers when the latency of a specific transaction type in a service exceeds a defined threshold.

Before continuing, identify the service name, environment name, and transaction type that you’d like to create a latency threshold rule for.

This guide will create an alert for an error group ID based on the following criteria:

* Service: `{your_service.name}`
* Transaction: `{your_transaction.name}`
* Environment: `{your_service.environment}`
* Average latency is above 1500ms for last 5 minutes
* Group alerts by `service.name` and `service.environment`
* Check every 1 minute
* Send the alert via email to the site reliability team

From any page in **Applications**, select **Alerts and rules** → **Create threshold rule** → **Latency threshold**. Change the name of the alert (if you wish), but do not edit the tags.

Based on the criteria above, define the following rule details:

* **Service**: `{your_service.name}`
* **Type**: `{your_transaction.name}`
* **Environment**: `{your_service.environment}`
* **When:** `Average`
* **Is above:** `1500ms`
* **For the last:** `5 minutes`
* **Group alerts by:** `service.name` `service.environment`
* **Check every:** `1 minute`

Next, select the **Email** connector and click **Create a connector**. Fill out the required details: sender, host, port, etc., and select **Save**.

A default message is provided as a starting point for your alert. You can use the Mustache template syntax (`{{variable}}`) to pass additional alert values at the time a condition is detected to an action. A list of available variables can be accessed by selecting the add variable button.

Select **Save**. The alert has been created and is now active!
