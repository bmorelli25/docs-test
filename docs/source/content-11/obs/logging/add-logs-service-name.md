---
slug: /serverless/observability/add-logs-service-name
title: Add a service name to logs
description: Learn how to add a service name field to your logs.
tags: [ 'serverless', 'observability', 'overview' ]
---

Adding the `service.name` field to your logs associates them with the services that generate them.
You can use this field to view and manage logs for distributed services located on multiple hosts.
If you've enabled Elastic's new experience, adding a service name also associates your logs with a service in the <DocLink slug="/serverless/observability/apm-services">Services inventory</DocLink>.

To add a service name to your logs, either:

- Use the `add_fields` processor through an integration, PRODUCT_NAME configuration, or PRODUCT_NAME configuration.
- Map an existing field from your data stream to the `service.name` field.

## Use the add fields processor to add a service name
For log data without a service name, use the [`add_fields` processor](http://example.co)/add_fields-processor.html) to add the `service.name` field.
You can add the processor in an integration's settings or in the PRODUCT_NAME or PRODUCT_NAME configuration.

For example, adding the `add_fields` processor to the inputs section of a standalone PRODUCT_NAME or PRODUCT_NAME configuration would add `your_service_name` as the `service.name` field:

```console
processors:
    - add_fields:
        target: service
        fields:
            name: your_service_name
```

Adding the `add_fields` processor to an integration's settings would add `your_service_name` as the `service.name` field:

<DocImage size="2" url="../images/add-field-processor.png" alt="Add the add_fields processor to an integration" />

For more on defining processors, refer to [define processors](http://example.co)/elastic-agent-processor-configuration.html).

## Map an existing field to the service name field

For logs that with an existing field being used to represent the service name, map that field to the `service.name` field using the [alias field type](http://example.co)/field-alias.html).
Follow these steps to update your mapping:

1. Go to **Management** → **Index Management** → **Index Templates**.
1. Search for the index template you want to update.
1. From the **Actions** menu for that template, select **edit**.
1. Go to **Mappings**, and select **Add field**.
1. Under **Field type**, select **Alias** and add `service.name` to the **Field name**.
1. Under **Field path**, select the existing field you want to map to the service name.
1. Select **Add field**.

For more ways to add a field to your mapping, refer to [add a field to an existing mapping](http://example.co)/explicit-mapping.html#add-field-mapping.html).

## Additional ways to process data

The PRODUCT_NAME provides additional ways to process your data:

- **[Ingest pipelines](http://example.co)/ingest.html):** convert data to ECS, normalize field data, or enrich incoming data.
- **[Logstash](http://example.co)/introduction.html):** enrich your data using input, output, and filter plugins.