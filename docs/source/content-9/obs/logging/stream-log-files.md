---
slug: /serverless/observability/stream-log-files
title: Stream any log file
description: Send a log file to your Observability project using the standalone PRODUCT_NAME.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import DownloadWidget from '../transclusion/fleet/tab-widgets/download-widget.mdx'
import RunStandaloneWidget from '../transclusion/fleet/tab-widgets/run-standalone-widget.mdx'
import AgentLocationWidget from '../transclusion/observability/tab-widgets/logs/agent-location/widget.mdx'
import StopWidget from '../transclusion/fleet/tab-widgets/stop-widget.mdx'
import StartWidget from '../transclusion/fleet/tab-widgets/start-widget.mdx'
import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="onboard log data" />

This guide shows you how to send a log file to your Observability project using a standalone PRODUCT_NAME and configure the PRODUCT_NAME and your data streams using the `elastic-agent.yml` file, and query your logs using the data streams you've set up.

The quickest way to get started is to:

1. Open your Observability project. If you don't have one, <DocLink slug="/serverless/observability/create-an-observability-project" text="create an observability project"/>.
1. Go to **Add Data**.
1. Under **Collect and analyze logs**, click **Stream log files**.

This will kick off a set of guided instructions that walk you through configuring the standalone PRODUCT_NAME and sending log data to your project.

To install and configure the PRODUCT_NAME manually, refer to <DocLink slug="/serverless/observability/stream-log-files" section="manually-install-agent-logs">Manually install and configure the standalone PRODUCT_NAME</DocLink>.

## Configure inputs and integration

Enter a few configuration details in the guided instructions.

<!--  Do we want to include a screenshot or will it be too difficult to maintain?-->
![Configure inputs and integration in the Stream log files guided instructions](../images/logs-stream-logs-config.png)

**Configure inputs**

* **Log file path**: The path to your log files.
  You can also use a pattern like `/var/log/your-logs.log*`.
  Click **Add row** to add more log file paths.

  This will be passed to the `paths` field in the generated `elastic-agent.yml` file in a future step.
  <br />

* **Service name**: Provide a service name to allow for distributed services running on
  multiple hosts to correlate the related instances.

<!--  Advanced settings?-->

**Configure integration**

Elastic creates an integration to streamline connecting your log data to Elastic.

* **Integration name**: Give your integration a name.
  This is a unique identifier for your stream of log data that you can later use to filter data in Logs Explorer.
  The value must be unique within your project, all lowercase, and max 100 chars. Special characters will be replaced with `_`.

  This will be passed to the `streams.id` field in the generated `elastic-agent.yml` file in a future step.

  The integration name will be used in Logs Explorer.
  It will appear in the "All logs" dropdown menu.

  <DocImage url="../images/logs-stream-logs-service-name.png" alt="All logs dropdown menu on Logs Explorer page" size="l" />
  <br />

* **Dataset name**: Give your integration's dataset a name.
  The name for your dataset data stream. Name this data stream anything that signifies the source of the data.
  The value must be all lowercase and max 100 chars. Special characters will be replaced with `_`.

  This will be passed to the `data_stream.dataset` field in the generated `elastic-agent.yml` file in a future step.

## Install the PRODUCT_NAME

After configuring the inputs and integration, you'll continue in the guided instructions to
install and configure the standalone PRODUCT_NAME.

Run the command under **Install the PRODUCT_NAME** that corresponds with your system to download, extract, and install the PRODUCT_NAME.
Turning on **Automatically download the agent's config** includes your updated PRODUCT_NAME configuration file in the download.

If you do not want to automatically download the configuration, click **Download config file** to download it manually and
add it to `/opt/Elastic/Agent/elastic-agent.yml` on the host where you installed the PRODUCT_NAME.
The values you provided in <DocLink slug="/serverless/observability/stream-log-files" section="configure-inputs-and-integration">Configure inputs and integration</DocLink> will be prepopulated in the generated configuration file.

<div id="manually-install-agent-logs"></div>

## Manually install and configure the standalone PRODUCT_NAME

If you're not using the guided instructions, follow these steps to manually install and configure your the PRODUCT_NAME.

### Step 1: Download and extract the PRODUCT_NAME installation package

On your host, download and extract the installation package that corresponds with your system:

<DownloadWidget />

### Step 2: Install and start the PRODUCT_NAME
After downloading and extracting the installation package, you're ready to install the PRODUCT_NAME.
From the agent directory, run the install command that corresponds with your system:

<DocCallOut title="Note">
On macOS, Linux (tar package), and Windows, run the `install` command to
install and start PRODUCT_NAME as a managed service and start the service. The DEB and RPM
packages include a service unit for Linux systems with
systemd, For these systems, you must enable and start the service.
</DocCallOut>

<RunStandaloneWidget />

<br />

During installation, you'll be prompted with some questions:

1. When asked if you want to install the agent as a service, enter `Y`.
1. When asked if you want to enroll the agent in Fleet, enter `n`.

### Step 3: Configure the PRODUCT_NAME

After your agent is installed, configure it by updating the `elastic-agent.yml` file.

#### Locate your configuration file

You'll find the `elastic-agent.yml` in one of the following locations according to your system:

<AgentLocationWidget />

#### Update your configuration file

