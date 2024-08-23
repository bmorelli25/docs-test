---
slug: /serverless/observability/ecs-application-logs
title: ECS formatted application logs
description: Use an ECS logger or an PRODUCT_NAME to format your logs in ECS format.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import InstallWidget from '../transclusion/observability/tab-widgets/filebeat-install/widget.mdx'
import SetupWidget from '../transclusion/observability/tab-widgets/filebeat-setup/widget.mdx'
import StartWidget from '../transclusion/observability/tab-widgets/filebeat-start/widget.mdx'
import ConfigureFilebeat from '../transclusion/observability/tab-widgets/filebeat-logs/widget.mdx'

<div id="ecs-logging-logs"></div>

Logs formatted in Elastic Common Schema (ECS) don't require manual parsing, and the configuration can be reused across applications. ECS-formatted logs, when paired with an PRODUCT_NAME, allow you to correlate logs to easily view logs that belong to a particular trace.

You can format your logs in ECS format the following ways:
* <DocLink slug="/serverless/observability/ecs-application-logs" section="ecs-loggers">**ECS loggers:**</DocLink> plugins for your logging libraries that reformat your logs into ECS format.
* <DocLink slug="/serverless/observability/ecs-application-logs" section="apm-agent-ecs-reformatting">**(PRODUCT_NAME) ECS reformatting:**</DocLink> Java, Ruby, and Python PRODUCT_NAMEs automatically reformat application logs to ECS format without a logger.

## ECS loggers

ECS loggers reformat your application logs into ECS-compatible JSON, removing the need for manual parsing.
ECS loggers require PRODUCT_NAME or PRODUCT_NAME configured to monitor and capture application logs.
In addition, pairing ECS loggers with your framework's PRODUCT_NAME allows you to correlate logs to easily view logs that belong to a particular trace.

### Get started

For more information on adding an ECS logger to your application, refer to the guide for your framework:

