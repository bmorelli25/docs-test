# markitpy-poc

This repo contains 1836 real Observability Serverless markdown files.

For instructions on how to build this content, see [https://github.com/elastic/markitpy](https://github.com/elastic/markitpy).

## Known issues

* Building the entire documentation set is currently SLOW. We recommend only building partial documentation sets for now. For example:
    ```
    markitpy autobuild --partial docs/source/content-1/index.md
    ```
* There is a bug with autobuild on parial builds and it may not work correctly.
* Some of the APM images are incorrectly included and do not work.
* There is A LOT of leftover Docsmobile syntax that does not render correctly with MyST.
