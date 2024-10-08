---
slug: /serverless/observability/synthetics-troubleshooting
title: Troubleshooting Synthetics
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

import Support from '../transclusion/support.mdx'

<div id="synthetics-troubleshooting"></div>

<div id="synthetics-troubleshooting-local-debugging"></div>

## Local debugging

For debugging synthetic tests locally, you can set an environment variable,
`DEBUG=synthetics`, to capture Synthetics agent logs when using the
<DocLink slug="/serverless/observability/synthetics-command-reference">Synthetics CLI</DocLink>.

<div id="synthetics-troubleshooting-common-issues"></div>

## Common issues

<div id="synthetics-troubleshooting-no-agent-running"></div>

### No results from a monitor configured to run on a PRODUCT_NAME

If you have created a PRODUCT_NAME and configured a monitor to run on that PRODUCT_NAME,
but don't see any results for that monitor in the Synthetics UI, make sure there is an agent
configured to run against the agent policy.

<DocCallOut title="Note">

If you attempt to assign an agent policy to a PRODUCT_NAME _before_ configuring an agent to run
against the agent policy, you will see a note in the Synthetics UI that the selected agent policy
has no agents.

</DocCallOut>

When creating a PRODUCT_NAME, you have to:

1. <DocLink slug="/serverless/observability/synthetics-private-location" section="set-up-agent">Set up PRODUCT_NAME</DocLink>.
1. <DocLink slug="/serverless/observability/synthetics-private-location" section="connect-to-your-observability-project">Connect PRODUCT_NAME to your Observability project</DocLink> and enroll an PRODUCT_NAME in PRODUCT_NAME.
1. <DocLink slug="/serverless/observability/synthetics-private-location" section="add-a-private-location">Add a PRODUCT_NAME</DocLink> in the Synthetics UI.

If you do not complete the second item, no agents will be configured to run against the agent policy, and
any monitors configured to run on that PRODUCT_NAME won't be able to run so there will be no results
in the Synthetics UI.

To fix this, make sure there is an agent configured to run against the agent policy.

<div id="synthetics-troubleshooting-no-direct-es-connection"></div>

### No results from a monitor

If you have configured a monitor but don't see any results for that monitor in the Synthetics UI, whether running them from Elastic's global managed testing infrastructure or from PRODUCT_NAMEs, ensure Synthetics has a direct connection to PRODUCT_NAME.

Do not configure any ingest pipelines or output via Logstash as this will prevent Synthetics from working properly and is not supported.

<div id="synthetics-troubleshooting-missing-browser-schedules"></div>

### Browser monitor configured to run on a PRODUCT_NAME not running to schedule

If you have browser monitors configured to run on a PRODUCT_NAME but notice one or more of them are not running as scheduled, this could be because:

* The time it takes for your monitor to run is longer than the frequency you have set
* There may be too many monitors trying to run concurrently, causing some of them to skip their scheduled run

You may also see a message in the logs such as `2 tasks have missed their schedule deadlines by more than 1 second in the last 15s`. These will be visible from inside the Agent diagnostic ZIP file, and the numbers and time periods may be different in your logs.

Start by identifying the cause of the issue. First, check if the time it takes the monitor to run is less than the scheduled frequency:

1. Go to the Synthetics UI.
1. Click the monitor, then click **Go to monitor**.
1. Go to the <DocLink slug="/serverless/observability/synthetics-analyze" section="overview">Overview tab</DocLink> to see the _Avg. duration_. You can also view the duration for individual runs in the <DocLink slug="/serverless/observability/synthetics-analyze" section="history">History tab</DocLink>.
1. Compare the duration to the scheduled frequency. If the duration is _greater than_ the scheduled frequency, for example if the monitor that takes 90 seconds to run and its scheduled frequency is 1 minute, the next scheduled run will not occur because the current one is still running so you may see results for every other scheduled run.

    To fix this, you can either:

