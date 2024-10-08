---
slug: /serverless/observability/synthetics-monitor-use
title: Configure individual browser monitors
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

<div id="synthetics-monitor-use"></div>

<DocCallOut title="Note">

This is only relevant for monitors that are created and managed using a <DocLink slug="/serverless/observability/synthetics-get-started" section="synthetics-project">Synthetics project</DocLink>.
For more information on configuring browser monitors added in the UI,
refer to <DocLink slug="/serverless/observability/synthetics-get-started-ui">Create monitors in the Synthetics UI</DocLink>.

</DocCallOut>

After <DocLink slug="/serverless/observability/synthetics-create-test">writing synthetic journeys</DocLink>, you can use `monitor.use`
to configure the browser monitors that will run your tests.

You'll need to set a few configuration options:

* **Give your monitor a name.** Provide a human readable name and a unique ID for the monitor. This will appear in your Observability project where you can view and manage monitors after they're created.
* **Set the schedule.** Specify the interval at which your tests will run.
* **Specify where the monitors should run.** You can run monitors on Elastic's global managed testing infrastructure
    or <DocLink slug="/serverless/observability/synthetics-private-location">create a PRODUCT_NAME</DocLink> to run monitors from your own premises.

* **Set other options as needed.** There are several other options you can set to customize your implementation including params, tags, screenshot options, throttling options, and more.

Configure each monitor directly in your `journey` code using `monitor.use`.
The `monitor` API allows you to set unique options for each journey's monitor directly through code.
For example:

```js
import { journey, step, monitor, expect } from '@elastic/synthetics';

journey('Ensure placeholder is correct', ({ page, params }) => {
  monitor.use({
    id: 'example-monitor',
    schedule: 10,
    throttling: {
      download: 10,
      upload: 5,
      latency: 100,
    },
  });
  step('Load the demo page', async () => {
    await page.goto('https://elastic.github.io/synthetics-demo/');
  });
  step('Assert placeholder text', async () => {
    const placeholderValue = await page.getAttribute(
      'input.new-todo',
      'placeholder'
    );
    expect(placeholderValue).toBe('What needs to be done?');
  });
});
```

For each journey, you can specify its `schedule` and the `locations` in which it runs.
When those options are not set, Synthetics will use the default values in the global configuration file.
For more details, refer to <DocLink slug="/serverless/observability/synthetics-configuration">Configure a Synthetics project</DocLink>.
