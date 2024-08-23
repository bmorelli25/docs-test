---
slug: /serverless/observability/plaintext-application-logs
title: Plaintext application logs
description: Parse and ingest raw, plain-text application logs using a log shipper like Filebeat.
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

import ApplicationLogsCorrelateLogs from '../transclusion/observability/application-logs/correlate-logs.mdx'
import InstallWidget from '../transclusion/observability/tab-widgets/filebeat-install/widget.mdx'
import SetupWidget from '../transclusion/observability/tab-widgets/filebeat-setup/widget.mdx'
import StartWidget from '../transclusion/observability/tab-widgets/filebeat-start/widget.mdx'

<div id="plaintext-logs"></div>

Ingest and parse plaintext logs, including existing logs, from any programming language or framework without modifying your application or its configuration.

Plaintext logs require some additional setup that structured logs do not require:

* To search, filter, and aggregate effectively, you need to parse plaintext logs using an ingest pipeline to extract structured fields. Parsing is based on log format, so you might have to maintain different settings for different applications.
* To <DocLink slug="/serverless/observability/plaintext-application-logs" section="correlate-logs">correlate plaintext logs</DocLink>, you need to inject IDs into log messages and parse them using an ingest pipeline.

To ingest, parse, and correlate plaintext logs:

1. Ingest plaintext logs with <DocLink slug="/serverless/observability/plaintext-application-logs" section="ingest-logs-with-filebeat">(PRODUCT_NAME)</DocLink> or <DocLink slug="/serverless/observability/plaintext-application-logs" section="ingest-logs-with-agent">(PRODUCT_NAME)</DocLink> and parse them before indexing with an ingest pipeline.
1. <DocLink slug="/serverless/observability/plaintext-application-logs" section="correlate-logs">Correlate plaintext logs with an PRODUCT_NAME.</DocLink>
1. <DocLink slug="/serverless/observability/plaintext-application-logs" section="view-logs">View logs in Logs Explorer</DocLink>

## Ingest logs

Send application logs to your project using one of the following shipping tools:

* <DocLink slug="/serverless/observability/plaintext-application-logs" section="ingest-logs-with-filebeat">**(PRODUCT_NAME):**</DocLink> A lightweight data shipper that sends log data to your project.
* <DocLink slug="/serverless/observability/plaintext-application-logs" section="ingest-logs-with-agent">**(PRODUCT_NAME):**</DocLink> A single agent for logs, metrics, security data, and threat prevention. With Fleet, you can centrally manage PRODUCT_NAME policies and lifecycles directly from your project.

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
      "name": "your_api_key",
      "role_descriptors": {
        "filebeat_writer": {
          "cluster": ["manage"],
          "index": [
            {
              "names": ["filebeat-*"],
              "privileges": ["manage", "create_doc"]
            }
          ]
        }
      }
    }
    ```

    Refer to [Grant access using API keys](http://example.co)/beats-api-keys.html) for more information.

#### Step 3: Configure PRODUCT_NAME

Add the following configuration to the `filebeat.yaml` file to start collecting log data.

```yaml
filebeat.inputs:
- type: filestream  \[\^\1]
  enabled: true
  paths: /path/to/logs.log  \[\^\2]
```
\[\^\1]: Reads lines from an active log file.
\[\^\2]: Paths that you want PRODUCT_NAME to crawl and fetch logs from.

You can add additional settings to the `filebeat.yml` file to meet the needs of your specific set up. For example, the following settings would add a parser to manage messages that span multiple lines and add service fields:

```yaml
  parsers:
  - multiline:
      type: pattern
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
      negate: true
      match: after
  fields_under_root: true
  fields:
    service.name: your_service_name
    service.environment: your_service_environment
    event.dataset: your_event_dataset
```

#### Step 4: Set up and start PRODUCT_NAME

From the PRODUCT_NAME installation directory, set the [index template](http://example.co)/index-templates.html) by running the command that aligns with your system:

<SetupWidget />

from the PRODUCT_NAME installation directory, start filebeat by running the command that aligns with your system:

<StartWidget />

#### Step 5: Parse logs with an ingest pipeline

Use an ingest pipeline to parse the contents of your logs into structured, [Elastic Common Schema (ECS)](http://example.co)/ecs-reference.html)-compatible fields.

Create an ingest pipeline with a [dissect processor](http://example.co)/dissect-processor.html) to extract structured ECS fields from your log messages. In your project, go to **Developer Tools** and use a command similar to the following example:

```shell
PUT _ingest/pipeline/filebeat* \[\^\1]
{
  "description": "Extracts the timestamp log level and host ip",
  "processors": [
    {
      "dissect": { \[\^\2]
        "field": "message", \[\^\3]
        "pattern": "%{@timestamp} %{log.level} %{host.ip} %{message}" \[\^\4]
      }
    }
  ]
}
```
\[\^\1]: `_ingest/pipeline/filebeat*`: The name of the pipeline. Update the pipeline name to match the name of your data stream. For more information, refer to [Data stream naming scheme](http://example.co)/data-streams.html#data-streams-naming-scheme).
\[\^\2]: `processors.dissect`: Adds a [dissect processor](http://example.co)/dissect-processor.html) to extract structured fields from your log message.
\[\^\3]: `field`: The field you're extracting data from, `message` in this case.
\[\^\4]: `pattern`: The pattern of the elements in your log data. The pattern varies depending on your log format. `%{@timestamp}`, `%{log.level}`, `%{host.ip}`, and `%{message}` are common [ECS](http://example.co)/ecs-reference.html) fields. This pattern would match a log file in this format: `2023-11-07T09:39:01.012Z ERROR 192.168.1.110 Server hardware failure detected.`

Refer to <DocLink slug="/serverless/observability/parse-log-data" section="extract-structured-fields">Extract structured fields</DocLink> for more on using ingest pipelines to parse your log data.

After creating your pipeline, specify the pipeline for filebeat in the `filebeat.yml` file:

```yaml
output.elasticsearch:
  hosts: ["your-projects-elasticsearch-endpoint"]
  api_key: "id:api_key"
  pipeline: "your-pipeline" \[\^\1]
