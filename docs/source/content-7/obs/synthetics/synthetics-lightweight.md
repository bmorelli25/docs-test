---
slug: /serverless/observability/synthetics-lightweight
title: Configure lightweight monitors
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

import LightweightConfigCommon from '../transclusion/synthetics/reference/lightweight-config/common.mdx'
import LightweightConfigHttp from '../transclusion/synthetics/reference/lightweight-config/http.mdx'
import LightweightConfigIcmp from '../transclusion/synthetics/reference/lightweight-config/icmp.mdx'
import LightweightConfigTcp from '../transclusion/synthetics/reference/lightweight-config/tcp.mdx'

<div id="synthetics-lightweight"></div>

Monitor the status of network endpoints using the following lightweight checks:

* **HTTP**: Monitor your website. The HTTP monitor checks to make sure specific endpoints return the correct
    status code and display the correct text.

* **ICMP**: Check the availability of your hosts. The ICMP monitor uses ICMP (v4 and v6) Echo
    Requests to check the network reachability of the hosts you are pinging. This will tell you whether the
    host is available and connected to the network, but doesn't tell you if a service on the host is running or
    not.

* **TCP**: Monitor the services running on your hosts. The TCP monitor checks individual ports
    to make sure the service is accessible and running.

Lightweight monitors can be configured using either the <DocLink slug="/serverless/observability/synthetics-lightweight" section="synthetics-ui">Synthetics UI</DocLink>
or a <DocLink slug="/serverless/observability/synthetics-lightweight" section="synthetics-project">Synthetics project</DocLink>.

<div id="synthetics-lightweight-ui"></div>

## Synthetics UI

To use the UI, go to **Synthetics** in your Observability project to create and configure monitors.
For step-by-step instructions, refer to <DocLink slug="/serverless/observability/synthetics-get-started-ui">Create monitors in the Synthetics UI</DocLink>.

![Synthetics Create monitor UI](../images/synthetics-get-started-ui-lightweight.png)

## Synthetics project

To use YAML files to create lightweight monitors in a Synthetics project, <DocLink slug="/serverless/observability/synthetics-get-started-project">set up the Synthetics project</DocLink>
and configure monitors in YAML files in the `lightweight` directory.

In each YAML file, define a set of `monitors` to check your remote hosts.
Each `monitor` item is an entry in a YAML list and begins with a dash (`-`).
You can define the type of monitor to use, the hosts to check, and other
optional settings.

The following example configures three monitors checking via the `http`, `icmp`, and `tcp`
protocols and demonstrates how to use TCP Echo response verification:

```yaml
heartbeat.monitors:
- type: http
  name: Todos Lightweight
  id: todos-lightweight
  urls: "https://elastic.github.io/synthetics-demo/"
  schedule: '@every 1m'
- type: icmp
  id: ping-myhost
  name: My Host Ping
  hosts: "myhost"
  schedule: '@every 5m'
- type: tcp
  id: myhost-tcp-echo
  name: My Host TCP Echo
  hosts: "myhost:777"  # default TCP Echo Protocol
  check.send: "Check"
  check.receive: "Check"
  schedule: '@every 60s'
```

<div id="synthetics-monitor-options"></div>

There are some common monitor configuration options that are the same for all lightweight monitor types.
For a complete list, refer to <DocLink slug="/serverless/observability/synthetics-lightweight" section="common-options">Common options</DocLink>.

Each monitor type also has additional configuration options that are specific to that type.
Refer to:

* <DocLink slug="/serverless/observability/synthetics-lightweight" section="http-options">HTTP options</DocLink>
* <DocLink slug="/serverless/observability/synthetics-lightweight" section="icmp-options">ICMP options</DocLink>
* <DocLink slug="/serverless/observability/synthetics-lightweight" section="tcp-options">TCP options</DocLink>

The `tcp` and `http` monitor types both support SSL/TLS and some proxy settings.

<div id="synthetics-lightweight-common-options"></div>

### Common options

You can specify the following options when defining a synthetic monitor in any location.
These options are the same for all monitors. Each monitor type has additional configuration
options that are specific to that monitor type.