* [.NET](http://example.co)/setup.html)
* Go: [zap](http://example.co)/setup.html), [logrus](http://example.co)/setup.html)
* [Java](http://example.co)/setup.html)
* Node.js: [morgan](http://example.co)/morgan.html), [pino](http://example.co)/pino.html), [winston](http://example.co)/winston.html)
* [PHP](http://example.co)/setup.html)
* [Python](http://example.co)/installation.html)
* [Ruby](http://example.co)/setup.html)

<div id="reformatting-logs"></div>

## APM agent ECS reformatting

Java, Ruby, and Python PRODUCT_NAMEs can automatically reformat application logs to ECS format without an ECS logger or the need to modify your application. The PRODUCT_NAME also allows for log correlation so you can easily view logs that belong to a particular trace.

To set up log ECS reformatting:

1. <DocLink slug="/serverless/observability/ecs-application-logs" section="enable-log-ecs-reformatting">Enable PRODUCT_NAME reformatting</DocLink>
1. <DocLink slug="/serverless/observability/ecs-application-logs" section="ingest-logs">Ingest logs with PRODUCT_NAME or PRODUCT_NAME.</DocLink>
1. <DocLink slug="/serverless/observability/ecs-application-logs" section="view-logs">View logs in Logs Explorer</DocLink>

### Enable log ECS reformatting

Log ECS reformatting is controlled by the `log_ecs_reformatting` configuration option, and is disabled by default. Refer to the guide for your framework for information on enabling:

* [Java](http://example.co)/config-logging.html#config-log-ecs-reformatting)
* [Ruby](http://example.co)/configuration.html#config-log-ecs-formatting)
* [Python](http://example.co)/configuration.html#config-log_ecs_reformatting)

### Ingest logs

After enabling log ECS reformatting, send your application logs to your project using one of the following shipping tools:

* <DocLink slug="/serverless/observability/ecs-application-logs" section="ingest-logs-with-filebeat">**(PRODUCT_NAME):**</DocLink> A lightweight data shipper that sends log data to your project.
* <DocLink slug="/serverless/observability/ecs-application-logs" section="ingest-logs-with-agent">**(PRODUCT_NAME):**</DocLink> A single agent for logs, metrics, security data, and threat prevention. With Fleet, you can centrally manage PRODUCT_NAME policies and lifecycles directly from your project.

### Ingest logs with PRODUCT_NAME

<DocCallOut title="Important">
Use PRODUCT_NAME version 8.11+ for the best experience when ingesting logs with PRODUCT_NAME.
</DocCallOut>

Follow these steps to ingest application logs with PRODUCT_NAME.

#### Step 1: Install PRODUCT_NAME

Install PRODUCT_NAME on the server you want to monitor by running the commands that align with your system:

<InstallWidget />

#### Step 2: Connect to your project

Connect to your project using an API key to set up PRODUCT_NAME. Set the following information in the `filebeat.yml` file:

```yaml
output.elasticsearch:
  hosts: ["your-projects-elasticsearch-endpoint"]
  api_key: "id:api_key"
```

1. Set the `hosts` to your project's PRODUCT_NAME endpoint. Locate your project's endpoint by clicking the help icon (<DocIcon type="help" title="Help icon" />) and selecting **Endpoints**. Add the **(PRODUCT_NAME) endpoint** to your configuration.
1. From **Developer tools**, run the following command to create an API key that grants `manage` permissions for the `cluster` and the `filebeat-*` indices using:

    ```shell
    POST /_security/api_key
    {
      "name": "filebeat_host001",
      "role_descriptors": {
        "filebeat_writer": {
          "cluster": ["manage"],
          "index": [
            {
              "names": ["filebeat-*"],
              "privileges": ["manage"]
            }
          ]
        }
      }
    }
    ```

    Refer to [Grant access using API keys](http://example.co)/beats-api-keys.html) for more information.

#### Step 3: Configure PRODUCT_NAME

Add the following configuration to your `filebeat.yaml` file to start collecting log data.

<ConfigureFilebeat
  plaintext={false}
  ecs_logs={true}
  intro_text={false}
/>

#### Step 4: Set up and start PRODUCT_NAME

From the PRODUCT_NAME installation directory, set the [index template](http://example.co)/index-templates.html) by running the command that aligns with your system:

<SetupWidget />

From the PRODUCT_NAME installation directory, start filebeat by running the command that aligns with your system:

<StartWidget />

### Ingest logs with PRODUCT_NAME

Add the custom logs integration to ingest and centrally manage your logs using PRODUCT_NAME and PRODUCT_NAME:

#### Step 1: Add the custom logs integration to your project

To add the custom logs integration to your project:

1. In your Observability project, go to **Project Settings** → **Integrations**.
1. Type `custom` in the search bar and select **Custom Logs**.
1. Click **Install PRODUCT_NAME** at the bottom of the page, and follow the instructions for your system to install the PRODUCT_NAME. If you've already installed an PRODUCT_NAME, you'll be taken directly to configuring your integration.
1. After installing the PRODUCT_NAME, click **Save and continue** to configure the integration from the **Add Custom Logs integration** page.
1. Give your integration a meaningful name and description.
1. Add the **Log file path**. For example, `/var/log/your-logs.log`.
1. Under **Custom log file**, click **Advanced options**.
    <DocImage size="2" url="../images/custom-logs-advanced-options.png" alt="Screenshot of advanced options location" />
1. In the **Processors** text box, add the following YAML configuration to add processors that enhance your data. See [processors](http://example.co)/filtering-and-enhancing-data.html) to learn more.

    ```yaml
    processors:
      - add_host_metadata: ~
      - add_cloud_metadata: ~
      - add_docker_metadata: ~
      - add_kubernetes_metadata: ~
    ```
1. Under **Custom configurations**, add the following YAML configuration to collect data.

    ```yaml
    json:
      overwrite_keys: true \[\^\1]
      add_error_key: true \[\^\2]
      expand_keys: true \[\^\3]
      keys_under_root: true \[\^\4]
    fields_under_root: true \[\^\5]
    fields:
      service.name: your_service_name \[\^\6]
      service.version: your_service_version \[\^\6]
      service.environment: your_service_environment \[\^\6]
    ```
    \[\^\1]: Values from the decoded JSON object overwrite the fields that PRODUCT_NAME normally adds (type, source, offset, etc.) in case of conflicts.
    \[\^\2]: PRODUCT_NAME adds an "error.message" and "error.type: json" key in case of JSON unmarshalling errors.
    \[\^\3]: PRODUCT_NAME will recursively de-dot keys in the decoded JSON, and expand them into a hierarchical object structure.
    \[\^\4]: By default, the decoded JSON is placed under a "json" key in the output document. When set to `true`, the keys are copied top level in the output document.
    \[\^\5]: When set to `true`, custom fields are stored as top-level fields in the output document instead of being grouped under a fields sub-dictionary.
    \[\^\6]: The `service.name` (required), `service.version` (optional), and `service.environment` (optional) of the service you're collecting logs from, used for <DocLink slug="/serverless/observability/correlate-application-logs" section="log-correlation">Log correlation</DocLink>.
1. An agent policy is created that defines the data your PRODUCT_NAME collects. If you've previously installed an PRODUCT_NAME on the host you're collecting logs from, you can select the **Existing hosts** tab and use an existing agent policy.
1. Click **Save and continue**.

## View logs

Use <DocLink slug="/serverless/observability/discover-and-explore-logs">Logs Explorer</DocLink> to search, filter, and visualize your logs. Refer to the <DocLink slug="/serverless/observability/filter-and-aggregate-logs">filter and aggregate logs</DocLink> documentation for more information.