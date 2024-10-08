---
slug: /serverless/observability/synthetics-manage-monitors
title: Manage monitors
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

import SyntheticsManageMonitorsUpdateMonitorWidget from '../transclusion/synthetics/tab-widgets/manage-monitors-update-monitor-widget.mdx'
import SyntheticsManageMonitorsDeleteMonitorWidget from '../transclusion/synthetics/tab-widgets/manage-monitors-delete-monitor-widget.mdx'

<div id="synthetics-manage-monitors"></div>

After you've <DocLink slug="/serverless/observability/synthetics-get-started">created a synthetic monitor</DocLink>,
you'll need to manage that monitor over time. This might include updating
or permanently deleting an existing monitor.

<DocCallOut title="Tip">
  If you're using a Synthetics project to manage monitors, you should also set up a workflow that uses
  <DocLink slug="/serverless/observability/synthetics-manage-monitors" section="implement-best-practices-for-synthetics-projects">best practices for managing monitors effectively</DocLink>
  in a production environment.
</DocCallOut>

<div id="manage-monitors-config"></div>

## Update a monitor

You can update a monitor's configuration, for example, changing the interval at which
the monitor runs a test.

You can also update the journey used in a browser monitor.
For example, if you update the UI used in your application, you may want to update
your journey's selectors and assertions.

<SyntheticsManageMonitorsUpdateMonitorWidget />

<div id="manage-monitors-delete"></div>

## Delete a monitor

Eventually you might want to delete a monitor altogether.
For example, if the user journey you were validating no longer exists.

<SyntheticsManageMonitorsDeleteMonitorWidget />

<br />

Alternatively, you can temporarily disable a monitor by updating the monitor's
configuration in your journey's code or in the Synthetics UI using the _Enabled_ toggle.

<div id="synthetics-projects-best-practices"></div>

## Implement best practices for Synthetics projects

<DocCallOut title="Important" color="warning">
This is only relevant to monitors created using a Synthetics project.
</DocCallOut>

After you've <DocLink slug="/serverless/observability/synthetics-get-started-project">set up a Synthetics project</DocLink>,
there are some best practices you can implement to manage the Synthetics project effectively.

<div id="synthetics-version-control"></div>

### Use version control

First, it's recommended that you version control all files in Git.
If your Synthetics project is not already in a version controlled directory add it
and push it to your Git host.

<div id="synthetics-workflow"></div>

### Set up recommended workflow

While it can be convenient to run the `push` command directly from your workstation,
especially when setting up a new Synthetics project, it is not recommended for production environments.

Instead, we recommended that you:

1. Develop and test changes locally.
1. Create a pull request for all config changes.
1. Have your CI service automatically verify the PR by running `npx @elastic/synthetics .`

    Elastic's synthetics runner can output results in a few different formats,
    including JSON and JUnit (the standard format supported by most CI platforms).

    If any of your journeys fail, it will yield a non-zero exit code, which most CI systems pick up as a failure by default.

1. Have a human approve the pull request.
1. Merge the pull request.
1. Have your CI service automatically deploy the change by running `npx @elastic/synthetics push` after changes are merged.

The exact implementation details will depend on the CI system and Git host you use.
You can reference the sample GitHub configuration file that is included in the `.github`
directory when you create a new Synthetics project.

<!--  or find an example in the-->
<!--  [elastic/synthetics-demo](https://github.com/elastic/synthetics-demo/blob/main/.github/workflows/run-synthetics.yml) repository.-->
