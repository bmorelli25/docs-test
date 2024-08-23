---
title: Create an Elastic Observability project
---

import Roles from '../partials/roles.mdx'

<Roles role="Admin" goal="create projects" />

<p><DocBadge template="technical preview" /></p>

An Observability project allows you to run Elastic Observability in an autoscaled and fully-managed environment,
where you don't have to manage the underlying PRODUCT_NAME cluster or PRODUCT_NAME instances.

1. Navigate to [cloud.elastic.co](https://cloud.elastic.co/) and log in to your account.
2. Within **Serverless projects**, click **Create project**.
3. Under **Observability**, click **Next**.
4. Enter a name for your project.
5. (Optional) Click **Edit settings** to change your project settings:
    * **Cloud provider**: The cloud platform where you’ll deploy your project. We currently support Amazon Web Services (AWS).
    * **Region**: The <DocLink slug="/serverless/regions" text="region"/> where your project will live.
6. Click **Create project**. It takes a few minutes to create your project.
7. When the project is ready, click **Continue**.

From here, you can start adding logs and other observability data.

<DocCallOut title="Tip">
    To return to the onboarding page later, select **Add data** from the main menu.
</DocCallOut>

## Next steps

Learn how to add data to your project and start using Observability features:

* <DocLink slug="/serverless/observability/get-started-with-logs"/>
* <DocLink slug="/serverless/observability/apm-get-started"/>
* <DocLink slug="/serverless/observability/get-started-with-metrics"/>