* Change the frequency so the monitor runs less often.
* Refactor the monitor so it can run in a shorter amount of time.

If the duration is _less than_ the scheduled frequency or the suggestion above does not fix the issue, then there may be too many browser monitors attempting to run on the PRODUCT_NAME. Due to the additional hardware overhead of running browser monitors, we limit each PRODUCT_NAME to only run two browser monitors at the same time. Depending on how many browser monitors you have configured to run on the PRODUCT_NAME and their schedule, the PRODUCT_NAME may not be able to run them all because it would require more than two browser tests to be running simultaneously.

To fix this issue, you can either:

* Increase the number of concurrent browser monitors allowed (as described in <DocLink slug="/serverless/observability/synthetics-private-location" section="scaling-private-locations">Scaling Private Locations</DocLink>), paying attention to the scaling and hardware requirements documented.
* Create multiple PRODUCT_NAMEs and spread your browser monitors across them more evenly (effectively horizontally scaling your PRODUCT_NAMEs).

<div id="synthetics-troubleshooting-no-locations"></div>

### No locations are available

When using PRODUCT_NAME, if there are no options available in the _Locations_ dropdown when you
try to create a monitor in the Synthetics UI _or_ if no locations are listed when using the
<DocLink slug="/serverless/observability/synthetics-command-reference" section="elasticsynthetics-locations">`location` command</DocLink>, it might be because you do not have permission to
use Elastic managed locations _and_ there are no <DocLink slug="/serverless/observability/synthetics-private-location" section="monitor-via-a-private-agent">Private Locations</DocLink>
available yet.

There are a few ways to fix this:

* If you have <DocLink slug="/serverless/observability/synthetics-feature-roles">Editor</DocLink> access, you can <DocLink slug="/serverless/observability/synthetics-private-location" section="monitor-via-a-private-agent">create a new Private Location</DocLink>. Then try creating the monitor again.
* If you do _not_ have the right privileges to create a Private Location, you can ask an <DocLink slug="/serverless/observability/synthetics-feature-roles">Admin</DocLink> to create a Private Location or give you the necessary privileges so you can <DocLink slug="/serverless/observability/synthetics-private-location" section="monitor-via-a-private-agent">create a new Private Location</DocLink>. Then try creating the monitor again.
<!--  * If you want to create a monitor to run on Elastic's global managed infrastructure, ask an <DocLink slug="/serverless/observability/synthetics-feature-roles">Admin</DocLink> to update <DocLink slug="/serverless/observability/synthetics-feature-roles" section="to-restrict-using-elastics-global-managed-infrastructure">`Synthetics and Uptime` sub-feature privileges</DocLink> for the role you're currently assigned. Then try creating the monitor again.-->

<div id="synthetics-troubleshooting-public-locations-disabled"></div>

<!--  ### You do not have permission to use Elastic managed locations

If you try to create or edit a monitor hosted on Elastic's global managed infrastructure but see a note that you do not have permission to use Elastic managed locations, an administrator has restricted the use of public locations.

To fix this you can either:

* Ask an <DocLink slug="/serverless/observability/synthetics-feature-roles">Admin</DocLink> to update
    <DocLink slug="/serverless/observability/synthetics-feature-roles" section="to-restrict-using-elastics-global-managed-infrastructure">`Synthetics and Uptime` sub-feature privileges</DocLink> for the role you're
    currently assigned or assign you a role that allows using Elastic's global managed infrastructure.

* Use a <DocLink slug="/serverless/observability/synthetics-private-location" section="monitor-via-a-private-agent">Private Location</DocLink>.-->

<div id="synthetics-troubleshooting-get-help"></div>

## Get help

<div id="synthetics-troubleshooting-support"></div>

### Elastic Support

<Support />

<div id="synthetics-troubleshooting-discussion"></div>

### Discussion forum

For other questions and feature requests, visit our
[discussion forum](http://example.co)/c/observability/synthetics/75).
