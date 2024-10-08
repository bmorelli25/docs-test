---
title: Troubleshooting two
---

# HTTP 400: Data decoding error / Data validation error

The most likely cause for this error is using an incompatible version of an PRODUCT_NAME.
See <DocLink slug="/serverless/observability/apm-agents-elastic-apm-agents" section="minimum-supported-versions">minimum supported APM agent versions</DocLink> to verify compatibility.

<div id="event-too-large"></div>

## HTTP 400: Event too large

APM agents communicate with the Managed intake service by sending events in an HTTP request. Each event is sent as its own line in the HTTP request body. If events are too large, you can reduce the size of the events that your APM agents send by: <DocLink slug="/serverless/observability/apm-compress-spans" text="enabling span compression" /> or <DocLink slug="/serverless/observability/apm-stacktrace-collection" text="reducing collected stack trace information" />.

<div id="unauthorized"></div>

### HTTP 401: Invalid token

The API key is invalid.
