---
slug: /serverless/observability/get-started-with-metrics
title: Get started with system metrics
description: Learn how to onboard your system metrics data quickly.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="onboard system metrics data" />

In this guide you'll learn how to onboard system metrics data from a machine or server,
then observe the data in Elastic Observability.

To onboard system metrics data:

1. <DocLink slug="/serverless/observability/create-an-observability-project">Create a new Observability project</DocLink>, or open an existing one.
1. In your Observability project, go to **Project Settings** → **Integrations**.
1. Type **System** in the search bar, then select the integration to see more details about it.
1. Click **Add System**.
1. Follow the in-product steps to install the System integration and deploy an PRODUCT_NAME.
The sequence of steps varies depending on whether you have already installed an integration.

    * When configuring the System integration, make sure that **Collect metrics from System instances** is turned on.
    * Expand each configuration section to verify that the settings are correct for your host.
      For example, you may want to turn on **System core metrics** to get a complete view of your infrastructure.

Notice that you can also configure the integration to collect logs.

<DocCallOut title="What if PRODUCT_NAME is already running on my host?">
    Do not try to deploy a second PRODUCT_NAME to the same system.
    You have a couple options:

    * **Use the System integration to collect system logs and metrics.** To do this,
        uninstall the standalone agent you deployed previously,
        then follow the in-product steps to install the System integration and deploy an PRODUCT_NAME.
    * **Configure your existing standalone agent to collect metrics.** To do this,
        edit the deployed PRODUCT_NAME's YAML file and add metric inputs to the configuration manually.
        Manual configuration is a time-consuming process.
        To save time, you can follow the in-product steps that describe how to deploy a standalone PRODUCT_NAME,
        and use the generated configuration as source for the input configurations that you need to add to your standalone config file.
</DocCallOut>

After the agent is installed and successfully streaming metrics data,
go to **Infrastructure** → **Inventory** or **Hosts** to see a metrics-driven view of your infrastructure.
To learn more, refer to <DocLink slug="/serverless/observability/view-infrastructure-metrics" /> or <DocLink slug="/serverless/observability/analyze-hosts" />.

## Next steps

Now that you've added metrics and explored your data,
learn how to onboard other types of data:

* <DocLink slug="/serverless/observability/get-started-with-logs" />
* <DocLink slug="/serverless/observability/stream-log-files"/>
* <DocLink slug="/serverless/observability/apm-get-started"/>
