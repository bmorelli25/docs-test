---
slug: /serverless/observability/synthetics-get-started
title: Synthetics
# description: Description to be written
tags: []
---

```{toctree}
:caption: Contents:
:hidden:

synthetics-lightweight.md
synthetics-manage-monitors.md
synthetics-get-started-ui.md
synthetics-scale-and-architect.md
synthetics-create-test.md
synthetics-manage-retention.md
synthetics-configuration.md
synthetics-params-secrets.md
synthetics-settings.md
synthetics-get-started-project.md
synthetics-command-reference.md
synthetics-intro.md
synthetics-journeys.md
synthetics-private-location.md
synthetics-recorder.md
synthetics-analyze.md
synthetics-troubleshooting.md
synthetics-monitor-use.md
synthetics-feature-roles.md
synthetics-security-encryption.md
```

To set up a synthetic monitor, you need to configure the monitor, run it, and send data back to Elastic.
After setup is complete, the data will be available in your Observability project to view, analyze, and alert on.

There are two ways to set up a synthetic monitor:

* Synthetics project
* The Synthetics UI

Read more about each option below, and choose the approach that works best for you.

## Synthetics project

With a Synthetics project, you write tests in an external version-controlled Node.js project
using YAML for lightweight monitors and JavaScript or TypeScript for browser monitors.
Then, you use the `@elastic/synthetics` NPM library's `push` command to create
monitors in your Observability project.

This approach works well if you want to create both browser monitors and lightweight
monitors. It also allows you to configure and update monitors using a GitOps workflow.

Get started in <DocLink slug="/serverless/observability/synthetics-get-started-project">Create monitors in a Synthetics project</DocLink>.

<DocImage url="../images/synthetics-get-started-projects.png" alt="Diagram showing which pieces of software are used to configure monitors, create monitors, and view results when using Synthetics projects." flatImage />

## Synthetics UI

You can create monitors directly in the user interface.
This approach works well if you want to create and manage your monitors in the browser.

Get started in <DocLink slug="/serverless/observability/synthetics-get-started-ui">Create monitors in the Synthetics UI</DocLink>.

<DocImage url="../images/synthetics-get-started-ui.png" alt="Diagram showing which pieces of software are used to configure monitors, create monitors, and view results when using the Synthetics UI." flatImage />
