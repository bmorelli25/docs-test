---
slug: /serverless/observability/apm-get-started
title: Get started with traces and APM
description: Learn how to collect Application Performance Monitoring (APM) data and visualize it in real time.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="send APM data to Elastic" />

<div id="ingest-traces"></div>

import Go from '../transclusion/apm/guide/install-agents/go.mdx'
import Java from '../transclusion/apm/guide/install-agents/java.mdx'
import Net from '../transclusion/apm/guide/install-agents/net.mdx'
import Node from '../transclusion/apm/guide/install-agents/node.mdx'
import Php from '../transclusion/apm/guide/install-agents/php.mdx'
import Python from '../transclusion/apm/guide/install-agents/python.mdx'
import Ruby from '../transclusion/apm/guide/install-agents/ruby.mdx'
import OpenTelemetry from '../transclusion/apm/guide/open-telemetry/otel-get-started.mdx'

In this guide you'll learn how to collect and send Application Performance Monitoring (APM) data
to Elastic, then explore and visualize the data in real time.

<div id="add-apm-integration-agents"></div>

## Step 1: Add data

You'll use APM agents to send APM data from your application to Elastic. Elastic offers APM agents
written in several languages and supports OpenTelemetry. Which agent you'll use depends on the language used in your service.

To send APM data to Elastic, you must install an APM agent and configure it to send data to
your project:

1. <DocLink slug="/serverless/observability/create-an-observability-project">Create a new Observability project</DocLink>, or open an existing one.
1. To install and configure one or more APM agents, do one of following:
    * In your Observability project, go to **Add data** → **Monitor my application performance** → **Elastic APM** and follow the prompts.
    * Use the following instructions:

        <DocTabs hasBorder>
          <DocTab name="Go"><Go /></DocTab>
          <DocTab name="Java"><Java /></DocTab>
          <DocTab name=".NET"><Net /></DocTab>
          <DocTab name="Node.js"><Node /></DocTab>
          <DocTab name="PHP"><Php /></DocTab>
          <DocTab name="Python"><Python /></DocTab>
          <DocTab name="Ruby"><Ruby /></DocTab>
          <DocTab name="OpenTelemetry"><OpenTelemetry /></DocTab>
        </DocTabs>

        <br />

        While there are many configuration options, all APM agents require:

        <DocTable columns={[
          { title: 'Option', width: '25%' },
          { title: 'Description', width: '75%' }
        ]}>
          <DocRow>
            <DocCell>**Service name**</DocCell>
            <DocCell>
              The APM integration maps an instrumented service's name &mdash; defined in
              each PRODUCT_NAME's configuration &mdash; to the index where its data is stored.
              Service names are case-insensitive and must be unique.

              For example, you cannot have a service named `Foo` and another named `foo`.
              Special characters will be removed from service names and replaced with underscores (`_`).
            </DocCell>
          </DocRow>
          <DocRow>
            <DocCell>**Server URL**</DocCell>
            <DocCell>
              The host and port that the managed intake service listens for events on.

              To find the URL for your project:

              1. Go to the [Cloud console](https://cloud.elastic.co/).
              1. Next to your project, select **Manage**.
              1. Next to _Endpoints_, select **View**.
              1. Copy the _APM endpoint_.
            </DocCell>
          </DocRow>
          <DocRow>
            <DocCell>**API key**</DocCell>
            <DocCell>
              Authentication method for communication between PRODUCT_NAME and the managed intake service.

              You can create and delete API keys in Applications Settings:
              1. Go to any page in the _Applications_ section of the main menu.
              1. Click **Settings** in the top bar.
              1. Go to the **Agent keys** tab.
            </DocCell>
          </DocRow>
          <DocRow>
            <DocCell>**Environment**</DocCell>
            <DocCell>
              The name of the environment this service is deployed in, for example "production" or "staging".

              Environments allow you to easily filter data on a global level in the UI.
              It's important to be consistent when naming environments across agents.
            </DocCell>
          </DocRow>
        </DocTable>

1. If you're using the step-by-step instructions in the UI, after you've installed and configured an agent,
you can click **Check Agent Status** to verify that the agent is sending data.

To learn more about APM agents, including how to fine-tune how agents send traces to Elastic,
refer to <DocLink slug="/serverless/observability/apm-send-data-to-elastic" />.

<div id="view-apm-integration-data"></div>

## Step 2: View your data

After one or more APM agents are installed and successfully sending data, you can view
application performance monitoring data in the UI.

In the _Applications_ section of the main menu, select **Services**.
This will show a high-level overview of the health and general performance of all your services.

Learn more about visualizing APM data in <DocLink slug="/serverless/observability/apm-view-and-analyze-traces" />.

<!--  TO DO: ADD SCREENSHOT-->

<DocCallOut title="Tip">
Not seeing any data? Find helpful tips in <DocLink slug="/serverless/observability/apm-troubleshooting">Troubleshooting</DocLink>.
</DocCallOut>

## Next steps

Now that data is streaming into your project, take your investigation to a
deeper level. Learn how to use <DocLink slug="/serverless/observability/apm-view-and-analyze-traces">Elastic's built-in visualizations for APM data</DocLink>,
<DocLink slug="/serverless/observability/alerting">alert on APM data</DocLink>,
or <DocLink slug="/serverless/observability/apm-send-data-to-elastic">fine-tune how agents send traces to Elastic</DocLink>.
