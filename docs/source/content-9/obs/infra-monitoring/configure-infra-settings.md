---
slug: /serverless/observability/configure-intra-settings
title: Configure settings
description: Learn how to configure infrastructure UI settings.
tags: [ 'serverless', 'observability', 'how to' ]
---

<p><DocBadge template="technical preview" /></p>

import Roles from '../partials/roles.mdx'

<Roles role="Editor" goal="configure settings" />

<div id="configure-settings"></div>

From the main Observability menu, go to **Infrastructure** → **Inventory** or **Hosts**,
and click the **Settings** link at the top of the page.
The following settings are available:

<DocTable columns={[{ title:  "Setting" }, { title:  "Description" }]}>
    <DocRow>
        <DocCell>**Name**</DocCell>
        <DocCell>Name of the source configuration.</DocCell>
    </DocRow>
    <DocRow>
        <DocCell>**Indices**</DocCell>
        <DocCell>(PRODUCT_NAME) or patterns used to match PRODUCT_NAME indices that contain metrics. The default patterns are `metrics-*,metricbeat-*`.</DocCell>
    </DocRow>
    <DocRow>
        <DocCell>**Machine Learning**</DocCell>
        <DocCell>The minimum severity score required to display anomalies in the Infrastructure UI. The default is 50.</DocCell>
    </DocRow>
    <DocRow>
        <DocCell>**Features**</DocCell>
        <DocCell>Turn new features on and off. </DocCell>
    </DocRow>
</DocTable>
Click **Apply** to save your changes.

If the fields are grayed out and cannot be edited, you may not have sufficient privileges to change the source configuration.
