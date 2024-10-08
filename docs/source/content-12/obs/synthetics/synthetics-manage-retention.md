---
slug: /serverless/observability/synthetics-manage-retention
title: Manage data retention
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

When you set up a synthetic monitor, data from the monitor is saved in
[(PRODUCT_NAME) data streams](http://example.co)/data-streams.html),
an append-only structure in PRODUCT_NAME.

There are six data streams recorded by synthetic monitors: `http`, `tcp`, `icmp`, `browser`, `browser.network`, `browser.screenshot`.
Elastic will retain data from each data stream for some time period,
and the default time period varies by data stream.
If you want to reduce the amount of storage required or store data for longer,
you can customize how long to retain data for each data stream.

## Synthetics data streams

There are six data streams recorded by synthetic monitors:

| Data stream | Data includes | Default retention period |  |
|---|---|---|---|
| `http` | The URL that was checked, the status of the check, and any errors that occurred | 1 year |  |
| `tcp` | The URL that was checked, the status of the check, and any errors that occurred | 1 year |  |
| `icmp` | The URL that was checked, the status of the check, and any errors that occurred | 1 year |  |
| `browser` | The URL that was checked, the status of the check, and any errors that occurred | 1 year |  |
| `browser.screenshot` | Binary image data used to construct a screenshot and metadata with information related to de-duplicating this data | 14 days |  |
| `browser.network` | Detailed metadata around requests for resources required by the pages being checked | 14 days |  |

All types of checks record core metadata.
Browser-based checks store two additional types of data: network and screenshot documents.
These browser-specific indices are usually many times larger than the core metadata.
The relative sizes of each vary depending on the sites being
checked with network data usually being the larger of the two by a significant factor.

## Customize data stream lifecycles

If Synthetics browser data streams are storing data longer than necessary,
you can opt to retain data for a shorter period.

To find Synthetics data streams:

1. Navigate to **Project settings** → **Management** → **Index Management** → **Data Streams**.
1. Filter the list of data streams for those containing the term `synthetics`.
    1. In the UI there will be three types of browser data streams: `synthetics-browser-*`, `synthetics-browser.network-*`, and `synthetics-browser.screenshot-*`.

Then, you can refer to [Tutorial: Customize data retention for integrations](http://example.co)/data-streams-ilm-tutorial.html) to learn how to apply a custom PRODUCT_NAME policy to the browser data streams.
