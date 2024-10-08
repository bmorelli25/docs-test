---
slug: /serverless/observability/apm-transactions
title: Transactions
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>

import LogOverview from '../transclusion/kibana/logs/log-overview.mdx'

A _transaction_ describes an event captured by an Elastic APM agent instrumenting a service.
APM agents automatically collect performance metrics on HTTP requests, database queries, and much more.
The **Transactions** tab shows an overview of all transactions.

![Example view of transactions table in the Applications UI](images/transactions/apm-transactions-overview.png)

The **Latency**, **Throughput**, **Failed transaction rate**, **Time spent by span type**, and **Cold start rate**
charts display information on all transactions associated with the selected service:

<DocDefList>
  <DocDefTerm>**Latency**</DocDefTerm>
  <DocDefDescription>
    Response times for the service. Options include average, 95th, and 99th percentile.
    If there's a weird spike that you'd like to investigate,
    you can simply zoom in on the graph &mdash; this will adjust the specific time range,
    and all of the data on the page will update accordingly.
  </DocDefDescription>
  <DocDefTerm>**Throughput**</DocDefTerm>
  <DocDefDescription>
    Visualize response codes: `2xx`, `3xx`, `4xx`, and so on.
    Useful for determining if more responses than usual are being served with a particular response code.
    Like in the latency graph, you can zoom in on anomalies to further investigate them.
  </DocDefDescription>
  <DocDefTerm>**Failed transaction rate**</DocDefTerm>
  <DocDefDescription>
    The failed transaction rate represents the percentage of failed transactions from the perspective of the selected service.
    It's useful for visualizing unexpected increases, decreases, or irregular patterns in a service's transactions.

    <DocCallOut title="Tip">

    HTTP **transactions** from the HTTP server perspective do not consider a `4xx` status code (client error) as a failure
    because the failure was caused by the caller, not the HTTP server. Thus, `event.outcome=success` and there will be no increase in failed transaction rate.

    HTTP **spans** from the client perspective however, are considered failures if the HTTP status code is ≥ 400.
    These spans will set `event.outcome=failure` and increase the failed transaction rate.

    If there is no HTTP status, both transactions and spans are considered successful unless an error is reported.

    </DocCallOut>
  </DocDefDescription>
  <DocDefTerm>**Time spent by span type**</DocDefTerm>
  <DocDefDescription>
    Visualize where your application is spending most of its time.
    For example, is your app spending time in external calls, database processing, or application code execution?

    The time a transaction took to complete is also recorded and displayed on the chart under the "app" label.
    "app" indicates that something was happening within the application, but we're not sure exactly what.
    This could be a sign that the APM agent does not have auto-instrumentation for whatever was happening during that time.

    It's important to note that if you have asynchronous spans, the sum of all span times may exceed the duration of the transaction.
  </DocDefDescription>
  <DocDefTerm>**Cold start rate**</DocDefTerm>
  <DocDefDescription>
    Only applicable to serverless transactions, this chart displays the percentage of requests that trigger a cold start of a serverless function.
    See <DocLink slug="/serverless/observability/apm-observe-lambda-functions" section="cold-starts">Cold starts</DocLink> for more information.
  </DocDefDescription>
</DocDefList>

## Transactions table

The **Transactions** table displays a list of _transaction groups_ for the selected service.
In other words, this view groups all transactions of the same name together,
and only displays one entry for each group.

![Example view of the transactions table in the Applications UI](images/transactions/apm-transactions-table.png)

By default, transaction groups are sorted by _Impact_.
Impact helps show the most used and slowest endpoints in your service &mdash; in other words,
it's the collective amount of pain a specific endpoint is causing your users.
If there's a particular endpoint you're worried about, you can click on it to view the <DocLink slug="/serverless/observability/apm-transactions" section="transaction-details">transaction details</DocLink>.

<DocCallOut title="Important" color="warning">

If you only see one route in the Transactions table, or if you have transactions named "unknown route",
it could be a symptom that the APM agent either wasn't installed correctly or doesn't support your framework.

For further details, including troubleshooting and custom implementation instructions,
refer to the documentation for each <DocLink slug="/serverless/observability/apm-agents-elastic-apm-agents">APM Agent</DocLink> you've implemented.

</DocCallOut>

<div id="transaction-details"></div>

## Transaction details

Selecting a transaction group will bring you to the **transaction** details.
This page is visually similar to the transaction overview, but it shows data from all transactions within
the selected transaction group.

![Example view of transactions table in the Applications UI](images/transactions/apm-transactions-overview.png)

<div id="transaction-duration-distribution"></div>

### Latency distribution

The latency distribution shows a plot of all transaction durations for the given time period.
The following screenshot shows a typical distribution
and indicates most of our requests were served quickly &mdash; awesome!
The requests on the right are taking longer than average; we probably need to focus on them.

![Example view of latency distribution graph](images/transactions/apm-transaction-duration-dist.png)

Click and drag to select a latency duration _bucket_ to display up to 500 trace samples.

<div id="transaction-trace-sample"></div>

### Trace samples

Trace samples are based on the _bucket_ selection in the **Latency distribution** chart;
update the samples by selecting a new _bucket_.
The number of requests per bucket is displayed when hovering over the graph,
and the selected bucket is highlighted to stand out.

Each bucket presents up to ten trace samples in a **timeline**, trace sample **metadata**,
and any related **logs**.

**Trace sample timeline**

Each sample has a trace timeline waterfall that shows how a typical request in that bucket executed.
This waterfall is useful for understanding the parent/child hierarchy of transactions and spans,
and ultimately determining _why_ a request was slow.
For large waterfalls, expand problematic transactions and collapse well-performing ones
for easier problem isolation and troubleshooting.

![Example view of transactions sample](images/transactions/apm-transaction-sample.png)

<DocCallOut title="Note">
More information on timeline waterfalls is available in <DocLink slug="/serverless/observability/apm-trace-sample-timeline">spans</DocLink>.
</DocCallOut>

**Trace sample metadata**

Learn more about a trace sample in the **Metadata** tab:

* Labels: Custom labels added by APM agents
* HTTP request/response information
* Host information
* Container information
* Service: The service/application runtime, APM agent, name, etc..
* Process: The process id that served up the request.
* APM agent information
* URL
* User: Requires additional configuration, but allows you to see which user experienced the current transaction.
* FaaS information, like cold start, AWS request ID, trigger type, and trigger request ID

<DocCallOut title="Tip">
All of this data is stored in documents in Elasticsearch.
This means you can select "Actions - View transaction in Discover" to see the actual Elasticsearch document under the discover tab.
</DocCallOut>

**Trace sample logs**

The **Logs** tab displays logs related to the sampled trace.

<LogOverview />

![APM logs tab](images/transactions/apm-logs-tab.png)

<div id="transaction-latency-correlations"></div>

### Correlations

Correlations surface attributes of your data that are potentially correlated with high-latency or erroneous transactions.
To learn more, see <DocLink slug="/serverless/observability/apm-find-transaction-latency-and-failure-correlations">Find transaction latency and failure correlations</DocLink>.

![APM latency correlations](images/transactions/correlations-hover.png)
