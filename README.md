# Administrate

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/master)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

### Warning:

Administrate is still pre-1.0,
and there may be occasional breaking changes to the API.
Check the [release notes] for important updates.

[release notes]: https://github.com/thoughtbot/administrate/releases

![administrate](https://cloud.githubusercontent.com/assets/903327/25823003/a5cc6aee-3408-11e7-8bcb-c62bb7addf40.png)

## What Is Administrate?

Administrate is a library for Rails apps
that automatically generates admin dashboards.
Administrate's admin dashboards give non-technical users clean interfaces
that allow them to create, edit, search, and delete records
for any model in the application.

Administrate solves the same problem as [Rails Admin] and [ActiveAdmin],
but aims to provide a better user experience for site admins,
and to be easier for developers to customize.

To accomplish these goals, Administrate follows a few guiding principles:

- No DSLs (domain-specific languages)
- Support the simplest use cases, and let the user override defaults with
  standard tools such as plain Rails controllers and views.
- Break up the library into core components and plugins,
  so each component stays small and easy to maintain.

[Rails Admin]: https://github.com/sferik/rails_admin
[ActiveAdmin]: http://activeadmin.info/

## Getting Started

Administrate supports Rails from 4.2, up to 5.0 and beyond. We support Ruby
2.2.9 and up.

Add Administrate to your Gemfile and re-bundle:

```ruby
gem "administrate"
```

The included installer will create dashboards for each model in your
app, complete with routes:

```bash
$ rails generate administrate:install
```

Restart your server, and visit http://localhost:3000/admin
to see your new dashboard in action.

For more detailed instructions or to make it work with Rails API-only applications, please go through the ['Getting Started` guide](https://administrate-prototype.herokuapp.com/getting_started).


## Create Additional Dashboards

In order to create additional dashboards, pass in the resource name to
the dashboard generator. A dashboard and controller will be created.

```bash
$ rails generate administrate:dashboard Foo
```

## Documentation

To customize the appearance, behavior, and contents of the dashboard,
see the guides at
[https://administrate-prototype.herokuapp.com][prototype_heroku].
These guides are available as markdown files in the `docs` subdirectory of the
git repository, too.

## Repository Structure

This repository contains both the source code for Administrate,
and a demo Rails app that uses Administrate.
The demo app is [hosted publicly on Heroku][demo].

- The gem's source code lives in the `app` and `lib` subdirectories.
- The demo app is nested within `spec/example_app`.
- The guides as seen at
  [https://administrate-prototype.herokuapp.com][prototype_heroku] live as
  markdown files in the `docs` subdirectory.

Rails configuration files have been changed
to recognize the app in the new location,
so running the server or deploying to Heroku works normally.

With this structure, developing a typical feature looks like:

- Add tests in `spec/`
- Implement a feature in `administrate/`
- Exercise the feature using the demo rails app (`spec/example_app/app/`)

## Front-end Architecture

This project uses:

- Sass
- [BEM]-style CSS selectors, with [namespaces]
- Autoprefixer
- SCSS-Lint, with [Hound] ([configuration](.scss-lint.yml))
- A variety of CSS units:
  - `em` for typographical-related elements
  - `rem` for lengths related to components
  - `px` for borders, text shadows, etc.
  - `vw`/`vh` for lengths that should be relational to the viewport

[BEM]: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
[namespaces]: http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/
[Hound]: https://houndci.com/

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

administrate was originally written by Grayson Wright and is now maintained by
Nick Charlton. Many improvements and bugfixes were contributed by the [open
source
community](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

administrate is Copyright © 2015-2018 thoughtbot.
It is free software, and may be redistributed under the terms specified in the
[LICENSE](/LICENSE.md) file.

## About thoughtbot

![thoughtbot](http://presskit.thoughtbot.com/images/thoughtbot-logo-for-readmes.svg)

administrate is maintained and funded by thoughtbot, inc.
The names and logos for thoughtbot are trademarks of thoughtbot, inc.

We love open source software!
See [our other projects][community] or
[hire us][hire] to design, develop, and grow your product.

[demo]: https://administrate-prototype.herokuapp.com/admin
[prototype_heroku]: https://administrate-prototype.herokuapp.com
[community]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com?utm_source=github
