---
slug: /serverless/observability/synthetics-security-encryption
title: Synthetics Encryption and Security
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

<div id="synthetics-security-encryption"></div>

Elastic Synthetics was designed with security in mind encrypting both persisted and transmitted data.
This page catalogs the points within Elastic Synthetics where data is either stored or transmitted in an encrypted fashion.

## Synthetics UI

Data is stored in [Kibana Secure Saved Objects](http://example.co)/xpack-security-secure-saved-objects.html),
with sensitive fields encrypted. These fields include your script source, params, and global params.

<div id="synthetics_service"></div>

## Synthetics Service

The Global Elastic Synthetics Service performs all communication of sensitive data (both internally, and with Kibana) over encrypted connections
and encrypts all data persisted to disk as well.

<div id="synthetics_private_locations"></div>

## Synthetics Private Locations

In Kibana configuration for private locations is stored in two places, Synthetics saved objects which always encrypt sensitive fields using [Kibana Secure Saved Objects](http://example.co)/xpack-security-secure-saved-objects.html) and also in Fleet, which uses unencrypted saved objects restricted by user permissions. For Elastic Cloud customers all data is secured on disk regardless of whether additional saved object encryption is present. See our [Cloud Security Statement](https://www.elastic.co/cloud/security) for more information. We recommend that self-managed customers encrypt disks for their Elasticsearch instances if this is a concern.

All data is encrypted in transit. See [Elastic Agent configuration encryption](http://example.co)/_elastic_agent_configuration_encryption.html) for more details.
