---
title: Elastic Search
---

```{toctree}
:caption: Contents:
:hidden:

bucket-1/index.md
bucket-2/index.md
```

```{caution}
Technical Preview
```

Elastic Security combines SIEM threat detection features with endpoint
prevention and response capabilities in one solution. These analytical and
protection capabilities, leveraged by the speed and extensibility of
Elasticsearch, enable analysts to defend their organization from threats before
damage and loss occur.


Elastic Security provides the following security benefits and capabilities:

* A detection engine to identify attacks and system misconfigurations
* A workspace for event triage and investigations
* Interactive visualizations to investigate process relationships
* Inbuilt case management with automated actions
* Detection of signatureless attacks with prebuilt machine learning anomaly jobs and detection rules

## Elastic Security components and workflow

The following diagram provides a comprehensive illustration of the Elastic Security workflow.

Here's an overview of the flow and its components:

* Data is shipped from your hosts to Elastic Security in the following ways:
    * <DocLink slug="/serverless/security/install-edr">(PRODUCT_NAME)</DocLink>: PRODUCT_NAME integration that
        protects your hosts <DocLink slug="/serverless/security/detection-engine-overview" section="malware-prevention">against malware</DocLink> and ships these data sets:

        *  **Windows**: Process, network, file, DNS, registry, DLL and driver loads,
            malware security detections, API

        * **Linux/macOS**: Process, network, file
    * [Integrations](http://example.co)): Integrations are a streamlined way to ship your data. Integrations are available for popular services and platforms, like Nginx, AWS, and MongoDB, as well as many generic input types like log files.
    * [Beat modules](https://www.elastic.co/integrations?solution=security): PRODUCT_NAME
        are lightweight data shippers. Beat modules provide a way of collecting and
        parsing specific data sets from common sources, such as cloud and OS events,
        logs, and metrics. Common security-related modules are listed
        <DocLink slug="/serverless/security/ingest-data" section="enable-modules-and-configuration-options">here</DocLink>.

* The PRODUCT_NAME is used to manage the **Detection engine**,
    **Cases**, and **Timeline**, as well as administer hosts running PRODUCT_NAME:

    * Detection engine: Automatically searches for suspicious host and network
        activity via the following:

        * <DocLink slug="/serverless/security/detection-engine-overview">Detection rules</DocLink>: Periodically search the data
            PRODUCT_NAME indices) sent from your hosts for suspicious events. When a suspicious
            event is discovered, an alert is generated. External systems, such as
            Slack and email, can be used to send notifications when alerts are generated.
            You can create your own rules and make use of our <DocLink slug="/serverless/security/prebuilt-rules">prebuilt ones</DocLink>.

        * <DocLink slug="/serverless/security/rule-exceptions">Exceptions</DocLink>: Reduce noise and the number of
            false positives. Exceptions are associated with rules and prevent alerts when
            an exception's conditions are met. **Value lists** contain source event
            values that can be used as part of an exception's conditions. When
            PRODUCT_NAME is installed on your hosts, you can add malware exceptions
            directly to the endpoint from the Security app.

        * <DocLink slug="/serverless/security/machine-learning" section="prebuilt-jobs">(PRODUCT_NAME) jobs</DocLink>: Automatic anomaly detection of host and network events. Anomaly scores are provided per host and can be used with detection rules.
    * <DocLink slug="/serverless/security/timelines-ui">Timeline</DocLink>: Workspace for investigating alerts and events.
        Timelines use queries and filters to drill down into events related to
        a specific incident. Timeline templates are attached to rules and use predefined
        queries when alerts are investigated. Timelines can be saved and shared with
        others, as well as attached to Cases.

    * <DocLink slug="/serverless/security/cases-overview">Cases</DocLink>: An internal system for opening, tracking, and sharing
        security issues directly in the PRODUCT_NAME. Cases can be integrated with
        external ticketing systems.

    * <DocLink slug="/serverless/security/endpoints-page">Administration</DocLink>: View and manage hosts running PRODUCT_NAME.

<DocLink slug="/serverless/security/ingest-data">Ingest data to Elastic Security</DocLink> and <DocLink slug="/serverless/security/install-edr">Install and configure the PRODUCT_NAME integration</DocLink> describe how to ship security-related data.

### Additional PRODUCT_NAME information

The [(PRODUCT_NAME) integration](https://www.elastic.co/endpoint-security/)
for PRODUCT_NAME provides capabilities such as collecting events, detecting and preventing
malicious activity, exceptions, and artifact delivery.
[(PRODUCT_NAME)](http://example.co)/fleet-overview.html) is used to
install and manage PRODUCT_NAME and integrations on your hosts.

<div id="self-protection"></div>

### PRODUCT_NAME self-protection

For information about PRODUCT_NAME's tamper-protection features, refer to <DocLink slug="/serverless/security/endpoint-self-protection" />.

<div id="siem-integration"></div>

### Integration with other Elastic products

You can use Elastic Security with other Elastic products and features to help you
identify and investigate suspicious activity:

* [(PRODUCT_NAME)](https://www.elastic.co/products/stack/machine-learning)
* [Alerting](https://www.elastic.co/products/stack/alerting)

<div id="data-sources"></div>

### APM transaction data sources

By default, Elastic Security monitors [APM](http://example.co)/apm-getting-started.html)
`apm-*-transaction*` indices. To add additional APM indices, update the
index patterns in the `securitySolution:defaultIndex` setting in **Advanced Settings**.

<div id="ecs-compliant-reqs"></div>

### ECS compliance data requirements

The [Elastic Common Schema (ECS)](http://example.co)) defines a common set of fields to be used for
storing event data in Elasticsearch. ECS helps users normalize their event data
to better analyze, visualize, and correlate the data represented in their
events. Elastic Security supports events and indicator index data from any ECS-compliant data source.

<DocCallOut title="Important" color="warning">
Elastic Security requires [ECS-compliant data](http://example.co)). If you use third-party data collectors to ship data to PRODUCT_NAME, the data must be mapped to ECS.
<DocLink slug="/serverless/security/siem-field-reference" /> lists ECS fields used in Elastic Security.
</DocCallOut>
