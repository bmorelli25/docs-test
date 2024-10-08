---
slug: /serverless/observability/synthetics-configuration
title: Configure a Synthetics project
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

import Snippet1 from '../transclusion/synthetics/configuration/monitor-config-options.mdx'

<div id="synthetics-configuration"></div>

Synthetic tests support the configuration of dynamic parameters that can be
used in Synthetics projects. In addition, the Synthetics agent, which is built on top
of Playwright, supports configuring browser and context options that are available
in Playwright-specific methods, for example, `ignoreHTTPSErrors`, `extraHTTPHeaders`, and `viewport`.

<div id="synthetics-config-file"></div>

Create a `synthetics.config.js` or `synthetics.config.ts` file in the root of the
Synthetics project and specify the options. For example:

```ts
import type { SyntheticsConfig } from '@elastic/synthetics';

export default env => {
  const config: SyntheticsConfig = {
    params: {
      url: 'https://www.elastic.co',
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 10,
      locations: [ 'us_east' ],
    },
    /**
     * Synthetic project monitors settings
     */
    project: {
      id: 'my-synthetics-project',
      url: 'https://abc123',
    },
  };
  if (env !== 'development') {
  /**
   * Override configuration specific to environment
   * For example, config.params.url = ""
   */
  }
  return config;
};
```

<DocCallOut title="Note">
  `env` in the example above is the environment you are pushing from
  _not_ the environment where monitors will run. In other words, `env`
  corresponds to the configured `NODE_ENV`.
</DocCallOut>

The configuration file can either export an object, or a function that when
called should return the generated configuration. To know more about configuring
the tests based on environments, look at the <DocLink slug="/serverless/observability/synthetics-params-secrets" section="synthetics-project-config-file">dynamic configuration</DocLink> documentation.

<div id="synthetics-configuration-params"></div>

## `params`

A JSON object that defines any variables your tests require.
Read more in <DocLink slug="/serverless/observability/synthetics-params-secrets">Work with params and secrets</DocLink>.

<div id="synthetics-configuration-playwright-options"></div>

## `playwrightOptions`

For all available options, refer to the [Playwright documentation](https://playwright.dev/docs/test-configuration).

<DocCallOut title="Note">
  Do not attempt to run in headful mode (using `headless:false`) when running through Elastic's global managed testing infrastructure or Private Locations as this is not supported.
</DocCallOut>

Below are details on a few Playwright options that are particularly relevant to Elastic Synthetics including timeouts, timezones, and device emulation.

<div id="synthetics-configuration-playwright-options-timeouts"></div>

### Timeouts

Playwright has two types of timeouts that are used in Elastic Synthetics:
[action and navigation timeouts](https://playwright.dev/docs/test-timeouts#action-and-navigation-timeouts).

Elastic Synthetics uses a default action and navigation timeout of 50 seconds.
You can override this default using [`actionTimeout`](https://playwright.dev/docs/api/class-testoptions#test-options-action-timeout) and [`navigationTimeout`](https://playwright.dev/docs/api/class-testoptions#test-options-navigation-timeout)
in `playwrightOptions`.

<div id="synthetics-configuration-playwright-options-timezones"></div>

### Timezones and locales

The Elastic global managed testing infrastructure does not currently set the timezone.
For PRODUCT_NAMEs, the monitors will use the timezone of the host machine running
the PRODUCT_NAME. This is not always desirable if you want to test how a web application
behaves across different timezones. To specify what timezone to use when the monitor runs,
you can use `playwrightOptions` on a per monitor or global basis.

To use a timezone and/or locale for all monitors in the Synthetics project, set
[`locale` and/or `timezoneId`](https://playwright.dev/docs/emulation#locale%2D%2Dtimezone)
in the configuration file:

```js
playwrightOptions: {
  locale: 'en-AU',
  timezoneId: 'Australia/Brisbane',
}
```

To use a timezone and/or locale for a _specific_ monitor, add these options to a
journey using <DocLink slug="/serverless/observability/synthetics-monitor-use">`monitor.use`</DocLink>.

<div id="synthetics-config-device-emulation"></div>

### Device emulation

Users can emulate a mobile device using the configuration file.
The example configuration below runs tests in "Pixel 5" emulation mode.

```js
import { SyntheticsConfig } from "@elastic/synthetics"
import { devices } from "playwright-chromium"

const config: SyntheticsConfig = {
  playwrightOptions: {
    ...devices['Pixel 5']
  }
}

export default config;
```

<div id="synthetics-configuration-project"></div>

## `project`

Information about the Synthetics project.

<DocDefList>
  <DocDefTerm>`id` (`string`)</DocDefTerm>
  <DocDefDescription>
    A unique id associated with your Synthetics project.
    It will be used for logically grouping monitors.

    If you used <DocLink slug="/serverless/observability/synthetics-command-reference" section="elasticsynthetics-init">`init` to create a Synthetics project</DocLink>, this is the `<name-of-synthetics-project>` you specified.
  </DocDefDescription>

  <DocDefTerm>`url` (`string`)</DocDefTerm>
  <DocDefDescription>
    The URL for the Observability project to which you want to upload the monitors.
  </DocDefDescription>
</DocDefList>

<div id="synthetics-configuration-monitor"></div>

## `monitor`

Default values to be applied to _all_ monitors when using the <DocLink slug="/serverless/observability/synthetics-command-reference" section="elasticsynthetics-push">`@elastic/synthetics` `push` command</DocLink>.

<Snippet1 />

For information on configuring monitors individually, refer to:

* <DocLink slug="/serverless/observability/synthetics-monitor-use">Configure individual browser monitors</DocLink> for browser monitors
* <DocLink slug="/serverless/observability/synthetics-lightweight">Configure lightweight monitors</DocLink> for lightweight monitors
