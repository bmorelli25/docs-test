---
slug: /serverless/observability/new-experience-services
title: New services experience
description: Try out our new Services inventory, which enables you to monitor service logs without instrumenting all your services.
tags: [ 'serverless', 'observability', 'overview' ]
---

<DocBadge template="technical preview" />

With this technical preview,
Elastic expands the **Services** inventory to include services found in logs.
This means you can monitor the services you care about even if you only have logs
and aren't ready to instrument your services.

The new **Services** inventory shows services instrumented with APM or OpenTelemetry,
plus any services declared using `service.name` in your logs:

<DocImage url="../images/entity-centric-services-inventory.png" alt="Services inventory that shows APM data and log data"/>

For instrumented services that also have custom logs, the APM and log data are displayed in the same view.
For services that only have log data,
the log data is displayed, and you have the option of adding APM later.

<DocCallOut title="Note">
   The new **Services** inventory requires the Elastic Entity Model (EEM). To learn more, refer to <DocLink slug="/serverless/observability/elastic-entity-model" />.
</DocCallOut>

## Turn on the new experience

The new services experience is turned off by default. To turn it on:

1. In your Observability project, go to **Applications** → **Services**.
1. Click **Try out Elastic's new experience!**

If you have **Admin** privileges, the EEM will be turned on automatically.
Otherwise, you need to ask someone with **Admin** privileges to turn on this feature under **Stack Management**.

To turn off the new experience, click **Restore classic view**.
You can switch back and forth between the new and classic views whenever you want.

<DocCallOut title="Does turning on the new experience affect other users?">
   No. The settings are applied at the browser level,
   which means that other users need to turn on the new experience if they want to use it.
</DocCallOut>

## Add services to the inventory

To add services to the inventory, use one of the following approaches:

* Instrument your services with APM or OpenTelemetry.
To learn how, refer to <DocLink slug="/serverless/observability/apm-send-data-to-elastic" />.
* Declare `service.name` in your logs. To learn how, refer to <DocLink slug="/serverless/observability/add-logs-service-name" />.