```
\[\^\1]: Add the pipeline output and the name of your pipeline to the output.

### Ingest logs with PRODUCT_NAME

Follow these steps to ingest and centrally manage your logs using PRODUCT_NAME and PRODUCT_NAME.

#### Step 1: Add the custom logs integration to your project

To add the custom logs integration to your project:

1. In your Observability project, go to **Project Settings** → **Integrations**.
1. Type `custom` in the search bar and select **Custom Logs**.
1. Click **Add Custom Logs**.
1. Click **Install PRODUCT_NAME** at the bottom of the page, and follow the instructions for your system to install the PRODUCT_NAME.
1. After installing the PRODUCT_NAME, configure the integration from the **Add Custom Logs integration** page.
1. Give your integration a meaningful name and description.
1. Add the **Log file path**. For example, `/var/log/your-logs.log`.
1. An agent policy is created that defines the data your PRODUCT_NAME collects. If you've previously installed an PRODUCT_NAME on the host you're collecting logs from, you can select the **Existing hosts** tab and use an existing agent policy.
1. Click **Save and continue**.

You can add additional settings to the integration under **Custom log file** by clicking **Advanced options** and adding YAML configurations to the **Custom configurations**. For example, the following settings would add a parser to manage messages that span multiple lines and add service fields. Service fields are used for <DocLink slug="/serverless/observability/correlate-application-logs" section="log-correlation">Log correlation</DocLink>.

```yaml
  parsers:
  - multiline:
      type: pattern
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
      negate: true
      match: after
  fields_under_root: true
  fields:
    service.name: your_service_name \[\^\1]
    service.version: your_service_version \[\^\1]
    service.environment: your_service_environment \[\^\1]
```
\[\^\1]: for <DocLink slug="/serverless/observability/correlate-application-logs" section="log-correlation">Log correlation</DocLink>, add the `service.name` (required), `service.version` (optional), and `service.environment` (optional) of the service you're collecting logs from.

#### Step 2: Add an ingest pipeline to your integration

To aggregate or search for information in plaintext logs, use an ingest pipeline with your integration to parse the contents of your logs into structured, [Elastic Common Schema (ECS)](http://example.co)/ecs-reference.html)-compatible fields.

1. From the custom logs integration, select **Integration policies** tab.
1. Select the integration policy you created in the previous section.
1. Click **Change defaults** → **Advanced options**.
1. Under **Ingest pipelines**, click **Add custom pipeline**.
1. Create an ingest pipeline with a [dissect processor](http://example.co)/dissect-processor.html) to extract structured fields from your log messages.

    Click **Import processors** and add a similar JSON to the following example:

    ```
    {
      "description": "Extracts the timestamp log level and host ip",
      "processors": [
        {
          "dissect": { \[\^\1]
            "field": "message", \[\^\2]
            "pattern": "%{@timestamp} %{log.level} %{host.ip} %{message}" \[\^\3]
          }
        }
      ]
    }
    ```
    \[\^\1]: `processors.dissect`: Adds a [dissect processor](http://example.co)/dissect-processor.html) to extract structured fields from your log message.
    \[\^\2]: `field`: The field you're extracting data from, `message` in this case.
    \[\^\3]: `pattern`: The pattern of the elements in your log data. The pattern varies depending on your log format. `%{@timestamp}`, `%{log.level}`, `%{host.ip}`, and `%{message}` are common [ECS](http://example.co)/ecs-reference.html) fields. This pattern would match a log file in this format: `2023-11-07T09:39:01.012Z ERROR 192.168.1.110 Server hardware failure detected.`
1. Click **Create pipeline**.
1. Save and deploy your integration.

## Correlate logs
Correlate your application logs with trace events to:

* view the context of a log and the parameters provided by a user
* view all logs belonging to a particular trace
* easily move between logs and traces when debugging application issues

Log correlation works on two levels:

- at service level: annotation with `service.name`, `service.version`, and `service.environment` allow you to link logs with APM services
- at trace level: annotation with `trace.id` and `transaction.id` allow you to link logs with traces

Learn about correlating plaintext logs in the agent-specific ingestion guides:

* [Go](http://example.co)/logs.html)
* [Java](http://example.co)/logs.html#log-correlation-ids)
* [.NET](http://example.co)/log-correlation.html)
* [Node.js](http://example.co)/log-correlation.html)
* [Python](http://example.co)/logs.html#log-correlation-ids)
* [Ruby](http://example.co)/log-correlation.html)

## View logs

To view logs ingested by PRODUCT_NAME, go to **Discover**. Create a data view based on the `filebeat-*` index pattern. Refer to [Create a data view](http://example.co)/data-views.html) for more information.

To view logs ingested by PRODUCT_NAME, go to **Discover** and select the <DocLink slug="/serverless/observability/discover-and-explore-logs">**Logs Explorer**</DocLink> tab. Refer to the <DocLink slug="/serverless/observability/filter-and-aggregate-logs">Filter and aggregate logs</DocLink> documentation for more on viewing and filtering your log data.