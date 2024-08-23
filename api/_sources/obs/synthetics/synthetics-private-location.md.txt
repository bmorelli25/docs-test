---
slug: /serverless/observability/synthetics-private-location
title: Monitor resources on private networks
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

<div id="synthetics-private-location"></div>

To monitor resources on private networks you can either:

* Allow Elastic's global managed infrastructure to access your private endpoints.
* Use PRODUCT_NAME to create a PRODUCT_NAME.

(PRODUCT_NAME)s via Elastic Agent require only outbound connections from your network,
while allowing Elastic's global managed infrastructure to access a private endpoint requires
inbound access, thus posing an additional risk that users must assess.

<div id="monitor-via-access-control"></div>

## Allow access to your private network

To give Elastic's global managed infrastructure access to a private endpoint, use IP address filtering, HTTP authentication, or both.

To grant access via IP, use [this list of egress IPs](https://manifest.synthetics.elastic-cloud.com/v1/ip-ranges.json).
The addresses and locations on this list may change, so automating updates to
filtering rules is recommended. IP filtering alone will allow all users of Elastic's global managed infrastructure access to your endpoints, if this
is a concern consider adding additional protection via user/password authentication via a proxy like nginx.

<div id="monitor-via-private-agent"></div>

## Monitor via a private agent

(PRODUCT_NAME)s allow you to run monitors from your own premises.
Before running a monitor on a PRODUCT_NAME, you'll need to:

* <DocLink slug="/serverless/observability/synthetics-private-location" section="set-up-agent">Set up PRODUCT_NAME</DocLink>.
* <DocLink slug="/serverless/observability/synthetics-private-location" section="connect-to-your-observability-project">Connect PRODUCT_NAME to your Observability project</DocLink> and enroll an PRODUCT_NAME in PRODUCT_NAME.
* <DocLink slug="/serverless/observability/synthetics-private-location" section="add-a-private-location">Add a PRODUCT_NAME</DocLink> in the Synthetics UI.

<DocCallOut title="Important" color="warning">

(PRODUCT_NAME)s running through PRODUCT_NAME must have a direct connection to PRODUCT_NAME.
Do not configure any ingest pipelines, or output via Logstash as this will prevent Synthetics from working properly and is not supported.

</DocCallOut>

<div id="synthetics-private-location-fleet-agent"></div>

## Set up PRODUCT_NAME

Start by setting up PRODUCT_NAME and creating an agent policy**. For more information on agent policies and creating them, refer to [(PRODUCT_NAME) policy](http://example.co)/agent-policy.html#create-a-policy).

<DocCallOut title="Important" color="warning">

A PRODUCT_NAME should be set up against an agent policy that runs on a single PRODUCT_NAME.
The PRODUCT_NAME must be **enrolled in Fleet** PRODUCT_NAMEs cannot be set up using **standalone** PRODUCT_NAME).
Do _not_ run the same agent policy on multiple agents being used for PRODUCT_NAMEs, as you may
end up with duplicate or missing tests. PRODUCT_NAMEs do not currently load balance tests across
multiple PRODUCT_NAME. See <DocLink slug="/serverless/observability/synthetics-private-location" section="scaling-private-locations">Scaling PRODUCT_NAMEs</DocLink> for information on increasing the capacity
within a PRODUCT_NAME.

By default PRODUCT_NAMEs are configured to allow two simultaneous browser tests and an unlimited number of lightweight checks.
As a result, if more than two browser tests are assigned to a particular PRODUCT_NAME, there may be a delay to run them.

</DocCallOut>

<div id="synthetics-private-location-connect"></div>

## Connect to your Observability project

After setting up PRODUCT_NAME, you'll connect PRODUCT_NAME to the your Observability project
and enroll an PRODUCT_NAME in PRODUCT_NAME.

<div id="synthetics-private-location-docker"></div>

Elastic provides Docker images that you can use to run PRODUCT_NAME and an PRODUCT_NAME more easily.
For monitors running on PRODUCT_NAMEs, you _must_ use the `elastic-agent-complete`
Docker image to create a self-hosted PRODUCT_NAME node. The standard PRODUCT_NAME or self-hosted
(PRODUCT_NAME) will not work.

<DocIf condition={ "(PRODUCT_NAME)" === "unreleased" }>

Version PRODUCT_NAME has not yet been released.

</DocIf>

<DocIf condition={ "(PRODUCT_NAME)" !== "unreleased" }>

To pull the Docker image run:

```sh
docker pull docker.elastic.co/beats/elastic-agent-complete:(PRODUCT_NAME)
```

</DocIf>

Then enroll and run an PRODUCT_NAME.
You'll need an enrollment token and the URL of the PRODUCT_NAME.
You can use the default enrollment token for your policy or create new policies
and [enrollment tokens](http://example.co)/fleet-enrollment-tokens.html) as needed.

For more information on running PRODUCT_NAME with Docker, refer to
[Run PRODUCT_NAME in a container](http://example.co)/elastic-agent-container.html).

<DocIf condition={ "(PRODUCT_NAME)" === "unreleased" }>

Version PRODUCT_NAME has not yet been released.

</DocIf>

<DocIf condition={ "(PRODUCT_NAME)" !== "unreleased" }>

```sh
docker run \
  --env FLEET_ENROLL=1 \
  --env FLEET_URL={fleet_server_host_url} \
  --env FLEET_ENROLLMENT_TOKEN={enrollment_token} \
  --cap-add=NET_RAW \
  --cap-add=SETUID \
  --rm docker.elastic.co/beats/elastic-agent-complete:(PRODUCT_NAME)
```

</DocIf>

<DocCallOut title="Important" color="warning">

The `elastic-agent-complete` Docker image requires additional capabilities to operate correctly. Ensure
`NET_RAW` and `SETUID` are enabled on the container.

</DocCallOut>

<DocCallOut title="Note">

You may need to set other environment variables.
Learn how in [(PRODUCT_NAME) environment variables guide](http://example.co)/agent-environment-variables.html).

</DocCallOut>

<div id="synthetics-private-location-add"></div>

## Add a PRODUCT_NAME

When the PRODUCT_NAME is running you can add a new PRODUCT_NAME in your Observability project's **Synthetics** section:

1. Go to **Settings**.
1. Go to the **(PRODUCT_NAME)s** tab.
1. Click **Add location**.
1. Give your new location a unique _Location name_ and select the _Agent policy_ you created above.
1. Click **Save**.

<DocCallOut color="warning" title="Important">
  It is not currently possible to use custom CAs for synthetics browser tests in private locations without following a workaround.
  To learn more about the workaround, refer to the following GitHub issue:
  [elastic/synthetics#717](https://github.com/elastic/synthetics/issues/717).
</DocCallOut>

<div id="synthetics-private-location-scaling"></div>

## Scaling PRODUCT_NAMEs

By default PRODUCT_NAMEs are configured to allow two simultaneous browser tests, and an unlimited number of lightweight checks.
These limits can be set via the environment variables `SYNTHETICS_LIMIT_{TYPE}`, where `{TYPE}` is one of `BROWSER`, `HTTP`, `TCP`, and `ICMP`
for the container running the PRODUCT_NAME docker image.

It is critical to allocate enough memory and CPU capacity to handle configured limits.
Start by allocating at least 2 GiB of memory and two cores per browser instance to ensure consistent
performance and avoid out-of-memory errors. Then adjust as needed. Resource requirements will vary depending on workload.
Much less memory is needed for lightweight monitors. Start by allocating at least 512MiB of memory and two cores for
lightweight checks. Then increase allocated memory and CPU based on observed usage patterns.

These limits are for simultaneous tests, not total tests. For example, if
60 browser tests were scheduled to run once per hour and each took 1 minute to run, that would fully occupy one execution slot.
However, it is a good practice to set up execution slots with extra capacity. A good starting point would be to over-allocate by
a factor of 5. In the previous example that would mean allocating 5 slots.

<div id="synthetics-private-location-next"></div>

## Next steps

Now you can add monitors to your PRODUCT_NAME in <DocLink slug="/serverless/observability/synthetics-get-started-ui">the Synthetics UI</DocLink> or using the <DocLink slug="/serverless/observability/synthetics-get-started-project">Elastic Synthetics library's `push` method</DocLink>.
