---
title: Log monitoring
---

```{toctree}
:maxdepth: 2
:caption: Contents:
:hidden:

get-started-with-logs.md
stream-log-files.md
correlate-application-logs.md
plaintext-application-logs.md
ecs-application-logs.md
send-application-logs.md
parse-log-data.md
filter-and-aggregate-logs.md
view-and-monitor-logs.md
monitor-datasets.md
add-logs-service-name.md
run-log-pattern-analysis.md
troubleshoot-logs.md
```

<p><DocBadge template="technical preview" /></p>

Elastic Observability allows you to deploy and manage logs at a petabyte scale, giving you insights into your logs in minutes. You can also search across your logs in one place, troubleshoot in real time, and detect patterns and outliers with categorization and anomaly detection. For more information, refer to the following links:

- <DocLink slug="/serverless/observability/get-started-with-logs">Get started with system logs</DocLink>: Onboard system log data from a machine or server.
- <DocLink slug="/serverless/observability/stream-log-files">Stream any log file</DocLink>: Send log files to your Observability project using a standalone PRODUCT_NAME.
- <DocLink slug="/serverless/observability/parse-log-data">Parse and route logs</DocLink>: Parse your log data and extract structured fields that you can use to analyze your data.
- <DocLink slug="/serverless/observability/filter-and-aggregate-logs" section="filter-logs">Filter and aggregate logs</DocLink>: Filter and aggregate your log data to find specific information, gain insight, and monitor your systems more efficiently.
- <DocLink slug="/serverless/observability/discover-and-explore-logs">Explore logs</DocLink>: Find information on visualizing and analyzing logs.
- <DocLink slug="/serverless/observability/run-log-pattern-analysis">Run pattern analysis on log data</DocLink>: Find patterns in unstructured log messages and make it easier to examine your data.
- <DocLink slug="/serverless/observability/troubleshoot-logs">Troubleshoot logs</DocLink>: Find solutions for errors you might encounter while onboarding your logs.

## Send logs data to your project

You can send logs data to your project in different ways depending on your needs:

- PRODUCT_NAME
- PRODUCT_NAME

When choosing between PRODUCT_NAME and PRODUCT_NAME, consider the different features and functionalities between the two options.
See [(PRODUCT_NAME) and PRODUCT_NAME capabilities](http://example.co)/beats-agent-comparison.html) for more information on which option best fits your situation.

### PRODUCT_NAME

(PRODUCT_NAME) uses [integrations](https://www.elastic.co/integrations/data-integrations) to ingest logs from Kubernetes, MySQL, and many more data sources.
You have the following options when installing and managing an PRODUCT_NAME:

#### PRODUCT_NAME-managed PRODUCT_NAME

Install an PRODUCT_NAME and use PRODUCT_NAME to define, configure, and manage your agents in a central location.

See [install PRODUCT_NAME-managed PRODUCT_NAME](http://example.co)/install-fleet-managed-elastic-agent.html).

#### Standalone PRODUCT_NAME

Install an PRODUCT_NAME and manually configure it locally on the system where it’s installed.
You are responsible for managing and upgrading the agents.

See [install standalone PRODUCT_NAME](http://example.co)/install-standalone-elastic-agent.html).

#### PRODUCT_NAME in a containerized environment

Run an PRODUCT_NAME inside of a container &mdash; either with PRODUCT_NAME or standalone.

See [install PRODUCT_NAME in containers](http://example.co)/install-elastic-agents-in-containers.html).

### PRODUCT_NAME

(PRODUCT_NAME) is a lightweight shipper for forwarding and centralizing log data.
Installed as a service on your servers, PRODUCT_NAME monitors the log files or locations that you specify, collects log events, and forwards them to your Observability project for indexing.

- [(PRODUCT_NAME) overview](http://example.co)/filebeat-overview.html): General information on PRODUCT_NAME and how it works.
- [(PRODUCT_NAME) quick start](http://example.co)/filebeat-installation-configuration.html): Basic installation instructions to get you started.
- [Set up and run PRODUCT_NAME](http://example.co)/setting-up-and-running.html): Information on how to install, set up, and run PRODUCT_NAME.

## Configure logs

The following resources provide information on configuring your logs:

- [Data streams](http://example.co)/data-streams.html): Efficiently store append-only time series data in multiple backing indices partitioned by time and size.
- [Data views](http://example.co)/data-views.html): Query log entries from the data streams of specific datasets or namespaces.
- [Index lifecycle management](http://example.co)/example-using-index-lifecycle-policy.html): Configure the built-in logs policy based on your application's performance, resilience, and retention requirements.
- [Ingest pipeline](http://example.co)/ingest.html): Parse and transform log entries into a suitable format before indexing.
- [Mapping](http://example.co)/mapping.html): Define how data is stored and indexed.

## View and monitor logs

Use **Logs Explorer** to search, filter, and tail all your logs ingested into your project in one place.

The following resources provide information on viewing and monitoring your logs:

- <DocLink slug="/serverless/observability/discover-and-explore-logs">Discover and explore</DocLink>: Discover and explore all of the log events flowing in from your servers, virtual machines, and containers in a centralized view.
- <DocLink slug="/serverless/observability/aiops-detect-anomalies">Detect log anomalies</DocLink>: Use PRODUCT_NAME to detect log anomalies automatically.

## Monitor data sets

The **Data Set Quality** page provides an overview of your data sets and their quality.
Use this information to get an idea of your overall data set quality, and find data sets that contain incorrectly parsed documents.

<DocLink id="serverlessObservabilityMonitorDatasets">Monitor data sets</DocLink>

## Application logs

Application logs provide valuable insight into events that have occurred within your services and applications.
See <DocLink slug="/serverless/observability/correlate-application-logs">Application logs</DocLink>.

<!--  ## Create a logs threshold alert

You can create a rule to send an alert when the log aggregation exceeds a threshold.
See <DocLink id="serverlessObservabilityCreateLogThresholdRule">Create a logs threshold rule</DocLink>.-->
