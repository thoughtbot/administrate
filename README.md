# Administrate

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/master)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

### Warning:

Administrate is still pre-1.0,
and there may be occasional breaking changes to the API.
Check the [release notes] for important updates.

[release notes]: https://github.com/thoughtbot/administrate/releases

![administrate](https://cloud.githubusercontent.com/assets/903327/23998153/94899eee-0a2a-11e7-94ed-348515728aaf.png)

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

Administrate supports Rails from 4.2, up to 5.0 and beyond.

Add Administrate to your Gemfile:

```ruby
gem "administrate"
```

Re-bundle, then run the installer:

```bash
$ rails generate administrate:install
```

Restart your server, and visit http://localhost:3000/admin
to see your new dashboard in action.

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

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

administrate was originally written by Grayson Wright and is now maintained by
Nick Charlton. Many improvements and bugfixes were contributed by the [open
source
community](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

administrate is Copyright © 2015-2017 thoughtbot.
It is free software, and may be redistributed under the terms specified in the
[LICENSE](/LICENSE) file.

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
