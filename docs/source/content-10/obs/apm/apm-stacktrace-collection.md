---
slug: /serverless/observability/apm-stacktrace-collection
title: Stacktrace collection
description: Reduce data storage and costs by reducing stacktrace collection
tags: [ 'serverless', 'observability', 'how-to' ]
---

<p><DocBadge template="technical preview" /></p>

Elastic APM agents collect `stacktrace` information under certain circumstances. This can be very helpful in identifying issues in your code, but it also comes with an overhead at collection time and increases your storage usage.

Stack trace collection settings are managed in each APM agent. You can enable and disable this feature, or set specific configuration limits, like the maximum number of stacktrace frames to collect, or the minimum duration of a stacktrace to collect.

See the relevant [(PRODUCT_NAME) documentation](http://example.co)/index.html) to learn how to customize stacktrace collection.
