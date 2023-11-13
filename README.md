# Administrate

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/main)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

[demo]: https://administrate-demo.herokuapp.com/admin

### Warning:

Administrate is still pre-1.0,
and there may be occasional breaking changes to the API.
Check the [release notes] for important updates.

[release notes]: https://github.com/thoughtbot/administrate/releases

![administrate](https://user-images.githubusercontent.com/11917/72203824-ec10f980-3468-11ea-9ac1-51cd28ff88b7.png)

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

## Documentation

To customize the appearance, behavior, and contents of the dashboard,
we publish a set [of guides for the current release][released_docs].

These guides are available as markdown files in the `docs` subdirectory of the
git repository, too.

We publish [docs for the upcoming release, which you can find at our prerelease
app][prerelease_docs].

[released_docs]: https://administrate-demo.herokuapp.com
[prerelease_docs]: https://administrate-demo-prerelease.herokuapp.com

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

Administrate was originally written by Grace Youngblood and is now maintained by
Nick Charlton. Many improvements and bugfixes were contributed by the [open
source
community](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

administrate is Copyright © 2015-2023 thoughtbot.
It is free software, and may be redistributed under the terms specified in the
[LICENSE](/LICENSE.md) file.

## About thoughtbot

![thoughtbot](https://thoughtbot.com/brand_assets/93:44.svg)

administrate is maintained and funded by thoughtbot, inc.
The names and logos for thoughtbot are trademarks of thoughtbot, inc.

We love open source software!
See [our other projects][community] or
[hire us][hire] to design, develop, and grow your product.

[community]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com?utm_source=github
