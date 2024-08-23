---
slug: /serverless/observability/apm-server-api
title: Managed intake service event API
# description: Description to be written
tags: [ 'serverless', 'observability', 'reference' ]
---

<p><DocBadge template="technical preview" /></p>


<DocCallOut color="warning" title="Warning">
  This API is exclusively for APM agent developers. The vast majority of users should have no reason to interact with this API.
</DocCallOut>

<div id="api-error"></div>

An error or a logged error message captured by an agent occurring in a monitored service.

<div id="api-error-schema"></div>

## Error Schema

The managed intake service uses a JSON Schema to validate requests. The specification for errors is defined on
[GitHub](https://github.com/elastic/apm-server/blob/main/docs/spec/v2/error.json) and included below.

<DocAccordion buttonContent="Click to expand the schema">
  <V2Error />
</DocAccordion>
