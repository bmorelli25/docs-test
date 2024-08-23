---
slug: /serverless/observability/troubleshoot-logs
title: Troubleshoot logs
description: Find solutions to errors you might encounter while onboarding your logs.
tags: [ 'serverless', 'observability', 'troubleshooting' ]
---

<p><DocBadge template="technical preview" /></p>

This section provides possible solutions for errors you might encounter while onboarding your logs.

## User does not have permissions to create API key

When adding a new data using the guided instructions in your project (**Add data** → **Collect and analyze logs** → **Stream log files**),
if you don't have the required privileges to create an API key, you'll see the following error message:

>You need permission to manage API keys

### Solution

You need to either:

* Ask an administrator to update your user role to at least **Deployment access** → **Admin**. Read more about user roles in <DocLink slug="/serverless/general/assign-user-roles" />. After your use role is updated, restart the onboarding flow.
* Get an API key from an administrator and manually add the API to the PRODUCT_NAME configuration. See <DocLink slug="/serverless/observability/stream-log-files" section="step-3-configure-the-agent">Configure the PRODUCT_NAME</DocLink> for more on manually updating the configuration and adding the API key.

<!--  Not sure if these are different in serverless...-->

<!--  ## Failed to create API key

If you don't have the privileges to create `savedObjects` in a project, you'll see the following error message:

```
Failed to create API key

Something went wrong: Unable to create observability-onboarding-state
```

### Solution

You need an administrator to give you the `Saved Objects Management` PRODUCT_NAME privilege to generate the required `observability-onboarding-state` flow state.
Once you have the necessary privileges, restart the onboarding flow.-->

## Observability project not accessible from host

If your Observability project is not accessible from the host, you'll see the following error message after pasting the **Install the PRODUCT_NAME** instructions into the host:

```
Failed to connect to {host} port {port} after 0 ms: Connection refused
```

### Solution

The host needs access to your project. Port `443` must be open and the project's PRODUCT_NAME endpoint must be reachable. You can locate your project's endpoint by clicking the help icon (<DocIcon type="help" title="Help icon" />) and selecting **Endpoints**. Run the following command, replacing the URL with your endpoint, and you should get an authentication error with more details on resolving your issue:

```shell
curl https://your-endpoint.elastic.cloud
```

## Download PRODUCT_NAME failed

If the host was able to download the installation script but cannot connect to the public artifact repository, you'll see the following error message:

```
Download Elastic Agent

Failed to download Elastic Agent, see script for error.
```

### Solutions

* If the combination of the PRODUCT_NAME version and operating system architecture is not available, you'll see the following error message:

    ```
    The requested URL returned error: 404
    ```

    To fix this, update the PRODUCT_NAME version in the installation instructions to a known version of the PRODUCT_NAME.

* If the PRODUCT_NAME was fully downloaded previously, you'll see the following error message:

    ```
    Error: cannot perform installation as Elastic Agent is already running from this directory
    ```

    To fix this, delete previous downloads and restart the onboarding.

* You're an Elastic Cloud Enterprise user without access to the Elastic downloads page.

## Install PRODUCT_NAME failed

If an PRODUCT_NAME already exists on your host, you'll see the following error message:

```
Install Elastic Agent

Failed to install Elastic Agent, see script for error.
```

### Solution

You can uninstall the current PRODUCT_NAME using the `elastic-agent uninstall` command, and run the script again.

<DocCallOut title="Warning" color="warning">
Uninstalling the current PRODUCT_NAME removes the entire current setup, including the existing configuration.
</DocCallOut>

## Waiting for Logs to be shipped... step never completes

If the **Waiting for Logs to be shipped...** step never completes, logs are not being shipped to your Observability project, and there is most likely an issue with your PRODUCT_NAME configuration.

### Solution

Inspect the PRODUCT_NAME logs for errors. See the [Debug standalone PRODUCT_NAMEs](http://example.co)/debug-standalone-agents.html#inspect-standalone-agent-logs) documentation for more on finding errors in PRODUCT_NAME logs.
