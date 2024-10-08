---
slug: /serverless/observability/create-error-count-threshold-alert-rule
title: Create an error count threshold rule
description: Get alerts when the number of errors in a service exceeds a defined threshold.
tags: [ 'serverless', 'observability', 'how-to', 'alerting' ]
---

<p><DocBadge template="technical preview" /></p>

import Connectors from './alerting-connectors.mdx'

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="create error count threshold rules" />

Create an error count threshold rule to alert you when the number of errors in a service exceeds a defined threshold. Threshold rules can be set at different levels: environment, service, transaction type, and/or transaction name.

![Create rule for error count threshold alert](../images/alerts-create-rule-error-count.png)

<DocCallOut title="Tip">
These steps show how to use the **Alerts** UI.
You can also create an error count threshold rule directly from any page within **Applications**. Click the **Alerts and rules** button, and select **Create error count rule**. When you create a rule this way, the **Name** and **Tags** fields will be prepopulated but you can still change these.
</DocCallOut>

To create your error count threshold rule:

1. In your Observability project, go to **Alerts**.
1. Select **Manage Rules** from the **Alerts** page, and select **Create rule**.
1. Enter a **Name** for your rule, and any optional **Tags** for more granular reporting (leave blank if unsure).
1. Select the **Error count threshold** rule type from the APM use case.
1. Select the appropriate **Service**, **Environment**, and **Error Grouping Key** (or leave **ALL** to include all options). Alternatively, you can select **Use KQL Filter** and enter a KQL expression to limit the scope of your rule.
1. Enter the error threshold in **Is Above** (defaults to 25 errors).
1. Define the period to be assessed in **For the last** (defaults to last 5 minutes).
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
    <DocDefTerm>`context.errorGroupingKey`</DocDefTerm>
    <DocDefDescription>
        The error grouping key the alert is created for.
    </DocDefDescription>
    <DocDefTerm>`context.errorGroupingName`</DocDefTerm>
    <DocDefDescription>
        The error grouping name the alert is created for.
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

<div id="create-error-count-threshold-example"></div>
## Example

The error count threshold alert triggers when the number of errors in a service exceeds a defined threshold. Because some errors are more important than others, this guide will focus a specific error group ID.

Before continuing, identify the service name, environment name, and error group ID that you’d like to create an error count threshold rule for.
<!--  The easiest way to find an error group ID is to select the service that you’re interested in and navigating to the Errors tab. // is there a Serverless equivalent?-->

This guide will create an alert for an error group ID based on the following criteria:

* Service: `{your_service.name}`
* Environment: `{your_service.environment}`
* Error Grouping Key: `{your_error.ID}`
* Error count is above 25 errors for the last five minutes
* Group alerts by `service.name` and `service.environment`
* Check every 1 minute
* Send the alert via email to the site reliability team

From any page in **Applications**, select **Alerts and rules** → **Create threshold rule** → **Error count rule**. Change the name of the alert (if you wish), but do not edit the tags.

Based on the criteria above, define the following rule details:

* **Service**: `{your_service.name}`
* **Environment**: `{your_service.environment}`
* **Error Grouping Key**: `{your_error.ID}`
* **Is above:** `25 errors`
* **For the last:** `5 minutes`
* **Group alerts by:** `service.name` `service.environment`
* **Check every:** `1 minute`

Next, select the **Email** connector and click **Create a connector**. Fill out the required details: sender, host, port, etc., and select **Save**.

A default message is provided as a starting point for your alert. You can use the Mustache template syntax (`{{variable}}`) to pass additional alert values at the time a condition is detected to an action. A list of available variables can be accessed by clicking the Add variable icon <DocIcon type="indexOpen" title="Add variable" />.

Select **Save**. The alert has been created and is now active!
