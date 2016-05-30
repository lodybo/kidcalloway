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
