---
slug: /serverless/observability/aiops-tune-anomaly-detection-job
title: Tune your anomaly detection job
description: Tune your job by creating calendars, adding job rules, and defining custom URLs.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="create calendars, add job rules, and define custom URLs" />

After you run an anomaly detection job and view the results,
you might find that you need to alter the job configuration or settings.

To further tune your job, you can:

* <DocLink slug="/serverless/observability/aiops-tune-anomaly-detection-job" section="create-calendars" text="Create calendars" /> that contain a list of scheduled events for which you do not want to generate anomalies, such as planned system outages or public holidays.
* <DocLink slug="/serverless/observability/aiops-tune-anomaly-detection-job" section="create-job-rules" text="Create job rules" /> that instruct anomaly detectors to change their behavior based on domain-specific knowledge that you provide.
Your job rules can use filter lists, which contain values that you can use to include or exclude events from the PRODUCT_NAME analysis.
* <DocLink slug="/serverless/observability/aiops-tune-anomaly-detection-job" section="define-custom-urls" text="Define custom URLs"/> to make dashboards and other resources readily available when viewing job results.

For more information about tuning your job,
refer to the how-to guides in the [(PRODUCT_NAME)](http://example.co)/anomaly-how-tos.html) documentation.
Note that the PRODUCT_NAME documentation may contain details that are not valid when using a fully-managed Elastic project.

<DocCallOut title="Tip">
    You can also create calendars and add URLs when configuring settings during job creation,
    but generally it's easier to start with a simple job and add complexity later.
</DocCallOut>

<div id="create-calendars"></div>

## Create calendars

Sometimes there are periods when you expect unusual activity to take place,
such as bank holidays, "Black Friday", or planned system outages.
If you identify these events in advance, no anomalies are generated during that period.
The PRODUCT_NAME model is not ill-affected, and you do not receive spurious results.

To create a calendar and add scheduled events:

1. In your Observability project, go to **AIOps** → **Anomaly detection**.
1. Click **Settings**.
1. Under **Calendars**, click **Create**.
1. Enter an ID and description for the calendar.
1. Select the jobs you want to apply the calendar to, or turn on **Apply calendar to all jobs**.
1. Under **Events**, click **New event** or click **Import events** to import events from an iCalendar (ICS) file:

    ![Create new calendar page](../images/anomaly-detection-create-calendar.png)

    A scheduled event must have a start time, end time, and calendar ID.
    In general, scheduled events are short in duration (typically lasting from a few hours to a day) and occur infrequently.
    If you have regularly occurring events, such as weekly maintenance periods,
    you do not need to create scheduled events for these circumstances;
    they are already handled by the PRODUCT_NAME analytics.
    If your ICS file contains recurring events, only the first occurrence is imported.

1. When you're done adding events, save your calendar.

You must identify scheduled events *before* your anomaly detection job analyzes the data for that time period.
(PRODUCT_NAME) results are not updated retroactively.
Bucket results are generated during scheduled events, but they have an anomaly score of zero.

<DocCallOut title="Tip">
    If you use long or frequent scheduled events,
    it might take longer for the PRODUCT_NAME analytics to learn to model your data,
    and some anomalous behavior might be missed.
</DocCallOut>

<div id="create-job-rules"></div>

## Create job rules and filters

By default, anomaly detection is unsupervised,
and the PRODUCT_NAME models have no awareness of the domain of your data.
As a result, anomaly detection jobs might identify events that are statistically significant but are uninteresting when you know the larger context.

You can customize anomaly detection by creating custom job rules.
*Job rules* instruct anomaly detectors to change their behavior based on domain-specific knowledge that you provide.
When you create a rule, you can specify conditions, scope, and actions.
When the conditions of a rule are satisfied, its actions are triggered.

<DocCallOut title="Example use case for creating a job rule">
If you have an anomaly detector that is analyzing CPU usage,
you might decide you are only interested in anomalies where the CPU usage is greater than a certain threshold.
You can define a rule with conditions and actions that instruct the detector to refrain from generating PRODUCT_NAME results when there are anomalous events related to low CPU usage.
You might also decide to add a scope for the rule so that it applies only to certain machines.
The scope is defined by using PRODUCT_NAME filters.
</DocCallOut>

*Filters* contain a list of values that you can use to include or exclude events from the PRODUCT_NAME analysis.
You can use the same filter in multiple anomaly detection jobs.

<DocCallOut title="Example use case for creating a filter list">
If you are analyzing web traffic, you might create a filter that contains a list of IP addresses.
The list could contain IP addresses that you trust to upload data to your website or to send large amounts of data from behind your firewall.
You can define the rule's scope so that the action triggers only when a specific field in your data matches (or doesn't match) a value in the filter.
This gives you much greater control over which anomalous events affect the PRODUCT_NAME model and appear in the PRODUCT_NAME results.
</DocCallOut>

