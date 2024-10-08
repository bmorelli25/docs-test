---
slug: /serverless/observability/correlate-application-logs
title: Stream application logs
description: Learn about application logs and options for ingesting them.
tags: [ 'serverless', 'observability', 'overview' ]
---

<p><DocBadge template="technical preview" /></p>

import CorrelateLogs from '../transclusion/observability/application-logs/correlate-logs.mdx'

Application logs provide valuable insight into events that have occurred within your services and applications.

The format of your logs (structured or plaintext) influences your log ingestion strategy.

## Plaintext logs vs. structured Elastic Common Schema (ECS) logs

Logs are typically produced as either plaintext or structured.
Plaintext logs contain only text and have no special formatting, for example:

```
2019-08-06T12:09:12.375Z INFO:spring-petclinic: Tomcat started on port(s): 8080 (http) with context path, org.springframework.boot.web.embedded.tomcat.TomcatWebServer
2019-08-06T12:09:12.379Z INFO:spring-petclinic: Started PetClinicApplication in 7.095 seconds (JVM running for 9.082), org.springframework.samples.petclinic.PetClinicApplication
2019-08-06T14:08:40.199Z DEBUG:spring-petclinic: init find form, org.springframework.samples.petclinic.owner.OwnerController
```

Structured logs follow a predefined, repeatable pattern or structure.
This structure is applied at write time &mdash; preventing the need for parsing at ingest time.
The Elastic Common Schema (ECS) defines a common set of fields to use when structuring logs.
This structure allows logs to be easily ingested,
and provides the ability to correlate, search, and aggregate on individual fields within your logs.

For example, the previous example logs might look like this when structured with ECS-compatible JSON:

```
{"@timestamp":"2019-08-06T12:09:12.375Z", "log.level": "INFO", "message":"Tomcat started on port(s): 8080 (http) with context path ''", "service.name":"spring-petclinic","process.thread.name":"restartedMain","log.logger":"org.springframework.boot.web.embedded.tomcat.TomcatWebServer"}
{"@timestamp":"2019-08-06T12:09:12.379Z", "log.level": "INFO", "message":"Started PetClinicApplication in 7.095 seconds (JVM running for 9.082)", "service.name":"spring-petclinic","process.thread.name":"restartedMain","log.logger":"org.springframework.samples.petclinic.PetClinicApplication"}
{"@timestamp":"2019-08-06T14:08:40.199Z", "log.level":"DEBUG", "message":"init find form", "service.name":"spring-petclinic","process.thread.name":"http-nio-8080-exec-8","log.logger":"org.springframework.samples.petclinic.owner.OwnerController","transaction.id":"28b7fb8d5aba51f1","trace.id":"2869b25b5469590610fea49ac04af7da"}
```

## Ingesting logs

There are several ways to ingest application logs into your project.
Your specific situation helps determine the method that's right for you.

### Plaintext logs

With PRODUCT_NAME or PRODUCT_NAME, you can ingest plaintext logs, including existing logs, from any programming language or framework without modifying your application or its configuration.

For plaintext logs to be useful, you need to use PRODUCT_NAME or PRODUCT_NAME to parse the log data.

**<DocIcon type="documentation" title="documentation icon" /> Learn more in <DocLink slug="/serverless/observability/plaintext-application-logs">Plaintext logs</DocLink>**

### ECS formatted logs

Logs formatted in ECS don't require manual parsing and the configuration can be reused across applications. They also include log correlation. You can format your logs in ECS by using ECS logging plugins or PRODUCT_NAME ECS reformatting.

#### ECS logging plugins

Add ECS logging plugins to your logging libraries to format your logs into ECS-compatible JSON that doesn't require parsing.

To use ECS logging, you need to modify your application and its log configuration.

**<DocIcon type="documentation" title="documentation icon" /> Learn more in <DocLink slug="/serverless/observability/ecs-application-logs">ECS formatted logs</DocLink>**

#### PRODUCT_NAME log reformatting

Some Elastic PRODUCT_NAMEs can automatically reformat application logs to ECS format
without adding an ECS logger dependency or modifying the application.

This feature is supported for the following PRODUCT_NAMEs:

* [Ruby](http://example.co)/log-reformat.html)
* [Python](http://example.co)/logs.html#log-reformatting)
* [Java](http://example.co)/logs.html#log-reformatting)

**<DocIcon type="documentation" title="documentation icon" /> Learn more in <DocLink slug="/serverless/observability/ecs-application-logs">ECS formatted logs</DocLink>**

### PRODUCT_NAME log sending

Automatically capture and send logs directly to the managed intake service using the PRODUCT_NAME without using PRODUCT_NAME or PRODUCT_NAME.

Log sending is supported in the Java PRODUCT_NAME.

**<DocIcon type="documentation" title="documentation icon" /> Learn more in <DocLink slug="/serverless/observability/send-application-logs">(PRODUCT_NAME) log sending</DocLink>**

## Log correlation

<CorrelateLogs />