Update the default configuration in the `elastic-agent.yml` file manually.
It should look something like this:

```yaml
outputs:
  default:
    type: elasticsearch
    hosts: '<your-elasticsearch-endpoint>:<port>'
    api_key: 'your-api-key'
inputs:
  - id: your-log-id
    type: filestream
    streams:
      - id: your-log-stream-id
        data_stream:
          dataset: example
        paths:
          - /var/log/your-logs.log
```

You need to set the values for the following fields:

<DocTable columns={[
  { title: "Field", width: "25%" },
  { title: "Value", width: "75%" }
]}>
  <DocRow>
    <DocCell>`hosts`</DocCell>
    <DocCell>
      Copy the PRODUCT_NAME endpoint from your project's page and add the port (the default port is `443`). For example, `https://my-deployment.es.us-central1.gcp.cloud.es.io:443`.

      If you're following the guided instructions in your project,
      the PRODUCT_NAME endpoint will be prepopulated in the configuration file.

      <DocCallOut title="Tip">
      If you need to find your project's PRODUCT_NAME endpoint outside the guided instructions:

      1. Go to the **Projects** page that lists all your projects.
      1. Click **Manage** next to the project you want to connect to.
      1. Click **View** next to _Endpoints_.
      1. Copy the _Elasticsearch endpoint_.

      <br />

      ![Copy a project's Elasticsearch endpoint](../images/log-copy-es-endpoint.png)
      </DocCallOut>
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`api-key`</DocCell>
    <DocCell>
      Use an API key to grant the agent access to your project.
      The API key format should be `<id>:<key>`.

      If you're following the guided instructions in your project, an API key will be autogenerated
      and will be prepopulated in the downloadable configuration file.

      <div id="api-key-beats"></div>

      If configuring the PRODUCT_NAME manually, create an API key:

      1. Navigate to **Project settings** → **Management** → **API keys** and click **Create API key**.
      1. Select **Restrict privileges** and add the following JSON to give privileges for ingesting logs.
          ```
          {
            "standalone_agent": {
              "cluster": [
                "monitor"
              ],
              "indices": [
                {
                  "names": [
                    "logs-*-*"
                  ],
                  "privileges": [
                    "auto_configure", "create_doc"
                  ]
                }
              ]
            }
          }
          ```
      1. You _must_ set the API key to configure PRODUCT_NAME.
      Immediately after the API key is generated and while it is still being displayed, click the
      **Encoded** button next to the API key and select **Beats** from the list in the tooltip.
      Base64 encoded API keys are not currently supported in this configuration.

          ![](../images/logs-stream-logs-api-key-beats.png)
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`inputs.id`</DocCell>
    <DocCell>
      A unique identifier for your input.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`type`</DocCell>
    <DocCell>
      The type of input. For collecting logs, set this to `filestream`.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`streams.id`</DocCell>
    <DocCell>
      A unique identifier for your stream of log data.

      If you're following the guided instructions in your project, this will be prepopulated with
      the value you specified in <DocLink slug="/serverless/observability/stream-log-files" section="configure-inputs-and-integration">Configure inputs and integration</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`data_stream.dataset`</DocCell>
    <DocCell>
      The name for your dataset data stream. Name this data stream anything that signifies the source of the data. In this configuration, the dataset is set to `example`. The default value is `generic`.

      If you're following the guided instructions in your project, this will be prepopulated with
      the value you specified in <DocLink slug="/serverless/observability/stream-log-files" section="configure-inputs-and-integration">Configure inputs and integration</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`paths`</DocCell>
    <DocCell>
      The path to your log files. You can also use a pattern like `/var/log/your-logs.log*`.

      If you're following the guided instructions in your project, this will be prepopulated with
      the value you specified in <DocLink slug="/serverless/observability/stream-log-files" section="configure-inputs-and-integration">Configure inputs and integration</DocLink>.
    </DocCell>
  </DocRow>
</DocTable>

#### Restart the PRODUCT_NAME

After updating your configuration file, you need to restart the PRODUCT_NAME.

First, stop the PRODUCT_NAME and its related executables using the command that works with your system:

<StopWidget />

<br />

Next, restart the PRODUCT_NAME using the command that works with your system:

<StartWidget />

## Troubleshoot your PRODUCT_NAME configuration

If you're not seeing your log files in your project, verify the following in the `elastic-agent.yml` file:

- The path to your logs file under `paths` is correct.
- Your API key is in `<id>:<key>` format. If not, your API key may be in an unsupported format, and you'll need to create an API key in **Beats** format.

If you're still running into issues, refer to [(PRODUCT_NAME) troubleshooting](http://example.co)/fleet-troubleshooting.html) and [Configure standalone Elastic Agents](http://example.co)/elastic-agent-configuration.html).

## Next steps

After you have your agent configured and are streaming log data to your project:

- Refer to the <DocLink slug="/serverless/observability/parse-log-data">Parse and organize logs</DocLink> documentation for information on extracting structured fields from your log data, rerouting your logs to different data streams, and filtering and aggregating your log data.
- Refer to the <DocLink slug="/serverless/observability/filter-and-aggregate-logs">Filter and aggregate logs</DocLink> documentation for information on filtering and aggregating your log data to find specific information, gain insight, and monitor your systems more efficiently.