To create a job rule, first create any filter lists you want to use in the rule, then configure the rule:

1. In your Observability project, go to **AIOps** → **Anomaly detection**.
1. (Optional) Create one or more filter lists:
    1. Click **Settings**.
    1. Under **Filter lists**, click **Create**.
    1. Enter the filter list ID. This is the ID you will select when you want to use the filter list in a job rule.
    1. Click **Add item** and enter one item per line.
    1. Click **Add** then save the filter list:

        ![Create filter list](../images/anomaly-detection-create-filter-list.png)

1. Open the job results in the **Single Metric Viewer** or **Anomaly Explorer**.
1. From the **Actions** menu in the **Anomalies** table, select **Configure job rules**.

        ![Configure job rules menu selection](../images/anomaly-detection-configure-job-rules.png)

1. Choose which actions to take when the job rule matches the anomaly: **Skip result**, **Skip model update**, or both.
1. Under **Conditions**, add one or more conditions that must be met for the action to be triggered.
1. Under **Scope** (if available), add one or more filter lists to limit where the job rule applies.
1. Save the job rule.
Note that changes to job rules take effect for new results only.
To apply these changes to existing results, you must clone and rerun the job.

<div id="define-custom-urls"></div>

## Define custom URLs

You can optionally attach one or more custom URLs to your anomaly detection jobs.
Links for these URLs will appear in the **Actions** menu of the anomalies table when viewing job results in the **Single Metric Viewer** or **Anomaly Explorer**.
Custom URLs can point to dashboards, the Discover app, or external websites.
For example, you can define a custom URL that enables users to drill down to the source data from the results set.

To add a custom URL to the **Actions** menu:

1. In your Observability project, go to **AIOps** → **Anomaly detection**.
1. From the **Actions** menu in the job list, select **Edit job**.
1. Select the **Custom URLs** tab, then click **Add custom URL**.
1. Enter the label to use for the link text.
1. Choose the type of resource you want to link to:
    <DocTable columns={[{ title: "If you select..." }, { title:  "Do this..." }]}>
        <DocRow>
            <DocCell>(PRODUCT_NAME) dashboard</DocCell>
            <DocCell>Select the dashboard you want to link to.</DocCell>
        </DocRow>
        <DocRow>
            <DocCell>Discover</DocCell>
            <DocCell>Select the data view to use.</DocCell>
        </DocRow>
        <DocRow>
            <DocCell>Other</DocCell>
            <DocCell>Specify the URL for the external website.</DocCell>
        </DocRow>
    </DocTable>
1. Click **Test** to test your link.
1. Click **Add**, then save your changes.

Now when you view job results in **Single Metric Viewer** or **Anomaly Explorer**,
the **Actions** menu includes the custom link:

        ![Create filter list](../images/anomaly-detection-custom-url.png)

<DocCallOut title="Tip">
It is also possible to use string substitution in custom URLs.
For example, you might have a **Raw data** URL defined as:

`discover#/?_g=(time:(from:'$earliest$',mode:absolute,to:'$latest$'))&_a=(index:ff959d40-b880-11e8-a6d9-e546fe2bba5f,query:(language:kuery,query:'customer_full_name.keyword:"$customer_full_name.keyword$"'))`.

The value of the `customer_full_name.keyword` field is passed to the target page when the link is clicked.

For more information about using string substitution,
refer to the [(PRODUCT_NAME)](http://example.co)/ml-configuring-url.html#ml-configuring-url-strings) documentation.
Note that the PRODUCT_NAME documentation may contain details that are not valid when using a fully-managed Elastic project.

</DocCallOut>
