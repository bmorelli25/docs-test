---
slug: /serverless/observability/infrastructure-monitoring-required-fields
title: Required fields
description: Learn about the fields required to display data in the Infrastructure UI.
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>

This section lists the fields the Infrastructure UI uses to display data.
Please note that some of the fields listed here are not [ECS fields](http://example.co)/ecs-reference.html#_what_is_ecs).

## Additional field details

The `event.dataset` field is required to display data properly in some views. This field
is a combination of `metricset.module`, which is the PRODUCT_NAME module name, and `metricset.name`,
which is the metricset name.

To determine each metric's optimal time interval, all charts use `metricset.period`.
If `metricset.period` is not available, then it falls back to 1 minute intervals.

<div id="base-fields"></div>

## Base fields

The `base` field set contains all fields which are on the top level. These fields are common across all types of events.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`@timestamp`</DocCell>
    <DocCell>
      Date/time when the event originated.

      This is the date/time extracted from the event, typically representing when the source generated the event.
      If the event source has no original timestamp, this value is typically populated by the first time the pipeline received the event.
      Required field for all events.

      Example: `May 27, 2020 @ 15:22:27.982`
    </DocCell>
    <DocCell>date</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`message`</DocCell>
    <DocCell>
      For log events the message field contains the log message, optimized for viewing in a log viewer.

      For structured logs without an original message field, other fields can be concatenated to form a human-readable summary of the event.

      If multiple messages exist, they can be combined into one message.

      Example: `Hello World`
    </DocCell>
    <DocCell>text</DocCell>
  </DocRow>
 </DocTable>

<div id="host-fields"></div>

## Hosts fields

These fields must be mapped to display host data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`host.name`</DocCell>
    <DocCell>
    Name of the host.

    It can contain what `hostname` returns on Unix systems, the fully qualified domain name, or a name specified by the user. The sender decides which value to use.

    Example: `MacBook-Elastic.local`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`host.ip`</DocCell>
    <DocCell>
      IP of the host that records the event.
    </DocCell>
    <DocCell>ip</DocCell>
  </DocRow>
 </DocTable>

<div id="docker-fields"></div>

## Docker container fields

These fields must be mapped to display Docker container data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>
  <DocRow>
    <DocCell>`container.id`</DocCell>
    <DocCell>
      Unique container id.

      Example: `data`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`container.name`</DocCell>
    <DocCell>
      Container name.
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`container.ip_address`</DocCell>
    <DocCell>
      IP of the container.

      *Not an ECS field*
    </DocCell>
    <DocCell>ip</DocCell>
  </DocRow>
</DocTable>


<div id="kubernetes-fields"></div>

## Kubernetes pod fields

These fields must be mapped to display Kubernetes pod data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`kubernetes.pod.uid`</DocCell>
    <DocCell>
       Kubernetes Pod UID.

      Example: `8454328b-673d-11ea-7d80-21010a840123`

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`kubernetes.pod.name`</DocCell>
    <DocCell>
      Kubernetes pod name.

      Example: `nginx-demo`

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`kubernetes.pod.ip`</DocCell>
    <DocCell>
      IP of the Kubernetes pod.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
 </DocTable>

<div id="aws-ec2-fields"></div>

## AWS EC2 instance fields

These fields must be mapped to display EC2 instance data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`cloud.instance.id`</DocCell>
    <DocCell>
      Instance ID of the host machine.

      Example: `i-1234567890abcdef0`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.instance.name`</DocCell>
    <DocCell>
      Instance name of the host machine.
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`aws.ec2.instance.public.ip`</DocCell>
    <DocCell>
      Instance public IP of the host machine.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
</DocTable>

<div id="aws-s3-fields"></div>

## AWS S3 bucket fields

These fields must be mapped to display S3 bucket data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>
  <DocRow>
    <DocCell>`aws.s3.bucket.name`</DocCell>
    <DocCell>
      The name or ID of the AWS S3 bucket.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
</DocTable>

<div id="aws-sqs-fields"></div>

## AWS SQS queue fields

These fields must be mapped to display SQS queue data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`aws.sqs.queue.name`</DocCell>
    <DocCell>
      The name or ID of the AWS SQS queue.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
</DocTable>

<div id="aws-rds-fields"></div>

## AWS RDS database fields

These fields must be mapped to display RDS database data in the PRODUCT_NAME.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`aws.rds.db_instance.arn`</DocCell>
    <DocCell>
      Amazon Resource Name (ARN) for each RDS.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`aws.rds.db_instance.identifier`</DocCell>
    <DocCell>
      Contains a user-supplied database identifier. This identifier is the unique key that identifies a DB instance.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
</DocTable>

<div id="group-inventory-fields"></div>

## Additional grouping fields

Depending on which entity you select in the **Inventory** view, these additional fields can be mapped to group entities by.

<DocTable
  columns={[
    { title: "Field", width: "30%" },
    { title: "Description", width: "50%" },
    { title: "Type", width: "20%" }
  ]}
>

  <DocRow>
    <DocCell>`cloud.availability_zone`</DocCell>
    <DocCell>
      Availability zone in which this host is running.

      Example: `us-east-1c`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.machine.type`</DocCell>
    <DocCell>
      Machine type of the host machine.

      Example: `t2.medium`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.region`</DocCell>
    <DocCell>
      Region in which this host is running.

      Example: `us-east-1`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.instance.id`</DocCell>
    <DocCell>
      Instance ID of the host machine.

      Example: `i-1234567890abcdef0`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.provider`</DocCell>
    <DocCell>
      Name of the cloud provider. Example values are `aws`, `azure`, `gcp`, or `digitalocean`.

      Example: `aws`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.instance.name`</DocCell>
    <DocCell>
      Instance name of the host machine.
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`cloud.project.id`</DocCell>
    <DocCell>
      Name of the project in Google Cloud.

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`service.type`</DocCell>
    <DocCell>
      The type of service data is collected from.

      The type can be used to group and correlate logs and metrics from one service type.

      For example, the service type for metrics collected from PRODUCT_NAME is `elasticsearch`.

      Example: `elasticsearch`

      *Not an ECS field*
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`host.hostname`</DocCell>
    <DocCell>
      Name of the host. This field is required if you want to use PRODUCT_NAME

      It normally contains what the `hostname` command returns on the host machine.

      Example: `Elastic.local`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`host.os.name`</DocCell>
    <DocCell>
      Operating system name, without the version.

      Multi-fields:

      os.name.text (type: text)

      Example: `Mac OS X`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>

  <DocRow>
    <DocCell>`host.os.kernel`</DocCell>
    <DocCell>
      Operating system kernel version as a raw string.

      Example: `4.4.0-112-generic`
    </DocCell>
    <DocCell>keyword</DocCell>
  </DocRow>
</DocTable>