<!--  Reference table-->
<LightweightConfigCommon />

<div id="synthetics-lightweight-http"></div>

### HTTP options

The options described here configure Synthetics to connect via HTTP and
optionally verify that the host returns the expected response.

Valid options for HTTP monitors include <DocLink slug="/serverless/observability/synthetics-lightweight" section="common-options">all common options</DocLink>
and the following HTTP-specific options:

<!--  Reference table-->
<LightweightConfigHttp />

<div id="synthetics-lightweight-icmp"></div>

### ICMP options

The options described here configure Synthetics to use ICMP (v4 and v6) Echo
Requests to check the configured hosts. On most platforms you must execute
Synthetics with elevated permissions to perform ICMP pings.

On Linux, regular users may perform pings if the right file capabilities are set. Run
`sudo setcap cap_net_raw+eip /path/to/heartbeat` to  grant Synthetics ping capabilities on Linux.
Alternatively, you can grant ping permissions to the user being used to run Synthetics.
To grant ping permissions in this way, run `sudo sysctl -w net.ipv4.ping_group_range='myuserid myuserid'`.

Other platforms may require Synthetics to run as root or administrator to execute pings.

Valid options for ICMP monitors include <DocLink slug="/serverless/observability/synthetics-lightweight" section="common-options">all common options</DocLink>
and the following ICMP-specific options:

<!--  Reference table-->
<LightweightConfigIcmp />

<div id="synthetics-lightweight-tcp"></div>

### TCP options

The options described here configure Synthetics to connect via TCP and
optionally verify the endpoint by sending and/or receiving a custom payload.

Valid options for TCP monitors include <DocLink slug="/serverless/observability/synthetics-lightweight" section="common-options">all common options</DocLink>
and the following TCP-specific options:

<!--  Reference table-->
<LightweightConfigTcp />

<div id="synthetics-lightweight-data-types"></div>

### Data types reference

Values of configuration settings are interpreted as required by Synthetics.
If a value can't be correctly interpreted as the required type - for example a
string is given when a number is required - Synthetics will fail to start up.

<div id="synthetics-lightweight-data-bool"></div>

#### Boolean

Boolean values can be either `true` or `false`. Alternative names for `true` are
`yes` and `on`. Instead of `false` the values `no` and `off` can be used.

```yaml
enabled: true
disabled: false
```

<div id="synthetics-lightweight-data-numbers"></div>

#### Number

Number values require you to enter the number _without_ single or
double quotes.

```yaml
integer: 123
negative: -1
float: 5.4
```

<DocCallOut title="Note">
Some settings only support a restricted number range.
</DocCallOut>

<div id="synthetics-lightweight-data-string"></div>

#### String

In [YAML](http://www.yaml.org), multiple styles of string definitions are supported:
double-quoted, single-quoted, unquoted.

The double-quoted style is specified by surrounding the string with `"`. This
style provides support for escaping unprintable characters using `\`, but comes
at the cost of having to escape `\` and `"` characters.

The single-quoted style is specified by surrounding the string with `'`. This
style supports no escaping (use `''` to quote a single quote). Only printable
characters can be used when using this form.

Unquoted style requires no quotes, but does not support any escaping and can't
include any symbol that has a special meaning in YAML.

<DocCallOut title="Note">
Single-quoted style is recommended when defining regular expressions,
event format strings, windows file paths, or non-alphabetical symbolic characters.
</DocCallOut>

<div id="synthetics-lightweight-data-duration"></div>

#### Duration

Durations require a numeric value with optional fraction and required unit.
Valid time units are `ns`, `us`, `ms`, `s`, `m`, `h`. Sometimes features based
on durations can be disabled by using zero or negative durations.

```yaml
duration1: 2.5s
duration2: 6h
duration_disabled: -1s
```

<div id="synthetics-lightweight-data-regex"></div>

#### Regular expression

Regular expressions are special strings that are compiled into regular
expressions at load time.

As regular expressions and YAML use `\` for escaping
characters in strings, it's highly recommended to use single quoted strings when
defining regular expressions. When single quoted strings are used, the `\` character
is not interpreted by YAML parser as an escape symbol.
