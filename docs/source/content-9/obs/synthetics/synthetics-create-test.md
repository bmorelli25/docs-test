---
slug: /serverless/observability/synthetics-create-test
title: Write a synthetic test
# description: Description to be written
tags: []
---

<p><DocBadge template="technical preview" /></p>

<div id="synthetics-create-test"></div>

After <DocLink slug="/serverless/observability/synthetics-get-started-project">setting up a Synthetics project</DocLink>, you can start writing synthetic tests that check critical actions and requests that an end-user might make
on your site.

<div id="synthetics-syntax"></div>

## Syntax overview

To write synthetic tests for your application, you'll need to know basic JavaScript and
[Playwright](https://playwright.dev/) syntax.

<DocCallOut title="Tip">
[Playwright](https://playwright.dev/) is a browser testing library developed by Microsoft.
It's fast, reliable, and features a modern API that automatically waits for page elements to be ready.
</DocCallOut>

The synthetics agent exposes an API for creating and running tests, including:

<DocTable columns={[
  { title: "", width: "20%" },
  { title: "", width: "80%" }
]}>
  <DocRow>
    <DocCell>`journey`</DocCell>
    <DocCell>
      Tests one discrete unit of functionality. Takes two parameters: a `name` (string) and a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="create-a-journey">Create a journey</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`step`</DocCell>
    <DocCell>
      Actions within a journey that should be completed in a specific order. Takes two parameters: a `name` (string) and a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="add-steps">Add steps</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`expect`</DocCell>
    <DocCell>
      Check that a value meets a specific condition. There are several supported checks.

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="make-assertions">Make assertions</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`beforeAll`</DocCell>
    <DocCell>
      Runs a provided function once, before any `journey` runs. If the provided function is a promise, the runner will wait for the  promise to resolve before invoking the `journey`.  Takes one parameter: a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="set-up-and-remove-a-global-state">Set up and remove a global state</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`before`</DocCell>
    <DocCell>
      Runs a provided function before a single `journey` runs. Takes one parameter: a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="set-up-and-remove-a-global-state">Set up and remove a global state</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`afterAll`</DocCell>
    <DocCell>
      Runs a provided function once, after all the `journey` runs have completed. Takes one parameter: a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="set-up-and-remove-a-global-state">Set up and remove a global state</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`after`</DocCell>
    <DocCell>
      Runs a provided function after a single `journey` has completed. Takes one parameter: a `callback` (function).

      Learn more in <DocLink slug="/serverless/observability/synthetics-create-test" section="set-up-and-remove-a-global-state">Set up and remove a global state</DocLink>.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>`monitor`</DocCell>
    <DocCell>
      The `monitor.use` method allows you to determine a monitor's configuration on a journey-by-journey basis. If you want two journeys to create monitors with different intervals, for example, you should call  `monitor.use` in each of them and set the `schedule` property to different values in each.  Note that this is only relevant when using the `push` command to create monitors in your Observability project.

      Learn more in <DocLink slug="/serverless/observability/synthetics-monitor-use">Configure individual browser monitors</DocLink>.
    </DocCell>
  </DocRow>
</DocTable>

<div id="synthetics-create-journey"></div>

## Create a journey

Create a new file using the `.journey.ts` or `.journey.js` file extension or edit one of the example journey files.

A _journey_ tests one discrete unit of functionality.
For example, logging into a website, adding something to a cart, or joining a mailing list.

The journey function takes two parameters: a `name` and a `callback`.
The `name` helps you identify an individual journey.
The `callback` argument is a function that encapsulates what the journey does.
The callback provides access to fresh Playwright `page`, `params`, `browser`, and `context` instances.

```js
journey('Journey name', ({ page, browser, context, params, request }) => {
  // Add steps here
});
```

<div id="synthetics-journey-ref"></div>

### Arguments

<DocTable columns={[
  {
    "title": "",
    "width": "20%"
  },
  {
    "title": "",
    "width": "80%"
  }
]}>
  <DocRow>
    <DocCell>
      **`name`**<br />(_string_)

    </DocCell>
    <DocCell>
      A user-defined string to describe the journey.


    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>
      **`callback`** (_function_)

    </DocCell>
    <DocCell>
      A function where you will add steps.

      **Instances**:

          `page`
          : A [page](https://playwright.dev/docs/api/class-page) object from Playwright
          that lets you control the browser's current page.

          `browser`
          : A [browser]({book['playwright-api-docs']}) object created by Playwright.

          `context`
          : A [browser context](https://playwright.dev/docs/api/class-browsercontext)
          that doesn't share cookies or cache with other browser contexts.

          `params`
          : User-defined variables that allow you to invoke the Synthetics suite with custom parameters.
          For example, if you want to use a different homepage depending on the `env`
          (`localhost` for `dev` and a URL for `prod`). See <DocLink slug="/serverless/observability/synthetics-params-secrets">Work with params and secrets</DocLink>
          for more information.

            `request`
          : A request object that can be used to make API requests independently of the browser
          interactions. For example, to get authentication credentials or tokens in service of a
          browser-based test. See <DocLink slug="/serverless/observability/synthetics-create-test" section="make-api-requests">Make API requests</DocLink> for more information.


    </DocCell>
  </DocRow>
</DocTable>

<div id="synthetics-create-step"></div>

## Add steps

A journey consists of one or more _steps_. Steps are actions that should be completed in a specific order.
Steps are displayed individually in the Synthetics UI along with screenshots for convenient debugging and error tracking.

A basic two-step journey would look like this:

```js
journey('Journey name', ({ page, browser, client, params, request }) => {
    step('Step 1 name', () => {
      // Do something here
    });
    step('Step 2 name', () => {
      // Do something else here
    });
});
```

Steps can be as simple or complex as you need them to be.
For example, a basic first step might load a web page:

```
step('Load the demo page', () => {
  await page.goto('https://elastic.github.io/synthetics-demo/');  \[\^\1]
});
```
\[\^\1]: Go to the [`page.goto` reference](https://playwright.dev/docs/api/class-page#page-goto) for more information.

<div id="synthetics-step-ref"></div>

### Arguments

<DocTable columns={[
  {
    "title": "",
    "width": "20%"
  },
  {
    "title": "",
    "width": "80%"
  }
]}>
  <DocRow>
    <DocCell>**`name`**<br />(_string_)</DocCell>
    <DocCell>
      A user-defined string to describe the journey.
    </DocCell>
  </DocRow>
  <DocRow>
    <DocCell>**`callback`** (_function_)</DocCell>
    <DocCell>
      A function where you simulate user workflows using Synthetics and <DocLink slug="/serverless/observability/synthetics-create-test" section="playwright-syntax">Playwright</DocLink> syntax.
    </DocCell>
  </DocRow>
</DocTable>

<DocCallOut id="synthetics-create-test-script-recorder" title="Note">

If you want to generate code by interacting with a web page directly, you can use the **Synthetics Recorder**.

The recorder launches a [Chromium browser](https://www.chromium.org/Home/) that will listen to each interaction you have with the web page and record them internally using Playwright.
When you're done interacting with the browser, the recorder converts the recorded actions into JavaScript code that you can use with Elastic Synthetics or PRODUCT_NAME.

For more details on getting started with the Synthetics Recorder, refer to <DocLink slug="/serverless/observability/synthetics-recorder">Use the Synthetics Recorder</DocLink>.

</DocCallOut>

<div id="synthetics-playwright"></div>

### Playwright syntax

Inside the callback for each step, you'll likely use a lot of Playwright syntax.
Use Playwright to simulate and validate user workflows including:

* Interacting with the [browser](https://playwright.dev/docs/api/class-browser)
    or the current [page](https://playwright.dev/docs/api/class-page) (like in the example above).

* Finding elements on a web page using [locators](https://playwright.dev/docs/api/class-locator).
* Simulating [mouse](https://playwright.dev/docs/api/class-mouse),
    [touch](https://playwright.dev/docs/api/class-touchscreen), or
    [keyboard](https://playwright.dev/docs/api/class-keyboard) events.

* Making assertions using [`@playwright/test`'s `expect` function](https://playwright.dev/docs/test-assertions). Read more in <DocLink slug="/serverless/observability/synthetics-create-test" section="make-assertions">Make assertions</DocLink>.

Visit the [Playwright documentation](https://playwright.dev/docs) for information.

<DocCallOut title="Note">

Do not attempt to run in headful mode (using `headless:false`) when running through Elastic's global managed testing infrastructure or Private Locations as this is not supported.

</DocCallOut>

However, not all Playwright functionality should be used with Elastic Synthetics.
In some cases, there are alternatives to Playwright functionality built into the
Elastic Synthetics library. These alternatives are designed to work better for
synthetic monitoring. Do _not_ use Playwright syntax to:

* **Make API requests.** Use Elastic Synthetic's `request`
    parameter instead. Read more in <DocLink slug="/serverless/observability/synthetics-create-test" section="make-api-requests">Make API requests</DocLink>.

There is also some Playwright functionality that is not supported out-of-the-box
in Elastic Synthetics including:

* [Videos](https://playwright.dev/docs/api/class-video)
* The [`toHaveScreenshot`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot-1) and [`toMatchSnapshot`](https://playwright.dev/docs/api/class-snapshotassertions) assertions

<DocCallOut title="Note">
  Captures done programmatically via https://playwright.dev/docs/api/class-page#page-screenshot[`screenshot`] or https://playwright.dev/docs/api/class-page#page-video[`video`] are not stored and are not shown in the Synthetics application. Providing a `path` will likely make the monitor fail due to missing permissions to write local files.
</DocCallOut>

<div id="synthetics-make-assertions"></div>

## Make assertions

A more complex `step` might wait for a page element to be selected
and then make sure that it matches an expected value.

Elastic Synthetics uses `@playwright/test`'s `expect` function to make assertions
and supports most [Playwright assertions](https://playwright.dev/docs/test-assertions).
Elastic Synthetics does _not_ support [`toHaveScreenshot`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot-1)
or any [Snapshot Assertions](https://playwright.dev/docs/api/class-snapshotassertions).

For example, on a page using the following HTML:

```html
<header class="header">
  <h1>todos</h1>
  <input class="new-todo"
    autofocus autocomplete="off"
    placeholder="What needs to be done?">
</header>
```

You can verify that the `input` element with class `new-todo` has the expected `placeholder` value
(the hint text for `input` elements) with the following test:

```
step('Assert placeholder text', async () => {
  const input = await page.locator('input.new-todo');  \[\^\1]
  expect(await input.getAttribute('placeholder')).toBe(
    'What needs to be done?'
  );  \[\^\2]
});
```
\[\^\1]: Find the `input` element with class `new-todo`.
\[\^\2]: Use the assertion library provided by the Synthetics agent to check that
the value of the `placeholder` attribute matches a specific string.

<div id="synthetics-request-param"></div>

## Make API requests

You can use the `request` parameter to make API requests independently of browser interactions.
For example, you could retrieve a token from an HTTP endpoint and use it in a subsequent webpage request.

```js
step('make an API request', async () => {
  const response = await request.get(params.url);
  // Do something with the response
})
```

The Elastic Synthetics `request` parameter is similar to [other request objects that are exposed by Playwright](https://playwright.dev/docs/api/class-apirequestcontext)
with a few key differences:

* The Elastic Synthetics `request` parameter comes built into the library so it doesn't
    have to be imported separately, which reduces the amount of code needed and allows you to
    make API requests in <DocLink slug="/serverless/observability/synthetics-get-started-ui" section="add-a-browser-monitor">inline journeys</DocLink>.

* The top level `request` object exposed by Elastic Synthetics has its own isolated cookie storage
    unlike Playwright's `context.request` and `page.request`, which share cookie storage
    with the corresponding [`BrowserContext`](https://playwright.dev/docs/api/class-browsercontext).

* If you want to control the creation of the `request` object, you can do so by passing options
    via <DocLink slug="/serverless/observability/synthetics-command-reference" section="elasticsynthetics">`--playwright-options`</DocLink> or in the
    <DocLink slug="/serverless/observability/synthetics-configuration">`synthetics.config.ts` file</DocLink>.

For a full example that shows how to use the `request` object, refer to the [Elastic Synthetics demo repository](https://github.com/elastic/synthetics-demo/blob/main/advanced-examples/journeys/api-requests.journey.ts).

<DocCallOut title="Note">
The `request` parameter is not intended to be used for writing pure API tests. Instead, it is a way to support
writing plain HTTP requests in service of a browser-based test.
</DocCallOut>

<div id="before-after"></div>

## Set up and remove a global state

If there are any actions that should be done before or after journeys, you can use `before`, `beforeAll`, `after`, or `afterAll`.

To set up global state or a server that will be used for a **single** `journey`, for example,
use a `before` hook. To perform this setup once before **all** journeys, use a `beforeAll` hook.

```js
before(({ params }) => {
  // Actions to take
});

beforeAll(({ params }) => {
  // Actions to take
});
```

You can clean up global state or close a server used for a **single** `journey` using an `after` hook.
To perform this cleanup once after all journeys, use an `afterAll` hook.

```js
after(({ params }) => {
  // Actions to take
});

afterAll(({ params }) => {
  // Actions to take
});
```

<div id="synthetics-import-packages"></div>

## Import NPM packages

You can import and use other NPM packages inside journey code.
Refer to the example below using the external NPM package `is-positive`:

```js
import { journey, step, monitor, expect } from '@elastic/synthetics';
import isPositive from 'is-positive';

journey('bundle test', ({ page, params }) => {
  step('check if positive', () => {
    expect(isPositive(4)).toBe(true);
  });
});
```

When you <DocLink slug="/serverless/observability/synthetics-get-started-project">create a monitor</DocLink> from a journey that uses
external NPM packages, those packages will be bundled along with the
journey code when the `push` command is invoked.

However there are some limitations when using external packages:

* Bundled journeys after compression should not be more than 800 Kilobytes.
* Native node modules will not work as expected due to platform inconsistency.

<div id="synthetics-sample-test"></div>

## Sample synthetic test

A complete example of a basic synthetic test might look like this:

```js
import { journey, step, expect } from '@elastic/synthetics';

journey('Ensure placeholder is correct', ({ page }) => {
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

You can find more complex examples in the [Elastic Synthetics demo repository](https://github.com/elastic/synthetics-demo/blob/main/advanced-examples/journeys/api-requests.journey.ts).

<div id="synthetics-test-locally"></div>

## Test locally

As you write journeys, you can run them locally to verify they work as expected. Then, you can create monitors to run your journeys at a regular interval.

To test all the journeys in a Synthetics project, navigate into the directory containing the Synthetics project and run the journeys in there.
By default, the `@elastic/synthetics` runner will only run files matching the filename `*.journey.(ts|js)*`.

```sh
# Run tests on the current directory. The dot `.` indicates
# that it should run all tests in the current directory.
npx @elastic/synthetics .
```

<div id="synthetics-test-inline"></div>

### Test an inline monitor

To test an inline monitor's journey locally, pipe the inline journey into the `npx @elastic/synthetics` command.

Assume, for example, that your inline monitor includes the following code:

```js
step('load homepage', async () => {
    await page.goto('https://www.elastic.co');
});
step('hover over products menu', async () => {
    await page.hover('css=[data-nav-item=products]');
});
```

To run that journey locally, you can save that code to a file and pipe the file's contents into `@elastic-synthetics`:

```sh
cat path/to/sample.js | npx @elastic/synthetics --inline
```

And you'll get a response like the following:

```sh
Journey: inline
   ✓  Step: 'load homepage' succeeded (1831 ms)
   ✓  Step: 'hover over products menu' succeeded (97 ms)

 2 passed (2511 ms)
```
