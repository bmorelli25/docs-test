---
title: Troubleshooting
---

# No data is indexed

If no data shows up, first make sure that your APM components are properly connected.

<NoDataIndexed />

<div id="data-indexed-no-apm-legacy"></div>

## Data is indexed but doesn't appear in the Applications UI

Elastic APM relies on default index mappings, data streams, and pipelines to query and display data.
If your APM data isn't showing up in the Applications UI, but is elsewhere in Elastic, like Discover,
you've likely made a change that overwrote a default.
If you've manually changed a data stream, index template, or index pipeline,
please verify you are not interfering with the default APM setup.

<!--  ### I/O Timeout

I/O Timeouts can occur when your timeout settings across the stack are not configured correctly,
especially when using a load balancer.

You may see an error like the one below in the PRODUCT_NAME logs, and/or a similar error on the intake side:

```
[ElasticAPM] APM Server responded with an error:
"read tcp 123.34.22.313:8200->123.34.22.40:41602: i/o timeout"
```

To fix this error, ensure timeouts are incrementing from the PRODUCT_NAME,
through your load balancer, to the Elastic APM intake.

By default, Elastic APM agent timeouts are set at 10 seconds, and the Elastic intake timeout is set at 60 seconds.
Your load balancer should be set somewhere between these numbers.

For example:

```
APM agent --> Load Balancer  --> Elastic APM intake
   10s            15s                 60s
```

<div id="field-limit-exceeded-legacy"></div>

### Field limit exceeded

When adding too many distinct tag keys on a transaction or span,
you risk creating a [mapping explosion](http://example.co)/mapping.html#mapping-limit-settings).

For example, you should avoid that user-specified data,
like URL parameters, is used as a tag key.
Likewise, using the current timestamp or a user ID as a tag key is not a good idea.
However, tag **values** with a high cardinality are not a problem.
Just try to keep the number of distinct tag keys at a minimum.

The symptom of a mapping explosion is that transactions and spans are not indexed anymore after a certain time. Usually, on the next day,
the spans and transactions will be indexed again because a new index is created each day.
But as soon as the field limit is reached, indexing stops again.
