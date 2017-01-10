# Kid Calloway website

This document describes the components of which this website is build upon. We used the [Angular Fullstack Generator](https://github.com/angular-fullstack/generator-angular-fullstack/) for [Yeoman](http://yeoman.io).

This project uses MongoDB als data store and Express as webserver/API. Documentation for the API's will follow.

## Conventions
This website makes use of a few conventions. These are described below:

### User roles
Items have a visibility property which are bound to user roles and restrictions:
- _all_: this item is visible for everyone (both logged in and not logged in users)
- _loggedIn_: this item is only visible for logged in users of any role
- _[role]_: this item is only visible for users with role _[role]_
- _admin_: this item is only visible for users with role _admin_

## Testing
Everything is en route to be (unit) tested in this project.

You can run the server unit tests by running `grunt test:server`, and run a quick client unit test with `grunt test:client`.

### Client unit tests
There are two ways for the unit tests to be run quickly, the method mentioned above (which also builds the code), and directly calling `grunt karma:unit`. Doing this will unit test you code in PhantomJS, which is quick and excellent for development.

If you want to unit test the client side code in a real browsers, there is a specific grunt task for that: `grunt run-karma-with:<browser name>`. Replace `<browser name>` with a single name or a comma delimited name:

````bash
grunt run-karma-with:Chrome # Runs Karma with Chrome
grunt run-karma-with:Chrome,Firefox # Runs Karma in both Chrome and Firefox
````
This is ideal for quickly testing in real browsers.

The same thing can be done for debugging unit tests in (a) specific browser(s). Just subtitute `run-karma-with` with `debug-karma-with`

> *Important to know*: the `grunt run(/debug)-karma-with:` task will fail if no browser name is added. The `grunt karma:unit` task is meant for a quick unit test run with PhantomJS. This task is semantically named for a reason ;)